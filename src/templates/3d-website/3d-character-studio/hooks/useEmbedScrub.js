import { useEffect } from 'react';
import { EMBED_SCRUB_STEP } from '../constants';
import { clampTime } from '../utils/mouseScrub';

export function useEmbedScrub(videoRef, enabled) {
  useEffect(() => {
    if (!enabled) return undefined;
    const video = videoRef.current;
    if (!video) return undefined;

    let raf = 0;
    let dir = 1;
    const tick = () => {
      const duration = video.duration || 0;
      if (duration > 0) {
        const next = clampTime(video.currentTime + dir * EMBED_SCRUB_STEP, duration);
        try {
          video.currentTime = next;
        } catch {
          /* ignore */
        }
        if (next >= duration) dir = -1;
        if (next <= 0) dir = 1;
      }
      raf = window.requestAnimationFrame(tick);
    };
    raf = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(raf);
  }, [enabled, videoRef]);
}
