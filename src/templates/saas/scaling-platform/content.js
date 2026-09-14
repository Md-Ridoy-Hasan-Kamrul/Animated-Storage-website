import { DETAIL_CARD_IMAGE_COUNT } from './constants';

export const HERO_VIDEO =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260823_050407_500d0339-ab28-41c1-9688-132a74a3b5aa.mp4';

export const ABOUT_VIDEO =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260823_063501_2e2c8971-de1e-473a-8611-a0c9ae7ee186.mp4';

export const HERO_VIDEO_LOCAL = '/images/scaling-platform/hero.mp4?v=hd1';
export const ABOUT_VIDEO_LOCAL = '/images/scaling-platform/about.mp4?v=hd1';
export const HERO_VIDEO_WIDTH = 1920;
export const HERO_VIDEO_HEIGHT = 1080;
export const ABOUT_VIDEO_WIDTH = 1440;
export const ABOUT_VIDEO_HEIGHT = 1440;
export const PREVIEW_STILL = '/images/Assets Scaling Platform/preview.svg';

const STILLS = Array.from({ length: DETAIL_CARD_IMAGE_COUNT }, () => PREVIEW_STILL);
export const MARQUEE_GIFS = STILLS;
export const ABOUT_DECOR = { moon: PREVIEW_STILL, group: PREVIEW_STILL };
export const PORTRAIT_URL = PREVIEW_STILL;
export const SERVICES = [];
