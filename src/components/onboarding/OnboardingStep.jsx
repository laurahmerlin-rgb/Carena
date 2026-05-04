import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ChevronRight, ChevronLeft } from 'lucide-react';

export default function OnboardingStep({ title, subtitle, children, onNext, onBack, step, totalSteps, nextLabel = "Continue" }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      className="min-h-screen flex flex-col px-6 py-8 max-w-lg mx-auto"
    >
      {/* Progress */}
      <div className="flex gap-2 mb-8">
        {Array.from({ length: totalSteps }).map((_, i) => (
          <div
            key={i}
            className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
              i <= step ? 'bg-primary' : 'bg-border'
            }`}
          />
        ))}
      </div>

      {/* Header */}
      <div className="mb-8">
        <h1 className="font-heading text-3xl font-semibold tracking-tight mb-2">{title}</h1>
        <p className="text-muted-foreground text-base">{subtitle}</p>
      </div>

      {/* Content */}
      <div className="flex-1">
        {children}
      </div>

      {/* Actions */}
      <div className="flex gap-3 pt-6">
        {onBack && (
          <Button variant="outline" size="lg" onClick={onBack} className="rounded-full px-6">
            <ChevronLeft className="w-4 h-4 mr-1" />
            Back
          </Button>
        )}
        <Button size="lg" onClick={onNext} className="rounded-full flex-1">
          {nextLabel}
          <ChevronRight className="w-4 h-4 ml-1" />
        </Button>
      </div>
    </motion.div>
  );
}