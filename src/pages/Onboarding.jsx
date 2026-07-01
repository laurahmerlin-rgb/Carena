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

const HAIR_CONDITIONS = [
  { label: 'Dandruff', icon: '❄️', description: 'Flaky, itchy scalp' },
  { label: 'Scalp psoriasis', icon: '🔶', description: 'Thick, scaly scalp patches' },
  { label: 'Seborrheic dermatitis', icon: '🧫', description: 'Oily flakes, inflamed scalp' },
  { label: 'Alopecia', icon: '🔵', description: 'Patchy or diffuse hair loss' },
  { label: 'Androgenetic alopecia', icon: '💈', description: 'Pattern baldness / thinning' },
  { label: 'Telogen effluvium', icon: '🍂', description: 'Excessive shedding / stress hair loss' },
  { label: 'Scalp eczema', icon: '🩹', description: 'Itchy, dry, inflamed scalp' },
  { label: 'Folliculitis', icon: '🔴', description: 'Infected or inflamed hair follicles' },
  { label: 'Tinea capitis', icon: '🍄', description: 'Fungal scalp infection / ringworm' },
  { label: 'Scalp acne', icon: '🎯', description: 'Pimples or cysts on the scalp' },
  { label: 'None', icon: '✅', description: 'No specific hair or scalp conditions' },
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

const SKIN_FOCUS_OPTIONS = [
  { label: 'Skincare', icon: '🧴', description: 'Cleansers, serums, moisturizers, SPF' },
  { label: 'Makeup', icon: '💄', description: 'Foundation, blush, eyeshadow & more' },
  { label: 'Both', icon: '✨', description: 'Skincare routine + makeup products' },
];

const MAKEUP_COVERAGE = [
  { label: 'No-makeup makeup', icon: '🌸', description: 'Barely there, natural finish' },
  { label: 'Light coverage', icon: '💆', description: 'Tinted moisturizer, light BB cream' },
  { label: 'Medium coverage', icon: '✨', description: 'Balanced, everyday foundation' },
  { label: 'Full coverage', icon: '💎', description: 'Flawless, high-coverage finish' },
];

const MAKEUP_FINISH = [
  { label: 'Matte', icon: '🪨', description: 'No shine, velvety look' },
  { label: 'Satin', icon: '🌙', description: 'Subtle glow, not too shiny' },
  { label: 'Dewy', icon: '💧', description: 'Fresh, glowy, luminous skin' },
  { label: 'Luminous', icon: '⭐', description: 'High-shine, glass skin effect' },
];

const MAKEUP_STYLE = [
  { label: 'Everyday / Natural', icon: '🌿', description: 'Simple, fresh, effortless' },
  { label: 'Office / Professional', icon: '💼', description: 'Polished, put-together look' },
  { label: 'Glam / Evening', icon: '🌟', description: 'Bold, dramatic, night-out looks' },
  { label: 'Editorial / Creative', icon: '🎨', description: 'Artistic, experimental, avant-garde' },
];

export default function Onboarding() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [focus, setFocus] = useState('');
  const [skinFocus, setSkinFocus] = useState('');
  const [profile, setProfile] = useState({
    skin_type: '',
    hair_type: '',
    goals: [],
    skin_conditions: [],
    hair_conditions: [],
    climate: '',
    sensitivities: [],
    makeup_coverage: '',
    makeup_finish: '',
    makeup_style: '',
  });

  const showSkin = focus === 'Skin' || focus === 'Both';
  const showHair = focus === 'Hair' || focus === 'Both';
  const showMakeup = showSkin && (skinFocus === 'Makeup' || skinFocus === 'Both');
  const showSkincare = showSkin && (skinFocus === 'Skincare' || skinFocus === 'Both');

  const stepKeys = ['focus'];
  if (showSkin) stepKeys.push('skinFocus');
  stepKeys.push('types');
  stepKeys.push('goals');
  if (showSkincare) stepKeys.push('conditions');
  if (showHair) stepKeys.push('hairConditions');
  if (showMakeup) stepKeys.push('makeupPrefs');
  stepKeys.push('climate');
  stepKeys.push('sensitivities');

  const totalSteps = stepKeys.length;
  const currentKey = stepKeys[step];

  const goNext = () => setStep(s => s + 1);
  const goBack = () => setStep(s => s - 1);

  const toggleMulti = (field, value, noneLabel = 'None') => {
    setProfile(prev => {
      const arr = prev[field] || [];
      if (value === noneLabel) return { ...prev, [field]: [noneLabel] };
      const filtered = arr.filter(x => x !== noneLabel);
      return {
        ...prev,
        [field]: filtered.includes(value) ? filtered.filter(x => x !== value) : [...filtered, value],
      };
    });
  };

  const handleSave = async () => {
    const me = await base44.auth.me();
    await base44.auth.updateMe({ profile: { ...profile, focus, skin_focus: skinFocus } });
    base44.functions.invoke('sendWelcomeEmail', { user_email: me.email, user_name: me.full_name });
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-background">
      <AnimatePresence mode="wait">

        {/* STEP: focus */}
        {currentKey === 'focus' && (
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
                <FocusCard key={opt.label} opt={opt} selected={focus === opt.label} onSelect={setFocus} />
              ))}
            </div>
            <button
              disabled={!focus}
              onClick={goNext}
              className="mt-8 w-full h-12 rounded-full bg-primary text-primary-foreground font-semibold text-sm disabled:opacity-40 disabled:cursor-not-allowed transition-opacity shadow-md"
            >
              Continue
            </button>
          </motion.div>
        )}

        {/* STEP: skinFocus */}
        {currentKey === 'skinFocus' && (
          <motion.div
            key="skinFocus"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            className="min-h-screen flex flex-col px-6 pt-16 pb-10 max-w-lg mx-auto"
          >
            <div className="mb-10">
              <p className="text-xs uppercase tracking-widest text-primary/70 font-semibold mb-2">Step {step + 1} of {totalSteps}</p>
              <h1 className="font-heading text-3xl font-semibold tracking-tight leading-tight mb-3">
                Skincare or makeup?
              </h1>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Tell us what type of skin products you want help with.
              </p>
            </div>
            <div className="space-y-3 flex-1">
              {SKIN_FOCUS_OPTIONS.map(opt => (
                <FocusCard key={opt.label} opt={opt} selected={skinFocus === opt.label} onSelect={setSkinFocus} />
              ))}
            </div>
            <div className="flex gap-3 mt-8">
              <button onClick={goBack} className="h-12 px-6 rounded-full border border-border font-semibold text-sm">Back</button>
              <button
                disabled={!skinFocus}
                onClick={goNext}
                className="flex-1 h-12 rounded-full bg-primary text-primary-foreground font-semibold text-sm disabled:opacity-40 disabled:cursor-not-allowed transition-opacity shadow-md"
              >
                Continue
              </button>
            </div>
          </motion.div>
        )}

        {/* STEP: types */}
        {currentKey === 'types' && (
          <OnboardingStep
            key="types"
            title={showSkin && showHair ? 'Your skin & hair' : showSkin ? 'Your skin type' : 'Your hair type'}
            subtitle="Tell us about your type so we can personalize your experience."
            step={step}
            totalSteps={totalSteps}
            onNext={goNext}
            onBack={goBack}
          >
            <div className="space-y-6">
              {showSkin && (
                <div>
                  <p className="text-xs uppercase tracking-widest text-muted-foreground font-medium mb-3">Skin Type</p>
                  <div className="grid grid-cols-1 gap-2">
                    {SKIN_TYPES.map(t => (
                      <SelectableChip key={t.label} {...t} selected={profile.skin_type === t.label} onClick={() => setProfile(p => ({ ...p, skin_type: t.label }))} />
                    ))}
                  </div>
                </div>
              )}
              {showHair && (
                <div>
                  <p className="text-xs uppercase tracking-widest text-muted-foreground font-medium mb-3">Hair Type</p>
                  <div className="grid grid-cols-1 gap-2">
                    {HAIR_TYPES.map(t => (
                      <SelectableChip key={t.label} {...t} selected={profile.hair_type === t.label} onClick={() => setProfile(p => ({ ...p, hair_type: t.label }))} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </OnboardingStep>
        )}

        {/* STEP: goals */}
        {currentKey === 'goals' && (
          <OnboardingStep
            key="goals"
            title="Your goals"
            subtitle="Select all the goals you'd like to work towards."
            step={step}
            totalSteps={totalSteps}
            onNext={goNext}
            onBack={goBack}
          >
            {showSkin && showHair ? (
              <div className="space-y-6">
                <div>
                  <p className="text-xs uppercase tracking-widest text-muted-foreground font-medium mb-3">Skin Goals</p>
                  <div className="grid grid-cols-1 gap-2">
                    {GOALS.filter(g => ['Anti-aging', 'Hydration', 'Acne control', 'Brightening'].includes(g.label)).map(g => (
                      <SelectableChip key={g.label} {...g} selected={profile.goals.includes(g.label)} onClick={() => toggleMulti('goals', g.label)} />
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-muted-foreground font-medium mb-3">Hair Goals</p>
                  <div className="grid grid-cols-1 gap-2">
                    {GOALS.filter(g => ['Hair growth', 'Damage repair', 'Scalp health', 'Frizz control'].includes(g.label)).map(g => (
                      <SelectableChip key={g.label} {...g} selected={profile.goals.includes(g.label)} onClick={() => toggleMulti('goals', g.label)} />
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-2">
                {GOALS.filter(g => {
                  const skinGoals = ['Anti-aging', 'Hydration', 'Acne control', 'Brightening'];
                  const hairGoals = ['Hair growth', 'Damage repair', 'Scalp health', 'Frizz control'];
                  if (showSkin) return skinGoals.includes(g.label);
                  return hairGoals.includes(g.label);
                }).map(g => (
                  <SelectableChip key={g.label} {...g} selected={profile.goals.includes(g.label)} onClick={() => toggleMulti('goals', g.label)} />
                ))}
              </div>
            )}
          </OnboardingStep>
        )}

        {/* STEP: conditions */}
        {currentKey === 'conditions' && (
          <OnboardingStep
            key="conditions"
            title="Skin conditions"
            subtitle="Do you have any skin conditions? We'll factor these into every product analysis."
            step={step}
            totalSteps={totalSteps}
            onNext={goNext}
            onBack={goBack}
          >
            <div className="grid grid-cols-1 gap-2">
              {SKIN_CONDITIONS.map(c => (
                <SelectableChip key={c.label} {...c} selected={profile.skin_conditions.includes(c.label)} onClick={() => toggleMulti('skin_conditions', c.label)} />
              ))}
            </div>
          </OnboardingStep>
        )}

        {/* STEP: hairConditions */}
        {currentKey === 'hairConditions' && (
          <OnboardingStep
            key="hairConditions"
            title="Hair & scalp conditions"
            subtitle="Do you have any hair or scalp conditions? We'll factor these into every product analysis."
            step={step}
            totalSteps={totalSteps}
            onNext={goNext}
            onBack={goBack}
          >
            <div className="grid grid-cols-1 gap-2">
              {HAIR_CONDITIONS.map(c => (
                <SelectableChip key={c.label} {...c} selected={profile.hair_conditions.includes(c.label)} onClick={() => toggleMulti('hair_conditions', c.label)} />
              ))}
            </div>
          </OnboardingStep>
        )}

        {/* STEP: makeupPrefs */}
        {currentKey === 'makeupPrefs' && (
          <OnboardingStep
            key="makeupPrefs"
            title="Your makeup style"
            subtitle="Tell us your preferences so we can recommend the right products for you."
            step={step}
            totalSteps={totalSteps}
            onNext={goNext}
            onBack={goBack}
          >
            <div className="space-y-6">
              <div>
                <p className="text-xs uppercase tracking-widest text-muted-foreground font-medium mb-3">Coverage preference</p>
                <div className="grid grid-cols-1 gap-2">
                  {MAKEUP_COVERAGE.map(t => (
                    <SelectableChip key={t.label} {...t} selected={profile.makeup_coverage === t.label} onClick={() => setProfile(p => ({ ...p, makeup_coverage: t.label }))} />
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-muted-foreground font-medium mb-3">Finish preference</p>
                <div className="grid grid-cols-1 gap-2">
                  {MAKEUP_FINISH.map(t => (
                    <SelectableChip key={t.label} {...t} selected={profile.makeup_finish === t.label} onClick={() => setProfile(p => ({ ...p, makeup_finish: t.label }))} />
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-muted-foreground font-medium mb-3">Makeup style</p>
                <div className="grid grid-cols-1 gap-2">
                  {MAKEUP_STYLE.map(t => (
                    <SelectableChip key={t.label} {...t} selected={profile.makeup_style === t.label} onClick={() => setProfile(p => ({ ...p, makeup_style: t.label }))} />
                  ))}
                </div>
              </div>
            </div>
          </OnboardingStep>
        )}

        {/* STEP: climate */}
        {currentKey === 'climate' && (
          <OnboardingStep
            key="climate"
            title="Your climate"
            subtitle="Where you live affects your skin and hair. Tell us your typical weather."
            step={step}
            totalSteps={totalSteps}
            onNext={goNext}
            onBack={goBack}
          >
            <div className="grid grid-cols-1 gap-2">
              {CLIMATES.map(c => (
                <SelectableChip key={c.label} {...c} selected={profile.climate === c.label} onClick={() => setProfile(p => ({ ...p, climate: c.label }))} />
              ))}
            </div>
          </OnboardingStep>
        )}

        {/* STEP: sensitivities */}
        {currentKey === 'sensitivities' && (
          <OnboardingStep
            key="sensitivities"
            title="Sensitivities"
            subtitle="Are there any ingredients you want to avoid? We'll flag them for you."
            step={step}
            totalSteps={totalSteps}
            onNext={handleSave}
            onBack={goBack}
            nextLabel="Get Started"
          >
            <div className="grid grid-cols-1 gap-2">
              {SENSITIVITIES.map(s => (
                <SelectableChip key={s.label} {...s} selected={profile.sensitivities.includes(s.label)} onClick={() => toggleMulti('sensitivities', s.label)} />
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

function FocusCard({ opt, selected, onSelect }) {
  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      onClick={() => onSelect(opt.label)}
      className={`w-full flex items-center gap-4 p-5 rounded-2xl border-2 text-left transition-all duration-200 ${
        selected ? 'border-primary bg-primary/8 ring-1 ring-primary/20' : 'border-border bg-card hover:border-primary/40'
      }`}
    >
      <span className="text-3xl">{opt.icon}</span>
      <div className="flex-1">
        <p className={`font-semibold text-base ${selected ? 'text-primary' : ''}`}>{opt.label}</p>
        <p className="text-xs text-muted-foreground mt-0.5">{opt.description}</p>
      </div>
      {selected && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="w-6 h-6 rounded-full bg-primary flex items-center justify-center shrink-0"
        >
          <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </motion.div>
      )}
    </motion.button>
  );
}