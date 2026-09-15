import React from 'react';
import { FRAME_TITLE, SOURCE_URL } from './constants';
import { LandingPageFrame } from './LandingPageFrame';
import {
  GEIST,
  INSTRUMENT_SERIF,
  INTER_LOADED,
  IOWAN_OLD_STYLE,
  NEWSREADER,
  splitTypographyProps,
  usePageTypography,
} from './pageTypography';

const n = (value) => Number(value.toFixed(3));
const px = (value) => `${n(value)}px`;

/** Authored recipe from ThreeUI pageRecipes — COMPLETE_SHELF_TYPOGRAPHY. */
export const COMPLETE_SHELF_TYPOGRAPHY = {
  headingFonts: [IOWAN_OLD_STYLE, INSTRUMENT_SERIF, NEWSREADER, GEIST],
  bodyFonts: [INTER_LOADED, GEIST, NEWSREADER, INSTRUMENT_SERIF],
  headingWeights: ['400', '500', '600'],
  headingWeight: '400',
  bodyWeights: ['400', '500', '600'],
  bodyWeight: '400',
  primaryColor: '#c87046',
  headingSize: [32, 60, 88],
  bodySize: [10, 12, 18],
  headingLetterSpacing: [-0.1, -0.055, 0.08],
  css: (type) => `
:root { --accent: ${type.primary}; }
body { font-family: ${type.body}; font-weight: ${type.bodyWeight}; }
.selection__title, .detail-title, .editorial-identity strong, .page-status strong {
  font-family: ${type.heading};
  font-weight: ${type.headingWeight};
}
.selection__title {
  font-size: clamp(32px, 3.4vw, ${px(type.headingSize)});
  letter-spacing: ${type.headingLetterSpacing}em;
}
.detail-title {
  font-size: clamp(56px, 6.3vw, ${px((type.headingSize * 107.2) / 60)});
  letter-spacing: ${n(type.headingLetterSpacing - 0.01)}em;
}
.selection__note { font-size: ${px(type.bodySize)}; font-weight: ${type.bodyWeight}; }
.detail-deck { font-family: ${type.body}; font-weight: ${type.bodyWeight}; }
@media (max-width: 880px) {
  .selection__title { font-size: clamp(32px, 9vw, ${px((type.headingSize * 56) / 60)}); }
  .detail-title { font-size: clamp(48px, 14vw, ${px((type.headingSize * 80) / 60)}); }
}
@media (max-width: 560px) {
  .selection__title { font-size: ${px((type.headingSize * 32) / 60)}; }
}
`,
};

/** Working Volumes is served byte-for-byte from the packaged URL. */
export function CompleteShelfLandingPage(props) {
  const [type, frame] = splitTypographyProps(props);
  const customization = usePageTypography(COMPLETE_SHELF_TYPOGRAPHY, type);

  return (
    <LandingPageFrame
      {...frame}
      customization={customization}
      title={FRAME_TITLE}
      sourceUrl={SOURCE_URL}
    />
  );
}

export default CompleteShelfLandingPage;
