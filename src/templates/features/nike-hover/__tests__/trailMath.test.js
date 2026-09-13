import {
  BASE_RADIUS_DESKTOP,
  BASE_RADIUS_MOBILE,
  FOLLOWER_LERP,
  LEADER_LERP,
  NUM_TRAILS,
  TRAIL_HIDDEN,
  TRAIL_OPACITY_STEP,
  TRAIL_RADIUS_STEP,
} from '../constants';
import {
  embedCursorAt,
  hiddenPoint,
  makeTrailPoints,
  resolveBaseRadius,
  stepTrail,
  trailIndexFromReverse,
  trailOpacity,
  trailRadius,
} from '../utils/trailMath';

describe('spotlight trail math', () => {
  it('starts six trails off-canvas', () => {
    const points = makeTrailPoints(NUM_TRAILS, TRAIL_HIDDEN);
    expect(points).toHaveLength(6);
    expect(hiddenPoint(TRAIL_HIDDEN)).toEqual({ x: -1000, y: -1000 });
    expect(points[0]).toEqual({ x: -1000, y: -1000 });
  });

  it('eases the leader at 0.2 and followers at 0.35', () => {
    const start = makeTrailPoints(3, 0);
    const next = stepTrail(start, { x: 100, y: 50 }, LEADER_LERP, FOLLOWER_LERP);
    expect(next[0]).toEqual({ x: 20, y: 10 });
    expect(next[1].x).toBeCloseTo(7, 5);
    expect(next[2].x).toBeCloseTo(2.45, 5);
  });

  it('shrinks each trail radius and opacity', () => {
    expect(trailRadius(BASE_RADIUS_DESKTOP, 0, TRAIL_RADIUS_STEP)).toBe(520);
    expect(trailRadius(BASE_RADIUS_DESKTOP, 2, TRAIL_RADIUS_STEP)).toBe(450);
    expect(trailOpacity(0, TRAIL_OPACITY_STEP)).toBe(1);
    expect(trailOpacity(2, TRAIL_OPACITY_STEP)).toBeCloseTo(0.7, 5);
    expect(trailIndexFromReverse(6, 0)).toBe(5);
  });

  it('uses 280 on mobile and 520 on desktop', () => {
    expect(resolveBaseRadius(true, BASE_RADIUS_MOBILE, BASE_RADIUS_DESKTOP)).toBe(280);
    expect(resolveBaseRadius(false, BASE_RADIUS_MOBILE, BASE_RADIUS_DESKTOP)).toBe(520);
  });
});

describe('embed spotlight path', () => {
  it('keeps the tour inside the viewport', () => {
    const pos = embedCursorAt(0.3, 1400, 900);
    expect(pos.x).toBeGreaterThan(0);
    expect(pos.x).toBeLessThan(1400);
    expect(pos.y).toBeGreaterThan(0);
    expect(pos.y).toBeLessThan(900);
  });
});
