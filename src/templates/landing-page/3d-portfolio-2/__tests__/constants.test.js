import {
  PAGE_BG,
  PROJECT_IMAGE_HEIGHTS,
  MARQUEE_TILE,
  MARQUEE_SCROLL_FACTOR,
} from '../constants';

describe('3D Portfolio 2.0 constants', () => {
  it('locks page background to prompt value', () => {
    expect(PAGE_BG).toBe('#0C0C0C');
  });

  it('uses prompt project image clamps', () => {
    expect(PROJECT_IMAGE_HEIGHTS.leftTop).toBe('clamp(130px, 16vw, 230px)');
    expect(PROJECT_IMAGE_HEIGHTS.leftBottom).toBe('clamp(160px, 22vw, 340px)');
  });

  it('uses prompt marquee tile size and scroll factor', () => {
    expect(MARQUEE_TILE.width).toBe(420);
    expect(MARQUEE_TILE.height).toBe(270);
    expect(MARQUEE_SCROLL_FACTOR).toBe(0.3);
  });
});
