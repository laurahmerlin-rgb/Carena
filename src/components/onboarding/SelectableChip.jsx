import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

export default function SelectableChip({ label, icon, selected, onClick, description }) {
  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`relative flex items-center gap-3.5 w-full text-left px-4 py-3.5 rounded-xl border transition-all duration-200 ${
        selected
          ? 'border-primary bg-primary/8 shadow-sm ring-1 ring-primary/20'
          : 'border-border bg-card hover:border-primary/40 hover:bg-primary/3'
      }`}
    >
      {icon && <span className="text-lg shrink-0">{icon}</span>}
      <div className="flex-1">
        <p className={`font-medium text-sm ${selected ? 'text-primary' : ''}`}>{label}</p>
        {description && <p className="text-xs text-muted-foreground mt-0.5">{description}</p>}
      </div>
      <motion.div
        animate={{ scale: selected ? 1 : 0, opacity: selected ? 1 : 0 }}
        initial={{ scale: 0, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 400, damping: 20 }}
        className="w-5 h-5 rounded-full bg-primary flex items-center justify-center shrink-0"
      >
        <Check className="w-3 h-3 text-primary-foreground" />
      </motion.div>
    </motion.button>
  );
}