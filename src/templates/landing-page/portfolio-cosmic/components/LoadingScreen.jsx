import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useLoadingCounter } from '../hooks/useLoadingCounter';
import { padCount } from '../utils/loadingProgress';

/**
 * Full-screen loading overlay with counter + cycling words.
 */
const LoadingScreen = ({ onComplete }) => {
  const { count, word, wordIndex } = useLoadingCounter({
    enabled: true,
    onComplete,
  });

  return (
    <div
      className="pc-bg fixed inset-0 z-[9999] text-[hsl(var(--text))]"
      role="status"
      aria-live="polite"
      aria-label={`Loading ${count} percent`}
    >
      <motion.p
        className="pc-muted absolute left-6 top-6 text-xs uppercase tracking-[0.3em] md:left-10 md:top-10"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        Portfolio
      </motion.p>

      <div className="flex h-full items-center justify-center px-4">
        <AnimatePresence mode="wait">
          <motion.span
            key={wordIndex}
            className="pc-font-display text-4xl italic text-[hsl(var(--text)/0.8)] md:text-6xl lg:text-7xl"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
          >
            {word}
          </motion.span>
        </AnimatePresence>
      </div>

      <p className="pc-font-display pc-text absolute bottom-16 right-6 tabular-nums text-6xl md:bottom-20 md:right-10 md:text-8xl lg:text-9xl">
        {padCount(count)}
      </p>

      <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[hsl(var(--stroke)/0.5)]">
        <div
          className="accent-gradient pc-progress-glow h-full origin-left"
          style={{ transform: `scaleX(${count / 100})` }}
        />
      </div>
    </div>
  );
};

export default LoadingScreen;
