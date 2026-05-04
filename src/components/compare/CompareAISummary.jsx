import React from 'react';
import { Sparkles } from 'lucide-react';

export default function CompareAISummary({ summary, leftName, rightName }) {
  const winnerName = summary.winner === 'A' ? leftName : summary.winner === 'B' ? rightName : null;

  return (
    <div className="p-4 rounded-2xl bg-primary/10 border border-primary/20">
      <div className="flex items-center gap-2 mb-2">
        <Sparkles className="w-4 h-4 text-primary" />
        <p className="text-xs uppercase tracking-widest text-primary font-semibold">AI Verdict</p>
      </div>
      {winnerName && (
        <p className="font-heading text-base font-semibold mb-1">
          {winnerName} is the better choice for you
        </p>
      )}
      {summary.winner === 'tie' && (
        <p className="font-heading text-base font-semibold mb-1">It's a tie!</p>
      )}
      <p className="text-sm text-foreground/80 leading-relaxed">{summary.winner_reason}</p>
    </div>
  );
}