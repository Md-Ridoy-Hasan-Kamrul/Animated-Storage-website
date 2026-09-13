import {
  CHECKER_CELLS,
  CHECKER_COLS,
  CHECKER_EMPTY_CLASS,
  CHECKER_FILLED_CLASS,
  DOT_BOX_PX,
  DOT_COUNT,
  DOT_SIZE_PX,
  ICON_SWAP_OFF,
  ICON_SWAP_ON,
  OVERLAY_CLOSED_CLASS,
  OVERLAY_OPEN_CLASS,
  VIDEO_FROM_SCALE,
} from '../constants';
import {
  buildTriangleDots,
  checkerCellClass,
  iconSwapClass,
  overlayMotionClass,
} from '../utils/statIcons';
import { copyMotion, statsMotion, videoMotion } from '../utils/motionPresets';

describe('Mind-Body Healing stat icons', () => {
  it('places nine triangle dots inside the 20px box', () => {
    const dots = buildTriangleDots({
      boxSize: DOT_BOX_PX,
      dotSize: DOT_SIZE_PX,
    });
    expect(dots).toHaveLength(DOT_COUNT);
    dots.forEach((dot) => {
      expect(dot.top).toBeGreaterThanOrEqual(0);
      expect(dot.left).toBeGreaterThanOrEqual(0);
      expect(dot.top).toBeLessThanOrEqual(DOT_BOX_PX - DOT_SIZE_PX);
      expect(dot.left).toBeLessThanOrEqual(DOT_BOX_PX - DOT_SIZE_PX);
    });
    expect(dots[0].left).toBeCloseTo((DOT_BOX_PX - DOT_SIZE_PX) / 2);
  });

  it('builds a 3x3 checkerboard starting filled', () => {
    const cells = Array.from({ length: CHECKER_CELLS }, (_, index) =>
      checkerCellClass(index, CHECKER_COLS, CHECKER_FILLED_CLASS, CHECKER_EMPTY_CLASS),
    );
    expect(cells[0]).toBe(CHECKER_FILLED_CLASS);
    expect(cells[1]).toBe(CHECKER_EMPTY_CLASS);
    expect(cells[3]).toBe(CHECKER_EMPTY_CLASS);
    expect(cells[4]).toBe(CHECKER_FILLED_CLASS);
  });
});

describe('Mind-Body Healing motion helpers', () => {
  it('toggles overlay and icon swap classes', () => {
    expect(overlayMotionClass(true, OVERLAY_OPEN_CLASS, OVERLAY_CLOSED_CLASS)).toBe(
      OVERLAY_OPEN_CLASS,
    );
    expect(overlayMotionClass(false, OVERLAY_OPEN_CLASS, OVERLAY_CLOSED_CLASS)).toBe(
      OVERLAY_CLOSED_CLASS,
    );
    expect(iconSwapClass(true, ICON_SWAP_ON, ICON_SWAP_OFF)).toBe(ICON_SWAP_ON);
    expect(iconSwapClass(false, ICON_SWAP_ON, ICON_SWAP_OFF)).toBe(ICON_SWAP_OFF);
  });

  it('fades the film and lifts copy and stats', () => {
    expect(videoMotion.initial.scale).toBe(VIDEO_FROM_SCALE);
    expect(copyMotion.initial.opacity).toBe(0);
    expect(statsMotion.initial.y).toBe(copyMotion.initial.y);
  });
});
