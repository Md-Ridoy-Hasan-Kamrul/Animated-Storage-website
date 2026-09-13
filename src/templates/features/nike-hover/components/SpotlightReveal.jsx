import React, { useEffect, useRef } from 'react';
import {
  NUM_TRAILS,
  TRAIL_HIDDEN,
  TRAIL_OPACITY_STEP,
  TRAIL_RADIUS_STEP,
} from '../constants';
import { useEmbedSpotlight } from '../hooks/useEmbedSpotlight';
import { useSpotlightTrail } from '../hooks/useSpotlightTrail';
import { trailIndexFromReverse, trailOpacity, trailRadius } from '../utils/trailMath';
import { setVideoPlayback } from '../utils/videoPlayback';

const SpotlightReveal = ({
  imageSrc,
  videoSrc,
  isPlaying = true,
  baseRadius = 420,
  tourCursor = false,
}) => {
  const videoRef = useRef(null);
  const circleRefs = useRef([]);
  const { setTarget } = useSpotlightTrail(circleRefs, !tourCursor);

  useEmbedSpotlight(tourCursor, setTarget);

  useEffect(() => {
    setVideoPlayback(videoRef.current, isPlaying);
  }, [isPlaying]);

  const trails = Array.from({ length: NUM_TRAILS }, (_, reversedIndex) =>
    trailIndexFromReverse(NUM_TRAILS, reversedIndex),
  );

  return (
    <div className="pointer-events-none absolute inset-0 z-0 flex h-full w-full items-center justify-center overflow-hidden bg-black">
      <div className="pointer-events-none absolute inset-0 flex h-full w-full items-center justify-center overflow-hidden">
        <video
          ref={videoRef}
          src={videoSrc}
          className="absolute inset-0 h-full w-full object-cover"
          muted
          loop
          playsInline
        />
      </div>
      <svg className="absolute inset-0 h-full w-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="holeGradient">
            <stop offset="0%" stopColor="black" stopOpacity="1" />
            <stop offset="60%" stopColor="black" stopOpacity="0.8" />
            <stop offset="100%" stopColor="black" stopOpacity="0" />
          </radialGradient>
          <mask
            id="spotlight-mask"
            maskContentUnits="userSpaceOnUse"
            x="0"
            y="0"
            width="100%"
            height="100%"
          >
            <rect width="100%" height="100%" fill="white" />
            {trails.map((index) => (
              <circle
                key={`trail-${index}`}
                id={`trail-${index}`}
                ref={(node) => {
                  circleRefs.current[index] = node;
                }}
                cx={TRAIL_HIDDEN}
                cy={TRAIL_HIDDEN}
                r={trailRadius(baseRadius, index, TRAIL_RADIUS_STEP)}
                fill="url(#holeGradient)"
                opacity={trailOpacity(index, TRAIL_OPACITY_STEP)}
              />
            ))}
          </mask>
        </defs>
        <image
          href={imageSrc}
          width="100%"
          height="100%"
          preserveAspectRatio="xMidYMid slice"
          mask="url(#spotlight-mask)"
        />
      </svg>
    </div>
  );
};

export default SpotlightReveal;
