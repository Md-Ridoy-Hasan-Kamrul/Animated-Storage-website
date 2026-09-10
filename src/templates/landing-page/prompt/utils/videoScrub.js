import {
  DEAD_ZONE_MIN_PX,
  DEAD_ZONE_WIDTH_RATIO,
  BREAKPOINT_DESKTOP,
} from '../constants';

/** Prompt SECTION 1G: Math.max(30, width * 0.05) */
export function getDeadZonePx(width) {
  return Math.max(DEAD_ZONE_MIN_PX, width * DEAD_ZONE_WIDTH_RATIO);
}

export function resolveActiveSide(clientX, width, deadZone, previousSide) {
  const center = width / 2;
  const leftEdge = center - deadZone;
  const rightEdge = center + deadZone;

  if (clientX >= leftEdge && clientX <= rightEdge) {
    return previousSide;
  }
  if (clientX < leftEdge) return 'right';
  return 'left';
}

export function scrubProgress(clientX, width, deadZone, activeSide) {
  const center = width / 2;
  const leftEdge = center - deadZone;
  const rightEdge = center + deadZone;

  if (clientX >= leftEdge && clientX <= rightEdge) return 0;

  if (activeSide === 'right') {
    const range = Math.max(1, leftEdge);
    return Math.min(1, Math.max(0, (leftEdge - clientX) / range));
  }

  const range = Math.max(1, width - rightEdge);
  return Math.min(1, Math.max(0, (clientX - rightEdge) / range));
}

export function isInDeadZone(clientX, width, deadZone) {
  const center = width / 2;
  return clientX >= center - deadZone && clientX <= center + deadZone;
}

export function mouseNormX(clientX, width) {
  if (width <= 0) return 0;
  return Math.max(-1, Math.min(1, (clientX / width) * 2 - 1));
}

/** -1 .. 1 from screen vertical center (top/bottom parallax). */
export function mouseNormY(clientY, height) {
  if (height <= 0) return 0;
  return Math.max(-1, Math.min(1, (clientY / height) * 2 - 1));
}

export function resolveVideoScrub(clientX, width, previousSide = 'right') {
  const deadZone = getDeadZonePx(width);
  const side = resolveActiveSide(clientX, width, deadZone, previousSide);
  const inDead = isInDeadZone(clientX, width, deadZone);
  return {
    side: inDead ? 'center' : side,
    progress: scrubProgress(clientX, width, deadZone, side),
    activeSide: side,
    inDeadZone: inDead,
    deadZone,
  };
}

export function computeSpacerHeight(vh, wrapScrollHeight) {
  const maxScroll = Math.max(0, wrapScrollHeight - vh);
  return vh + maxScroll + 2 * vh;
}

/**
 * Mouse scrub when:
 * - viewport ≥ desktop, OR
 * - user is moving a mouse (preview iframes are often < 1024px wide)
 */
export function prefersMouseScrub(hasMousePointer = false) {
  if (typeof window === 'undefined') return false;
  if (hasMousePointer) return true;
  if (window.innerWidth < BREAKPOINT_DESKTOP) return false;
  const coarseOnly =
    window.matchMedia('(pointer: coarse)').matches &&
    !window.matchMedia('(pointer: fine)').matches;
  return !coarseOnly;
}
