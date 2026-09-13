export function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

export function smooth(t) {
  return t * t * (3 - 2 * t);
}

export function ramp(progress, start, end) {
  if (end <= start) return progress >= end ? 1 : 0;
  return smooth(clamp((progress - start) / (end - start), 0, 1));
}

export function readProgress(scrollY, maxScroll) {
  if (maxScroll <= 0) return 0;
  return clamp(scrollY / maxScroll, 0, 1);
}

export function getPanelPaint(progress, cue, driftPx) {
  const enter = ramp(progress, cue[0], cue[1]);
  const leave = ramp(progress, cue[2], cue[3]);
  const opacity = enter * (1 - leave);
  const y = (1 - enter) * driftPx - leave * driftPx;
  return { opacity, y };
}

export function getSeekTarget(progress, duration) {
  if (!duration) return 0;
  return progress * duration;
}

export function easeSeek(seekAt, seekTo, ease, gapMin) {
  const gap = seekTo - seekAt;
  if (Math.abs(gap) <= gapMin) return seekAt;
  return seekAt + gap * ease;
}

export function formatBootLabel(fraction) {
  return `LOADING ${Math.round(clamp(fraction, 0, 1) * 100)}%`;
}

export function hashToProgress(hash, map) {
  const key = String(hash || '').replace('#', '');
  return Object.prototype.hasOwnProperty.call(map, key) ? map[key] : null;
}
