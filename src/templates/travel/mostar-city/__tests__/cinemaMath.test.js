import { clamp, getScrollDistance, lerp, resolveCinemaScroll, segmentInOut, shouldKeepTicking, smoothstep } from '../utils/cinemaMath';
import { buildCinemaVars } from '../utils/cinemaVars';
import { advanceEmbedProgress, scrollYFromProgress } from '../utils/embedTour';
import { buildSightCopies, initialActiveSight, needsSightJump, normalizeActiveSight, sightShiftPx } from '../utils/sightSlider';
import { SIGHTS } from '../content';

describe('cinema math', () => {
  it('clamps, lerps, and smoothsteps', () => {
    expect(clamp(-1)).toBe(0);
    expect(clamp(2)).toBe(1);
    expect(clamp(50, 0, 40)).toBe(40);
    expect(lerp(0, 10, 0.14)).toBeCloseTo(1.4, 5);
    expect(smoothstep(0, 10, 0)).toBe(0);
    expect(smoothstep(0, 10, 10)).toBe(1);
    expect(smoothstep(0, 10, 5)).toBeCloseTo(0.5, 5);
  });

  it('builds a segment with enter, exit, and active', () => {
    const mid = segmentInOut(1100, 560, 900, 1300, 1620);
    expect(mid.enter).toBe(1);
    expect(mid.exit).toBe(0);
    expect(mid.active).toBe(1);
    const after = segmentInOut(1620, 560, 900, 1300, 1620);
    expect(after.active).toBe(0);
  });

  it('reads sticky scroll distance', () => {
    expect(getScrollDistance(0, 4700, 1000)).toBe(0);
    expect(getScrollDistance(-500, 4700, 1000)).toBe(500);
    expect(getScrollDistance(-9000, 4700, 1000)).toBe(3700);
  });

  it('falls back to window scroll when the section box is stuck at the viewport', () => {
    expect(
      resolveCinemaScroll({
        sectionTop: 0,
        sectionHeight: 900,
        innerHeight: 900,
        windowScroll: 800,
        extraPx: 3700,
      }),
    ).toBe(800);
  });

  it('keeps the rAF loop alive while scroll or pointer is easing', () => {
    expect(shouldKeepTicking(10, 10.1, 0, 0, 0, 0)).toBe(true);
    expect(shouldKeepTicking(10, 10, 0, 0, 0, 0)).toBe(false);
  });
});

describe('cinema variables', () => {
  const base = {
    mouseX: 0,
    mouseY: 0,
    innerHeight: 900,
    reduceMotion: false,
  };

  it('fades the title out by 650px of scroll', () => {
    const start = buildCinemaVars({ ...base, smoothScroll: 0 });
    const gone = buildCinemaVars({ ...base, smoothScroll: 650 });
    expect(start['--title-opacity']).toBe('1');
    expect(gone['--title-opacity']).toBe('0');
    expect(gone['--title-y']).toBe('-210px');
    expect(gone['--title-scale']).toBe('0.92');
    expect(gone['--intro-copy-y']).toBe('90px');
  });

  it('opens the bridge and splitframes in the second beat', () => {
    const peak = buildCinemaVars({ ...base, smoothScroll: 1100 });
    expect(Number(peak['--bridge-width'].replace('vw', ''))).toBeGreaterThan(67.2);
    expect(peak['--shade-z']).toBe('2');
    expect(Number(peak['--panel2-opacity'])).toBeGreaterThan(0.9);
  });

  it('hides the sights rail until the late enter window', () => {
    const hidden = buildCinemaVars({ ...base, smoothScroll: 2000 });
    const visible = buildCinemaVars({ ...base, smoothScroll: 3560 });
    expect(hidden['--sights-visibility']).toBe('hidden');
    expect(visible['--sights-visibility']).toBe('visible');
    expect(visible['--sights-enter-x']).toBe('0vw');
    expect(visible.sightsReady).toBe(false);
    const ready = buildCinemaVars({ ...base, smoothScroll: 3660 });
    expect(ready.sightsReady).toBe(true);
  });

  it('zeros pointer parallax when reduced motion is on', () => {
    const vars = buildCinemaVars({
      ...base,
      mouseX: 0.4,
      mouseY: -0.2,
      smoothScroll: 0,
      reduceMotion: true,
    });
    expect(vars['--mx']).toBe('0.0000');
    expect(vars['--my']).toBe('0.0000');
  });
});

describe('embed tour', () => {
  it('reverses at the ends of the 0-1 loop', () => {
    expect(advanceEmbedProgress(0.95, 1, 0.1, 1)).toEqual({ progress: 1, dir: -1 });
    expect(advanceEmbedProgress(0.05, -1, 0.1, 1)).toEqual({ progress: 0, dir: 1 });
    expect(scrollYFromProgress(0.5, 3700)).toBe(1850);
  });
});

describe('sight slider', () => {
  it('starts in the middle set and clones three copies', () => {
    const copies = buildSightCopies(SIGHTS);
    expect(copies).toHaveLength(15);
    expect(initialActiveSight(SIGHTS.length)).toBe(5);
    expect(copies[5].title).toBe('Stari Most');
  });

  it('jumps back into the middle set at either edge', () => {
    expect(needsSightJump(10, 5)).toBe(true);
    expect(normalizeActiveSight(10, 5)).toBe(5);
    expect(normalizeActiveSight(3, 5)).toBe(8);
    expect(normalizeActiveSight(7, 5)).toBe(7);
    expect(sightShiftPx(400, 20, 5)).toBe(-2100);
  });
});
