import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, ExternalLink, ShieldCheck, FlaskConical, Globe, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { INGREDIENT_GLOSSARY, CATEGORY_COLORS } from '@/data/ingredientGlossary';
import IngredientModal from '@/components/glossary/IngredientModal';
import PullToRefresh from '@/components/layout/PullToRefresh';

const ALL_CATEGORIES = ['All', ...Array.from(new Set(INGREDIENT_GLOSSARY.map(i => i.category)))];

export default function Glossary() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [selected, setSelected] = useState(null);

  const filtered = INGREDIENT_GLOSSARY.filter(ing => {
    const matchesSearch = !query || ing.name.toLowerCase().includes(query.toLowerCase()) ||
      ing.benefit.toLowerCase().includes(query.toLowerCase()) ||
      ing.aliases.some(a => a.toLowerCase().includes(query.toLowerCase()));
    const matchesCategory = activeCategory === 'All' || ing.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <PullToRefresh onRefresh={async () => {}}>
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="px-6 pb-4" style={{ paddingTop: 'calc(2rem + env(safe-area-inset-top, 0px))' }}>
        <h1 className="font-heading text-2xl font-semibold">Ingredient Glossary</h1>
        <p className="text-xs text-muted-foreground">{INGREDIENT_GLOSSARY.length} ingredients explained</p>
      </div>

      {/* Search */}
      <div className="px-6 mb-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search ingredients..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-9 rounded-full"
          />
        </div>
      </div>

      {/* Category filter */}
      <div className="px-6 mb-6 flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
        {ALL_CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            aria-label={`Filter by ${cat}`}
            aria-pressed={activeCategory === cat}
            className={`shrink-0 text-xs px-3 py-1.5 rounded-full border font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
              activeCategory === cat
                ? 'bg-primary text-primary-foreground border-primary'
                : 'bg-card border-border text-muted-foreground hover:border-primary/40'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Modal */}
      <IngredientModal ingredient={selected} onClose={() => setSelected(null)} />

      {/* List */}
      <div className="px-6 space-y-3">
        <AnimatePresence>
          {filtered.map((ing, i) => (
            <motion.div
              key={ing.name}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: i * 0.03 }}
              onClick={() => setSelected(ing)}
              className="p-4 rounded-2xl bg-card border border-border cursor-pointer hover:border-primary/40 hover:shadow-sm active:scale-[0.99] transition-all"
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl mt-0.5">{ing.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <p className="font-medium text-sm">{ing.name}</p>
                    <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${CATEGORY_COLORS[ing.category] || 'bg-muted text-muted-foreground border-border'}`}>
                      {ing.category}
                    </span>
                  </div>
                  <div className="flex gap-1.5 flex-wrap mb-1.5">
                    {ing.delphi_consensus && (
                      <span className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20 font-medium">
                        <ShieldCheck className="w-3 h-3" /> Delphi Consensus
                      </span>
                    )}
                    {ing.fda_note && (
                      <span className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-900 font-medium">
                        <FlaskConical className="w-3 h-3" /> FDA Noted
                      </span>
                    )}
                    {ing.cosing_note && (
                      <span className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-900 font-medium">
                        <Globe className="w-3 h-3" /> EU CosIng
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">{ing.benefit}</p>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground/40 mt-1 shrink-0" />
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {filtered.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            <p className="text-sm">No ingredients found for "{query}"</p>
          </div>
        )}
      </div>

      {/* Sources footer */}
      <div className="px-6 mt-8 pt-6 border-t border-border">
        <p className="text-xs text-muted-foreground font-medium mb-2">Data Sources</p>
        <div className="space-y-1.5">
          {[
            { label: "Delphi Consensus Study — JAAD 2025", url: "https://pubmed.ncbi.nlm.nih.gov/40233838/" },
            { label: "FDA Cosmetic Ingredients", url: "https://www.fda.gov/cosmetics/cosmetic-products-ingredients" },
            { label: "NCBI PubMed (NIH)", url: "https://www.ncbi.nlm.nih.gov" },
            { label: "EU CosIng Database — European Commission", url: "https://ec.europa.eu/growth/tools-databases/cosing/" },
            { label: "FDA Makeup Safety — Cosmetic Products", url: "https://www.fda.gov/cosmetics/cosmetic-products/makeup" },
          ].map(src => (
            <a
              key={src.url}
              href={src.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors"
            >
              <ExternalLink className="w-3 h-3 shrink-0" />
              {src.label}
            </a>
          ))}
        </div>
      </div>
    </div>
    </PullToRefresh>
  );
}