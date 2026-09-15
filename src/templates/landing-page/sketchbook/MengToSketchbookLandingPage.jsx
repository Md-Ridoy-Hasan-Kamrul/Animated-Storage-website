import React from 'react';
import { SOURCE_URL } from './constants';
import { LandingPageFrame } from './LandingPageFrame';
import {
  GEIST,
  INSTRUMENT_SERIF_LOADED,
  NEWSREADER_LOADED,
  splitTypographyProps,
  usePageTypography,
} from './pageTypography';

const n = (value) => Number(value.toFixed(3));
const px = (value) => `${n(value)}px`;

const ALPHA_HEX_BASE = 16;
const RGB_CHANNEL_STEP = 2;

function withAlpha(hex, alpha) {
  const digits = hex.replace('#', '');
  const [red, green, blue] = [0, 2, 4].map((offset) =>
    Number.parseInt(digits.slice(offset, offset + RGB_CHANNEL_STEP), ALPHA_HEX_BASE),
  );
  return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
}

/** Authored recipe from ThreeUI pageRecipes — MENG_TO_SKETCHBOOK_TYPOGRAPHY. */
export const MENG_TO_SKETCHBOOK_TYPOGRAPHY = {
  headingFonts: [INSTRUMENT_SERIF_LOADED, NEWSREADER_LOADED, GEIST],
  bodyFonts: [NEWSREADER_LOADED, GEIST, INSTRUMENT_SERIF_LOADED],
  headingWeights: ['300', '400', '500', '600'],
  headingWeight: '400',
  bodyWeights: ['200', '300', '400', '500', '600'],
  bodyWeight: '400',
  primaryColor: '#2b2721',
  headingSize: [20, 30, 48],
  bodySize: [14, 20, 30],
  headingLetterSpacing: [-0.06, 0.01, 0.12],
  css: (type) => `
:root {
  --ink: ${type.primary};
  --ink-soft: ${withAlpha(type.primary, 0.58)};
  --ink-faint: ${withAlpha(type.primary, 0.36)};
  --hairline: ${withAlpha(type.primary, 0.14)};
  --display: ${type.heading};
  --font: ${type.body};
}
body { font-family: ${type.body}; font-weight: ${type.bodyWeight}; }
.top .name, .plate .t { font-family: ${type.heading}; font-weight: ${type.headingWeight}; }
.top .name {
  font-size: clamp(${px((type.headingSize * 24) / 30)}, calc(${n(type.headingSize / 30)} * 2.4vw), ${px(type.headingSize)});
  letter-spacing: ${type.headingLetterSpacing}em;
}
.plate .t {
  font-size: clamp(${px((type.headingSize * 19) / 30)}, calc(${n(type.headingSize / 30)} * 2.1vw), ${px((type.headingSize * 26) / 30)});
  letter-spacing: ${n(type.headingLetterSpacing - 0.01)}em;
}
.top nav { font-size: ${px((type.bodySize * 15) / 20)}; font-weight: ${type.bodyWeight === '400' ? '300' : type.bodyWeight}; }
.hero-kicker { font-size: ${px((type.bodySize * 12) / 20)}; font-weight: ${type.bodyWeight}; }
.sb-caption { font-size: ${px((type.bodySize * 13) / 20)}; }
.sb-hint, .section-label, .zoom-read { font-size: ${px((type.bodySize * 11) / 20)}; }
.bio {
  font-size: clamp(${px((type.bodySize * 17) / 20)}, calc(${n(type.bodySize / 20)} * 1.7vw), ${px(type.bodySize)});
  font-weight: ${type.bodyWeight === '400' ? '300' : type.bodyWeight};
}
.plate .n { font-size: ${px((type.bodySize * 12) / 20)}; }
.plate .p { font-size: ${px((type.bodySize * 12.5) / 20)}; }
.foot { font-size: ${px((type.bodySize * 11.5) / 20)}; }
::selection { background: ${withAlpha(type.primary, 0.85)}; }
.bio-link { text-decoration-color: ${withAlpha(type.primary, 0.28)}; }
@media (max-width: 640px) {
  .top .name { font-size: ${px((type.headingSize * 20) / 30)}; }
  .top nav { font-size: ${px((type.bodySize * 13) / 20)}; }
  .hero-kicker { font-size: ${px((type.bodySize * 10.5) / 20)}; }
  .sb-hint { font-size: ${px((type.bodySize * 9.5) / 20)}; }
}
`,
};

export function MengToSketchbookLandingPage(props) {
  const [type, frame] = splitTypographyProps(props);
  const customization = usePageTypography(MENG_TO_SKETCHBOOK_TYPOGRAPHY, type);

  return (
    <LandingPageFrame
      {...frame}
      title="Meng To — Singapore Sketchbook"
      sourceUrl={SOURCE_URL}
      customization={customization}
    />
  );
}

export default MengToSketchbookLandingPage;
