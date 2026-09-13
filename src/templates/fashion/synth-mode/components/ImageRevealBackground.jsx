import React, { useRef } from 'react';
import {
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
  const { maskUrl, grid } = useImageReveal({
    followPointer: !isEmbed,
    setRawRef,
  });
  useEmbedReveal(isEmbed, setRawRef);

  const maskStyle = maskUrl
    ? {
        maskImage: `url(${maskUrl})`,
        WebkitMaskImage: `url(${maskUrl})`,
        maskSize: '100% 100%',
        WebkitMaskSize: '100% 100%',
      }
    : { opacity: 0 };

  return (
    <div className={REVEAL_WRAP_CLASS} aria-hidden="true">
      <div
        data-reveal-layer="base"
        className="absolute inset-0"
        style={{ ...LAYER, backgroundImage: `url(${BG_IMAGE_1})` }}
      />
      <div
        data-reveal-layer="reveal"
        className="absolute inset-0"
        style={{ ...LAYER, backgroundImage: `url(${BG_IMAGE_2})`, ...maskStyle }}
      />
      <svg className="absolute inset-0 h-full w-full" style={{ opacity: GRID_OPACITY }}>
        <defs>
          <pattern
            id="synth-grid"
            width={grid.cell}
            height={grid.cell}
            patternUnits="userSpaceOnUse"
            x={grid.x}
            y={grid.y}
          >
            <path
              d={gridPatternPath(grid.cell)}
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
