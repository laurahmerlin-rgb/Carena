import React from 'react';
import { motion } from 'framer-motion';

export default function QuickAction({ icon: Icon, label, description, onClick, gradient }) {
  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      whileHover={{ y: -2 }}
      onClick={onClick}
      className={`relative overflow-hidden flex flex-col items-start p-5 rounded-2xl text-left transition-shadow hover:shadow-xl ${gradient}`}
    >
      {/* subtle gloss overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent pointer-events-none rounded-2xl" />
      <div className="w-11 h-11 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-5 shadow-sm">
        <Icon className="w-5 h-5 text-white" />
      </div>
      <h3 className="font-heading text-lg font-bold text-white leading-tight mb-1">{label}</h3>
      <p className="text-xs text-white/65 leading-relaxed">{description}</p>
    </motion.button>
  );
}