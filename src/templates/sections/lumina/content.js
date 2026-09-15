import { DETAIL_CARD_IMAGE_COUNT } from './constants';

/** Exact CloudFront source from the design prompt — do not change. */
export const HERO_VIDEO =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260429_114316_1c7889ad-2885-410e-b493-98119fee0ddb.mp4';

/** Same film, same-origin — Chromium blocks the CloudFront URL as a media src. */
export const HERO_VIDEO_LOCAL = '/images/Assets Lumina/hero.mp4';

export const PREVIEW_STILL = '/images/Assets%20Lumina/Lumina.png';

const STILLS = Array.from({ length: DETAIL_CARD_IMAGE_COUNT }, () => PREVIEW_STILL);
export const MARQUEE_GIFS = STILLS;
export const ABOUT_DECOR = {
  moon: PREVIEW_STILL,
  group: PREVIEW_STILL,
};
export const PORTRAIT_URL = PREVIEW_STILL;
export const SERVICES = [];
