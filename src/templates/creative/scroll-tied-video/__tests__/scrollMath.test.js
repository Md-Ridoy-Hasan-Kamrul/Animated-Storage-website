import { getProgress } from '../utils/scrollProgress';
import {
  isNavLight,
  isStaggerVisible,
  s1Opacity,
  s2Opacity,
  s3Opacity,
} from '../utils/sectionOpacity';
import { shouldSeekFallback, stepLerp } from '../utils/lerpTime';
import { lruWarmRange, nearestIndex } from '../utils/nearestIndex';
import { menuItemDelayMs, navLinkDelayMs } from '../utils/navEntrance';
import {
  LERP_TAU,
  NAV_FLIP_AT,
  SEEK_GAP,
  SNAP,
  STAGGER_VISIBLE_AT,
} from '../constants';

describe('scroll progress', () => {
  it('clamps scroll position to the sticky track span', () => {
    expect(getProgress(0, 5000, 1000)).toBe(0);
    expect(getProgress(2000, 5000, 1000)).toBe(0.5);
    expect(getProgress(4000, 5000, 1000)).toBe(1);
    expect(getProgress(9000, 5000, 1000)).toBe(1);
    expect(getProgress(10, 1000, 1000)).toBe(0);
  });
});

describe('sequential section opacities', () => {
  it('holds section 1 until 0.20 then fades across 0.08', () => {
    expect(s1Opacity(0)).toBe(1);
    expect(s1Opacity(0.2)).toBe(1);
    expect(s1Opacity(0.24)).toBeCloseTo(0.5, 5);
    expect(s1Opacity(0.28)).toBe(0);
  });

  it('crossfades section 2 after section 1 is gone', () => {
    expect(s2Opacity(0.28)).toBe(0);
    expect(s2Opacity(0.36)).toBeCloseTo(0.5, 5);
    expect(s2Opacity(0.48)).toBe(1);
    expect(s2Opacity(0.59)).toBeCloseTo(0.5, 5);
    expect(s2Opacity(0.63)).toBeCloseTo(0, 5);
  });

  it('brings section 3 in after section 2 exits', () => {
    expect(s3Opacity(0.66)).toBe(0);
    expect(s3Opacity(0.71)).toBeCloseTo(0.5, 5);
    expect(s3Opacity(0.75)).toBe(1);
    expect(s3Opacity(1)).toBe(1);
  });

  it('shows stagger children only after the section is mostly visible', () => {
    expect(isStaggerVisible(0.3, STAGGER_VISIBLE_AT)).toBe(false);
    expect(isStaggerVisible(0.31, STAGGER_VISIBLE_AT)).toBe(true);
  });

  it('flips nav color after 0.55', () => {
    expect(isNavLight(0.55, NAV_FLIP_AT)).toBe(true);
    expect(isNavLight(0.5501, NAV_FLIP_AT)).toBe(false);
  });
});

describe('lerp and seek fallback', () => {
  it('eases toward the target and snaps inside the threshold', () => {
    const next = stepLerp(0, 10, 1 / 60, LERP_TAU, SNAP);
    expect(next).toBeGreaterThan(0);
    expect(next).toBeLessThan(10);
    expect(stepLerp(1.001, 1, 0.1, LERP_TAU, SNAP)).toBe(1);
  });

  it('seeks the video only when the gap is large and it is not already seeking', () => {
    expect(shouldSeekFallback(1, 1.02, false, SEEK_GAP)).toBe(true);
    expect(shouldSeekFallback(1, 1.005, false, SEEK_GAP)).toBe(false);
    expect(shouldSeekFallback(1, 2, true, SEEK_GAP)).toBe(false);
  });
});

describe('frame bank nearest index', () => {
  const bank = [{ ts: 0 }, { ts: 1e6 }, { ts: 2e6 }, { ts: 3e6 }];

  it('binary-searches timestamps in microseconds', () => {
    expect(nearestIndex(bank, 0)).toBe(0);
    expect(nearestIndex(bank, 1)).toBe(1);
    expect(nearestIndex(bank, 1.4)).toBe(1);
    expect(nearestIndex(bank, 1.6)).toBe(2);
    expect(nearestIndex([], 1)).toBe(-1);
  });

  it('warms the LRU around the current frame', () => {
    expect(lruWarmRange(0, 3)).toEqual([0, 1, 2]);
    expect(lruWarmRange(2, 3)).toEqual([1, 2, 3]);
  });
});

describe('nav entrance delays', () => {
  it('staggers desktop links and overlay items from the spec', () => {
    expect(navLinkDelayMs(0)).toBe(100);
    expect(navLinkDelayMs(2)).toBe(260);
    expect(menuItemDelayMs(3, 60)).toBe(180);
  });
});
