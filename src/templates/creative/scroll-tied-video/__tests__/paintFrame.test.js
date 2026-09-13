import { evictLru } from '../utils/paintFrame';
import { LRU_MAX } from '../constants';

describe('frame LRU', () => {
  it('evicts the oldest entries once the bank exceeds LRU_MAX', () => {
    const lru = new Map();
    const closed = [];
    Array.from({ length: LRU_MAX + 3 }, (_, index) => {
      lru.set(index, { close: () => closed.push(index) });
      return index;
    });
    evictLru(lru);
    expect(lru.size).toBe(LRU_MAX);
    expect(closed).toEqual([0, 1, 2]);
    expect(lru.has(0)).toBe(false);
    expect(lru.has(3)).toBe(true);
  });
});
