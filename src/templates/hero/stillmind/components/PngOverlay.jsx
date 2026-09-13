import React, { memo } from 'react';
import { OVERLAY_PNG } from '../content';

const PngOverlay = memo(() => (
  <img
    src={OVERLAY_PNG}
    alt=""
    className="stillmind-train-bob pointer-events-none absolute inset-0 z-[1] h-full w-full object-cover"
  />
));

PngOverlay.displayName = 'PngOverlay';

export default PngOverlay;
