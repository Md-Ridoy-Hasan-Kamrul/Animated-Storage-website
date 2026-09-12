/**
 * Advances a cyclic index (roles, loading words, etc.).
 * @param {number} current
 * @param {number} length
 * @returns {number}
 */
export function nextCycleIndex(current, length) {
  if (length <= 0) return 0;
  return (current + 1) % length;
}

/** Desktop bento column spans for a 12-col grid: 7 / 5 / 5 / 7 */
export const BENTO_COL_SPANS = Object.freeze([7, 5, 5, 7]);

/**
 * @param {number} index
 * @returns {number}
 */
export function bentoColSpan(index) {
  return BENTO_COL_SPANS[index % BENTO_COL_SPANS.length];
}
