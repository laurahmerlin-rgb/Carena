import React, { useState } from 'react';
import { X, Loader2, Sparkles, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from '@/components/ui/drawer';
import { motion } from 'framer-motion';
import { base44 } from '@/api/base44Client';

const STEPS = ['cleanser', 'toner', 'serum', 'moisturizer', 'sunscreen', 'mask', 'shampoo', 'conditioner', 'treatment', 'oil', 'other'];
const TIMES = ['morning', 'evening', 'both'];

function PickerDrawer({ open, onOpenChange, title, options, value, onSelect }) {
  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>{title}</DrawerTitle>
        </DrawerHeader>
        <div className="px-4 pb-6 space-y-1" style={{ paddingBottom: 'calc(1.5rem + env(safe-area-inset-bottom, 0px))' }}>
          {options.map(opt => (
            <button
              key={opt}
              onClick={() => { onSelect(opt); onOpenChange(false); }}
              className={`w-full text-left px-4 py-3.5 rounded-xl text-sm font-medium capitalize transition-colors ${
                value === opt
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted/50 text-foreground hover:bg-muted'
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      </DrawerContent>
    </Drawer>
  );
}

export default function AddProductForm({ onClose, onAdded }) {
  const [name, setName] = useState('');
  const [brand, setBrand] = useState('');
  const [step, setStep] = useState('');
  const [time, setTime] = useState('');
  const [saving, setSaving] = useState(false);
  const [stepOpen, setStepOpen] = useState(false);
  const [timeOpen, setTimeOpen] = useState(false);

  const canSubmit = name.trim() && step && time;

  const handleAdd = async () => {
    if (!canSubmit) return;
    setSaving(true);

    const user = await base44.auth.me();
    const profile = user.profile || {};

    const analysis = await base44.integrations.Core.InvokeLLM({
      prompt: `You are a skin/hair care expert. Give a PERSONALIZED analysis of this product for this user.

Product: ${name.trim()}${brand.trim() ? ` by ${brand.trim()}` : ''}
Step: ${step}

User Profile:
- Skin type: ${profile.skin_type || 'Unknown'}
- Hair type: ${profile.hair_type || 'Unknown'}
- Skin conditions: ${(profile.skin_conditions || []).join(', ') || 'None'}
- Goals: ${(profile.goals || []).join(', ') || 'None specified'}
- Climate: ${profile.climate || 'Unknown'}
- Sensitivities: ${(profile.sensitivities || []).join(', ') || 'None'}

Provide a score (1-10) for how well this matches this user, a brief score_explanation referencing their profile, a short summary, pros, cons, and warnings.`,
      add_context_from_internet: true,
      response_json_schema: {
        type: "object",
        properties: {
          score: { type: "number" },
          score_explanation: { type: "string" },
          summary: { type: "string" },
          pros: { type: "array", items: { type: "string" } },
          cons: { type: "array", items: { type: "string" } },
          warnings: { type: "array", items: { type: "string" } },
        }
      }
    });

    await base44.entities.Product.create({
      name: name.trim(),
      brand: brand.trim() || undefined,
      category: ['shampoo', 'conditioner'].includes(step) ? 'haircare' : 'skincare',
      in_routine: true,
      routine_step: step,
      routine_time: time,
      ingredients: [],
      analysis,
    });

    setSaving(false);
    onAdded();
    onClose();
  };

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
        className="mt-auto bg-background rounded-t-3xl border-t border-border p-6"
        style={{ paddingBottom: 'calc(2.5rem + env(safe-area-inset-bottom, 0px))' }}
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-heading text-xl font-semibold">Add a product</h2>
          <button onClick={onClose} className="w-11 h-11 rounded-full bg-muted flex items-center justify-center">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-xs uppercase tracking-widest text-muted-foreground font-medium mb-1.5 block">Product name *</label>
            <Input
              placeholder="e.g. CeraVe Moisturizing Cream"
              value={name}
              onChange={e => setName(e.target.value)}
              className="rounded-xl h-11"
            />
          </div>

          <div>
            <label className="text-xs uppercase tracking-widest text-muted-foreground font-medium mb-1.5 block">Brand (optional)</label>
            <Input
              placeholder="e.g. CeraVe"
              value={brand}
              onChange={e => setBrand(e.target.value)}
              className="rounded-xl h-11"
            />
          </div>

          <div>
            <label className="text-xs uppercase tracking-widest text-muted-foreground font-medium mb-1.5 block">Step *</label>
            <button
              onClick={() => setStepOpen(true)}
              className={`w-full h-11 flex items-center justify-between px-4 rounded-xl border text-sm font-medium capitalize transition-colors ${
                step ? 'border-primary/40 bg-primary/5 text-foreground' : 'border-input bg-background text-muted-foreground'
              }`}
            >
              {step || 'Select a step…'}
              <ChevronDown className="w-4 h-4 opacity-50" />
            </button>
          </div>

          <div>
            <label className="text-xs uppercase tracking-widest text-muted-foreground font-medium mb-1.5 block">When to use *</label>
            <button
              onClick={() => setTimeOpen(true)}
              className={`w-full h-11 flex items-center justify-between px-4 rounded-xl border text-sm font-medium capitalize transition-colors ${
                time ? 'border-primary/40 bg-primary/5 text-foreground' : 'border-input bg-background text-muted-foreground'
              }`}
            >
              {time || 'Select timing…'}
              <ChevronDown className="w-4 h-4 opacity-50" />
            </button>
          </div>
        </div>

        <Button
          className="w-full mt-6 rounded-full gap-2"
          disabled={!canSubmit || saving}
          onClick={handleAdd}
        >
          {saving ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Analyzing & adding...
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              Add & Analyze
            </>
          )}
        </Button>
      </motion.div>

      <PickerDrawer
        open={stepOpen}
        onOpenChange={setStepOpen}
        title="Select Step"
        options={STEPS}
        value={step}
        onSelect={setStep}
      />
      <PickerDrawer
        open={timeOpen}
        onOpenChange={setTimeOpen}
        title="When to Use"
        options={TIMES}
        value={time}
        onSelect={setTime}
      />
    </motion.div>
  );
}