import React from 'react';
import {
  CHECKER_COLS,
  CHECKER_EVEN_SHIFT,
  CHECKER_MAX_X,
  CHECKER_NUDGE_Y,
  CHECKER_ROWS,
  CHECKER_SIZE,
  CHECKER_VIEWBOX,
} from '../constants';

const cells = [];
for (let row = 0; row < CHECKER_ROWS; row += 1) {
  const shift = row % 2 === 0 ? CHECKER_EVEN_SHIFT : 0;
  for (let col = 0; col < CHECKER_COLS; col += 1) {
    const x = col * (CHECKER_SIZE * 2) + shift;
    if (x + CHECKER_SIZE <= CHECKER_MAX_X) {
      cells.push({ x, y: row * CHECKER_SIZE, key: `${row}-${col}` });
    }
  }
}

const CheckerMark = () => (
  <svg
    viewBox={CHECKER_VIEWBOX}
    className="synth-checker inline-block shrink-0"
    aria-hidden="true"
    style={{ transform: `translateY(${CHECKER_NUDGE_Y}px)` }}
  >
    {cells.map((cell) => (
      <rect key={cell.key} x={cell.x} y={cell.y} width={CHECKER_SIZE} height={CHECKER_SIZE} fill="#000" />
    ))}
  </svg>
);

export default CheckerMark;
