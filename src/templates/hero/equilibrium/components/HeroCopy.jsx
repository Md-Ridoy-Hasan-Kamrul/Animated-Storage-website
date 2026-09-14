import React, { memo } from 'react';
import {
  DISCOVER_CLASS,
  DISCOVER_LABEL,
  HEADLINE,
  HEADLINE_CLASS,
  HERO_CLASS,
  HERO_CTA_ROW_CLASS,
  START_CLASS,
  START_LABEL,
  SUBTITLE,
  SUBTITLE_CLASS,
} from '../constants';

const HeroCopy = memo(() => (
  <div className={HERO_CLASS}>
    <h1 className={HEADLINE_CLASS}>{HEADLINE}</h1>
    <p className={SUBTITLE_CLASS}>{SUBTITLE}</p>
    <div className={HERO_CTA_ROW_CLASS}>
      <button type="button" className={START_CLASS}>
        {START_LABEL}
      </button>
      <button type="button" className={DISCOVER_CLASS}>
        {DISCOVER_LABEL}
      </button>
    </div>
  </div>
));

HeroCopy.displayName = 'HeroCopy';

export default HeroCopy;
