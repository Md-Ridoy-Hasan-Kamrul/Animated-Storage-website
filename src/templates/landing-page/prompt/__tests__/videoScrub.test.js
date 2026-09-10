import {
  getDeadZonePx,
  resolveActiveSide,
  scrubProgress,
  isInDeadZone,
  mouseNormX,
  mouseNormY,
  prefersMouseScrub,
} from '../utils/videoScrub';

describe('videoScrub dead-zone helpers', () => {
  describe('getDeadZonePx', () => {
    it('matches prompt Math.max(30, width * 0.05)', () => {
      expect(getDeadZonePx(400)).toBe(30);
      expect(getDeadZonePx(1000)).toBe(50);
      expect(getDeadZonePx(2000)).toBe(100);
    });
  });

  describe('resolveActiveSide', () => {
    it('keeps previous side inside the dead zone', () => {
      expect(resolveActiveSide(500, 1000, 50, 'left')).toBe('left');
      expect(resolveActiveSide(500, 1000, 50, 'right')).toBe('right');
    });

    it('activates right when cursor is left of dead zone', () => {
      expect(resolveActiveSide(400, 1000, 50, 'left')).toBe('right');
    });

    it('activates left when cursor is right of dead zone', () => {
      expect(resolveActiveSide(600, 1000, 50, 'right')).toBe('left');
    });
  });

  describe('scrubProgress', () => {
    it('returns 0 inside dead zone', () => {
      expect(scrubProgress(500, 1000, 50, 'left')).toBe(0);
      expect(scrubProgress(480, 1000, 50, 'right')).toBe(0);
    });

    it('maps left-side scrub from center-dead to left edge', () => {
      expect(scrubProgress(0, 1000, 50, 'right')).toBeCloseTo(1);
      expect(scrubProgress(225, 1000, 50, 'right')).toBeCloseTo(0.5);
    });

    it('maps right-side scrub from center+dead to right edge', () => {
      expect(scrubProgress(1000, 1000, 50, 'left')).toBeCloseTo(1);
      expect(scrubProgress(775, 1000, 50, 'left')).toBeCloseTo(0.5);
    });
  });

  describe('isInDeadZone', () => {
    it('detects band around center', () => {
      expect(isInDeadZone(500, 1000, 50)).toBe(true);
      expect(isInDeadZone(449, 1000, 50)).toBe(false);
    });
  });

  describe('mouseNormX', () => {
    it('maps edges to -1 / 1 and center to 0', () => {
      expect(mouseNormX(0, 1000)).toBe(-1);
      expect(mouseNormX(500, 1000)).toBe(0);
      expect(mouseNormX(1000, 1000)).toBe(1);
    });
  });

  describe('mouseNormY', () => {
    it('maps top/bottom to -1 / 1', () => {
      expect(mouseNormY(0, 800)).toBe(-1);
      expect(mouseNormY(400, 800)).toBe(0);
      expect(mouseNormY(800, 800)).toBe(1);
    });
  });

  describe('prefersMouseScrub', () => {
    it('is true when hasMousePointer even on narrow widths', () => {
      expect(prefersMouseScrub(true)).toBe(true);
    });
  });
});
