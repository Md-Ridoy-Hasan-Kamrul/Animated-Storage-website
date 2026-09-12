import { DETAIL_CARD_IMAGE_COUNT, MEDIA_BASE, BRANCHES } from './constants';

export const CLIP_URLS = Object.freeze(
  BRANCHES.reduce((acc, branch) => {
    acc[`${branch.id}-forward`] = `${MEDIA_BASE}${branch.forwardFile}`;
    acc[`${branch.id}-reverse`] = `${MEDIA_BASE}${branch.reverseFile}`;
    return acc;
  }, {}),
);

export const PREVIEW_STILL = '/images/Assets LTX World/preview.svg';

const STILLS = Array.from({ length: DETAIL_CARD_IMAGE_COUNT }, () => PREVIEW_STILL);
export const MARQUEE_GIFS = STILLS;
export const ABOUT_DECOR = {
  moon: PREVIEW_STILL,
  group: PREVIEW_STILL,
};
export const PORTRAIT_URL = PREVIEW_STILL;
export const SERVICES = [];
