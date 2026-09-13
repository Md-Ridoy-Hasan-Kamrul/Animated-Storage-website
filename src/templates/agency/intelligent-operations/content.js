import { DETAIL_CARD_IMAGE_COUNT } from './constants';

export const HERO_VIDEO =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260729_102822_0e6c87e8-c141-4744-bf32-ad30db296371.mp4';

export const HERO_VIDEO_LOCAL = '/images/Assets Intelligent Operations/hero.mp4';
export const HERO_POSTER_LOCAL = '/images/Assets Intelligent Operations/hero-poster.jpg';

export const MITHA_PORTRAIT =
  'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260728_050334_5b076e26-0ce7-4898-b432-d764190e448f.png&w=1280&q=85';

export const PREVIEW_STILL = MITHA_PORTRAIT;
export const MARQUEE_GIFS = Array.from({ length: DETAIL_CARD_IMAGE_COUNT }, () => PREVIEW_STILL);
export const ABOUT_DECOR = { moon: PREVIEW_STILL, group: PREVIEW_STILL };
export const PORTRAIT_URL = MITHA_PORTRAIT;
export const SERVICES = [];
