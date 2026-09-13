export function lerpAxis(current, target, factor) {
  return current + (target - current) * factor;
}

export function stepCursor(smooth, mouse, factor) {
  return {
    x: lerpAxis(smooth.x, mouse.x, factor),
    y: lerpAxis(smooth.y, mouse.y, factor),
  };
}

export function hiddenCursor(hidden) {
  return { x: hidden, y: hidden };
}

export function applyMaskStops(gradient, stops) {
  stops.forEach(([offset, color]) => {
    gradient.addColorStop(offset, color);
  });
}

export function paintSpotlightMask(ctx, cursorX, cursorY, radius, stops) {
  if (!ctx) return '';
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  const gradient = ctx.createRadialGradient(cursorX, cursorY, 0, cursorX, cursorY, radius);
  applyMaskStops(gradient, stops);
  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.arc(cursorX, cursorY, radius, 0, Math.PI * 2);
  ctx.fill();
  return ctx.canvas.toDataURL();
}

export function sizeCanvas(canvas, width, height) {
  if (!canvas) return;
  canvas.width = width;
  canvas.height = height;
}

export function embedCursorAt(progress, width, height) {
  const turn = progress * Math.PI * 2;
  return {
    x: width * 0.52 + Math.cos(turn) * width * 0.22,
    y: height * 0.46 + Math.sin(turn * 2) * height * 0.14,
  };
}
