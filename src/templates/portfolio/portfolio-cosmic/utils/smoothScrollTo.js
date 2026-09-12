import { SMOOTH_SCROLL_DURATION_MS, NAV_SCROLL_OFFSET_PX } from '../constants';

/**
 * Ease-out cubic for nav scroll animation.
 * @param {number} t 0..1
 */
export function easeOutCubic(t) {
  return 1 - (1 - t) ** 3;
}

/**
 * Animated window scroll to a section id (Home / Work / Resume).
 * @param {string} sectionId
 * @param {{ durationMs?: number, offsetPx?: number }} [options]
 * @returns {boolean} false if target missing
 */
export function smoothScrollToId(
  sectionId,
  {
    durationMs = SMOOTH_SCROLL_DURATION_MS,
    offsetPx = NAV_SCROLL_OFFSET_PX,
  } = {},
) {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return false;
  }

  const el = document.getElementById(sectionId);
  if (!el) return false;

  const targetY = Math.max(
    0,
    el.getBoundingClientRect().top + window.scrollY - offsetPx,
  );
  const startY = window.scrollY;
  const delta = targetY - startY;

  if (Math.abs(delta) < 1) {
    window.scrollTo(0, targetY);
    return true;
  }

  const startTime = performance.now();

  const tick = (now) => {
    const progress = Math.min(1, (now - startTime) / durationMs);
    window.scrollTo(0, startY + delta * easeOutCubic(progress));
    if (progress < 1) {
      requestAnimationFrame(tick);
    }
  };

  requestAnimationFrame(tick);
  return true;
}
