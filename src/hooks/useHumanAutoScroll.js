import { useEffect } from 'react';

/**
 * Embed preview auto-scroll that mimics human wheel scrolling:
 * continuous small steps, slight speed jitter, brief reading pauses.
 * Does NOT jump section-to-section.
 */
export function useHumanAutoScroll() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('embed') !== '1') return undefined;

    document.documentElement.classList.add('jack-embed');

    let cancelled = false;
    let rafId = 0;
    let y = 0;
    let dir = 1;
    let speed = 4.8;
    let pauseUntil = 0;
    let nextJitterAt = 0;
    let nextPauseAt = 0;
    let started = false;

    const maxScroll = () =>
      Math.max(0, document.documentElement.scrollHeight - window.innerHeight);

    const schedule = () => {
      const now = performance.now();
      nextJitterAt = now + 280 + Math.random() * 520;
      nextPauseAt = now + 4200 + Math.random() * 3800;
    };

    const tick = (now) => {
      if (cancelled) return;

      if (!started) {
        if (now < pauseUntil) {
          rafId = requestAnimationFrame(tick);
          return;
        }
        started = true;
        schedule();
      }

      if (now < pauseUntil) {
        rafId = requestAnimationFrame(tick);
        return;
      }

      const max = maxScroll();
      if (max < 40) {
        rafId = requestAnimationFrame(tick);
        return;
      }

      if (now >= nextJitterAt) {
        // Faster human-like wheel (~250–420 px/s at 60fps)
        speed = 3.8 + Math.random() * 3.2;
        nextJitterAt = now + 250 + Math.random() * 500;
      }

      if (now >= nextPauseAt) {
        pauseUntil = now + 90 + Math.random() * 180;
        nextPauseAt = now + 4000 + Math.random() * 3500;
        rafId = requestAnimationFrame(tick);
        return;
      }

      y += dir * speed;

      if (y >= max) {
        y = max;
        window.scrollTo(0, y);
        dir = -1;
        pauseUntil = now + 500 + Math.random() * 280;
        speed = 5.5;
        rafId = requestAnimationFrame(tick);
        return;
      }

      if (y <= 0) {
        y = 0;
        window.scrollTo(0, y);
        dir = 1;
        pauseUntil = now + 400 + Math.random() * 220;
        speed = 4.8;
        rafId = requestAnimationFrame(tick);
        return;
      }

      window.scrollTo(0, y);
      rafId = requestAnimationFrame(tick);
    };

    pauseUntil = performance.now() + 700;
    rafId = requestAnimationFrame(tick);

    return () => {
      cancelled = true;
      cancelAnimationFrame(rafId);
      document.documentElement.classList.remove('jack-embed');
      window.scrollTo(0, 0);
    };
  }, []);
}
