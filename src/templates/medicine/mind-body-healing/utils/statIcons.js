export const TRIANGLE_ROW_COUNTS = [1, 2, 3, 3];

export function buildTriangleDots({ boxSize, dotSize, rows = TRIANGLE_ROW_COUNTS }) {
  const maxCount = Math.max(...rows);
  const usable = boxSize - dotSize;
  const rowGap = rows.length > 1 ? usable / (rows.length - 1) : 0;
  const colGap = maxCount > 1 ? usable / (maxCount - 1) : 0;

  return rows.flatMap((count, rowIndex) => {
    const top = rowIndex * rowGap;
    const rowWidth = (count - 1) * colGap;
    const startLeft = (usable - rowWidth) / 2;
    return Array.from({ length: count }, (_, colIndex) => ({
      top,
      left: startLeft + colIndex * colGap,
    }));
  });
}

export function checkerCellClass(index, columns, filledClass, emptyClass) {
  const row = Math.floor(index / columns);
  const col = index % columns;
  return (row + col) % 2 === 0 ? filledClass : emptyClass;
}

export function overlayMotionClass(isOpen, openClass, closedClass) {
  return isOpen ? openClass : closedClass;
}

export function iconSwapClass(isActive, activeClass, inactiveClass) {
  return isActive ? activeClass : inactiveClass;
}
