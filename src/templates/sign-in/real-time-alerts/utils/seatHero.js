import { HERO_MAX_FRACTION, HERO_W, IMG_H, IMG_REF_SCALE, IMG_W } from '../constants';

export function seatHero(photoW, bandH) {
  const imgScale = Math.max(photoW / IMG_W, bandH / IMG_H);
  return Math.min(imgScale / IMG_REF_SCALE, (photoW * HERO_MAX_FRACTION) / HERO_W);
}
