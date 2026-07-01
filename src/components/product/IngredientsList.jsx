import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Info } from 'lucide-react';
import { matchIngredients, CATEGORY_COLORS } from '@/data/ingredientGlossary';

export default function IngredientsList({ ingredients }) {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(null);

  if (!ingredients?.length) return null;

  const matchMap = matchIngredients(ingredients);

  return (
    <div className="mt-6">
      <div className="flex items-center justify-between mb-3">
        <p className="text-xs uppercase tracking-widest text-muted-foreground font-medium">Ingredients</p>
        <button
          onClick={() => navigate('/glossary')}
          className="text-xs text-primary flex items-center gap-1 hover:underline"
        >
          <Info className="w-3 h-3" />
          Glossary
        </button>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {ingredients.map((ing, i) => {
          const match = matchMap[ing];
          const isExpanded = expanded === ing;

          return (
            <div key={i} className="inline-block">
              <button
                onClick={() => match && setExpanded(isExpanded ? null : ing)}
                aria-label={match ? `View details for ${ing}` : ing}
                className={`text-xs px-2.5 py-1 rounded-full border transition-all ${
                  match
                    ? `${CATEGORY_COLORS[match.category] || 'bg-accent text-accent-foreground border-border'} cursor-pointer hover:opacity-80`
                    : 'bg-muted text-muted-foreground border-transparent cursor-default'
                }`}
              >
                {match && <span className="mr-1">{match.icon}</span>}
                {ing}
              </button>

              <AnimatePresence>
                {isExpanded && match && (
                  <motion.div
                    initial={{ opacity: 0, y: -4, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -4, scale: 0.97 }}
                    className="mt-2 mb-1 p-3 rounded-xl bg-card border border-border shadow-sm text-xs max-w-xs"
                  >
                    <p className="font-semibold mb-0.5">{match.name}</p>
                    <p className="text-muted-foreground leading-relaxed">{match.benefit}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {Object.keys(matchMap).length > 0 && (
        <p className="text-xs text-muted-foreground mt-3">
          💡 Tap highlighted ingredients to learn more
        </p>
      )}
    </div>
  );
}