import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Loader2, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { base44 } from '@/api/base44Client';

const STEPS = ['cleanser', 'toner', 'serum', 'moisturizer', 'sunscreen', 'mask', 'shampoo', 'conditioner', 'treatment', 'oil', 'other'];
const TIMES = ['morning', 'evening', 'both'];

export default function AddProductForm({ onClose, onAdded }) {
  const [name, setName] = useState('');
  const [brand, setBrand] = useState('');
  const [step, setStep] = useState('');
  const [time, setTime] = useState('');
  const [saving, setSaving] = useState(false);

  const canSubmit = name.trim() && step && time;

  const handleAdd = async () => {
    if (!canSubmit) return;
    setSaving(true);

    const user = await base44.auth.me();
    const profile = user.profile || {};

    // Get AI analysis for the typed product
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
        className="mt-auto bg-background rounded-t-3xl border-t border-border p-6 pb-10"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-heading text-xl font-semibold">Add a product</h2>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
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
              className="rounded-xl"
            />
          </div>

          <div>
            <label className="text-xs uppercase tracking-widest text-muted-foreground font-medium mb-1.5 block">Brand (optional)</label>
            <Input
              placeholder="e.g. CeraVe"
              value={brand}
              onChange={e => setBrand(e.target.value)}
              className="rounded-xl"
            />
          </div>

          <div>
            <label className="text-xs uppercase tracking-widest text-muted-foreground font-medium mb-2 block">Step *</label>
            <div className="flex flex-wrap gap-2">
              {STEPS.map(s => (
                <button
                  key={s}
                  onClick={() => setStep(s)}
                  className={`text-xs px-3 py-1.5 rounded-full border font-medium capitalize transition-all ${
                    step === s ? 'bg-primary text-primary-foreground border-primary' : 'bg-card border-border text-muted-foreground hover:border-primary/40'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs uppercase tracking-widest text-muted-foreground font-medium mb-2 block">When to use *</label>
            <div className="flex gap-2">
              {TIMES.map(t => (
                <button
                  key={t}
                  onClick={() => setTime(t)}
                  className={`text-xs px-4 py-1.5 rounded-full border font-medium capitalize transition-all ${
                    time === t ? 'bg-primary text-primary-foreground border-primary' : 'bg-card border-border text-muted-foreground hover:border-primary/40'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        </div>

        <Button
          className="w-full mt-6 rounded-full gap-2 h-11"
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
    </motion.div>
  );
}