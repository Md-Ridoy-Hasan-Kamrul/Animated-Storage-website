import {
  GRID_MAX,
  GRID_MIN,
  GRID_VW,
  MASK_STOPS,
  PARALLAX_EASE,
  PARALLAX_SHIFT,
  RADIUS_MAX,
  RADIUS_MIN,
  RADIUS_VW,
  SMOOTH_EASE,
} from '../constants';

export function clampRange(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

export function spotlightRadius(width) {
  return Math.round(clampRange(width * RADIUS_VW, RADIUS_MIN, RADIUS_MAX));
}

export function gridCellSize(width) {
  return Math.round(clampRange(width * GRID_VW, GRID_MIN, GRID_MAX));
}

export function stepToward(current, target, factor) {
  return current + (target - current) * factor;
}

export function stepPoint(current, target, factor = SMOOTH_EASE) {
  return {
    x: stepToward(current.x, target.x, factor),
    y: stepToward(current.y, target.y, factor),
  };
}

export function normalizeCursor(x, y, width, height) {
  return {
    cx: width ? x / width - 0.5 : 0,
    cy: height ? y / height - 0.5 : 0,
  };
}

export function parallaxTarget(cx, cy, shift = PARALLAX_SHIFT) {
  return { x: cx * shift, y: cy * shift };
}

export function stepParallax(current, target, factor = PARALLAX_EASE) {
  return stepPoint(current, target, factor);
}

export function applyMaskStops(gradient, stops = MASK_STOPS) {
  stops.forEach(([offset, color]) => {
    gradient.addColorStop(offset, color);
  });
}

export function paintSpotlightMask(ctx, cx, cy, radius, stops = MASK_STOPS) {
  if (!ctx) return '';
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
  applyMaskStops(gradient, stops);
  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.arc(cx, cy, radius, 0, Math.PI * 2);
  ctx.fill();
  return ctx.canvas.toDataURL();
}

export function sizeCanvas(canvas, width, height) {
  if (!canvas) return;
  canvas.width = width;
  canvas.height = height;
}

export function gridPatternPath(cell) {
  return `M ${cell} 0 L 0 0 0 ${cell}`;
}

export function embedCursorAt(progress, width, height) {
  const turn = progress * Math.PI * 2;
  return {
    x: width * 0.42 + Math.cos(turn) * width * 0.22,
    y: height * 0.48 + Math.sin(turn * 2) * height * 0.16,
  };
}

export function addedToast(title) {
  return `Added "${title}" to your shopping bag.`;
}

export function addGarment(lines, garment) {
  const match = lines.find((line) => line.id === garment.id);
  if (!match) return [...lines, { ...garment, qty: 1 }];
  return lines.map((line) =>
    line.id === garment.id ? { ...line, qty: line.qty + 1 } : line,
  );
}

export function removeGarment(lines, id) {
  return lines.filter((line) => line.id !== id);
}

export function cartCount(lines) {
  return lines.reduce((sum, line) => sum + line.qty, 0);
}
