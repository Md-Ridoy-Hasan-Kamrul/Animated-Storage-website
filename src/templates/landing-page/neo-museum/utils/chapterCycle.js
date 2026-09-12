/**
 * Cycles chapter index 0..length-1.
 * @param {number} current
 * @param {number} length
 */
export function nextChapterIndex(current, length) {
  if (length <= 0) return 0;
  return (current + 1) % length;
}

/**
 * Display counter: 0 → "01", 4 → "05"
 * @param {number} zeroBasedIndex
 */
export function formatChapterCounter(zeroBasedIndex) {
  return String(zeroBasedIndex + 1).padStart(2, '0');
}

export function formatChapterTotal(length) {
  return String(Math.max(0, length)).padStart(2, '0');
}
