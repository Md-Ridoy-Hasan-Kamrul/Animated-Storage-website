import {
  BLOOM_DRIFT_X_PX,
  BLOOM_DRIFT_Y_PX,
  REDUCED_MOTION_QUERY,
} from '../constants';

function prefersReducedMotion() {
  return window.matchMedia(REDUCED_MOTION_QUERY).matches;
}

function setBloomOrigin(target, x, y, diameter) {
  target.style.setProperty('--bloom-outline-x', `${x.toFixed(1)}px`);
  target.style.setProperty('--bloom-outline-y', `${y.toFixed(1)}px`);
  target.style.setProperty('--bloom-outline-diameter', `${diameter.toFixed(1)}px`);
}

function applyMagneticDrift(target, x, y, width, height) {
  if (prefersReducedMotion()) return;
  const dx = (x - width / 2) / width;
  const dy = (y - height / 2) / height;
  target.style.transform = `translate3d(${(dx * BLOOM_DRIFT_X_PX).toFixed(1)}px, ${(dy * BLOOM_DRIFT_Y_PX).toFixed(1)}px, 0)`;
}

/**
 * Authored bloom-outline pointer behavior: ink-bloom origin + magnetic drift.
 */
export function useBloomOutlinePointer() {
  const onPointerMove = (event) => {
    const target = event.currentTarget;
    const rect = target.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const diameter =
      2 * Math.hypot(Math.max(x, rect.width - x), Math.max(y, rect.height - y));

    setBloomOrigin(target, x, y, diameter);
    applyMagneticDrift(target, x, y, rect.width, rect.height);
  };

  const onPointerLeave = (event) => {
    event.currentTarget.style.transform = '';
  };

  return { onPointerMove, onPointerLeave };
}
