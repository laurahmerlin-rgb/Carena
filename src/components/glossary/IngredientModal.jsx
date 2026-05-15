import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, ShieldCheck, FlaskConical, Globe } from 'lucide-react';
import { CATEGORY_COLORS } from '@/data/ingredientGlossary';

export default function IngredientModal({ ingredient: ing, onClose }) {
  if (!ing) return null;

  return (
    <AnimatePresence>
      <motion.div
        key="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4"
        onClick={onClose}
      >
        <motion.div
          key="sheet"
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '100%', opacity: 0 }}
          transition={{ type: 'spring', damping: 30, stiffness: 300 }}
          onClick={e => e.stopPropagation()}
          className="bg-card w-full sm:max-w-lg rounded-t-3xl sm:rounded-2xl max-h-[88vh] overflow-y-auto shadow-2xl"
        >
          {/* Drag handle */}
          <div className="flex justify-center pt-3 pb-1 sm:hidden">
            <div className="w-10 h-1 rounded-full bg-border" />
          </div>

          {/* Header */}
          <div className="flex items-start justify-between px-5 pt-4 pb-3 border-b border-border">
            <div className="flex items-center gap-3">
              <span className="text-3xl">{ing.icon}</span>
              <div>
                <h2 className="font-heading text-lg font-semibold leading-tight">{ing.name}</h2>
                <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${CATEGORY_COLORS[ing.category] || 'bg-muted text-muted-foreground border-border'}`}>
                  {ing.category}
                </span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-muted transition-colors text-muted-foreground"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Body */}
          <div className="px-5 py-4 space-y-4">
            {/* Badges */}
            <div className="flex gap-2 flex-wrap">
              {ing.delphi_consensus && (
                <span className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 font-medium">
                  <ShieldCheck className="w-3 h-3" /> Delphi Consensus
                </span>
              )}
              {ing.fda_note && (
                <span className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200 font-medium">
                  <FlaskConical className="w-3 h-3" /> FDA Noted
                </span>
              )}
              {ing.cosing_note && (
                <span className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200 font-medium">
                  <Globe className="w-3 h-3" /> EU CosIng
                </span>
              )}
            </div>

            {/* Benefit */}
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1.5">How it works</h3>
              <p className="text-sm text-foreground leading-relaxed">{ing.benefit}</p>
            </div>

            {/* FDA Note */}
            {ing.fda_note && (
              <div className="rounded-xl bg-blue-50 border border-blue-100 px-4 py-3">
                <p className="text-xs font-semibold text-blue-700 mb-1 flex items-center gap-1.5">
                  <FlaskConical className="w-3.5 h-3.5" /> FDA Guidance
                </p>
                <p className="text-xs text-blue-700 leading-relaxed">{ing.fda_note}</p>
              </div>
            )}

            {/* EU CosIng Note */}
            {ing.cosing_note && (
              <div className="rounded-xl bg-indigo-50 border border-indigo-100 px-4 py-3">
                <p className="text-xs font-semibold text-indigo-700 mb-1 flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5" /> EU CosIng Regulation
                </p>
                <p className="text-xs text-indigo-700 leading-relaxed">{ing.cosing_note.replace(/^EU CosIng:\s*/, '')}</p>
              </div>
            )}

            {/* Also known as */}
            {ing.aliases.length > 0 && (
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1">Also known as</h3>
                <p className="text-xs text-muted-foreground">{ing.aliases.join(', ')}</p>
              </div>
            )}

            {/* PubMed refs */}
            {ing.pubmed_refs?.length > 0 && (
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1.5">Clinical References</h3>
                <div className="space-y-1.5">
                  {ing.pubmed_refs.map((ref, idx) => (
                    <a
                      key={idx}
                      href={ref.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-start gap-1.5 text-xs text-primary hover:underline underline-offset-2"
                    >
                      <ExternalLink className="w-3 h-3 shrink-0 mt-0.5" />
                      {ref.title}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Bottom padding for mobile safe area */}
          <div className="h-4 sm:h-2" />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}