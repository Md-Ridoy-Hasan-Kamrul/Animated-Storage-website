import { DETAIL_CARD_IMAGE_COUNT, VIDEO_URL } from './constants';

export const HERO_VIDEO = VIDEO_URL;
export const HERO_VIDEO_LOCAL = '/images/Assets Cast Render/hero.mp4';
export const PREVIEW_STILL = '/images/Assets Cast Render/preview.svg';

const STILLS = Array.from({ length: DETAIL_CARD_IMAGE_COUNT }, () => PREVIEW_STILL);
export const MARQUEE_GIFS = STILLS;
export const ABOUT_DECOR = {
  moon: PREVIEW_STILL,
  group: PREVIEW_STILL,
};
export const PORTRAIT_URL = PREVIEW_STILL;
export const SERVICES = [];
