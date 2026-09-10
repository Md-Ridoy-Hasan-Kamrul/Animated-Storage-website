import {
  LAYOUT_BREAKPOINTS,
  LAYOUT_METRICS,
  resolveLayoutTier,
} from '../../constants/layoutBreakpoints';
import { getLayoutMetrics } from '../getLayoutMetrics';

describe('LAYOUT_BREAKPOINTS', () => {
  it('defines required viewport widths in ascending order', () => {
    expect(LAYOUT_BREAKPOINTS.MOBILE_S).toBe(320);
    expect(LAYOUT_BREAKPOINTS.MOBILE_M).toBe(375);
    expect(LAYOUT_BREAKPOINTS.MOBILE_L).toBe(425);
    expect(LAYOUT_BREAKPOINTS.TABLET).toBe(768);
    expect(LAYOUT_BREAKPOINTS.LAPTOP).toBe(1020);

    const values = Object.values(LAYOUT_BREAKPOINTS);
    expect(values).toEqual([...values].sort((a, b) => a - b));
  });
});

describe('resolveLayoutTier', () => {
  it.each([
    [320, 'mobileS'],
    [375, 'mobileM'],
    [425, 'mobileL'],
    [768, 'tablet'],
    [1020, 'laptop'],
    [1440, 'desktop'],
  ])('maps width %i to tier %s', (width, tier) => {
    expect(resolveLayoutTier(width)).toBe(tier);
  });

  it('treats widths below mobile S as mobileS', () => {
    expect(resolveLayoutTier(280)).toBe('mobileS');
  });
});

describe('getLayoutMetrics', () => {
  it.each([
    ['mobileS', LAYOUT_BREAKPOINTS.MOBILE_S],
    ['mobileM', LAYOUT_BREAKPOINTS.MOBILE_M],
    ['mobileL', LAYOUT_BREAKPOINTS.MOBILE_L],
    ['tablet', LAYOUT_BREAKPOINTS.TABLET],
    ['laptop', LAYOUT_BREAKPOINTS.LAPTOP],
    ['desktop', 1440],
  ])('returns metrics for %s at width %i', (tier, width) => {
    const metrics = getLayoutMetrics(width);
    expect(metrics.tier).toBe(tier);
    expect(metrics).toMatchObject(LAYOUT_METRICS[tier]);
    expect(metrics.logoHeight).toBeGreaterThan(0);
    expect(metrics.headerHeight).toBeGreaterThanOrEqual(metrics.logoHeight);
  });

  it('keeps logo readable on the smallest phone', () => {
    const metrics = getLayoutMetrics(LAYOUT_BREAKPOINTS.MOBILE_S);
    expect(metrics.logoHeight).toBeGreaterThanOrEqual(28);
    expect(metrics.logoHeight).toBeLessThanOrEqual(40);
    expect(metrics.showDesktopNav).toBe(false);
    expect(metrics.showCtaInHeader).toBe(false);
  });

  it('shows desktop nav only from laptop breakpoint upward', () => {
    expect(getLayoutMetrics(LAYOUT_BREAKPOINTS.TABLET).showDesktopNav).toBe(false);
    expect(getLayoutMetrics(LAYOUT_BREAKPOINTS.LAPTOP).showDesktopNav).toBe(true);
    expect(getLayoutMetrics(1440).showDesktopNav).toBe(true);
  });

  it('uses full 64px logo on desktop', () => {
    expect(getLayoutMetrics(1440).logoHeight).toBe(64);
  });

  it('scales logo up across ascending breakpoints', () => {
    const heights = [
      getLayoutMetrics(320).logoHeight,
      getLayoutMetrics(375).logoHeight,
      getLayoutMetrics(425).logoHeight,
      getLayoutMetrics(768).logoHeight,
      getLayoutMetrics(1020).logoHeight,
      getLayoutMetrics(1440).logoHeight,
    ];
    for (let i = 1; i < heights.length; i += 1) {
      expect(heights[i]).toBeGreaterThanOrEqual(heights[i - 1]);
    }
  });
});
