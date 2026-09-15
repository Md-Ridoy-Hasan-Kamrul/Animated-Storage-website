import React, { useRef } from 'react';
import {
  GRID_MIN,
  GRID_OPACITY,
  GRID_STROKE,
  GRID_STROKE_WIDTH,
  REVEAL_WRAP_CLASS,
} from '../constants';
import { BG_IMAGE_1, BG_IMAGE_2 } from '../content';
import { useEmbedReveal } from '../hooks/useEmbedReveal';
import { useImageReveal } from '../hooks/useImageReveal';
import { gridPatternPath } from '../utils/revealMath';

const LAYER = {
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
};

const ImageRevealBackground = ({ isEmbed = false }) => {
  const setRawRef = useRef(null);
  const revealRef = useRef(null);
  const patternRef = useRef(null);
  const patternPathRef = useRef(null);

  useImageReveal({
    followPointer: !isEmbed,
    setRawRef,
    revealRef,
    patternRef,
    patternPathRef,
  });
  useEmbedReveal(isEmbed, setRawRef);

  return (
    <div className={REVEAL_WRAP_CLASS} aria-hidden="true">
      <div
        data-reveal-layer="base"
        className="absolute inset-0"
        style={{ ...LAYER, backgroundImage: `url(${BG_IMAGE_1})` }}
      />
      <div
        ref={revealRef}
        data-reveal-layer="reveal"
        className="absolute inset-0"
        style={{
          ...LAYER,
          backgroundImage: `url(${BG_IMAGE_2})`,
          opacity: 0,
          maskSize: '100% 100%',
          WebkitMaskSize: '100% 100%',
        }}
      />
      <svg className="absolute inset-0 h-full w-full" style={{ opacity: GRID_OPACITY }}>
        <defs>
          <pattern
            ref={patternRef}
            id="synth-grid"
            width={GRID_MIN}
            height={GRID_MIN}
            patternUnits="userSpaceOnUse"
            x={0}
            y={0}
          >
            <path
              ref={patternPathRef}
              d={gridPatternPath(GRID_MIN)}
              fill="none"
              stroke={GRID_STROKE}
              strokeWidth={GRID_STROKE_WIDTH}
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#synth-grid)" />
      </svg>
    </div>
  );
};

export default ImageRevealBackground;
