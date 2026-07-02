import React, { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const THRESHOLD = 72;

export default function PullToRefresh({ onRefresh, children }) {
  const [dragging, setDragging] = useState(false);
  const [delta, setDelta] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const startYRef = useRef(0);

  const handleTouchStart = useCallback((e) => {
    if (window.scrollY !== 0) return;
    startYRef.current = e.touches[0].clientY;
    setDragging(true);
  }, []);

  const handleTouchMove = useCallback((e) => {
    if (!dragging) return;
    const dy = e.touches[0].clientY - startYRef.current;
    if (dy > 0) setDelta(Math.min(dy, THRESHOLD * 1.5));
  }, [dragging]);

  const handleTouchEnd = useCallback(async () => {
    setDragging(false);
    if (delta >= THRESHOLD && !refreshing) {
      setDelta(THRESHOLD);
      setRefreshing(true);
      await onRefresh();
      setRefreshing(false);
    }
    setDelta(0);
  }, [delta, refreshing, onRefresh]);

  const progress = Math.min(delta / THRESHOLD, 1);
  const showIndicator = delta > 8 || refreshing;

  return (
    <div style={{ touchAction: 'pan-y' }} onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd}>
      <AnimatePresence>
        {showIndicator && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: refreshing ? 48 : Math.max(delta * 0.6, 8), opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ type: 'spring', damping: 20, stiffness: 200 }}
            className="flex justify-center items-center overflow-hidden"
          >
            {refreshing ? (
              <>
                <div className="w-5 h-5 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                <span className="ml-2 text-xs text-muted-foreground">Refreshing...</span>
              </>
            ) : (
              <motion.div
                style={{ scale: progress, opacity: progress }}
                className="w-5 h-5 border-2 border-primary/40 rounded-full flex items-center justify-center"
              >
                <div
                  className="w-3 h-3 rounded-full bg-primary/60"
                  style={{ transform: `scale(${progress})` }}
                />
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
      {children}
    </div>
  );
}