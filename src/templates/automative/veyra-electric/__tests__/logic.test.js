import { canUseHotspot } from '../appearance';
import { hotspots, systems } from '../content';
import { IMAGE_RATIO_H, IMAGE_RATIO_W, MOBILE_MAX_PX } from '../constants';
import { nextPreviewClip } from '../utils/hoverQueue';
import { measureImagePlane } from '../utils/imagePlane';

describe('VEYRA hover queue', () => {
  it('finishes the active system before starting another', () => {
    expect(nextPreviewClip(null, 'drive')).toEqual({ id: 'drive', reverse: false });
    expect(nextPreviewClip('drive', null)).toEqual({ id: 'drive', reverse: true });
    expect(nextPreviewClip('drive', 'battery')).toEqual({ id: 'drive', reverse: true });
    expect(nextPreviewClip('drive', 'drive')).toBeNull();
  });
});

describe('VEYRA appearance lock', () => {
  it('disables unrelated points while a mode is open or closing', () => {
    expect(canUseHotspot(null, 'drive', false)).toBe(true);
    expect(canUseHotspot('paint', 'paint', false)).toBe(true);
    expect(canUseHotspot('paint', 'drive', false)).toBe(false);
    expect(canUseHotspot('paint', 'paint', true)).toBe(false);
  });
});

describe('VEYRA image plane', () => {
  it('keeps the 1672:941 plane and 20px mobile gutters', () => {
    const desktop = measureImagePlane(1440, 900);
    expect(desktop.height / desktop.width).toBeCloseTo(IMAGE_RATIO_H / IMAGE_RATIO_W);
    const mobile = measureImagePlane(390, 844);
    expect(390).toBeLessThanOrEqual(MOBILE_MAX_PX);
    expect(mobile.width).toBe(350);
    expect(mobile.top).toBe(132);
  });
});

describe('VEYRA hotspot contract', () => {
  it('places the four overview points on the image plane', () => {
    expect(hotspots).toHaveLength(4);
    expect(systems.drive.anchor).toEqual({ x: 25, y: 48 });
    expect(systems.battery.anchor).toEqual({ x: 64, y: 72 });
    expect(hotspots.find((item) => item.id === 'paint').anchor).toEqual({ x: 55, y: 51 });
    expect(hotspots.find((item) => item.id === 'wheels').anchor).toEqual({ x: 48, y: 71 });
  });
});
