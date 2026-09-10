/**
 * Maps elapsed time to a 0–100 loading counter.
 * @param {number} elapsedMs
 * @param {number} durationMs
 * @returns {number}
 */
export function progressFromElapsed(elapsedMs, durationMs) {
  if (durationMs <= 0) return 100;
  if (elapsedMs <= 0) return 0;
  return Math.min(100, Math.floor((elapsedMs / durationMs) * 100));
}

/**
 * Pads a numeric count for the loading display (e.g. 7 → "007").
 * @param {number} count
 * @param {number} [digits=3]
 * @returns {string}
 */
export function padCount(count, digits = 3) {
  return String(Math.max(0, Math.floor(count))).padStart(digits, '0');
}
