import {
  GRID_MAX,
  GRID_MIN,
  MASK_STOPS,
  PARALLAX_EASE,
  PARALLAX_SHIFT,
  RADIUS_MAX,
  RADIUS_MIN,
  SMOOTH_EASE,
} from '../constants';
import {
  addGarment,
  addedToast,
  cartCount,
  embedCursorAt,
  gridCellSize,
  gridPatternPath,
  normalizeCursor,
  parallaxTarget,
  removeGarment,
  spotlightRadius,
  stepParallax,
  stepPoint,
} from '../utils/revealMath';

describe('Synth Mode reveal math', () => {
  it('clamps the spotlight radius between 160 and 420 from 16vw', () => {
    expect(spotlightRadius(1000)).toBe(160);
    expect(spotlightRadius(2000)).toBe(320);
    expect(spotlightRadius(4000)).toBe(RADIUS_MAX);
    expect(spotlightRadius(200)).toBe(RADIUS_MIN);
  });

  it('clamps grid cells between 36 and 64 from 2.8vw', () => {
    expect(gridCellSize(1000)).toBe(36);
    expect(gridCellSize(2000)).toBe(56);
    expect(gridCellSize(4000)).toBe(GRID_MAX);
    expect(gridCellSize(200)).toBe(GRID_MIN);
  });

  it('eases the cursor with factor 0.1', () => {
    const next = stepPoint({ x: 0, y: 0 }, { x: 100, y: 50 }, SMOOTH_EASE);
    expect(next).toEqual({ x: 10, y: 5 });
  });

  it('normalizes the cursor to -0.5..0.5 and eases parallax toward cx*16', () => {
    const { cx, cy } = normalizeCursor(800, 200, 1000, 800);
    expect(cx).toBeCloseTo(0.3);
    expect(cy).toBeCloseTo(-0.25);
    const target = parallaxTarget(cx, cy);
    expect(target.x).toBeCloseTo(0.3 * PARALLAX_SHIFT);
    expect(target.y).toBeCloseTo(-0.25 * PARALLAX_SHIFT);
    const eased = stepParallax({ x: 0, y: 0 }, target, PARALLAX_EASE);
    expect(eased.x).toBeCloseTo(target.x * PARALLAX_EASE);
  });

  it('builds the grid pattern path and keeps the six mask stops', () => {
    expect(gridPatternPath(40)).toBe('M 40 0 L 0 0 0 40');
    expect(MASK_STOPS).toHaveLength(6);
    expect(MASK_STOPS[0]).toEqual([0, 'rgba(255,255,255,1)']);
    expect(MASK_STOPS[5]).toEqual([1, 'rgba(255,255,255,0)']);
  });

  it('orbits the embed cursor inside the viewport', () => {
    const point = embedCursorAt(0, 1000, 800);
    expect(point.x).toBeGreaterThan(0);
    expect(point.x).toBeLessThan(1000);
    expect(point.y).toBeGreaterThan(0);
    expect(point.y).toBeLessThan(800);
  });
});

describe('Synth Mode cart helpers', () => {
  const coat = { id: 'overcoat', title: 'CYBER-TEX OVERCOAT', price: '$850' };

  it('adds a line, increments qty, and counts items', () => {
    const once = addGarment([], coat);
    const twice = addGarment(once, coat);
    expect(twice).toHaveLength(1);
    expect(twice[0].qty).toBe(2);
    expect(cartCount(twice)).toBe(2);
  });

  it('removes a line and formats the add toast', () => {
    const lines = addGarment([], coat);
    expect(removeGarment(lines, coat.id)).toEqual([]);
    expect(addedToast(coat.title)).toBe('Added "CYBER-TEX OVERCOAT" to your shopping bag.');
  });
});
