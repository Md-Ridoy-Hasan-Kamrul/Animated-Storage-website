import {
  CARD_ENTER_VIEWPORT_RATIO,
  CARD_EXIT_VIEWPORT_RATIO,
} from '../constants';

/**
 * Per-frame card scale from viewport geometry (Prompt enter/exit rules).
 */
export function computeCardScale(top, bottom, viewportHeight) {
  if (viewportHeight <= 0) return 0;
  if (bottom <= 0 || top >= viewportHeight) return 0;

  const enter = Math.min(1, (viewportHeight - top) / (viewportHeight * CARD_ENTER_VIEWPORT_RATIO));
  const exit = Math.min(1, bottom / (viewportHeight * CARD_EXIT_VIEWPORT_RATIO));
  return Math.min(enter, exit);
}

export function getCardTransformOrigin(columnIndex, cols) {
  const isLeftHalf = columnIndex < cols / 2;
  return isLeftHalf ? 'right bottom' : 'left bottom';
}
