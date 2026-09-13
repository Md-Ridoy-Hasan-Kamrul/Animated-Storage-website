import { act, renderHook } from '@testing-library/react';
import { DESKTOP_SCRUB_MIN, SCRUB_SENSITIVITY, TYPEWRITER_DELAY_MS, TYPEWRITER_SPEED_MS } from '../constants';
import { useTypewriter } from '../hooks/useTypewriter';
import { hamburgerBarClass } from '../utils/hamburgerBars';
import { clampTime, isDesktopWidth, resolveScrubOrigin, timeFromMouseDelta } from '../utils/mouseScrub';
import { readyMessage, toggleService } from '../utils/services';
import { isTypewriterDone, nextTypedLength } from '../utils/typewriter';

describe('mouse scrub math', () => {
  it('clamps target time and maps horizontal delta with 0.8 sensitivity', () => {
    expect(clampTime(-1, 10)).toBe(0);
    expect(clampTime(12, 10)).toBe(10);
    expect(timeFromMouseDelta(2, 200, 1000, 10, SCRUB_SENSITIVITY)).toBeCloseTo(2 + 0.2 * 0.8 * 10);
    expect(resolveScrubOrigin(0, 4)).toBe(0);
    expect(isDesktopWidth(1023, DESKTOP_SCRUB_MIN)).toBe(false);
    expect(isDesktopWidth(1024, DESKTOP_SCRUB_MIN)).toBe(true);
  });
});

describe('typewriter', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('reveals one character after the start delay', () => {
    const { result } = renderHook(() => useTypewriter('Hi', TYPEWRITER_SPEED_MS, TYPEWRITER_DELAY_MS));
    expect(result.current.displayed).toBe('');
    expect(result.current.done).toBe(false);

    act(() => {
      jest.advanceTimersByTime(TYPEWRITER_DELAY_MS);
    });
    act(() => {
      jest.advanceTimersByTime(TYPEWRITER_SPEED_MS);
    });
    expect(result.current.displayed).toBe('H');

    act(() => {
      jest.advanceTimersByTime(TYPEWRITER_SPEED_MS);
    });
    expect(result.current.displayed).toBe('Hi');
    expect(result.current.done).toBe(true);
    expect(nextTypedLength(1, 2)).toBe(2);
    expect(isTypewriterDone(2, 2)).toBe(true);
  });
});

describe('services and hamburger', () => {
  it('toggles multi-select services and builds the ready banner', () => {
    expect(toggleService([], 'Brand')).toEqual(['Brand']);
    expect(toggleService(['Brand'], 'Brand')).toEqual([]);
    expect(readyMessage('Ready to inquire about:', ['Brand', 'Digital'])).toBe(
      'Ready to inquire about: Brand, Digital',
    );
  });

  it('rotates hamburger bars into an X when open', () => {
    expect(hamburgerBarClass(true, 'top')).toContain('rotate-45');
    expect(hamburgerBarClass(true, 'mid')).toContain('opacity-0');
    expect(hamburgerBarClass(true, 'bottom')).toContain('-rotate-45');
    expect(hamburgerBarClass(false, 'top')).not.toContain('rotate-45');
  });
});
