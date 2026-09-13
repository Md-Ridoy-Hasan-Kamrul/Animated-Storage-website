import { useEffect } from 'react';
import { DT_MAX, EMBED_LOOP_MS, EMBED_SCROLL_DELAY_MS } from '../constants';
import { advanceEmbedProgress, scrollYFromProgress } from '../utils/embedTour';

function maxScroll() {
  return Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
}

export function useEmbedAutoplay(enabled) {
  useEffect(() => {
    if (!enabled) return undefined;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    const html = document.documentElement;
    html.classList.add('jack-embed');
    html.style.scrollBehavior = 'auto';

    let raf = 0;
    let dir = 1;
    let progress = 0;
    let lastTs = 0;
    let started = false;
    const startAt = performance.now() + EMBED_SCROLL_DELAY_MS;
    const loopSeconds = EMBED_LOOP_MS / 1000;

    const tick = (now) => {
      if (now < startAt) {
        raf = window.requestAnimationFrame(tick);
        return;
      }
      if (!started) {
        started = true;
        lastTs = now;
      }
      const dt = Math.min(DT_MAX, (now - lastTs) / 1000);
      lastTs = now;
      const stepped = advanceEmbedProgress(progress, dir, dt, loopSeconds);
      progress = stepped.progress;
      dir = stepped.dir;
      window.scrollTo(0, scrollYFromProgress(progress, maxScroll()));
      raf = window.requestAnimationFrame(tick);
    };

    raf = window.requestAnimationFrame(tick);
    return () => {
      window.cancelAnimationFrame(raf);
      html.classList.remove('jack-embed');
      window.scrollTo(0, 0);
    };
  }, [enabled]);
}
