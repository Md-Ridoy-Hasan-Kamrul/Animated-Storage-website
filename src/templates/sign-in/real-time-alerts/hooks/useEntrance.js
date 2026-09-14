import { useEffect } from 'react';
import {
  COMPACT_MQ,
  ENTRANCE_STEPS,
  ENTRY_PENDING_CLASS,
  FONT_WAIT_MS,
  REDUCE_MQ,
} from '../constants';
import { easingFor, entranceFrom, entranceTo } from '../utils/entrance';

function releaseEntrance() {
  document.documentElement.classList.remove(ENTRY_PENDING_CLASS);
  window.clearTimeout(window.__entryFallback);
}

export function useEntrance(rootRef) {
  useEffect(() => {
    const reduce = window.matchMedia(REDUCE_MQ).matches;
    const compact = window.matchMedia(COMPACT_MQ).matches;

    if (reduce || typeof Element === 'undefined' || typeof Element.prototype.animate !== 'function') {
      releaseEntrance();
      return undefined;
    }

    let cancelled = false;
    let animations = [];

    const start = () => {
      if (cancelled) return;
      const root = rootRef.current;
      if (!root) {
        releaseEntrance();
        return;
      }
      animations = ENTRANCE_STEPS.map((step) => {
        const el = root.querySelector(step.selector);
        if (!el) return null;
        return el.animate([entranceFrom(step.kind, compact), entranceTo(step.kind)], {
          delay: step.delay,
          duration: step.duration,
          easing: easingFor(step.easing),
          fill: 'both',
        });
      }).filter(Boolean);
      document.documentElement.classList.remove(ENTRY_PENDING_CLASS);
      Promise.allSettled(animations.map((item) => item.finished)).then(() => {
        animations.forEach((item) => item.cancel());
        animations = [];
        releaseEntrance();
      });
    };

    const fontsReady = document.fonts?.ready || Promise.resolve();
    Promise.race([fontsReady, new Promise((resolve) => window.setTimeout(resolve, FONT_WAIT_MS))]).then(() => {
      requestAnimationFrame(() => requestAnimationFrame(start));
    });

    return () => {
      cancelled = true;
      animations.forEach((item) => item.cancel());
      releaseEntrance();
    };
  }, [rootRef]);
}
