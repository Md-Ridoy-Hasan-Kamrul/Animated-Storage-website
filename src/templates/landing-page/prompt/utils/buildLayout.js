/**
 * Scattered gallery grid layout from the Prompt design spec.
 * @param {number} count - number of images
 * @param {number} cols - column count
 * @returns {number[][]} rows of image indices or -1 for empty cells
 */
export function buildLayout(count, cols) {
  if (count <= 0 || cols <= 0) return [];

  const rows = [];
  let placed = 0;
  let rowIndex = 0;

  while (placed < count) {
    const row = Array.from({ length: cols }, () => -1);
    const primaryCol = (rowIndex * 2 + (rowIndex % 2)) % cols;

    if (placed < count) {
      row[primaryCol] = placed;
      placed += 1;
    }

    if (rowIndex % 3 === 0 && placed < count) {
      let secondaryCol = (primaryCol + 2) % cols;
      if (secondaryCol === primaryCol) {
        secondaryCol = (primaryCol + 1) % cols;
      }
      row[secondaryCol] = placed;
      placed += 1;
    }

    rows.push(row);
    rowIndex += 1;
  }

  return rows;
}

export function resolveGalleryColumns(width, tablet = 640, desktop = 1024) {
  if (width < tablet) return 2;
  if (width < desktop) return 3;
  return 4;
}
