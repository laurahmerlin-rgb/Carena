import React from 'react';
import { Crown } from 'lucide-react';

export default function CompareColumn({ product, label, suitability, climateSuitability, uniqueIngredients, isWinner }) {
  const scoreColor = suitability >= 7 ? 'text-green-600' : suitability >= 4 ? 'text-yellow-600' : 'text-red-500';
  const scoreBg = suitability >= 7 ? 'bg-green-50' : suitability >= 4 ? 'bg-yellow-50' : 'bg-red-50';

  return (
    <div className={`p-4 rounded-2xl border space-y-3 ${isWinner ? 'border-primary bg-primary/5' : 'border-border bg-card'}`}>
      {isWinner && (
        <div className="flex items-center gap-1 text-primary">
          <Crown className="w-3.5 h-3.5" />
          <span className="text-xs font-semibold">Best Pick</span>
        </div>
      )}

      <div>
        <p className="text-xs uppercase tracking-widest text-muted-foreground font-medium mb-1">Profile Fit</p>
        <div className={`flex items-center justify-center py-2 rounded-xl ${scoreBg}`}>
          <span className={`text-2xl font-bold font-heading ${scoreColor}`}>{suitability}<span className="text-sm font-normal text-muted-foreground">/10</span></span>
        </div>
      </div>

      <div>
        <p className="text-xs uppercase tracking-widest text-muted-foreground font-medium mb-1">Climate</p>
        <p className="text-xs text-foreground leading-relaxed">{climateSuitability}</p>
      </div>

      {uniqueIngredients?.length > 0 && (
        <div>
          <p className="text-xs uppercase tracking-widest text-muted-foreground font-medium mb-1">Unique to {label}</p>
          <div className="space-y-1">
            {uniqueIngredients.map((ing, i) => (
              <p key={i} className="text-xs text-foreground/80 leading-relaxed">• {ing}</p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}