import { DETAIL_CARD_IMAGE_COUNT } from './constants';

export const HERO_VIDEO =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260511_230229_7c9bc431-46cf-489a-948d-e8144d8eb5d4.mp4';

export const HERO_VIDEO_LOCAL = '/images/Assets Equilibrium/hero.mp4';
export const PREVIEW_STILL = '/images/Assets%20Equilibrium/Equilibrium.png';

const STILLS = Array.from({ length: DETAIL_CARD_IMAGE_COUNT }, () => PREVIEW_STILL);
export const MARQUEE_GIFS = STILLS;
export const ABOUT_DECOR = { moon: PREVIEW_STILL, group: PREVIEW_STILL };
export const PORTRAIT_URL = PREVIEW_STILL;
export const SERVICES = [];
