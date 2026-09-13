import { TS_MICROS } from '../constants';

export function nearestIndex(bank, timeSeconds) {
  if (!bank.length) return -1;
  const target = timeSeconds * TS_MICROS;
  let low = 0;
  let high = bank.length - 1;

  while (low <= high) {
    const mid = (low + high) >> 1;
    const ts = bank[mid].ts;
    if (ts === target) return mid;
    if (ts < target) low = mid + 1;
    else high = mid - 1;
  }

  if (low <= 0) return 0;
  if (low >= bank.length) return bank.length - 1;
  const before = bank[low - 1];
  const after = bank[low];
  return Math.abs(after.ts - target) < Math.abs(before.ts - target) ? low : low - 1;
}

export function lruWarmRange(index, lastIndex) {
  return [index - 1, index, index + 1, index + 2].filter((item) => item >= 0 && item <= lastIndex);
}
