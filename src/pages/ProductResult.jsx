import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Plus, Check, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ScoreRing from '@/components/product/ScoreRing';
import InsightsList from '@/components/product/InsightsList';
import AlternativesList from '@/components/product/AlternativesList';
import IngredientsList from '@/components/product/IngredientsList';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function ProductResult() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const urlParams = new URLSearchParams(window.location.search);
  const productId = window.location.pathname.split('/product/')[1];

  const { data: product, isLoading } = useQuery({
    queryKey: ['product', productId],
    queryFn: async () => {
      const products = await base44.entities.Product.filter({ id: productId });
      return products[0];
    },
    enabled: !!productId,
  });

  const [routineStep, setRoutineStep] = useState('');
  const [routineTime, setRoutineTime] = useState('');

  const addToRoutineMutation = useMutation({
    mutationFn: () => base44.entities.Product.update(productId, {
      in_routine: true,
      routine_step: routineStep,
      routine_time: routineTime,
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['product', productId] });
      queryClient.invalidateQueries({ queryKey: ['recent-products'] });
    }
  });

  if (isLoading || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  const analysis = product.analysis || {};

  return (
    <div className="min-h-screen bg-background pb-8">
      {/* Header */}
      <div className="flex items-center gap-3 px-6 pt-8 pb-4">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="rounded-full">
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div className="flex-1 min-w-0">
          <h1 className="font-heading text-xl font-semibold truncate">{product.name}</h1>
          {product.brand && <p className="text-sm text-muted-foreground">{product.brand}</p>}
        </div>
      </div>

      {/* Hero card */}
      <div className="px-6 mb-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 rounded-3xl bg-card border border-border"
        >
          <div className="flex items-center gap-5">
            {product.image_url ? (
              <img src={product.image_url} alt="" className="w-20 h-20 rounded-2xl object-cover" />
            ) : (
              <div className="w-20 h-20 rounded-2xl bg-muted flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-muted-foreground" />
              </div>
            )}
            <div className="flex-1">
              <ScoreRing score={analysis.score || 0} />
              <p className="text-xs text-muted-foreground mt-1 text-center">Your match score</p>
            </div>
          </div>
          {analysis.score_explanation && (
            <div className="mt-4 p-3 rounded-xl bg-primary/5 border border-primary/15">
              <p className="text-xs font-semibold text-primary uppercase tracking-widest mb-1">Why this score?</p>
              <p className="text-sm leading-relaxed">{analysis.score_explanation}</p>
            </div>
          )}
          {analysis.summary && (
            <p className="text-sm text-muted-foreground mt-3 leading-relaxed">{analysis.summary}</p>
          )}
        </motion.div>
      </div>

      {/* Tabs */}
      <div className="px-6">
        <Tabs defaultValue="insights">
          <TabsList className="w-full rounded-full bg-muted p-1 mb-6">
            <TabsTrigger value="insights" className="flex-1 rounded-full text-xs">Insights</TabsTrigger>
            <TabsTrigger value="alternatives" className="flex-1 rounded-full text-xs">Alternatives</TabsTrigger>
            <TabsTrigger value="routine" className="flex-1 rounded-full text-xs">Add to Routine</TabsTrigger>
          </TabsList>

          <TabsContent value="insights">
            <InsightsList
              pros={analysis.pros}
              cons={analysis.cons}
              warnings={analysis.warnings}
            />
            <IngredientsList ingredients={product.ingredients} />
          </TabsContent>

          <TabsContent value="alternatives">
            <AlternativesList alternatives={analysis.alternatives} />
          </TabsContent>

          <TabsContent value="routine">
            {product.in_routine ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-3">
                  <Check className="w-8 h-8 text-green-600" />
                </div>
                <p className="font-medium">Already in your routine!</p>
                <p className="text-sm text-muted-foreground mt-1">
                  {product.routine_step} · {product.routine_time}
                </p>
                <Button variant="outline" className="mt-4 rounded-full" onClick={() => navigate('/routine')}>
                  View Routine
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="text-xs uppercase tracking-widest text-muted-foreground font-medium mb-2 block">
                    Step type
                  </label>
                  <Select value={routineStep} onValueChange={setRoutineStep}>
                    <SelectTrigger className="rounded-xl">
                      <SelectValue placeholder="Select step..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cleanser">Cleanser</SelectItem>
                      <SelectItem value="toner">Toner</SelectItem>
                      <SelectItem value="serum">Serum</SelectItem>
                      <SelectItem value="moisturizer">Moisturizer</SelectItem>
                      <SelectItem value="sunscreen">Sunscreen</SelectItem>
                      <SelectItem value="mask">Mask</SelectItem>
                      <SelectItem value="shampoo">Shampoo</SelectItem>
                      <SelectItem value="conditioner">Conditioner</SelectItem>
                      <SelectItem value="treatment">Treatment</SelectItem>
                      <SelectItem value="oil">Oil</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-xs uppercase tracking-widest text-muted-foreground font-medium mb-2 block">
                    When to use
                  </label>
                  <Select value={routineTime} onValueChange={setRoutineTime}>
                    <SelectTrigger className="rounded-xl">
                      <SelectValue placeholder="Select time..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="morning">Morning</SelectItem>
                      <SelectItem value="evening">Evening</SelectItem>
                      <SelectItem value="both">Both</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button
                  className="w-full rounded-full gap-2"
                  disabled={!routineStep || !routineTime || addToRoutineMutation.isPending}
                  onClick={() => addToRoutineMutation.mutate()}
                >
                  <Plus className="w-4 h-4" />
                  {addToRoutineMutation.isPending ? 'Adding...' : 'Add to Routine'}
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}