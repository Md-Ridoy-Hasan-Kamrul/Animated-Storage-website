import { useEffect, useRef } from 'react';
import {
  getEmbedTourDelay,
  getEmbedTourStep,
  pickNextTourBranch,
} from '../utils/embedTour';

export function useEmbedAutoplay({
  enabled,
  scene,
  playback,
  locked,
  pairReady,
  playBranch,
}) {
  const lastBranchRef = useRef(null);

  useEffect(() => {
    if (!enabled) return undefined;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return undefined;
    }

    const step = getEmbedTourStep({ scene, playback, locked });
    if (step === 'wait') return undefined;

    const delay = getEmbedTourDelay(step, Boolean(lastBranchRef.current));
    const timer = window.setTimeout(() => {
      if (step === 'forward') {
        const next = pickNextTourBranch(lastBranchRef.current, pairReady);
        if (!next) return;
        lastBranchRef.current = next;
        playBranch(next);
        return;
      }
      playBranch(scene);
    }, delay);

    return () => window.clearTimeout(timer);
  }, [enabled, locked, pairReady, playBranch, playback, scene]);
}
