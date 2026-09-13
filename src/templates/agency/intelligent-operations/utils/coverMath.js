export function coverDrawRect(srcW, srcH, destW, destH) {
  if (srcW <= 0 || srcH <= 0 || destW <= 0 || destH <= 0) {
    return { x: 0, y: 0, w: destW, h: destH };
  }
  const scale = Math.max(destW / srcW, destH / srcH);
  const w = srcW * scale;
  const h = srcH * scale;
  return {
    x: (destW - w) / 2,
    y: (destH - h) / 2,
    w,
    h,
  };
}

export function drawCover(ctx, source, destW, destH) {
  if (!ctx || !source) return false;
  const srcW = source.videoWidth || source.width || 0;
  const srcH = source.videoHeight || source.height || 0;
  const box = coverDrawRect(srcW, srcH, destW, destH);
  ctx.clearRect(0, 0, destW, destH);
  ctx.drawImage(source, box.x, box.y, box.w, box.h);
  return true;
}
