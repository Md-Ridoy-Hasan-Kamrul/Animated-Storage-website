import React from 'react';
import { BRAND_NAME, LOGO_FILL, LOGO_PATH, LOGO_SIZE, LOGO_VIEWBOX } from '../constants';

const LithosMark = () => (
  <a href="#course" className="flex items-center gap-2">
    <svg
      width={LOGO_SIZE}
      height={LOGO_SIZE}
      viewBox={LOGO_VIEWBOX}
      fill={LOGO_FILL}
      aria-hidden="true"
    >
      <path d={LOGO_PATH} />
    </svg>
    <span className="font-playfair text-2xl italic text-white">{BRAND_NAME}</span>
  </a>
);

export default LithosMark;
