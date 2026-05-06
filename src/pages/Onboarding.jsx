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

const FOCUS_OPTIONS = [
  { label: 'Skin', icon: '🌿', description: 'Skincare, serums, moisturizers & more' },
  { label: 'Hair', icon: '✨', description: 'Shampoos, treatments, scalp care & more' },
  { label: 'Both', icon: '💚', description: 'Full head-to-toe routine coverage' },
];

export default function Onboarding() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [focus, setFocus] = useState(''); // 'Skin' | 'Hair' | 'Both'
  const [profile, setProfile] = useState({
    skin_type: '',
    hair_type: '',
    goals: [],
    skin_conditions: [],
    climate: '',
    sensitivities: [],
  });

  const showSkin = focus === 'Skin' || focus === 'Both';
  const showHair = focus === 'Hair' || focus === 'Both';

  // Total steps: focus(0) + types(1) + goals(2) + conditions if skin(3) + climate(4) + sensitivities(5)
  const totalSteps = showSkin ? 6 : 5;

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
    await base44.auth.updateMe({ profile: { ...profile, focus } });
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-background">
      <AnimatePresence mode="wait">

        {/* Step 0: Focus selector */}
        {step === 0 && (
          <motion.div
            key="focus"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            className="min-h-screen flex flex-col px-6 pt-16 pb-10 max-w-lg mx-auto"
          >
            <div className="mb-10">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                <Sparkles className="w-7 h-7 text-primary" />
              </div>
              <h1 className="font-heading text-4xl font-semibold tracking-tight leading-tight mb-3">
                What do you need help with?
              </h1>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Choose your focus area so we can tailor your experience from the start.
              </p>
            </div>

            <div className="space-y-3 flex-1">
              {FOCUS_OPTIONS.map(opt => (
                <motion.button
                  key={opt.label}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setFocus(opt.label)}
                  className={`w-full flex items-center gap-4 p-5 rounded-2xl border-2 text-left transition-all duration-200 ${
                    focus === opt.label
                      ? 'border-primary bg-primary/8 ring-1 ring-primary/20'
                      : 'border-border bg-card hover:border-primary/40'
                  }`}
                >
                  <span className="text-3xl">{opt.icon}</span>
                  <div>
                    <p className={`font-semibold text-base ${focus === opt.label ? 'text-primary' : ''}`}>{opt.label}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{opt.description}</p>
                  </div>
                  {focus === opt.label && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="ml-auto w-6 h-6 rounded-full bg-primary flex items-center justify-center shrink-0"
                    >
                      <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </motion.div>
                  )}
                </motion.button>
              ))}
            </div>

            <button
              disabled={!focus}
              onClick={() => setStep(1)}
              className="mt-8 w-full h-12 rounded-full bg-primary text-primary-foreground font-semibold text-sm disabled:opacity-40 disabled:cursor-not-allowed transition-opacity shadow-md"
            >
              Continue
            </button>
          </motion.div>
        )}

        {/* Step 1: Types */}
        {step === 1 && (
          <OnboardingStep
            key="types"
            title={showSkin && showHair ? 'Your skin & hair' : showSkin ? 'Your skin type' : 'Your hair type'}
            subtitle="Tell us about your type so we can personalize your experience."
            step={1}
            totalSteps={totalSteps}
            onNext={() => setStep(2)}
            onBack={() => setStep(0)}
          >
            <div className="space-y-6">
              {showSkin && (
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
              )}
              {showHair && (
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
              )}
            </div>
          </OnboardingStep>
        )}

        {/* Step 2: Goals */}
        {step === 2 && (
          <OnboardingStep
            key="goals"
            title="Your goals"
            subtitle="Select all the goals you'd like to work towards. We'll tailor recommendations for you."
            step={2}
            totalSteps={totalSteps}
            onNext={() => setStep(showSkin ? 3 : 4)}
            onBack={() => setStep(1)}
          >
            <div className="grid grid-cols-1 gap-2">
              {GOALS.filter(g => {
                const skinGoals = ['Anti-aging', 'Hydration', 'Acne control', 'Brightening'];
                const hairGoals = ['Hair growth', 'Damage repair', 'Scalp health', 'Frizz control'];
                if (showSkin && showHair) return true;
                if (showSkin) return skinGoals.includes(g.label);
                return hairGoals.includes(g.label);
              }).map(g => (
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

        {/* Step 3: Skin conditions (only if skin focus) */}
        {step === 3 && showSkin && (
          <OnboardingStep
            key="conditions"
            title="Skin conditions"
            subtitle="Do you have any skin conditions? We'll factor these into every product analysis."
            step={3}
            totalSteps={totalSteps}
            onNext={() => setStep(4)}
            onBack={() => setStep(2)}
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

        {/* Step 4: Climate */}
        {step === 4 && (
          <OnboardingStep
            key="climate"
            title="Your climate"
            subtitle="Where you live affects your skin and hair. Tell us your typical weather."
            step={4}
            totalSteps={totalSteps}
            onNext={() => setStep(5)}
            onBack={() => setStep(showSkin ? 3 : 2)}
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

        {/* Step 5: Sensitivities */}
        {step === 5 && (
          <OnboardingStep
            key="sensitivities"
            title="Sensitivities"
            subtitle="Are there any ingredients you want to avoid? We'll flag them for you."
            step={5}
            totalSteps={totalSteps}
            onNext={handleSave}
            onBack={() => setStep(4)}
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