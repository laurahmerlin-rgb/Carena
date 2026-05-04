import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { base44 } from '@/api/base44Client';
import OnboardingStep from '@/components/onboarding/OnboardingStep';
import SelectableChip from '@/components/onboarding/SelectableChip';
import { Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const SKIN_TYPES = [
  { label: 'Oily', icon: '💧', description: 'Shiny, enlarged pores' },
  { label: 'Dry', icon: '🏜️', description: 'Tight, flaky, rough' },
  { label: 'Combination', icon: '⚖️', description: 'Oily T-zone, dry cheeks' },
  { label: 'Normal', icon: '✨', description: 'Balanced, few imperfections' },
  { label: 'Sensitive', icon: '🌸', description: 'Easily irritated, redness' },
];

const HAIR_TYPES = [
  { label: 'Straight', icon: '📏', description: 'Fine to coarse, no curl' },
  { label: 'Wavy', icon: '🌊', description: 'S-shaped, loose waves' },
  { label: 'Curly', icon: '🌀', description: 'Defined ringlets' },
  { label: 'Coily', icon: '💫', description: 'Tight coils or zigzag' },
];

const GOALS = [
  { label: 'Anti-aging', icon: '⏳', description: 'Reduce wrinkles, fine lines' },
  { label: 'Hydration', icon: '💦', description: 'Deep moisture & plumping' },
  { label: 'Acne control', icon: '🎯', description: 'Clear breakouts & blemishes' },
  { label: 'Brightening', icon: '☀️', description: 'Even tone, reduce dark spots' },
  { label: 'Hair growth', icon: '🌱', description: 'Thicker, fuller hair' },
  { label: 'Damage repair', icon: '🔧', description: 'Restore dry or damaged hair' },
  { label: 'Scalp health', icon: '🧴', description: 'Balanced, healthy scalp' },
  { label: 'Frizz control', icon: '✂️', description: 'Smooth & manageable hair' },
];

const SKIN_CONDITIONS = [
  { label: 'Acne / Breakouts', icon: '🔴', description: 'Pimples, whiteheads, blackheads' },
  { label: 'Rosacea', icon: '🌹', description: 'Redness, visible blood vessels' },
  { label: 'Eczema', icon: '🩹', description: 'Itchy, inflamed, flaky patches' },
  { label: 'Psoriasis', icon: '🔶', description: 'Thick, scaly, itchy skin patches' },
  { label: 'Hyperpigmentation', icon: '🟤', description: 'Dark spots, uneven skin tone' },
  { label: 'Melasma', icon: '🫙', description: 'Brown or gray-brown patches' },
  { label: 'Perioral dermatitis', icon: '💋', description: 'Rash around the mouth area' },
  { label: 'Contact dermatitis', icon: '🤧', description: 'Allergic skin reactions' },
  { label: 'Keratosis pilaris', icon: '🫧', description: 'Rough bumps on arms or cheeks' },
  { label: 'Seborrheic dermatitis', icon: '🧫', description: 'Flaky scalp & oily patches' },
  { label: 'None', icon: '✅', description: 'No specific skin conditions' },
];

const CLIMATES = [
  { label: 'Hot & Humid', icon: '🌴', description: 'Tropical, muggy, sweaty summers' },
  { label: 'Hot & Dry', icon: '🏜️', description: 'Desert-like, low humidity, intense sun' },
  { label: 'Cold & Dry', icon: '❄️', description: 'Harsh winters, heated indoors, low moisture' },
  { label: 'Cold & Humid', icon: '🌧️', description: 'Rainy, overcast, damp' },
  { label: 'Mild & Temperate', icon: '🌤️', description: 'Moderate seasons, balanced humidity' },
  { label: 'Variable / 4 Seasons', icon: '🍂', description: 'Distinct seasonal changes throughout the year' },
];

const SENSITIVITIES = [
  { label: 'Fragrance', icon: '🌺' },
  { label: 'Sulfates', icon: '🧪' },
  { label: 'Parabens', icon: '⚠️' },
  { label: 'Alcohol', icon: '🍷' },
  { label: 'Silicones', icon: '🔬' },
  { label: 'Essential oils', icon: '🫒' },
  { label: 'Retinol', icon: '💊' },
  { label: 'None', icon: '✅' },
];

export default function Onboarding() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [profile, setProfile] = useState({
    skin_type: '',
    hair_type: '',
    goals: [],
    skin_conditions: [],
    climate: '',
    sensitivities: [],
  });

  const toggleGoal = (goal) => {
    setProfile(prev => ({
      ...prev,
      goals: prev.goals.includes(goal)
        ? prev.goals.filter(g => g !== goal)
        : [...prev.goals, goal]
    }));
  };

  const toggleCondition = (c) => {
    if (c === 'None') {
      setProfile(prev => ({ ...prev, skin_conditions: ['None'] }));
      return;
    }
    setProfile(prev => ({
      ...prev,
      skin_conditions: prev.skin_conditions.includes(c)
        ? prev.skin_conditions.filter(x => x !== c)
        : [...prev.skin_conditions.filter(x => x !== 'None'), c]
    }));
  };

  const toggleSensitivity = (s) => {
    if (s === 'None') {
      setProfile(prev => ({ ...prev, sensitivities: ['None'] }));
      return;
    }
    setProfile(prev => ({
      ...prev,
      sensitivities: prev.sensitivities.includes(s)
        ? prev.sensitivities.filter(x => x !== s)
        : [...prev.sensitivities.filter(x => x !== 'None'), s]
    }));
  };

  const handleSave = async () => {
    await base44.auth.updateMe({ profile });
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-background">
      <AnimatePresence mode="wait">
        {step === 0 && (
          <OnboardingStep
            key="types"
            title="Your skin & hair"
            subtitle="Tell us about your skin and hair type so we can personalize your experience."
            step={0}
            totalSteps={5}
            onNext={() => setStep(1)}
          >
            <div className="space-y-6">
              <div>
                <p className="text-xs uppercase tracking-widest text-muted-foreground font-medium mb-3">Skin Type</p>
                <div className="grid grid-cols-1 gap-2">
                  {SKIN_TYPES.map(t => (
                    <SelectableChip
                      key={t.label}
                      {...t}
                      selected={profile.skin_type === t.label}
                      onClick={() => setProfile(p => ({ ...p, skin_type: t.label }))}
                    />
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-muted-foreground font-medium mb-3">Hair Type</p>
                <div className="grid grid-cols-1 gap-2">
                  {HAIR_TYPES.map(t => (
                    <SelectableChip
                      key={t.label}
                      {...t}
                      selected={profile.hair_type === t.label}
                      onClick={() => setProfile(p => ({ ...p, hair_type: t.label }))}
                    />
                  ))}
                </div>
              </div>
            </div>
          </OnboardingStep>
        )}

        {step === 1 && (
          <OnboardingStep
            key="goals"
            title="Your goals"
            subtitle="Select all the goals you'd like to work towards. We'll tailor recommendations for you."
            step={1}
            totalSteps={5}
            onNext={() => setStep(2)}
            onBack={() => setStep(0)}
          >
            <div className="grid grid-cols-1 gap-2">
              {GOALS.map(g => (
                <SelectableChip
                  key={g.label}
                  {...g}
                  selected={profile.goals.includes(g.label)}
                  onClick={() => toggleGoal(g.label)}
                />
              ))}
            </div>
          </OnboardingStep>
        )}

        {step === 2 && (
          <OnboardingStep
            key="conditions"
            title="Skin conditions"
            subtitle="Do you have any skin conditions? We'll factor these into every product analysis."
            step={2}
            totalSteps={5}
            onNext={() => setStep(3)}
            onBack={() => setStep(1)}
          >
            <div className="grid grid-cols-1 gap-2">
              {SKIN_CONDITIONS.map(c => (
                <SelectableChip
                  key={c.label}
                  {...c}
                  selected={profile.skin_conditions.includes(c.label)}
                  onClick={() => toggleCondition(c.label)}
                />
              ))}
            </div>
          </OnboardingStep>
        )}

        {step === 3 && (
          <OnboardingStep
            key="climate"
            title="Your climate"
            subtitle="Where you live affects your skin and hair. Tell us your typical weather so we can tailor recommendations."
            step={3}
            totalSteps={5}
            onNext={() => setStep(4)}
            onBack={() => setStep(2)}
          >
            <div className="grid grid-cols-1 gap-2">
              {CLIMATES.map(c => (
                <SelectableChip
                  key={c.label}
                  {...c}
                  selected={profile.climate === c.label}
                  onClick={() => setProfile(p => ({ ...p, climate: c.label }))}
                />
              ))}
            </div>
          </OnboardingStep>
        )}

        {step === 4 && (
          <OnboardingStep
            key="sensitivities"
            title="Sensitivities"
            subtitle="Are there any ingredients you want to avoid? We'll flag them for you."
            step={4}
            totalSteps={5}
            onNext={handleSave}
            onBack={() => setStep(3)}
            nextLabel="Get Started"
          >
            <div className="grid grid-cols-1 gap-2">
              {SENSITIVITIES.map(s => (
                <SelectableChip
                  key={s.label}
                  {...s}
                  selected={profile.sensitivities.includes(s.label)}
                  onClick={() => toggleSensitivity(s.label)}
                />
              ))}
            </div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-6 p-4 rounded-2xl bg-accent/50 border border-accent flex items-center gap-3"
            >
              <Sparkles className="w-5 h-5 text-primary shrink-0" />
              <p className="text-xs text-accent-foreground">Your profile helps us analyze products and give you personalized ingredient insights.</p>
            </motion.div>
          </OnboardingStep>
        )}
      </AnimatePresence>
    </div>
  );
}