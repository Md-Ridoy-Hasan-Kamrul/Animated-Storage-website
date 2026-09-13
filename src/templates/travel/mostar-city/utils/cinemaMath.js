import { SNAP_MOUSE, SNAP_SCROLL } from '../constants';

export function clamp(value, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value));
}

export function smoothstep(edge0, edge1, value) {
  const x = clamp((value - edge0) / (edge1 - edge0));
  return x * x * (3 - 2 * x);
}

export function lerp(start, end, t) {
  return start + (end - start) * t;
}

export function segmentInOut(scroll, start, enterEnd, exitStart, end) {
  const enter = smoothstep(start, enterEnd, scroll);
  const exit = smoothstep(exitStart, end, scroll);
  return { enter, exit, active: enter * (1 - exit) };
}

export function getScrollDistance(sectionTop, sectionHeight, innerHeight) {
  return clamp(-sectionTop, 0, Math.max(0, sectionHeight - innerHeight));
}

export function resolveCinemaScroll({
  sectionTop,
  sectionHeight,
  innerHeight,
  windowScroll = 0,
  extraPx = 0,
}) {
  const maxTravel = Math.max(0, sectionHeight - innerHeight, extraPx);
  const fromRect = clamp(-sectionTop, 0, maxTravel);
  const fromWindow = clamp(windowScroll, 0, maxTravel);
  return Math.max(fromRect, fromWindow);
}

export function shouldKeepTicking(smoothScroll, targetScroll, mouseX, targetMouseX, mouseY, targetMouseY) {
  return (
    Math.abs(smoothScroll - targetScroll) > SNAP_SCROLL ||
    Math.abs(mouseX - targetMouseX) > SNAP_MOUSE ||
    Math.abs(mouseY - targetMouseY) > SNAP_MOUSE
  );
}
