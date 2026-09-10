import { useEffect } from 'react';
import gsap from 'gsap';

/** Hero entrance timeline for .name-reveal and .blur-in */
export function useHeroEntrance(enabled) {
  useEffect(() => {
    if (!enabled) return undefined;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.fromTo(
        '.name-reveal',
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1.2, delay: 0.1 },
        0,
      );
      tl.fromTo(
        '.blur-in',
        { opacity: 0, y: 20, filter: 'blur(10px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1, stagger: 0.1, delay: 0.3 },
        0,
      );
    });

    return () => ctx.revert();
  }, [enabled]);
}
