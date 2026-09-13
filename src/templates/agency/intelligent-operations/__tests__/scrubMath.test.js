import {
  CANVAS_DPR_CAP,
  CAPABILITY_DELAY_START,
  CAPABILITY_DELAY_STEP,
  FRAME_FPS,
  FRAME_MAX,
  FRAME_MAX_WIDTH,
  FRAME_MIN,
  LERP_FACTOR,
  NAV_LINK_DELAY_START,
  NAV_LINK_DELAY_STEP,
  SEEK_GAP,
  SEEK_TAIL,
  SERVICE_DELAY_START,
  SERVICE_DELAY_STEP,
} from '../constants';
import { coverDrawRect } from '../utils/coverMath';
import { staggerDelay } from '../utils/delays';
import { advanceEmbedProgress, scrollYFromProgress } from '../utils/embedTour';
import { cacheCanvasSize } from '../utils/frameCache';
import { layerOpacities } from '../utils/layers';
import {
  canvasDpr,
  clamp01,
  frameCountFromDuration,
  frameIndexFromProgress,
  lerpToward,
  scrollProgress,
  seekTimeFromProgress,
  shouldSeekFallback,
} from '../utils/scrubMath';

describe('scroll scrub math', () => {
  it('maps page scroll to a clamped 0–1 progress', () => {
    expect(scrollProgress(0, 2800, 800)).toBe(0);
    expect(scrollProgress(1000, 2800, 800)).toBe(0.5);
    expect(scrollProgress(2000, 2800, 800)).toBe(1);
    expect(scrollProgress(9000, 2800, 800)).toBe(1);
    expect(scrollProgress(10, 800, 800)).toBe(0);
  });

  it('lerps 0.12 toward the target each frame', () => {
    expect(lerpToward(0, 1, LERP_FACTOR)).toBeCloseTo(0.12, 5);
    expect(lerpToward(0.5, 0.5, LERP_FACTOR)).toBe(0.5);
    expect(clamp01(1.4)).toBe(1);
  });

  it('caps extracted frames at duration * 12 between 24 and 90', () => {
    expect(frameCountFromDuration(2, FRAME_FPS, FRAME_MIN, FRAME_MAX)).toBe(24);
    expect(frameCountFromDuration(5, FRAME_FPS, FRAME_MIN, FRAME_MAX)).toBe(60);
    expect(frameCountFromDuration(10, FRAME_FPS, FRAME_MIN, FRAME_MAX)).toBe(90);
    expect(frameCountFromDuration(0, FRAME_FPS, FRAME_MIN, FRAME_MAX)).toBe(24);
  });

  it('seeks the fallback timeline with a 0.05s tail', () => {
    expect(seekTimeFromProgress(0, 10, SEEK_TAIL)).toBe(0);
    expect(seekTimeFromProgress(1, 10, SEEK_TAIL)).toBeCloseTo(9.95, 5);
    expect(seekTimeFromProgress(0.5, 10, SEEK_TAIL)).toBeCloseTo(4.975, 5);
  });

  it('seeks only when the gap is over 0.04s and the video is idle', () => {
    expect(shouldSeekFallback(0, 0.05, false, SEEK_GAP)).toBe(true);
    expect(shouldSeekFallback(0, 0.03, false, SEEK_GAP)).toBe(false);
    expect(shouldSeekFallback(0, 1, true, SEEK_GAP)).toBe(false);
  });

  it('indexes cached frames from smoothed progress', () => {
    expect(frameIndexFromProgress(0, 90)).toBe(0);
    expect(frameIndexFromProgress(1, 90)).toBe(89);
    expect(frameIndexFromProgress(0.5, 91)).toBe(45);
    expect(frameIndexFromProgress(0.2, 1)).toBe(0);
  });

  it('caps canvas DPR at 2', () => {
    expect(canvasDpr(3, CANVAS_DPR_CAP)).toBe(2);
    expect(canvasDpr(1, CANVAS_DPR_CAP)).toBe(1);
  });
});

describe('cover and cache sizing', () => {
  it('center-crops with object-cover scale', () => {
    const box = coverDrawRect(1920, 1080, 1000, 1000);
    expect(box.w).toBeCloseTo((1920 * 1000) / 1080, 5);
    expect(box.h).toBe(1000);
    expect(box.x).toBeLessThan(0);
    expect(box.y).toBe(0);
  });

  it('keeps extracted frames at or under 960px wide', () => {
    expect(cacheCanvasSize(1920, 1080, FRAME_MAX_WIDTH)).toEqual({
      width: 960,
      height: 540,
    });
    expect(cacheCanvasSize(640, 360, FRAME_MAX_WIDTH)).toEqual({
      width: 640,
      height: 360,
    });
  });
});

describe('layer crossfade opacities', () => {
  it('shows poster until a video frame or cache is ready', () => {
    expect(layerOpacities(false, false)).toEqual({ poster: 1, video: 0, canvas: 0 });
    expect(layerOpacities(true, false)).toEqual({ poster: 0, video: 1, canvas: 0 });
    expect(layerOpacities(true, true)).toEqual({ poster: 0, video: 0, canvas: 1 });
    expect(layerOpacities(false, true)).toEqual({ poster: 0, video: 0, canvas: 1 });
  });
});

describe('stagger delays', () => {
  it('uses the prompt nav, service, and capability steps', () => {
    expect(staggerDelay(NAV_LINK_DELAY_START, NAV_LINK_DELAY_STEP, 0)).toBe(100);
    expect(staggerDelay(NAV_LINK_DELAY_START, NAV_LINK_DELAY_STEP, 2)).toBe(300);
    expect(staggerDelay(SERVICE_DELAY_START, SERVICE_DELAY_STEP, 1)).toBe(270);
    expect(staggerDelay(CAPABILITY_DELAY_START, CAPABILITY_DELAY_STEP, 2)).toBe(520);
  });
});

describe('embed tour', () => {
  it('reverses at the ends of the 0–1 loop', () => {
    expect(advanceEmbedProgress(0.95, 1, 0.1, 1)).toEqual({ progress: 1, dir: -1 });
    expect(advanceEmbedProgress(0.05, -1, 0.1, 1)).toEqual({ progress: 0, dir: 1 });
    expect(scrollYFromProgress(0.5, 2000)).toBe(1000);
  });
});
