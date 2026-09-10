import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { EXPLORATIONS_LEFT_Y, EXPLORATIONS_RIGHT_Y } from '../constants';

gsap.registerPlugin(ScrollTrigger);

/**
 * Pins center copy and parallax-scrolls left/right columns.
 * @param {{ sectionRef: React.RefObject, pinRef: React.RefObject, leftRef: React.RefObject, rightRef: React.RefObject, enabled: boolean }} opts
 */
export function useExplorationsPin({ sectionRef, pinRef, leftRef, rightRef, enabled }) {
  useEffect(() => {
    if (!enabled) return undefined;
    const section = sectionRef.current;
    const pin = pinRef.current;
    const left = leftRef.current;
    const right = rightRef.current;
    if (!section || !pin || !left || !right) return undefined;

    const scrubRange = {
      trigger: section,
      start: 'top top',
      end: 'bottom bottom',
      scrub: true,
    };

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: 'bottom bottom',
        pin,
        pinSpacing: false,
      });

      gsap.to(left, { y: EXPLORATIONS_LEFT_Y, ease: 'none', scrollTrigger: scrubRange });
      gsap.to(right, { y: EXPLORATIONS_RIGHT_Y, ease: 'none', scrollTrigger: { ...scrubRange } });
    }, section);

    return () => ctx.revert();
  }, [sectionRef, pinRef, leftRef, rightRef, enabled]);
}
