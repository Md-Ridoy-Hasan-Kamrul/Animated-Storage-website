import { renderHook, act } from '@testing-library/react';
import { useResponsiveLayout } from '../useResponsiveLayout';
import { LAYOUT_BREAKPOINTS } from '../../constants/layoutBreakpoints';

const setViewportWidth = (width) => {
  Object.defineProperty(window, 'innerWidth', {
    configurable: true,
    writable: true,
    value: width,
  });
};

describe('useResponsiveLayout', () => {
  const originalWidth = window.innerWidth;

  afterEach(() => {
    setViewportWidth(originalWidth);
  });

  it('returns metrics for the current window width on mount', () => {
    setViewportWidth(LAYOUT_BREAKPOINTS.MOBILE_M);
    const { result } = renderHook(() => useResponsiveLayout());
    expect(result.current.tier).toBe('mobileM');
    expect(result.current.viewportWidth).toBe(LAYOUT_BREAKPOINTS.MOBILE_M);
  });

  it('updates metrics when the window is resized to tablet', () => {
    setViewportWidth(LAYOUT_BREAKPOINTS.MOBILE_S);
    const { result } = renderHook(() => useResponsiveLayout());

    act(() => {
      setViewportWidth(LAYOUT_BREAKPOINTS.TABLET);
      window.dispatchEvent(new Event('resize'));
    });

    expect(result.current.tier).toBe('tablet');
    expect(result.current.showDesktopNav).toBe(false);
  });

  it('enables desktop nav when resized to laptop width', () => {
    setViewportWidth(LAYOUT_BREAKPOINTS.TABLET);
    const { result } = renderHook(() => useResponsiveLayout());

    act(() => {
      setViewportWidth(LAYOUT_BREAKPOINTS.LAPTOP);
      window.dispatchEvent(new Event('resize'));
    });

    expect(result.current.tier).toBe('laptop');
    expect(result.current.showDesktopNav).toBe(true);
    expect(result.current.logoHeight).toBeGreaterThanOrEqual(48);
  });

  it('uses desktop metrics above laptop width', () => {
    setViewportWidth(1600);
    const { result } = renderHook(() => useResponsiveLayout());
    expect(result.current.tier).toBe('desktop');
    expect(result.current.logoHeight).toBe(64);
    expect(result.current.headerHeight).toBe(88);
  });
});
