import React from 'react';
import { FRAME_TITLE, SOURCE_URL } from './constants';
import { LandingPageFrame } from './LandingPageFrame';
import {
  GEIST,
  INSTRUMENT_SERIF,
  IOWAN_OLD_STYLE,
  NEWSREADER,
  splitTypographyProps,
  usePageTypography,
} from './pageTypography';

const n = (value) => Number(value.toFixed(3));
const px = (value) => `${n(value)}px`;

/** Authored recipe from ThreeUI pageRecipes — BESTSELLERS_TYPOGRAPHY. */
export const BESTSELLERS_TYPOGRAPHY = {
  headingFonts: [IOWAN_OLD_STYLE, INSTRUMENT_SERIF, NEWSREADER, GEIST],
  bodyFonts: [IOWAN_OLD_STYLE, GEIST, NEWSREADER, INSTRUMENT_SERIF],
  headingWeights: ['400', '500', '600', '700'],
  headingWeight: '500',
  bodyWeights: ['400', '500', '600', '700'],
  bodyWeight: '400',
  primaryColor: '#c3a47b',
  headingSize: [184, 325, 420],
  bodySize: [12, 17, 24],
  headingLetterSpacing: [-0.12, -0.085, 0.08],
  css: (type) => `
:root {
  --pink: ${type.primary};
  --pink-bright: ${type.retone('#dbc39c')};
  --periwinkle: ${type.retone('#b7976c')};
}
body { font-family: ${type.body}; font-weight: ${type.bodyWeight}; }
.brand, .hero-word, .detail-title, .cover-title {
  font-family: ${type.heading};
  font-weight: ${type.headingWeight};
}
.hero-word {
  font-size: clamp(184px, 22vw, ${px(type.headingSize)});
  letter-spacing: ${type.headingLetterSpacing}em;
}
.detail-title {
  font-size: clamp(52px, 5.7vw, ${px((type.headingSize * 82) / 325)});
  letter-spacing: ${n(type.headingLetterSpacing + 0.03)}em;
}
.detail-description { font-size: clamp(12px, 1.28vw, ${px(type.bodySize)}); font-weight: ${type.bodyWeight}; }
@media (max-width: 900px) {
  .hero-word { font-size: clamp(128px, 28vw, ${px((type.headingSize * 230) / 325)}); }
  .detail-title { font-size: clamp(48px, 10vw, ${px((type.headingSize * 70) / 325)}); }
}
@media (max-width: 560px) {
  .hero-word { font-size: calc(${n(type.headingSize / 325)} * 38vw); }
}
`,
};

/** Field Manuals is served byte-for-byte from the packaged URL. */
export function BestsellersBookShowcase(props) {
  const [type, frame] = splitTypographyProps(props);
  const customization = usePageTypography(BESTSELLERS_TYPOGRAPHY, type);

  return (
    <LandingPageFrame
      {...frame}
      customization={customization}
      title={FRAME_TITLE}
      sourceUrl={SOURCE_URL}
    />
  );
}

export default BestsellersBookShowcase;
