import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Sparkles, Loader2, Plus, X, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import CompareProductPicker from '@/components/compare/CompareProductPicker';
import CompareColumn from '@/components/compare/CompareColumn';
import CompareAISummary from '@/components/compare/CompareAISummary';

export default function Compare() {
  const navigate = useNavigate();
  const [left, setLeft] = useState(null);
  const [right, setRight] = useState(null);
  const [pickingSide, setPickingSide] = useState(null); // 'left' | 'right'
  const [user, setUser] = useState(null);
  const [aiSummary, setAiSummary] = useState(null);
  const [loadingSummary, setLoadingSummary] = useState(false);

  useEffect(() => {
    base44.auth.me().then(setUser);
  }, []);

  const { data: products = [] } = useQuery({
    queryKey: ['all-products'],
    queryFn: () => base44.entities.Product.list('-created_date', 50),
  });

  const pick = (product) => {
    if (pickingSide === 'left') setLeft(product);
    else setRight(product);
    setPickingSide(null);
    setAiSummary(null);
  };

  const runComparison = async () => {
    if (!left || !right || !user) return;
    setLoadingSummary(true);
    const profile = user.profile || {};

    const result = await base44.integrations.Core.InvokeLLM({
      prompt: `You are a skin/hair care expert. Compare these two products for this specific user.

User Profile:
- Skin type: ${profile.skin_type || 'Unknown'}
- Hair type: ${profile.hair_type || 'Unknown'}
- Skin conditions: ${(profile.skin_conditions || []).join(', ') || 'None'}
- Goals: ${(profile.goals || []).join(', ') || 'None specified'}
- Climate: ${profile.climate || 'Unknown'}
- Sensitivities: ${(profile.sensitivities || []).join(', ') || 'None'}

Product A: ${left.name} by ${left.brand || 'Unknown'}
Ingredients A: ${(left.ingredients || []).join(', ') || 'Unknown'}
Score A: ${left.analysis?.score ?? 'N/A'}

Product B: ${right.name} by ${right.brand || 'Unknown'}
Ingredients B: ${(right.ingredients || []).join(', ') || 'Unknown'}
Score B: ${right.analysis?.score ?? 'N/A'}

Provide:
- winner: "A" or "B" or "tie" — which product is better suited for this user
- winner_reason: 2–3 sentences explaining why, referencing their profile specifically
- climate_suitability_a: how well Product A suits their climate (1 sentence)
- climate_suitability_b: how well Product B suits their climate (1 sentence)
- profile_suitability_a: score 1–10 for how well A fits their skin/hair profile
- profile_suitability_b: score 1–10 for how well B fits their skin/hair profile
- shared_ingredients: list of key ingredients both products share
- unique_a: standout ingredients only in Product A and why they matter for this user
- unique_b: standout ingredients only in Product B and why they matter for this user`,
      response_json_schema: {
        type: "object",
        properties: {
          winner: { type: "string" },
          winner_reason: { type: "string" },
          climate_suitability_a: { type: "string" },
          climate_suitability_b: { type: "string" },
          profile_suitability_a: { type: "number" },
          profile_suitability_b: { type: "number" },
          shared_ingredients: { type: "array", items: { type: "string" } },
          unique_a: { type: "array", items: { type: "string" } },
          unique_b: { type: "array", items: { type: "string" } },
        }
      }
    });

    setAiSummary(result);
    setLoadingSummary(false);
  };

  return (
    <div className="min-h-screen bg-background pb-10">
      <div className="flex items-center gap-3 px-6 pt-10 pb-4">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="rounded-full bg-muted/60">
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="font-heading text-2xl font-semibold tracking-tight">Compare Products</h1>
      </div>

      {/* Product selectors */}
      <div className="px-6 grid grid-cols-2 gap-3 mb-6">
        {[{ side: 'left', product: left }, { side: 'right', product: right }].map(({ side, product }) => (
          <div key={side} className="relative">
            {product ? (
              <div className="p-3 rounded-2xl bg-card border border-border text-center">
                <button
                  onClick={() => { if (side === 'left') setLeft(null); else setRight(null); setAiSummary(null); }}
                  className="absolute top-2 right-2 w-5 h-5 rounded-full bg-muted flex items-center justify-center"
                >
                  <X className="w-3 h-3 text-muted-foreground" />
                </button>
                {product.image_url ? (
                  <img src={product.image_url} alt="" className="w-12 h-12 rounded-xl object-cover mx-auto mb-2" />
                ) : (
                  <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center mx-auto mb-2">
                    <Sparkles className="w-5 h-5 text-muted-foreground" />
                  </div>
                )}
                <p className="text-xs font-semibold truncate">{product.name}</p>
                <p className="text-xs text-muted-foreground truncate">{product.brand}</p>
                {product.analysis?.score != null && (
                  <span className={`mt-1 inline-block text-xs font-bold px-2 py-0.5 rounded-full ${
                    product.analysis.score >= 7 ? 'bg-green-100 text-green-700' :
                    product.analysis.score >= 4 ? 'bg-yellow-100 text-yellow-700' :
                    'bg-red-100 text-red-700'
                  }`}>{product.analysis.score}/10</span>
                )}
              </div>
            ) : (
              <button
                onClick={() => setPickingSide(side)}
                className="w-full h-28 rounded-2xl border-2 border-dashed border-primary/30 bg-primary/5 flex flex-col items-center justify-center gap-2 hover:bg-primary/10 transition-colors"
              >
                <Plus className="w-5 h-5 text-primary" />
                <span className="text-xs text-primary font-medium">Pick product</span>
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Compare button */}
      {left && right && !aiSummary && (
        <div className="px-6 mb-6">
          <Button
            className="w-full rounded-full gap-2"
            onClick={runComparison}
            disabled={loadingSummary}
          >
            {loadingSummary ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
            {loadingSummary ? 'Comparing...' : 'Compare Now'}
          </Button>
        </div>
      )}

      {/* Results */}
      <AnimatePresence>
        {aiSummary && left && right && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="px-6 space-y-4"
          >
            <CompareAISummary summary={aiSummary} leftName={left.name} rightName={right.name} />

            <div className="grid grid-cols-2 gap-3">
              <CompareColumn
                product={left}
                label="A"
                suitability={aiSummary.profile_suitability_a}
                climateSuitability={aiSummary.climate_suitability_a}
                uniqueIngredients={aiSummary.unique_a}
                isWinner={aiSummary.winner === 'A'}
              />
              <CompareColumn
                product={right}
                label="B"
                suitability={aiSummary.profile_suitability_b}
                climateSuitability={aiSummary.climate_suitability_b}
                uniqueIngredients={aiSummary.unique_b}
                isWinner={aiSummary.winner === 'B'}
              />
            </div>

            {aiSummary.shared_ingredients?.length > 0 && (
              <div className="p-4 rounded-2xl bg-card border border-border">
                <p className="text-xs uppercase tracking-widest text-muted-foreground font-medium mb-2">Shared Ingredients</p>
                <div className="flex flex-wrap gap-1.5">
                  {aiSummary.shared_ingredients.map((ing, i) => (
                    <span key={i} className="text-xs px-2.5 py-1 rounded-full bg-muted text-muted-foreground border border-border">
                      {ing}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <Button variant="outline" className="w-full rounded-full" onClick={() => { setAiSummary(null); }}>
              Compare Again
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Product picker modal */}
      <AnimatePresence>
        {pickingSide && (
          <CompareProductPicker
            products={products}
            excluded={[left?.id, right?.id].filter(Boolean)}
            onPick={pick}
            onClose={() => setPickingSide(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}