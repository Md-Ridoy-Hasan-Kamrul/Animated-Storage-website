import React, { memo } from 'react';
import { BADGE_PATH, BADGE_VIEWBOX } from '../constants';

const BadgeGlyph = memo(() => (
  <svg viewBox={BADGE_VIEWBOX} className="badge-glyph" aria-hidden="true" focusable="false">
    <path d={BADGE_PATH} fill="#fff" fillRule="evenodd" />
  </svg>
));

BadgeGlyph.displayName = 'BadgeGlyph';

export default BadgeGlyph;
