import { canUseHotspot } from '../appearance';
import { hotspots, systems } from '../content';
import {
  EMBED_POSE_HOLD_MS,
  EMBED_POSE_REST_MS,
  IMAGE_RATIO_H,
  IMAGE_RATIO_W,
  MOBILE_MAX_PX,
  PREVIEW_POSES,
} from '../constants';
import { nextPreviewClip } from '../utils/hoverQueue';
import { measureImagePlane } from '../utils/imagePlane';
import { nextPreviewPose, previewPoseDelay } from '../utils/previewCycle';

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

  it('covers the framed iframe instead of letterboxing a card', () => {
    const details = measureImagePlane(800, 640, { framed: true });
    expect(details.height).toBe(640);
    expect(details.top).toBe(0);
    expect(details.left).toBeLessThan(0);
    expect(details.width).toBeGreaterThan(800);
    expect(details.height / details.width).toBeCloseTo(IMAGE_RATIO_H / IMAGE_RATIO_W);

    const card = measureImagePlane(1280, 580, { framed: true });
    expect(card.width).toBe(1280);
    expect(card.height).toBeGreaterThan(580);
    expect(card.top).toBeLessThan(0);
    expect(card.height / card.width).toBeCloseTo(IMAGE_RATIO_H / IMAGE_RATIO_W);
  });
});

describe('VEYRA embed hover cycle', () => {
  it('walks rest → drive → rest → battery and holds poses longer than rest', () => {
    expect(PREVIEW_POSES).toEqual([null, 'drive', null, 'battery']);
    expect(nextPreviewPose(0)).toBe('drive');
    expect(nextPreviewPose(1)).toBeNull();
    expect(nextPreviewPose(2)).toBe('battery');
    expect(nextPreviewPose(3)).toBeNull();
    expect(previewPoseDelay('drive')).toBe(EMBED_POSE_HOLD_MS);
    expect(previewPoseDelay(null)).toBe(EMBED_POSE_REST_MS);
    expect(EMBED_POSE_HOLD_MS).toBeGreaterThan(EMBED_POSE_REST_MS);
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
