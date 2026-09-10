import React, { memo, useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(SplitText);

const LINE_COUNT = 4;

/**
 * 3D rotating tube text (GSAP SplitText).
 * Reusable empty-state for categories with no templates yet.
 */
const ComingSoonTube = memo(({ text = 'Coming Soon', className = '' }) => {
  const containerRef = useRef(null);
  const tubeRef = useRef(null);

  useLayoutEffect(() => {
    const container = containerRef.current;
    const tube = tubeRef.current;
    if (!container || !tube) return undefined;

    const lines = tube.querySelectorAll('.coming-soon-line');
    if (!lines.length) return undefined;

    gsap.set(container, { visibility: 'visible' });

    const splitLines = Array.from(lines).map(
      (line) => new SplitText(line, { type: 'chars', charsClass: 'coming-soon-char' }),
    );

    const updateOrigin = () => {
      const depth = -window.innerWidth / 8;
      return `50% 50% ${depth}`;
    };

    gsap.set(lines, { perspective: 700, transformStyle: 'preserve-3d' });

    const animTime = 0.9;
    const tl = gsap.timeline({ repeat: -1 });

    splitLines.forEach((split, index) => {
      tl.fromTo(
        split.chars,
        { rotationX: -90 },
        {
          rotationX: 90,
          stagger: 0.08,
          duration: animTime,
          ease: 'none',
          transformOrigin: updateOrigin(),
        },
        index * 0.45,
      );
    });

    const onResize = () => {
      const origin = updateOrigin();
      splitLines.forEach((split) => {
        gsap.set(split.chars, { transformOrigin: origin });
      });
    };

    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
      tl.kill();
      splitLines.forEach((split) => split.revert());
    };
  }, [text]);

  return (
    <div
      ref={containerRef}
      className={`coming-soon-tube-container flex w-full items-center justify-center ${className}`}
      style={{ visibility: 'hidden' }}
      aria-label={text}
    >
      <div ref={tubeRef} className="coming-soon-tube relative w-full">
        {Array.from({ length: LINE_COUNT }, (_, index) => (
          <h1
            // eslint-disable-next-line react/no-array-index-key
            key={`${text}-${index}`}
            className="coming-soon-line absolute left-1/2 top-1/2 m-0 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap text-center font-black uppercase leading-none text-white"
          >
            {text}
          </h1>
        ))}
      </div>
    </div>
  );
});

ComingSoonTube.displayName = 'ComingSoonTube';

export default ComingSoonTube;
