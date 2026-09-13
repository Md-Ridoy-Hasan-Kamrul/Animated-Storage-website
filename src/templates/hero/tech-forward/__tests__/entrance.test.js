import { act, renderHook } from '@testing-library/react';
import { ENTRANCE_HIDDEN, ENTRANCE_VISIBLE } from '../constants';
import { useHeroEntrance } from '../hooks/useHeroEntrance';

const flushFrames = () =>
  act(
    () =>
      new Promise((resolve) => {
        requestAnimationFrame(() => {
          requestAnimationFrame(resolve);
        });
      }),
  );

describe('useHeroEntrance', () => {
  it('stays hidden on the first paint, then plays', async () => {
    const { result } = renderHook(() => useHeroEntrance());
    expect(result.current).toBe(ENTRANCE_HIDDEN);
    await flushFrames();
    expect(result.current).toBe(ENTRANCE_VISIBLE);
  });
});
