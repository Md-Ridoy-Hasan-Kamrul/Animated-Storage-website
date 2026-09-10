import {
  DEAD_ZONE_HALF_PX,
  DEAD_ZONE_MIN_PX,
  DEAD_ZONE_WIDTH_RATIO,
  BREAKPOINT_DESKTOP,
} from '../constants';

/**
 * Dead-zone half-width (± from center).
 * Design caption uses ±50px; SECTION 1G uses max(30, width*0.05).
 * Prefer 50px when the ratio would be smaller; never below the floor.
 */
export function getDeadZonePx(width) {
  const fromRatio = width * DEAD_ZONE_WIDTH_RATIO;
  return Math.max(DEAD_ZONE_MIN_PX, DEAD_ZONE_HALF_PX, fromRatio);
}

/**
 * @param {number} clientX
 * @param {number} width
 * @param {number} deadZone
 * @param {'left'|'right'} previousSide
 */
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

/**
 * Scrub progress 0..1 for the active side.
 */
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
 * Desktop mouse scrub for the hero girl videos.
 * Any viewport ≥ desktop uses scrub unless the device is coarse-pointer only.
 */
export function prefersMouseScrub() {
  if (typeof window === 'undefined') return false;
  if (window.innerWidth < BREAKPOINT_DESKTOP) return false;
  const coarseOnly =
    window.matchMedia('(pointer: coarse)').matches &&
    !window.matchMedia('(pointer: fine)').matches;
  if (coarseOnly) return false;
  return true;
}
