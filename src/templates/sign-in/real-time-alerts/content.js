import { DETAIL_CARD_IMAGE_COUNT } from './constants';

export const HERO_VIDEO =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260813_052122_e77a27e6-17f1-4794-889b-3ceaa0e9e8cb.mp4';

export const HERO_VIDEO_LOCAL = '/images/Assets Real-Time Alerts/falcon.mp4';
export const PREVIEW_STILL =
  '/images/Assets%20Real-Time%20Alerts/RealTimeAlerts.png';
export const FALCON_POSTER = PREVIEW_STILL;

const STILLS = Array.from({ length: DETAIL_CARD_IMAGE_COUNT }, () => PREVIEW_STILL);
export const MARQUEE_GIFS = STILLS;
export const ABOUT_DECOR = { moon: PREVIEW_STILL, group: PREVIEW_STILL };
export const PORTRAIT_URL = PREVIEW_STILL;
export const SERVICES = [];
