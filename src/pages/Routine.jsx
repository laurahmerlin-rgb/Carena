import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Sun, Moon, Sparkles, Trash2, Loader2, Plus } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { motion, AnimatePresence } from 'framer-motion';
import AddProductForm from '@/components/routine/AddProductForm';

const STEP_ORDER = ['cleanser', 'toner', 'serum', 'moisturizer', 'sunscreen', 'mask', 'shampoo', 'conditioner', 'treatment', 'oil', 'other'];

export default function Routine() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [analyzing, setAnalyzing] = useState(false);
  const [routineAnalysis, setRoutineAnalysis] = useState(null);
  const [suggestions, setSuggestions] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);

  const { data: routineProducts, isLoading } = useQuery({
    queryKey: ['routine-products'],
    queryFn: () => base44.entities.Product.filter({ in_routine: true }),
    initialData: [],
  });

  const morningProducts = routineProducts
    .filter(p => p.routine_time === 'morning' || p.routine_time === 'both')
    .sort((a, b) => STEP_ORDER.indexOf(a.routine_step) - STEP_ORDER.indexOf(b.routine_step));

  const eveningProducts = routineProducts
    .filter(p => p.routine_time === 'evening' || p.routine_time === 'both')
    .sort((a, b) => STEP_ORDER.indexOf(a.routine_step) - STEP_ORDER.indexOf(b.routine_step));

  const removeFromRoutine = async (product) => {
    await base44.entities.Product.update(product.id, { in_routine: false, routine_step: '', routine_time: '' });
    queryClient.invalidateQueries({ queryKey: ['routine-products'] });
  };

  const analyzeRoutine = async () => {
    setAnalyzing(true);
    const user = await base44.auth.me();
    const profile = user.profile || {};

    const result = await base44.integrations.Core.InvokeLLM({
      prompt: `You are a skin/hair care expert. Analyze this user's complete routine.

User Profile:
- Skin type: ${profile.skin_type || 'Unknown'}
- Hair type: ${profile.hair_type || 'Unknown'}
- Skin conditions: ${(profile.skin_conditions || []).join(', ') || 'None'}
- Goals: ${(profile.goals || []).join(', ') || 'None specified'}
- Climate: ${profile.climate || 'Unknown'}
- Sensitivities: ${(profile.sensitivities || []).join(', ') || 'None'}

Their routine products:
${routineProducts.map(p => `- ${p.name} (${p.brand || 'unknown brand'}) - ${p.routine_step} - ${p.routine_time}`).join('\n')}

Skin conditions are especially important — flag any ingredients that could aggravate their conditions.

Provide:
1. An overall routine score (1-10)
2. A summary analysis of how well the routine works together
3. Specific tips to improve the routine
4. Missing steps they should consider adding
5. Any ingredient conflicts between products`,
      response_json_schema: {
        type: "object",
        properties: {
          score: { type: "number" },
          summary: { type: "string" },
          tips: { type: "array", items: { type: "string" } },
          missing_steps: { type: "array", items: { type: "string" } },
          conflicts: { type: "array", items: { type: "string" } }
        }
      }
    });

    setRoutineAnalysis(result);
    setAnalyzing(false);
  };

  const getSuggestions = async () => {
    setAnalyzing(true);
    const user = await base44.auth.me();
    const profile = user.profile || {};

    const result = await base44.integrations.Core.InvokeLLM({
      prompt: `You are a skin/hair care expert. Based on this user's profile and current routine, suggest 5 products they should add.

User Profile:
- Skin type: ${profile.skin_type || 'Unknown'}
- Hair type: ${profile.hair_type || 'Unknown'}
- Skin conditions: ${(profile.skin_conditions || []).join(', ') || 'None'}
- Goals: ${(profile.goals || []).join(', ') || 'None specified'}
- Climate: ${profile.climate || 'Unknown'}
- Sensitivities: ${(profile.sensitivities || []).join(', ') || 'None'}

Current routine products: ${routineProducts.map(p => p.name).join(', ') || 'None'}

Suggest real, specific products with name, brand, why they'd benefit this user, and what step they fill.`,
      add_context_from_internet: true,
      response_json_schema: {
        type: "object",
        properties: {
          suggestions: {
            type: "array",
            items: {
              type: "object",
              properties: {
                name: { type: "string" },
                brand: { type: "string" },
                step: { type: "string" },
                reason: { type: "string" }
              }
            }
          }
        }
      }
    });

    setSuggestions(result.suggestions || []);
    setAnalyzing(false);
  };

  const ProductCard = ({ product, showRemove = true }) => (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center gap-3 p-3 rounded-2xl bg-card border border-border"
    >
      {product.image_url ? (
        <img src={product.image_url} alt="" className="w-12 h-12 rounded-xl object-cover" />
      ) : (
        <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center">
          <Sparkles className="w-4 h-4 text-muted-foreground" />
        </div>
      )}
      <div className="flex-1 min-w-0">
        <p className="font-medium text-sm truncate">{product.name}</p>
        <p className="text-xs text-muted-foreground capitalize">{product.routine_step}</p>
      </div>
      {product.analysis?.score != null && (
        <span className={`text-xs font-bold px-2 py-1 rounded-full ${
          product.analysis.score >= 7 ? 'bg-green-100 text-green-700' :
          product.analysis.score >= 4 ? 'bg-yellow-100 text-yellow-700' :
          'bg-red-100 text-red-700'
        }`}>
          {product.analysis.score}
        </span>
      )}
      {showRemove && (
        <Button variant="ghost" size="icon" className="rounded-full h-8 w-8" onClick={() => removeFromRoutine(product)}>
          <Trash2 className="w-3.5 h-3.5 text-muted-foreground" />
        </Button>
      )}
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-background pb-8">
      <div className="flex items-center gap-3 px-6 pt-10 pb-4">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="rounded-full bg-muted/60">
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="font-heading text-2xl font-semibold tracking-tight flex-1">My Routine</h1>
        <Button size="sm" className="rounded-full gap-1.5 text-xs h-8 px-3" onClick={() => setShowAddForm(true)}>
          <Plus className="w-3.5 h-3.5" />
          Add product
        </Button>
      </div>

      <div className="px-6">
        <Tabs defaultValue="products">
          <TabsList className="w-full rounded-full bg-muted p-1 mb-6">
            <TabsTrigger value="products" className="flex-1 rounded-full text-xs">Products</TabsTrigger>
            <TabsTrigger value="analysis" className="flex-1 rounded-full text-xs">Analysis</TabsTrigger>
            <TabsTrigger value="suggestions" className="flex-1 rounded-full text-xs">Suggestions</TabsTrigger>
          </TabsList>

          <TabsContent value="products">
            {routineProducts.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-8 h-8 text-muted-foreground" />
                </div>
                <p className="font-medium">No products yet</p>
                <p className="text-sm text-muted-foreground mt-1">Add products manually or scan/search them</p>
                <div className="flex gap-2 justify-center mt-4">
                  <Button className="rounded-full gap-1.5" onClick={() => setShowAddForm(true)}>
                    <Plus className="w-4 h-4" />
                    Add a product
                  </Button>
                  <Button variant="outline" className="rounded-full" onClick={() => navigate('/')}>
                    Scan / Search
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                {morningProducts.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Sun className="w-4 h-4 text-yellow-500" />
                      <p className="text-xs uppercase tracking-widest text-muted-foreground font-medium">Morning</p>
                    </div>
                    <div className="space-y-2">
                      {morningProducts.map(p => <ProductCard key={p.id} product={p} />)}
                    </div>
                  </div>
                )}
                {eveningProducts.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Moon className="w-4 h-4 text-indigo-400" />
                      <p className="text-xs uppercase tracking-widest text-muted-foreground font-medium">Evening</p>
                    </div>
                    <div className="space-y-2">
                      {eveningProducts.map(p => <ProductCard key={p.id} product={p} />)}
                    </div>
                  </div>
                )}
              </div>
            )}
          </TabsContent>

          <TabsContent value="analysis">
            {!routineAnalysis && !analyzing && (
              <div className="text-center py-12">
                <p className="text-sm text-muted-foreground mb-4">
                  Analyze how your products work together and get personalized tips.
                </p>
                <Button className="rounded-full gap-2" onClick={analyzeRoutine} disabled={routineProducts.length === 0}>
                  <Sparkles className="w-4 h-4" />
                  Analyze My Routine
                </Button>
              </div>
            )}

            {analyzing && (
              <div className="text-center py-12">
                <Loader2 className="w-8 h-8 text-primary animate-spin mx-auto mb-3" />
                <p className="text-sm text-muted-foreground">Analyzing your routine...</p>
              </div>
            )}

            {routineAnalysis && !analyzing && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                <div className="p-5 rounded-2xl bg-card border border-border text-center">
                  <p className="text-4xl font-bold font-heading">{routineAnalysis.score}/10</p>
                  <p className="text-sm text-muted-foreground mt-2">{routineAnalysis.summary}</p>
                </div>

                {routineAnalysis.tips?.length > 0 && (
                  <div>
                    <p className="text-xs uppercase tracking-widest text-muted-foreground font-medium mb-2">Tips</p>
                    {routineAnalysis.tips.map((tip, i) => (
                      <div key={i} className="p-3 rounded-xl bg-primary/5 border border-primary/10 text-sm mb-2">{tip}</div>
                    ))}
                  </div>
                )}

                {routineAnalysis.missing_steps?.length > 0 && (
                  <div>
                    <p className="text-xs uppercase tracking-widest text-muted-foreground font-medium mb-2">Missing Steps</p>
                    {routineAnalysis.missing_steps.map((step, i) => (
                      <div key={i} className="p-3 rounded-xl bg-accent border border-border text-sm mb-2">{step}</div>
                    ))}
                  </div>
                )}

                {routineAnalysis.conflicts?.length > 0 && (
                  <div>
                    <p className="text-xs uppercase tracking-widest text-destructive font-medium mb-2">Conflicts</p>
                    {routineAnalysis.conflicts.map((c, i) => (
                      <div key={i} className="p-3 rounded-xl bg-destructive/5 border border-destructive/20 text-sm text-destructive mb-2">{c}</div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}
          </TabsContent>

          <TabsContent value="suggestions">
            {!suggestions && !analyzing && (
              <div className="text-center py-12">
                <p className="text-sm text-muted-foreground mb-4">
                  Get personalized product suggestions based on your profile and routine.
                </p>
                <Button className="rounded-full gap-2" onClick={getSuggestions}>
                  <Sparkles className="w-4 h-4" />
                  Get Suggestions
                </Button>
              </div>
            )}

            {analyzing && (
              <div className="text-center py-12">
                <Loader2 className="w-8 h-8 text-primary animate-spin mx-auto mb-3" />
                <p className="text-sm text-muted-foreground">Finding products for you...</p>
              </div>
            )}

            {suggestions && !analyzing && (
              <div className="space-y-3">
                {suggestions.map((s, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08 }}
                    className="p-4 rounded-2xl bg-card border border-border"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-medium text-sm">{s.name}</p>
                        <p className="text-xs text-muted-foreground">{s.brand} · {s.step}</p>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">{s.reason}</p>
                  </motion.div>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>

      <AnimatePresence>
        {showAddForm && (
          <AddProductForm
            onClose={() => setShowAddForm(false)}
            onAdded={() => queryClient.invalidateQueries({ queryKey: ['routine-products'] })}
          />
        )}
      </AnimatePresence>
    </div>
  );
}