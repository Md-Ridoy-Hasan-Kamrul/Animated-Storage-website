import React from 'react';
import { LOGO_SIZE } from '../constants';

const GP_PATH =
  'M 160 88 L 194 34 L 216 0 L 256 0 L 256 40 L 221.5 93.5 L 200 128 L 256 128 L 256 256 L 96 256 L 96 168 L 64.246 220 L 40 256 L 0 256 L 0 216 L 34 162 L 56 128 L 0 128 L 0 0 L 160 0 Z';

const GpLogo = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={LOGO_SIZE}
    height={LOGO_SIZE}
    viewBox="0 0 256 256"
    fill="none"
    aria-label="Grilled Pixels"
  >
    <path d={GP_PATH} fill="white" />
  </svg>
);

export default GpLogo;
