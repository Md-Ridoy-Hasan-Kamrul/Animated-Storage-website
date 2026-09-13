export function clamp01(value) {
  return Math.min(1, Math.max(0, value));
}

export function getProgress(scrollY, offsetHeight, innerHeight) {
  const span = offsetHeight - innerHeight;
  if (!Number.isFinite(span) || span <= 0) return 0;
  return clamp01(scrollY / span);
}
