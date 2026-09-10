/** Sticky project stack math (prompt CRITICAL STACK BEHAVIOR). */

export const STACK_OFFSET_PX = 28;
export const SCALE_STEP = 0.05;

export const getProjectTargetScale = (index, total) =>
  1 - (total - 1 - index) * SCALE_STEP;

export const getProjectStackMargin = (index) => index * STACK_OFFSET_PX;
