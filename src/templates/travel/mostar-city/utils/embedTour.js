export function clamp01(value) {
  return Math.min(1, Math.max(0, value));
}

export function advanceEmbedProgress(progress, dir, dt, loopSeconds) {
  const span = loopSeconds > 0 ? loopSeconds : 1;
  const next = progress + dir * (dt / span);
  if (next >= 1) return { progress: 1, dir: -1 };
  if (next <= 0) return { progress: 0, dir: 1 };
  return { progress: clamp01(next), dir };
}

export function scrollYFromProgress(progress, max) {
  if (!Number.isFinite(max) || max <= 0) return 0;
  return clamp01(progress) * max;
}
