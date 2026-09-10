import {
  STACK_OFFSET_PX,
  SCALE_STEP,
  getProjectTargetScale,
  getProjectStackMargin,
} from '../utils/projectStack';

describe('projectStack utils (3D Portfolio 2.0)', () => {
  it('exposes named stack constants (no magic numbers at call sites)', () => {
    expect(STACK_OFFSET_PX).toBe(28);
    expect(SCALE_STEP).toBe(0.05);
  });

  it('computes targetScale = 1 - (total - 1 - index) * 0.05', () => {
    expect(getProjectTargetScale(0, 3)).toBeCloseTo(0.9);
    expect(getProjectTargetScale(1, 3)).toBeCloseTo(0.95);
    expect(getProjectTargetScale(2, 3)).toBeCloseTo(1);
  });

  it('offsets each card by index * 28px', () => {
    expect(getProjectStackMargin(0)).toBe(0);
    expect(getProjectStackMargin(1)).toBe(28);
    expect(getProjectStackMargin(2)).toBe(56);
  });
});
