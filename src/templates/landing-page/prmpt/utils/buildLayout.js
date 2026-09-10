/**
 * Scattered gallery layout from the PRMPT prompt.
 * @param {number} count
 * @param {number} cols
 * @returns {number[][]} rows of column indices (-1 = empty)
 */
export function buildLayout(count, cols) {
  const rows = [];
  let placed = 0;
  let r = 0;

  while (placed < count) {
    const row = Array.from({ length: cols }, () => -1);
    const a = (r * 2 + (r % 2)) % cols;
    row[a] = placed;
    placed += 1;

    if (placed < count && r % 3 === 0) {
      let b = (a + 2) % cols;
      if (b === a) b = (a + 1) % cols;
      row[b] = placed;
      placed += 1;
    }

    rows.push(row);
    r += 1;
  }

  return rows;
}

export function resolveGalleryColumns(width) {
  if (width < 640) return 2;
  if (width < 1024) return 3;
  return 4;
}
