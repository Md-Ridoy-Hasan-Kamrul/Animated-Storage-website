import { computeCardScale } from '../utils/cardScale';

describe('computeCardScale', () => {
  const vh = 1000;

  it('returns 0 when fully above viewport (bottom <= 0)', () => {
    expect(computeCardScale(-200, 0, vh)).toBe(0);
    expect(computeCardScale(-100, -10, vh)).toBe(0);
  });

  it('returns 0 when fully below viewport (top >= vh)', () => {
    expect(computeCardScale(vh, vh + 100, vh)).toBe(0);
    expect(computeCardScale(vh + 1, vh + 200, vh)).toBe(0);
  });

  it('enter scale uses (vh - top) / (vh * 0.6) capped at 1', () => {
    // top = vh, bottom > 0 and top < vh is false for top===vh → 0
    // top just inside: top = vh - 300 → enter = 300/(600) = 0.5
    // bottom large so exit = 1
    expect(computeCardScale(vh - 300, vh + 400, vh)).toBeCloseTo(0.5);
  });

  it('exit scale uses bottom / (vh * 0.4) capped at 1', () => {
    // fully entered (top negative-ish but visible): top = -100, bottom = 200
    // enter = min(1, (1000-(-100))/600) = 1
    // exit = min(1, 200/400) = 0.5
    expect(computeCardScale(-100, 200, vh)).toBeCloseTo(0.5);
  });

  it('returns min(enter, exit)', () => {
    // enter = (1000-700)/600 = 0.5; exit = 900/400 = 1 → 0.5
    expect(computeCardScale(700, 900, vh)).toBeCloseTo(0.5);
  });

  it('returns 1 when fully visible in the middle', () => {
    expect(computeCardScale(200, 800, vh)).toBe(1);
  });
});
