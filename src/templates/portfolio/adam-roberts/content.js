import { DETAIL_CARD_IMAGE_COUNT, SERVICES_LIST } from './constants';

/** Exact CloudFront source from the design prompt — do not change. */
export const HERO_VIDEO =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260725_114042_d2ed2a89-f2fa-449b-9609-da456344257b.mp4';

/** Same file, same-origin — Chromium blocks the CloudFront URL as a media src. */
export const HERO_VIDEO_LOCAL = '/images/Assets Adam Roberts/hero.mp4';

export const PREVIEW_STILL = '/images/Assets Adam Roberts/preview.svg';

export const BRAND_BLURB_LINES = Object.freeze([
  'Grilled Pixels is my',
  'personal brand - I came up',
  'with it in 2004 based on',
  '"cooking up ideas"',
]);

export const WHAT_I_DO =
  'I create the top 1% of experiences for brands and digital products';

export const FOOTER_AVAILABILITY = 'Open to freelance, contract or full-time. ';
export const FOOTER_STATS = '5 full cases • 82 archive fragments • 22 catalog items';

const STILLS = Array.from({ length: DETAIL_CARD_IMAGE_COUNT }, () => PREVIEW_STILL);
export const MARQUEE_GIFS = STILLS;
export const ABOUT_DECOR = {
  moon: PREVIEW_STILL,
  group: PREVIEW_STILL,
};
export const PORTRAIT_URL = PREVIEW_STILL;
export const SERVICES = SERVICES_LIST.map((name, index) => ({
  number: String(index + 1).padStart(2, '0'),
  name,
  description: name,
}));
