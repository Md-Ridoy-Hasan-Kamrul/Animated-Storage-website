export function clamp01(value) {
  return Math.min(1, Math.max(0, value));
}

export function scrollProgress(scrollY, scrollHeight, innerHeight) {
  const span = scrollHeight - innerHeight;
  if (!Number.isFinite(span) || span <= 0) return 0;
  return clamp01(scrollY / span);
}

export function lerpToward(current, target, factor) {
  return current + (target - current) * factor;
}

export function frameCountFromDuration(duration, fps, minCount, maxCount) {
  if (!Number.isFinite(duration) || duration <= 0) return minCount;
  return Math.min(maxCount, Math.max(minCount, Math.round(duration * fps)));
}

export function seekTimeFromProgress(progress, duration, tail) {
  if (!Number.isFinite(duration) || duration <= 0) return 0;
  return clamp01(progress) * Math.max(0, duration - tail);
}

export function shouldSeekFallback(videoTime, target, seeking, gap) {
  return !seeking && Math.abs(videoTime - target) > gap;
}

export function frameIndexFromProgress(progress, count) {
  if (count <= 1) return 0;
  return Math.min(count - 1, Math.max(0, Math.round(clamp01(progress) * (count - 1))));
}

export function canvasDpr(devicePixelRatio, cap) {
  const ratio = Number.isFinite(devicePixelRatio) ? devicePixelRatio : 1;
  return Math.min(Math.max(1, ratio), cap);
}
