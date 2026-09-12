import { easeOutCubic } from '../utils/smoothScrollTo';

describe('smoothScrollTo helpers', () => {
  it('easeOutCubic starts at 0 and ends at 1', () => {
    expect(easeOutCubic(0)).toBe(0);
    expect(easeOutCubic(1)).toBe(1);
  });

  it('easeOutCubic accelerates then settles', () => {
    expect(easeOutCubic(0.5)).toBeGreaterThan(0.5);
    expect(easeOutCubic(0.5)).toBeLessThan(1);
  });
});
