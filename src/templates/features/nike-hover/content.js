import { DETAIL_CARD_IMAGE_COUNT } from './constants';

export const OVERLAY_IMAGE =
  'https://github.com/dsMagnatov/Acreage-landing-assets/blob/main/02604201313.png?raw=true';

export const REVEAL_VIDEO =
  'https://pikaso.cdnpk.net/private/production/4024859125/d070ae9c-55df-47aa-acbe-4ee66337855c-0.mp4?token=exp=1777075200~hmac=4202c1d0ec90137eb6dffa8e0db93ed7569a68b2016165d8b1b567f888869ff5';

export const OVERLAY_IMAGE_LOCAL = '/images/Assets Nike Hover/overlay.png';
export const REVEAL_VIDEO_LOCAL = '/images/Assets Nike Hover/reveal.mp4';

export const PREVIEW_STILL = OVERLAY_IMAGE_LOCAL;
export const MARQUEE_GIFS = Array.from({ length: DETAIL_CARD_IMAGE_COUNT }, () => PREVIEW_STILL);
export const ABOUT_DECOR = { moon: PREVIEW_STILL, group: PREVIEW_STILL };
export const PORTRAIT_URL = PREVIEW_STILL;
export const SERVICES = [];
