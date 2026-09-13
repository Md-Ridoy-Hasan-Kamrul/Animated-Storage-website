import { useEffect } from 'react';
import { EMBED_LOOP_MS } from '../constants';
import { embedCursorAt } from '../utils/spotlightMath';

export function useEmbedSpotlight(enabled, setRaw) {
  useEffect(() => {
    if (!enabled) return undefined;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    let raf = 0;
    let startedAt = 0;

    const tick = (now) => {
      if (!startedAt) startedAt = now;
      const progress = ((now - startedAt) % EMBED_LOOP_MS) / EMBED_LOOP_MS;
      const next = embedCursorAt(progress, window.innerWidth, window.innerHeight);
      setRaw(next.x, next.y);
      raf = window.requestAnimationFrame(tick);
    };

    raf = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(raf);
  }, [enabled, setRaw]);
}
