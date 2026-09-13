export function stepLerp(current, target, dt, tau, snap) {
  const next = current + (target - current) * (1 - Math.exp(-dt * tau));
  return Math.abs(target - next) < snap ? target : next;
}

export function shouldSeekFallback(videoTime, current, seeking, gap) {
  return !seeking && Math.abs(videoTime - current) > gap;
}
