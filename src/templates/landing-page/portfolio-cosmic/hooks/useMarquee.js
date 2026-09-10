import { useEffect } from 'react';
import gsap from 'gsap';
import { MARQUEE_DURATION_S } from '../constants';

/** Infinite horizontal marquee via xPercent -50 loop. */
export function useMarquee(trackRef, enabled) {
  useEffect(() => {
    if (!enabled) return undefined;
    const track = trackRef.current;
    if (!track) return undefined;

    const tween = gsap.to(track, {
      xPercent: -50,
      duration: MARQUEE_DURATION_S,
      ease: 'none',
      repeat: -1,
    });

    return () => {
      tween.kill();
    };
  }, [trackRef, enabled]);
}
