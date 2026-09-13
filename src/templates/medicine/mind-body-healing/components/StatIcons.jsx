import React, { memo } from 'react';
import {
  CHECKER_CELLS,
  CHECKER_CELL_SIZE_CLASS,
  CHECKER_COLS,
  CHECKER_EMPTY_CLASS,
  CHECKER_FILLED_CLASS,
  CHECKER_GRID_CLASS,
  DOT_BOX_CLASS,
  TRIANGLE_DOT_CLASSES,
} from '../constants';
import { checkerCellClass } from '../utils/statIcons';

export const TriangleDots = memo(() => (
  <div className={DOT_BOX_CLASS} aria-hidden="true">
    {TRIANGLE_DOT_CLASSES.map((className) => (
      <span key={className} className={className} />
    ))}
  </div>
));

TriangleDots.displayName = 'TriangleDots';

export const CheckerGrid = memo(() => (
  <div className={CHECKER_GRID_CLASS} aria-hidden="true">
    {Array.from({ length: CHECKER_CELLS }, (_, index) => (
      <span
        key={`checker-${index}`}
        className={`${CHECKER_CELL_SIZE_CLASS} ${checkerCellClass(
          index,
          CHECKER_COLS,
          CHECKER_FILLED_CLASS,
          CHECKER_EMPTY_CLASS,
        )}`}
      />
    ))}
  </div>
));

CheckerGrid.displayName = 'CheckerGrid';

const STAT_ICONS = {
  triangle: TriangleDots,
  checker: CheckerGrid,
};

const StatIcon = memo(({ type }) => {
  const Icon = STAT_ICONS[type];
  return Icon ? <Icon /> : null;
});

StatIcon.displayName = 'StatIcon';

export default StatIcon;
