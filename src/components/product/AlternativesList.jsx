import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function AlternativesList({ alternatives }) {
  if (!alternatives?.length) return null;

  return (
    <div>
      <p className="text-xs uppercase tracking-widest text-muted-foreground font-medium mb-3">Better Alternatives</p>
      <div className="space-y-2">
        {alternatives.map((alt, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="p-4 rounded-2xl bg-card border border-border"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="font-medium text-sm">{alt.name}</p>
                <p className="text-xs text-muted-foreground">{alt.brand}</p>
              </div>
              <ArrowRight className="w-4 h-4 text-muted-foreground mt-1 shrink-0" />
            </div>
            <p className="text-xs text-muted-foreground mt-2">{alt.reason}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}