import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Search, Loader2, Sparkles, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SearchProducts() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [searching, setSearching] = useState(false);
  const [creating, setCreating] = useState(null);

  const handleSearch = async () => {
    if (!query.trim()) return;
    setSearching(true);

    const data = await base44.integrations.Core.InvokeLLM({
      prompt: `The user is searching for a skin/hair care product: "${query}". 
Return a list of 5 real, well-known products that match this search. Include the product name, brand, category, and a brief description.`,
      add_context_from_internet: true,
      response_json_schema: {
        type: "object",
        properties: {
          products: {
            type: "array",
            items: {
              type: "object",
              properties: {
                name: { type: "string" },
                brand: { type: "string" },
                category: { type: "string", enum: ["skincare", "haircare", "bodycare", "other"] },
                description: { type: "string" }
              }
            }
          }
        }
      }
    });

    setResults(data.products || []);
    setSearching(false);
  };

  const selectProduct = async (product) => {
    setCreating(product.name);

    const user = await base44.auth.me();
    const profile = user.profile || {};

    const analysis = await base44.integrations.Core.InvokeLLM({
      prompt: `You are a skin/hair care expert. Give a PERSONALIZED analysis of this product specifically for this user — not a generic review.

Product: ${product.name} by ${product.brand}
Category: ${product.category}
Description: ${product.description}

User Profile:
- Skin type: ${profile.skin_type || 'Unknown'}
- Hair type: ${profile.hair_type || 'Unknown'}
- Skin conditions: ${(profile.skin_conditions || []).join(', ') || 'None'}
- Goals: ${(profile.goals || []).join(', ') || 'None specified'}
- Climate: ${profile.climate || 'Unknown'}
- Ingredient sensitivities: ${(profile.sensitivities || []).join(', ') || 'None'}

IMPORTANT — Scoring rules:
- The score (1–10) must reflect how well this product matches THIS user's specific needs, not the product's general quality.
- A great product can score low if it doesn't align with this user's skin type, conditions, or goals.
- A basic product can score high if it perfectly matches their needs.
- score_explanation must be 2–3 sentences clearly explaining WHY this specific user got this score — reference their skin type, conditions, goals, or sensitivities directly.

Also provide:
- summary: brief 1–2 sentence overview of what the product does
- ingredients: the typical key ingredients of this product
- pros: benefits specifically relevant to this user's profile
- cons: drawbacks specifically relevant to this user's profile
- warnings: any ingredients that conflict with their sensitivities or could aggravate their conditions
- alternatives: 3 better-suited alternatives for this specific user`,
      add_context_from_internet: true,
      response_json_schema: {
        type: "object",
        properties: {
          score: { type: "number" },
          score_explanation: { type: "string" },
          summary: { type: "string" },
          ingredients: { type: "array", items: { type: "string" } },
          pros: { type: "array", items: { type: "string" } },
          cons: { type: "array", items: { type: "string" } },
          warnings: { type: "array", items: { type: "string" } },
          alternatives: {
            type: "array",
            items: {
              type: "object",
              properties: {
                name: { type: "string" },
                brand: { type: "string" },
                reason: { type: "string" }
              }
            }
          }
        }
      }
    });

    const saved = await base44.entities.Product.create({
      name: product.name,
      brand: product.brand,
      category: product.category,
      ingredients: analysis.ingredients || [],
      analysis: {
        score: analysis.score,
        score_explanation: analysis.score_explanation,
        summary: analysis.summary,
        pros: analysis.pros,
        cons: analysis.cons,
        warnings: analysis.warnings,
        alternatives: analysis.alternatives
      }
    });

    setCreating(null);
    navigate(`/product/${saved.id}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="flex items-center gap-3 px-6 pt-8 pb-4">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="rounded-full">
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="font-heading text-2xl font-semibold">Search</h1>
      </div>

      <div className="px-6 mb-6">
        <form onSubmit={(e) => { e.preventDefault(); handleSearch(); }} className="flex gap-2">
          <Input
            placeholder="Search for a product or brand..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="rounded-full flex-1"
          />
          <Button type="submit" size="icon" className="rounded-full shrink-0" disabled={searching}>
            {searching ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
          </Button>
        </form>
      </div>

      <div className="px-6">
        <AnimatePresence>
          {results.map((product, i) => (
            <motion.button
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => selectProduct(product)}
              disabled={creating !== null}
              className="w-full flex items-center gap-4 p-4 rounded-2xl bg-card border border-border hover:shadow-sm transition-all text-left mb-3 disabled:opacity-60"
            >
              <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center shrink-0">
                <Sparkles className="w-5 h-5 text-muted-foreground" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm truncate">{product.name}</p>
                <p className="text-xs text-muted-foreground">{product.brand}</p>
                <p className="text-xs text-muted-foreground mt-1 line-clamp-1">{product.description}</p>
              </div>
              {creating === product.name ? (
                <Loader2 className="w-4 h-4 text-primary animate-spin shrink-0" />
              ) : (
                <ArrowRight className="w-4 h-4 text-muted-foreground shrink-0" />
              )}
            </motion.button>
          ))}
        </AnimatePresence>

        {!searching && results.length === 0 && query && (
          <div className="text-center py-12 text-muted-foreground">
            <Search className="w-10 h-10 mx-auto mb-3 opacity-30" />
            <p className="text-sm">No results yet. Try searching!</p>
          </div>
        )}
      </div>
    </div>
  );
}