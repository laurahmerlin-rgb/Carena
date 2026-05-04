import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { INGREDIENT_GLOSSARY, CATEGORY_COLORS } from '@/data/ingredientGlossary';

const ALL_CATEGORIES = ['All', ...Array.from(new Set(INGREDIENT_GLOSSARY.map(i => i.category)))];

export default function Glossary() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = INGREDIENT_GLOSSARY.filter(ing => {
    const matchesSearch = !query || ing.name.toLowerCase().includes(query.toLowerCase()) ||
      ing.benefit.toLowerCase().includes(query.toLowerCase()) ||
      ing.aliases.some(a => a.toLowerCase().includes(query.toLowerCase()));
    const matchesCategory = activeCategory === 'All' || ing.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background pb-10">
      {/* Header */}
      <div className="flex items-center gap-3 px-6 pt-8 pb-4">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="rounded-full">
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div>
          <h1 className="font-heading text-2xl font-semibold">Ingredient Glossary</h1>
          <p className="text-xs text-muted-foreground">{INGREDIENT_GLOSSARY.length} ingredients explained</p>
        </div>
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
            className={`shrink-0 text-xs px-3 py-1.5 rounded-full border font-medium transition-all ${
              activeCategory === cat
                ? 'bg-primary text-primary-foreground border-primary'
                : 'bg-card border-border text-muted-foreground hover:border-primary/40'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

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
              className="p-4 rounded-2xl bg-card border border-border"
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
                  <p className="text-sm text-muted-foreground leading-relaxed">{ing.benefit}</p>
                  {ing.aliases.length > 0 && (
                    <p className="text-xs text-muted-foreground/60 mt-1.5">
                      Also known as: {ing.aliases.join(', ')}
                    </p>
                  )}
                </div>
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
    </div>
  );
}