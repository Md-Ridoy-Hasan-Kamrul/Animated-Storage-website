import { DETAIL_CARD_IMAGE_COUNT } from './constants';

/** Exact CloudFront source from the design prompt — do not change. */
export const HERO_VIDEO =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260622_204221_5339e40b-e73d-4ab0-9c65-79c18c66fd50.mp4';

/** Same film, same-origin — Chromium blocks the CloudFront URL as a media src. */
export const HERO_VIDEO_LOCAL = '/images/Assets Foldcraft/hero.mp4';

export const PREVIEW_STILL = '/images/Assets Foldcraft/preview.svg';

const STILLS = Array.from({ length: DETAIL_CARD_IMAGE_COUNT }, () => PREVIEW_STILL);
export const MARQUEE_GIFS = STILLS;
export const ABOUT_DECOR = {
  moon: PREVIEW_STILL,
  group: PREVIEW_STILL,
};
export const PORTRAIT_URL = PREVIEW_STILL;
export const SERVICES = [];
