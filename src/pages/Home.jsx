import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { Camera, Search, Sparkles, FlaskConical, ArrowRight, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';
import QuickAction from '@/components/home/QuickAction';
import { Button } from '@/components/ui/button';

export default function Home() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    base44.auth.me().then(setUser);
  }, []);

  const { data: recentProducts } = useQuery({
    queryKey: ['recent-products'],
    queryFn: () => base44.entities.Product.list('-created_date', 5),
    initialData: [],
  });

  const profile = user?.profile;

  // Redirect to onboarding if no profile
  useEffect(() => {
    if (user && !user.profile) {
      navigate('/onboarding');
    }
  }, [user, navigate]);

  if (!user) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-8 h-8 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="min-h-screen bg-background pb-8">
      {/* Header */}
      <div className="px-6 pt-8 pb-6">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <p className="text-muted-foreground text-sm">Welcome back,</p>
          <h1 className="font-heading text-3xl font-semibold mt-1">
            {user.full_name?.split(' ')[0] || 'Beauty Lover'}
          </h1>
        </motion.div>

        {/* Profile summary pill */}
        {profile && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-4 flex flex-wrap gap-2"
          >
            {profile.skin_type && (
              <span className="text-xs px-3 py-1.5 rounded-full bg-accent text-accent-foreground font-medium">
                {profile.skin_type} skin
              </span>
            )}
            {profile.hair_type && (
              <span className="text-xs px-3 py-1.5 rounded-full bg-accent text-accent-foreground font-medium">
                {profile.hair_type} hair
              </span>
            )}
            {profile.climate && (
              <span className="text-xs px-3 py-1.5 rounded-full bg-accent text-accent-foreground font-medium">
                {profile.climate}
              </span>
            )}
            {profile.skin_conditions?.filter(c => c !== 'None').map(c => (
              <span key={c} className="text-xs px-3 py-1.5 rounded-full bg-destructive/10 text-destructive font-medium">
                {c}
              </span>
            ))}
            <button
              onClick={() => navigate('/onboarding')}
              className="text-xs px-3 py-1.5 rounded-full border border-dashed border-primary/40 text-primary font-medium hover:bg-primary/5 transition-colors"
            >
              Edit profile
            </button>
          </motion.div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="px-6 mb-8">
        <div className="grid grid-cols-2 gap-4">
          <QuickAction
            icon={Camera}
            label="Scan"
            description="Analyze a product photo"
            onClick={() => navigate('/scan')}
            gradient="bg-gradient-to-br from-primary to-primary/70"
          />
          <QuickAction
            icon={Search}
            label="Search"
            description="Look up a product"
            onClick={() => navigate('/search')}
            gradient="bg-gradient-to-br from-foreground/80 to-foreground/60"
          />
        </div>
      </div>

      {/* Glossary CTA */}
      <div className="px-6 mb-4">
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={() => navigate('/glossary')}
          className="w-full p-4 rounded-2xl bg-card border border-border flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-accent flex items-center justify-center">
              <BookOpen className="w-4 h-4 text-primary" />
            </div>
            <p className="font-medium text-sm">Ingredient Glossary</p>
          </div>
          <ArrowRight className="w-4 h-4 text-muted-foreground" />
        </motion.button>
      </div>

      {/* My Routine CTA */}
      <div className="px-6 mb-8">
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={() => navigate('/routine')}
          className="w-full p-5 rounded-3xl bg-accent border border-border flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center">
              <FlaskConical className="w-5 h-5 text-primary" />
            </div>
            <div className="text-left">
              <p className="font-medium text-sm">My Routine</p>
              <p className="text-xs text-muted-foreground">
                {recentProducts.filter(p => p.in_routine).length} products
              </p>
            </div>
          </div>
          <ArrowRight className="w-5 h-5 text-muted-foreground" />
        </motion.button>
      </div>

      {/* Recent Scans */}
      {recentProducts.length > 0 && (
        <div className="px-6">
          <h2 className="font-heading text-lg font-semibold mb-4">Recent Scans</h2>
          <div className="space-y-3">
            {recentProducts.map((product, i) => (
              <motion.button
                key={product.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => navigate(`/product/${product.id}`)}
                className="w-full flex items-center gap-4 p-4 rounded-2xl bg-card border border-border hover:shadow-sm transition-all text-left"
              >
                {product.image_url ? (
                  <img src={product.image_url} alt="" className="w-14 h-14 rounded-xl object-cover" />
                ) : (
                  <div className="w-14 h-14 rounded-xl bg-muted flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-muted-foreground" />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm truncate">{product.name}</p>
                  {product.brand && <p className="text-xs text-muted-foreground">{product.brand}</p>}
                </div>
                {product.analysis?.score != null && (
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${
                    product.analysis.score >= 7 ? 'bg-green-100 text-green-700' :
                    product.analysis.score >= 4 ? 'bg-yellow-100 text-yellow-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {product.analysis.score}
                  </div>
                )}
                <ArrowRight className="w-4 h-4 text-muted-foreground shrink-0" />
              </motion.button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}