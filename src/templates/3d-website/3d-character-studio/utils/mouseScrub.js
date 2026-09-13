export function clampTime(value, duration) {
  if (!Number.isFinite(duration) || duration <= 0) return 0;
  return Math.min(duration, Math.max(0, value));
}

export function resolveScrubOrigin(targetTime, currentTime) {
  return Number.isFinite(targetTime) ? targetTime : currentTime;
}

export function timeFromMouseDelta(currentTime, deltaX, width, duration, sensitivity) {
  if (!width) return clampTime(currentTime, duration);
  const offset = (deltaX / width) * sensitivity * duration;
  return clampTime(currentTime + offset, duration);
}
