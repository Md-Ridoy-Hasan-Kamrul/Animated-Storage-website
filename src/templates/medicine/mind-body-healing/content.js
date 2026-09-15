import { DETAIL_CARD_IMAGE_COUNT } from './constants';

export const HERO_VIDEO =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260715_082433_69699cf8-444b-4484-93cc-053e57896dfd.mp4';

export const HERO_VIDEO_LOCAL = '/images/Assets Mind-Body Healing/hero.mp4';
export const PREVIEW_STILL =
  '/images/Assets%20Mind-Body%20Healing/MindBodyHealing.png';

export const AVATAR_REMOTES = [
  'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100',
  'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100',
  'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100',
  'https://images.pexels.com/photos/697509/pexels-photo-697509.jpeg?auto=compress&cs=tinysrgb&w=100',
];

export const AVATAR_LOCALS = [
  '/images/Assets Mind-Body Healing/avatar-1.jpg',
  '/images/Assets Mind-Body Healing/avatar-2.jpg',
  '/images/Assets Mind-Body Healing/avatar-3.jpg',
  '/images/Assets Mind-Body Healing/avatar-4.jpg',
];

export const AVATARS = AVATAR_REMOTES.map((remote, index) => ({
  remote,
  local: AVATAR_LOCALS[index],
}));

const STILLS = Array.from({ length: DETAIL_CARD_IMAGE_COUNT }, () => PREVIEW_STILL);
export const MARQUEE_GIFS = STILLS;
export const ABOUT_DECOR = { moon: PREVIEW_STILL, group: PREVIEW_STILL };
export const PORTRAIT_URL = PREVIEW_STILL;
export const SERVICES = [];
