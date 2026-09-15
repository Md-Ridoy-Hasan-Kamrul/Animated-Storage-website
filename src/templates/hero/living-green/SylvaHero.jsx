import React from 'react';
import { FRAME_TITLE, SOURCE_URL, SYLVA_VARIANT } from './constants';
import { LandingPageFrame } from './LandingPageFrame';
import {
  GEIST,
  INSTRUMENT_SERIF,
  LEXEND_LOADED,
  NEWSREADER,
  splitTypographyProps,
  usePageTypography,
} from './pageTypography';

const n = (value) => Number(value.toFixed(3));
const unit = (value) => `calc(${n(value)} * var(--u))`;

const ALPHA_HEX_BASE = 16;
const RGB_CHANNEL_STEP = 2;

function withAlpha(hex, alpha) {
  const digits = hex.replace('#', '');
  const [red, green, blue] = [0, 2, 4].map((offset) =>
    Number.parseInt(digits.slice(offset, offset + RGB_CHANNEL_STEP), ALPHA_HEX_BASE),
  );
  return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
}

/** Authored recipe from ThreeUI pageRecipes — SYLVA_TYPOGRAPHY. */
export const SYLVA_TYPOGRAPHY = {
  headingFonts: [LEXEND_LOADED, INSTRUMENT_SERIF, NEWSREADER, GEIST],
  bodyFonts: [LEXEND_LOADED, GEIST, NEWSREADER, INSTRUMENT_SERIF],
  headingWeights: ['200', '300', '400', '500', '600'],
  headingWeight: '300',
  bodyWeights: ['200', '300', '400', '500'],
  bodyWeight: '300',
  primaryColor: '#ffffff',
  headingSize: [40, 63, 92],
  bodySize: [12, 16.5, 24],
  headingLetterSpacing: [-0.06, -0.006, 0.12],
  css: (type) => `
:root {
 --ink: ${type.primary};
 --ink-soft: ${withAlpha(type.primary, 0.62)};
 --ink-faint: ${withAlpha(type.primary, 0.44)};
}
body { font-family: ${type.body}; font-weight: ${type.bodyWeight}; }
.headline, .ghost {
 font-family: ${type.heading};
}
.headline {
 font-weight: ${type.headingWeight};
 font-size: ${unit(type.headingSize)};
 line-height: ${unit((type.headingSize * 65) / 63)};
 letter-spacing: ${type.headingLetterSpacing}em;
}
.lede {
 font-weight: ${type.bodyWeight};
 font-size: ${unit(type.bodySize)};
 line-height: ${unit((type.bodySize * 22) / 16.5)};
}
@media (max-width: 900px) {
 .headline {
 font-size: ${unit((type.headingSize * 62) / 63)};
 line-height: ${unit((type.headingSize * 66) / 63)};
 }
 .lede {
 font-size: ${unit((type.bodySize * 19) / 16.5)};
 line-height: ${unit((type.bodySize * 27) / 16.5)};
 }
}
`,
};

/**
 * Living Green is served byte-for-byte from the packaged URL.
 * Other variants would use srcDoc; this card only mounts living-green.
 */
export function SylvaHero({ variant = SYLVA_VARIANT, ...props }) {
  // This card only mounts Living Green; other variants stay on the packaged URL.
  const safeVariant = variant === 'living-green' ? 'living-green' : 'living-green';
  const [type, frame] = splitTypographyProps(props);
  const customization = usePageTypography(SYLVA_TYPOGRAPHY, type);

  return (
    <LandingPageFrame
      {...frame}
      key={safeVariant}
      customization={customization}
      title={FRAME_TITLE}
      sourceUrl={SOURCE_URL}
    />
  );
}

export default SylvaHero;
