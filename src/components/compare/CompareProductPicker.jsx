import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Search, Sparkles } from 'lucide-react';
import { Input } from '@/components/ui/input';

export default function CompareProductPicker({ products, excluded, onPick, onClose }) {
  const [query, setQuery] = useState('');

  const filtered = products.filter(p =>
    !excluded.includes(p.id) &&
    (!query || p.name.toLowerCase().includes(query.toLowerCase()) || (p.brand || '').toLowerCase().includes(query.toLowerCase()))
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex flex-col"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="mt-auto bg-background rounded-t-3xl border-t border-border max-h-[70vh] flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 pt-5 pb-3">
          <p className="font-heading text-lg font-semibold">Select a Product</p>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="px-6 pb-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              value={query}
              onChange={e => setQuery(e.target.value)}
              className="pl-9 rounded-full"
            />
          </div>
        </div>

        <div className="overflow-y-auto px-6 pb-8 space-y-2">
          {filtered.length === 0 && (
            <p className="text-sm text-muted-foreground text-center py-8">No products found. Scan or search some products first.</p>
          )}
          {filtered.map(product => (
            <button
              key={product.id}
              onClick={() => onPick(product)}
              className="w-full flex items-center gap-3 p-3 rounded-2xl bg-card border border-border hover:shadow-sm transition-all text-left"
            >
              {product.image_url ? (
                <img src={product.image_url} alt="" className="w-12 h-12 rounded-xl object-cover shrink-0" />
              ) : (
                <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center shrink-0">
                  <Sparkles className="w-4 h-4 text-muted-foreground" />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm truncate">{product.name}</p>
                <p className="text-xs text-muted-foreground truncate">{product.brand}</p>
              </div>
              {product.analysis?.score != null && (
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full shrink-0 ${
                  product.analysis.score >= 7 ? 'bg-green-100 text-green-700' :
                  product.analysis.score >= 4 ? 'bg-yellow-100 text-yellow-700' :
                  'bg-red-100 text-red-700'
                }`}>{product.analysis.score}</span>
              )}
            </button>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}