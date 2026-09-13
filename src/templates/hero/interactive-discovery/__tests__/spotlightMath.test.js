import {
  CURSOR_HIDDEN,
  CURSOR_LERP,
  MASK_STOPS,
  SPOTLIGHT_R,
} from '../constants';
import {
  applyMaskStops,
  embedCursorAt,
  hiddenCursor,
  lerpAxis,
  paintSpotlightMask,
  sizeCanvas,
  stepCursor,
} from '../utils/spotlightMath';

describe('spotlight cursor math', () => {
  it('lerps 0.1 toward the raw pointer each frame', () => {
    expect(lerpAxis(0, 100, CURSOR_LERP)).toBe(10);
    expect(stepCursor({ x: 0, y: 0 }, { x: 200, y: 50 }, CURSOR_LERP)).toEqual({
      x: 20,
      y: 5,
    });
  });

  it('starts the cursor off-canvas', () => {
    expect(hiddenCursor(CURSOR_HIDDEN)).toEqual({ x: -999, y: -999 });
  });

  it('uses the prompt spotlight radius and mask stops', () => {
    expect(SPOTLIGHT_R).toBe(260);
    expect(MASK_STOPS).toEqual([
      [0, 'rgba(255,255,255,1)'],
      [0.4, 'rgba(255,255,255,1)'],
      [0.6, 'rgba(255,255,255,0.75)'],
      [0.75, 'rgba(255,255,255,0.4)'],
      [0.88, 'rgba(255,255,255,0.12)'],
      [1, 'rgba(255,255,255,0)'],
    ]);
  });
});

describe('spotlight canvas mask', () => {
  it('paints a radial arc and returns a data URL', () => {
    const stops = [];
    const gradient = {
      addColorStop: (offset, color) => stops.push([offset, color]),
    };
    const ctx = {
      canvas: { width: 100, height: 80, toDataURL: () => 'data:image/png;base64,mask' },
      clearRect: jest.fn(),
      createRadialGradient: jest.fn(() => gradient),
      beginPath: jest.fn(),
      arc: jest.fn(),
      fill: jest.fn(),
      fillStyle: null,
    };

    applyMaskStops(gradient, MASK_STOPS);
    expect(stops).toHaveLength(6);

    const url = paintSpotlightMask(ctx, 40, 30, SPOTLIGHT_R, MASK_STOPS);
    expect(ctx.clearRect).toHaveBeenCalledWith(0, 0, 100, 80);
    expect(ctx.createRadialGradient).toHaveBeenCalledWith(40, 30, 0, 40, 30, 260);
    expect(ctx.arc).toHaveBeenCalledWith(40, 30, 260, 0, Math.PI * 2);
    expect(url).toBe('data:image/png;base64,mask');
  });

  it('sizes the hidden canvas to the viewport', () => {
    const canvas = {};
    sizeCanvas(canvas, 1440, 900);
    expect(canvas.width).toBe(1440);
    expect(canvas.height).toBe(900);
  });
});

describe('embed spotlight path', () => {
  it('keeps the tour inside the viewport', () => {
    const pos = embedCursorAt(0.25, 1200, 800);
    expect(pos.x).toBeGreaterThan(0);
    expect(pos.x).toBeLessThan(1200);
    expect(pos.y).toBeGreaterThan(0);
    expect(pos.y).toBeLessThan(800);
  });
});
