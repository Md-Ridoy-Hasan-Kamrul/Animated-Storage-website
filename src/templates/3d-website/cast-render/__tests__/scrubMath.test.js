import {
  clamp,
  easeSeek,
  formatBootLabel,
  getPanelPaint,
  getSeekTarget,
  hashToProgress,
  ramp,
  readProgress,
  smooth,
} from '../utils/scrubMath';
import { CUES, DRIFT_PX, HASH_PROGRESS, SEEK_EASE, SEEK_GAP_MIN } from '../constants';

describe('Cast & Render scrub math', () => {
  it('clamps and smoothsteps', () => {
    expect(clamp(-1, 0, 1)).toBe(0);
    expect(clamp(2, 0, 1)).toBe(1);
    expect(smooth(0.5)).toBeCloseTo(0.5, 5);
  });

  it('ramps instantly when the window has no width', () => {
    expect(ramp(0, 0, 0)).toBe(1);
    expect(ramp(-0.1, 0, 0)).toBe(0);
    expect(ramp(0.2, 0.1, 0.3)).toBeGreaterThan(0);
    expect(ramp(0.2, 0.1, 0.3)).toBeLessThan(1);
  });

  it('reads page progress from scroll and maps it onto duration', () => {
    expect(readProgress(0, 1000)).toBe(0);
    expect(readProgress(500, 1000)).toBe(0.5);
    expect(readProgress(2000, 1000)).toBe(1);
    expect(readProgress(10, 0)).toBe(0);
    expect(getSeekTarget(0.5, 10.04)).toBeCloseTo(5.02, 4);
  });

  it('eases seek time toward the scroll target without snapping', () => {
    expect(easeSeek(1, 1.0004, SEEK_EASE, SEEK_GAP_MIN)).toBe(1);
    expect(easeSeek(0, 1, SEEK_EASE, SEEK_GAP_MIN)).toBeCloseTo(SEEK_EASE, 5);
  });

  it('keeps panel 1 readable at the top and hides it in the first dead zone', () => {
    const open = getPanelPaint(0, CUES[0], DRIFT_PX);
    expect(open.opacity).toBe(1);
    expect(open.y).toBe(0);
    const dead = getPanelPaint(0.3, CUES[0], DRIFT_PX);
    expect(dead.opacity).toBe(0);
    const next = getPanelPaint(0.3, CUES[1], DRIFT_PX);
    expect(next.opacity).toBe(0);
  });

  it('formats the boot label and maps hashes to cue progress', () => {
    expect(formatBootLabel(0)).toBe('LOADING 0%');
    expect(formatBootLabel(1)).toBe('LOADING 100%');
    expect(hashToProgress('#order', HASH_PROGRESS)).toBe(0.77);
    expect(hashToProgress('#missing', HASH_PROGRESS)).toBeNull();
  });
});
