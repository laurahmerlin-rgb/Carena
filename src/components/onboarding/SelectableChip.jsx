import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

export default function SelectableChip({ label, icon, selected, onClick, description }) {
  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className={`relative flex items-start gap-3 w-full text-left p-4 rounded-2xl border-2 transition-all duration-200 ${
        selected
          ? 'border-primary bg-primary/5 shadow-sm'
          : 'border-border bg-card hover:border-primary/30'
      }`}
    >
      {icon && <span className="text-xl mt-0.5">{icon}</span>}
      <div className="flex-1">
        <p className="font-medium text-sm">{label}</p>
        {description && <p className="text-xs text-muted-foreground mt-0.5">{description}</p>}
      </div>
      {selected && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="w-5 h-5 rounded-full bg-primary flex items-center justify-center mt-0.5"
        >
          <Check className="w-3 h-3 text-primary-foreground" />
        </motion.div>
      )}
    </motion.button>
  );
}