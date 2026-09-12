import { bentoColSpan, BENTO_COL_SPANS, nextCycleIndex } from '../utils/cycleIndex';

describe('nextCycleIndex', () => {
  it('wraps at end of list', () => {
    expect(nextCycleIndex(0, 4)).toBe(1);
    expect(nextCycleIndex(3, 4)).toBe(0);
  });

  it('handles empty length safely', () => {
    expect(nextCycleIndex(2, 0)).toBe(0);
  });
});

describe('bentoColSpan', () => {
  it('follows 7/5/5/7 pattern', () => {
    expect(BENTO_COL_SPANS).toEqual([7, 5, 5, 7]);
    expect([0, 1, 2, 3].map(bentoColSpan)).toEqual([7, 5, 5, 7]);
    expect(bentoColSpan(4)).toBe(7);
  });
});
