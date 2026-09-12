import {
  cubicEaseIn,
  dissolveProgress,
  quarticEaseOut,
  sandFilterValues,
} from '../utils/sandEase';

describe('sand easing', () => {
  it('quarticEaseOut starts at 0 and ends at 1', () => {
    expect(quarticEaseOut(0)).toBe(0);
    expect(quarticEaseOut(1)).toBe(1);
    expect(quarticEaseOut(0.5)).toBeGreaterThan(0.8);
  });

  it('cubicEaseIn starts slow', () => {
    expect(cubicEaseIn(0)).toBe(0);
    expect(cubicEaseIn(1)).toBe(1);
    expect(cubicEaseIn(0.5)).toBeLessThan(0.2);
  });

  it('enter dissolve goes from 1 to 0', () => {
    expect(dissolveProgress(0, true)).toBeCloseTo(1);
    expect(dissolveProgress(1, true)).toBeCloseTo(0);
  });

  it('exit dissolve goes from 0 to 1', () => {
    expect(dissolveProgress(0, false)).toBeCloseTo(0);
    expect(dissolveProgress(1, false)).toBeCloseTo(1);
  });
});

describe('sandFilterValues', () => {
  it('maps dissolve to displace / blur / fade', () => {
    expect(sandFilterValues(0).scale).toBe(0);
    expect(sandFilterValues(1).scale).toBe(150);
    expect(sandFilterValues(1).opacity).toBe(0);
  });
});
