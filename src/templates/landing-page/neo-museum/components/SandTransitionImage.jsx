import React, { useEffect, useId, useRef } from 'react';
import { usePresence } from 'framer-motion';
import {
  SAND_DURATION_MS,
  SAND_DX,
  SAND_ENTER_DY,
  SAND_EXIT_DY,
  dissolveProgress,
  sandFilterValues,
} from '../utils/sandEase';

/**
 * SVG-filter sand / dissolve transition (AnimatePresence aware).
 */
const SandTransitionImage = ({ src, alt, className }) => {
  const [isPresent, safeToRemove] = usePresence();
  const reactId = useId();
  const filterId = useRef(`sand-${reactId.replace(/:/g, '')}`).current;
  const displaceRef = useRef(null);
  const offsetRef = useRef(null);
  const blurRef = useRef(null);
  const matrixRef = useRef(null);

  useEffect(() => {
    const start = performance.now();
    let raf = 0;

    const tick = (now) => {
      const t = Math.min(1, (now - start) / SAND_DURATION_MS);
      const dissolve = dissolveProgress(t, isPresent);
      const { scale, blur, opacity } = sandFilterValues(dissolve);
      const dy = isPresent ? dissolve * SAND_ENTER_DY : dissolve * SAND_EXIT_DY;
      const dx = isPresent ? dissolve * -SAND_DX : dissolve * SAND_DX;

      if (displaceRef.current) displaceRef.current.setAttribute('scale', String(scale));
      if (offsetRef.current) {
        offsetRef.current.setAttribute('dx', String(dx));
        offsetRef.current.setAttribute('dy', String(dy));
      }
      if (blurRef.current) blurRef.current.setAttribute('stdDeviation', String(blur));
      if (matrixRef.current) {
        matrixRef.current.setAttribute(
          'values',
          `1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 ${opacity} 0`,
        );
      }

      if (t < 1) {
        raf = requestAnimationFrame(tick);
        return;
      }
      if (!isPresent) safeToRemove();
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [isPresent, safeToRemove]);

  return (
    <>
      <svg className="absolute h-0 w-0" aria-hidden>
        <filter id={filterId} x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="1.8"
            numOctaves="4"
            result="noise"
          />
          <feDisplacementMap
            ref={displaceRef}
            in="SourceGraphic"
            in2="noise"
            scale="0"
            xChannelSelector="R"
            yChannelSelector="G"
          />
          <feOffset ref={offsetRef} dx="0" dy="0" />
          <feGaussianBlur ref={blurRef} stdDeviation="0" />
          <feColorMatrix
            ref={matrixRef}
            type="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0"
          />
        </filter>
      </svg>
      <img
        src={src}
        alt={alt}
        className={className}
        style={{ filter: `url(#${filterId})` }}
        referrerPolicy="no-referrer"
      />
    </>
  );
};

export default SandTransitionImage;
