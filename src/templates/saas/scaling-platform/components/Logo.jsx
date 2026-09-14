import React, { memo } from 'react';
import { BRAND_NAME, HERO_ID } from '../constants';

const Logo = memo(() => (
  <a className="sp-logo" href={`#${HERO_ID}`} aria-label="targo home">
    <span className="sp-logo-mark" aria-hidden="true">
      <span className="sp-logo-ellipse" />
    </span>
    <span className="sp-logo-word">{BRAND_NAME}</span>
  </a>
));

Logo.displayName = 'Logo';

export default Logo;
