import { act, renderHook } from '@testing-library/react';
import { useTypewriter } from '../hooks/useTypewriter';
import { usePillsReveal } from '../hooks/usePillsReveal';

describe('useTypewriter', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('waits for the start delay, then reveals one character at a time', () => {
    const { result } = renderHook(() => useTypewriter('Hi', 10, 20));
    expect(result.current.displayed).toBe('');
    expect(result.current.done).toBe(false);

    act(() => {
      jest.advanceTimersByTime(20);
    });
    expect(result.current.displayed).toBe('');

    act(() => {
      jest.advanceTimersByTime(10);
    });
    expect(result.current.displayed).toBe('H');
    expect(result.current.done).toBe(false);

    act(() => {
      jest.advanceTimersByTime(10);
    });
    expect(result.current.displayed).toBe('Hi');
    expect(result.current.done).toBe(true);
  });
});

describe('usePillsReveal', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('becomes visible after the delay without waiting for the typewriter', () => {
    const { result } = renderHook(() => usePillsReveal(400));
    expect(result.current).toBe(false);
    act(() => {
      jest.advanceTimersByTime(399);
    });
    expect(result.current).toBe(false);
    act(() => {
      jest.advanceTimersByTime(1);
    });
    expect(result.current).toBe(true);
  });
});
