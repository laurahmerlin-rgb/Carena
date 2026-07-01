import React from 'react';
import { ThumbsUp, ThumbsDown, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function InsightsList({ pros, cons, warnings }) {
  return (
    <div className="space-y-4">
      {warnings?.length > 0 && (
        <div>
          <p className="text-xs uppercase tracking-widest text-destructive font-medium mb-2 flex items-center gap-1.5">
            <AlertTriangle className="w-3.5 h-3.5" /> Warnings
          </p>
          <div className="space-y-2">
            {warnings.map((w, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="p-3 rounded-xl bg-destructive/5 border border-destructive/20 text-sm text-destructive"
              >
                {w}
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {pros?.length > 0 && (
        <div>
          <p className="text-xs uppercase tracking-widest text-green-600 font-medium mb-2 flex items-center gap-1.5">
            <ThumbsUp className="w-3.5 h-3.5" /> Pros
          </p>
          <div className="space-y-2">
            {pros.map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="p-3 rounded-xl bg-green-50 dark:bg-green-950 border border-green-100 dark:border-green-900 text-sm text-green-800 dark:text-green-200"
              >
                {p}
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {cons?.length > 0 && (
        <div>
          <p className="text-xs uppercase tracking-widest text-yellow-600 font-medium mb-2 flex items-center gap-1.5">
            <ThumbsDown className="w-3.5 h-3.5" /> Cons
          </p>
          <div className="space-y-2">
            {cons.map((c, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="p-3 rounded-xl bg-yellow-50 dark:bg-yellow-950 border border-yellow-100 dark:border-yellow-900 text-sm text-yellow-800 dark:text-yellow-200"
              >
                {c}
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}