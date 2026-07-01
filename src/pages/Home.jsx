import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Camera, Search, Sparkles, FlaskConical, ArrowRight, BookOpen, GitCompareArrows, Settings } from 'lucide-react';
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
  const queryClient = useQueryClient();
  const [refreshing, setRefreshing] = useState(false);
  const [touchStartY, setTouchStartY] = useState(0);

  // Redirect to onboarding if no profile
  useEffect(() => {
    if (user && !user.profile) {
      navigate('/onboarding');
    }
  }, [user, navigate]);

  const handleTouchStart = (e) => setTouchStartY(e.touches[0].clientY);
  const handleTouchEnd = async (e) => {
    const deltaY = e.changedTouches[0].clientY - touchStartY;
    if (deltaY > 80 && window.scrollY === 0) {
      setRefreshing(true);
      await queryClient.invalidateQueries({ queryKey: ['recent-products'] });
      setTimeout(() => setRefreshing(false), 800);
    }
  };

  if (!user) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-8 h-8 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="min-h-screen bg-background pb-20" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
      {/* Header */}
      {refreshing && (
        <div className="flex justify-center py-2">
          <div className="w-5 h-5 border-2 border-primary/20 border-t-primary rounded-full animate-spin" />
        </div>
      )}
      <div className="bg-gradient-to-b from-secondary/60 to-background px-6 pb-8" style={{ paddingTop: 'calc(3rem + env(safe-area-inset-top, 0px))' }}>
        <div className="flex items-start justify-between">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <p className="text-muted-foreground text-sm tracking-wide">Welcome back,</p>
            <h1 className="font-heading text-4xl font-semibold mt-1 tracking-tight">
              {user.full_name?.split(' ')[0] || 'Beauty Lover'}
            </h1>
          </motion.div>
          <button onClick={() => navigate('/settings')} className="w-9 h-9 rounded-full bg-muted/60 border border-border flex items-center justify-center mt-1 shrink-0">
            <Settings className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>

        {/* Profile summary pills */}
        {profile && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-4 flex flex-wrap gap-2"
          >
            {profile.skin_type && (
              <span className="text-xs px-3 py-1.5 rounded-full bg-white/70 border border-border text-foreground/70 font-medium shadow-sm">
                {profile.skin_type} skin
              </span>
            )}
            {profile.hair_type && (
              <span className="text-xs px-3 py-1.5 rounded-full bg-white/70 border border-border text-foreground/70 font-medium shadow-sm">
                {profile.hair_type} hair
              </span>
            )}
            {profile.climate && (
              <span className="text-xs px-3 py-1.5 rounded-full bg-white/70 border border-border text-foreground/70 font-medium shadow-sm">
                {profile.climate}
              </span>
            )}
            {profile.skin_conditions?.filter(c => c !== 'None').map(c => (
              <span key={c} className="text-xs px-3 py-1.5 rounded-full bg-destructive/10 text-destructive font-medium border border-destructive/20">
                {c}
              </span>
            ))}
            <button
              onClick={() => navigate('/onboarding')}
              className="text-xs px-3 py-1.5 rounded-full border border-dashed border-primary/50 text-primary font-medium hover:bg-primary/5 transition-colors"
            >
              Edit profile
            </button>
          </motion.div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="px-6 mb-6">
        <div className="grid grid-cols-2 gap-3">
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
            gradient="bg-gradient-to-br from-foreground/75 to-foreground/55"
          />
        </div>
      </div>

      {/* Secondary Actions */}
      <div className="px-6 mb-6 space-y-2.5">
        {[
          { icon: FlaskConical, label: 'My Routine', sub: `${recentProducts.filter(p => p.in_routine).length} products`, path: '/routine', accent: true },
          { icon: GitCompareArrows, label: 'Compare Products', sub: 'Side-by-side analysis', path: '/compare' },
          { icon: BookOpen, label: 'Ingredient Glossary', sub: 'Decode every ingredient', path: '/glossary' },
        ].map(({ icon: Icon, label, sub, path, accent }) => (
          <motion.button
            key={path}
            whileTap={{ scale: 0.99 }}
            onClick={() => navigate(path)}
            className={`w-full p-4 rounded-2xl border flex items-center justify-between transition-all hover:shadow-sm ${accent ? 'bg-accent/60 border-primary/20' : 'bg-card border-border'}`}
          >
            <div className="flex items-center gap-3.5">
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${accent ? 'bg-primary/15' : 'bg-muted'}`}>
                <Icon className="w-4 h-4 text-primary" />
              </div>
              <div className="text-left">
                <p className="font-semibold text-sm">{label}</p>
                <p className="text-xs text-muted-foreground">{sub}</p>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-muted-foreground" />
          </motion.button>
        ))}
      </div>

      {/* Recent Scans */}
      {recentProducts.length > 0 && (
        <div className="px-6">
          <h2 className="font-heading text-lg font-semibold mb-3 tracking-tight">Recent Scans</h2>
          <div className="space-y-2.5">
            {recentProducts.map((product, i) => (
              <motion.button
                key={product.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => navigate(`/product/${product.id}`)}
                className="w-full flex items-center gap-4 p-4 rounded-2xl bg-card border border-border hover:shadow-md transition-all text-left"
              >
                {product.image_url ? (
                  <img src={product.image_url} alt="" className="w-14 h-14 rounded-xl object-cover shrink-0" />
                ) : (
                  <div className="w-14 h-14 rounded-xl bg-muted flex items-center justify-center shrink-0">
                    <Sparkles className="w-5 h-5 text-muted-foreground" />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm truncate">{product.name}</p>
                  {product.brand && <p className="text-xs text-muted-foreground mt-0.5">{product.brand}</p>}
                </div>
                {product.analysis?.score != null && (
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${
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