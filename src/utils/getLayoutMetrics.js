import { LAYOUT_METRICS, resolveLayoutTier } from '../constants/layoutBreakpoints';

/**
 * Pure layout metrics resolver — kept free of React for easy unit testing.
 * @param {number} viewportWidth
 */
export const getLayoutMetrics = (viewportWidth) => {
  const width = Number.isFinite(viewportWidth) ? viewportWidth : 0;
  const tier = resolveLayoutTier(width);
  return {
    tier,
    viewportWidth: width,
    ...LAYOUT_METRICS[tier],
  };
};
