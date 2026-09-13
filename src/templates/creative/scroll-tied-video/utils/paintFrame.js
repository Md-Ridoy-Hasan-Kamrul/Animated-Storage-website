import { LRU_MAX } from '../constants';
import { lruWarmRange, nearestIndex } from './nearestIndex';

export function evictLru(lru, max = LRU_MAX) {
  while (lru.size > max) {
    const oldest = lru.keys().next().value;
    const bitmap = lru.get(oldest);
    if (bitmap?.close) bitmap.close();
    lru.delete(oldest);
  }
}

export async function warmLru(lru, bank, index) {
  const range = lruWarmRange(index, bank.length - 1);
  await Promise.all(
    range.map(async (item) => {
      if (lru.has(item)) {
        const current = lru.get(item);
        lru.delete(item);
        lru.set(item, current);
        return;
      }
      const blob = bank[item]?.blob;
      if (!blob || typeof createImageBitmap !== 'function') return;
      try {
        lru.set(item, await createImageBitmap(blob));
      } catch {
        lru.set(item, null);
      }
    }),
  );
  evictLru(lru);
}

export function paintBitmap(canvas, bitmap) {
  if (!canvas || !bitmap) return false;
  const ctx = canvas.getContext('2d');
  if (!ctx) return false;
  ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  return true;
}

export async function drawNearestFrame(canvas, bank, lru, timeSeconds) {
  const index = nearestIndex(bank, timeSeconds);
  if (index < 0) return false;
  await warmLru(lru, bank, index);
  return paintBitmap(canvas, lru.get(index));
}
