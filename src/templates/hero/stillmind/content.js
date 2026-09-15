import { DETAIL_CARD_IMAGE_COUNT, VIDEO_LABELS } from './constants';

export const VIDEO_URLS = Object.freeze([
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260702_081127_0992a171-d3c6-4978-8213-0ec5df8b6d63.mp4',
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260702_092026_dd05b805-ea0f-40b2-8c52-332b88502592.mp4',
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260702_081042_df7202bf-bd80-4b2b-bbc6-1f09ba2870e9.mp4',
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260702_080959_4cac5234-3573-464e-a5b7-76b94b8a7d61.mp4',
]);

export const VIDEO_LOCAL = Object.freeze([
  '/images/Assets Stillmind/golden-hour.mp4',
  '/images/Assets Stillmind/still-water.mp4',
  '/images/Assets Stillmind/deep-woods.mp4',
  '/images/Assets Stillmind/quiet-dawn.mp4',
]);

export const OVERLAY_PNG =
  'https://soft-zoom-63098134.figma.site/_assets/v11/0b4a435b2df2747593c43d7a1c9b4578f7d8d90c.png';

export const VIDEOS = VIDEO_LABELS.map((label, index) => ({
  label,
  remote: VIDEO_URLS[index],
  src: VIDEO_LOCAL[index],
}));

export const HERO_VIDEO = VIDEO_URLS[0];
export const HERO_VIDEO_LOCAL = VIDEO_LOCAL[0];
export const PREVIEW_STILL = '/images/Assets%20Stillmind/Stillmind.png';

const STILLS = Array.from({ length: DETAIL_CARD_IMAGE_COUNT }, () => PREVIEW_STILL);
export const MARQUEE_GIFS = STILLS;
export const ABOUT_DECOR = { moon: PREVIEW_STILL, group: PREVIEW_STILL };
export const PORTRAIT_URL = PREVIEW_STILL;
export const SERVICES = [];
