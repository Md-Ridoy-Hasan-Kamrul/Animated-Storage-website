/** Quartic ease-out — sand assemble (enter). */
export function quarticEaseOut(t) {
  const clamped = Math.min(1, Math.max(0, t));
  return 1 - (1 - clamped) ** 4;
}

/** Cubic ease-in — sand dissolve (exit). */
export function cubicEaseIn(t) {
  const clamped = Math.min(1, Math.max(0, t));
  return clamped ** 3;
}

/**
 * Dissolve amount 0 (sharp) → 1 (fully sand).
 * @param {number} t 0..1 elapsed ratio
 * @param {boolean} isEntering
 */
export function dissolveProgress(t, isEntering) {
  const eased = isEntering ? quarticEaseOut(t) : cubicEaseIn(t);
  return isEntering ? 1 - eased : eased;
}

export const SAND_DURATION_MS = 900;
export const SAND_DISPLACE_SCALE = 150;
export const SAND_ENTER_DY = -80;
export const SAND_EXIT_DY = 120;
export const SAND_DX = 30;
export const SAND_BLUR_PX = 6;
export const SAND_OPACITY_FADE = 1.2;

export function sandFilterValues(dissolve) {
  const d = Math.min(1, Math.max(0, dissolve));
  return {
    scale: d * SAND_DISPLACE_SCALE,
    blur: d * SAND_BLUR_PX,
    opacity: Math.max(0, 1 - d * SAND_OPACITY_FADE),
  };
}
