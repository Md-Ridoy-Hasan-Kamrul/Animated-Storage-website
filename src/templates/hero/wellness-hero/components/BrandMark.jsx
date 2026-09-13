import React, { memo } from 'react';
import { LOGO_CLASS, LOGO_PATH, LOGO_VIEWBOX } from '../constants';

const BrandMark = memo(() => (
  <svg
    className={LOGO_CLASS}
    viewBox={LOGO_VIEWBOX}
    fill="currentColor"
    aria-hidden="true"
  >
    <path d={LOGO_PATH} />
  </svg>
));

BrandMark.displayName = 'BrandMark';

export default BrandMark;
