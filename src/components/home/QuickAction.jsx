import React from 'react';
import { motion } from 'framer-motion';

export default function QuickAction({ icon: Icon, label, description, onClick, gradient }) {
  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      whileHover={{ y: -2 }}
      onClick={onClick}
      className={`relative overflow-hidden flex flex-col items-start p-6 rounded-3xl text-left transition-shadow hover:shadow-lg ${gradient}`}
    >
      <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-4">
        <Icon className="w-6 h-6 text-white" />
      </div>
      <h3 className="font-heading text-lg font-semibold text-white mb-1">{label}</h3>
      <p className="text-sm text-white/70">{description}</p>
    </motion.button>
  );
}