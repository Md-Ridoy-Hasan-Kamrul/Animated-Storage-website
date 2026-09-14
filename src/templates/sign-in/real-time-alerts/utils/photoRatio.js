import { PANE_RATIO, PHOTO_MIN, PHOTO_MIN2, RAMP_HI, RAMP_LO, RAMP_LO2 } from '../constants';

export function lerp(from, to, t) {
  return from + t * (to - from);
}

export function photoRatio(vw) {
  const untouched = 1 - PANE_RATIO;
  if (vw >= RAMP_HI) return untouched;
  if (vw >= RAMP_LO) {
    return lerp(PHOTO_MIN, untouched, (vw - RAMP_LO) / (RAMP_HI - RAMP_LO));
  }
  if (vw >= RAMP_LO2) {
    return lerp(PHOTO_MIN2, PHOTO_MIN, (vw - RAMP_LO2) / (RAMP_LO - RAMP_LO2));
  }
  return PHOTO_MIN2;
}
