import {
  BUTTONS_DELAY_S,
  FOOTER_DELAY_S,
  HEADING_DELAY_S,
  MOTION_EASE,
  NAV_DURATION_S,
  NAV_Y,
  SUBTITLE_DELAY_S,
  VIDEO_DURATION_S,
  VIDEO_FROM_SCALE,
} from '../constants';
import {
  buttonsMotion,
  footerMotion,
  headingMotion,
  navMotion,
  subtitleMotion,
  videoMotion,
} from '../utils/motionPresets';

describe('Tech-Forward motion presets', () => {
  it('uses the shared expo ease and navbar slide', () => {
    expect(MOTION_EASE).toEqual([0.16, 1, 0.3, 1]);
    expect(navMotion.initial).toEqual({ y: NAV_Y, opacity: 0 });
    expect(navMotion.transition.duration).toBe(NAV_DURATION_S);
    expect(navMotion.transition.ease).toEqual(MOTION_EASE);
  });

  it('fades the film from 1.05 scale', () => {
    expect(videoMotion.initial).toEqual({ opacity: 0, scale: VIDEO_FROM_SCALE });
    expect(videoMotion.transition.duration).toBe(VIDEO_DURATION_S);
    expect(videoMotion.transition.type).toBe('tween');
  });

  it('staggers footer copy with the prompt delays', () => {
    expect(footerMotion.transition.delay).toBe(FOOTER_DELAY_S);
    expect(subtitleMotion.transition.delay).toBe(SUBTITLE_DELAY_S);
    expect(headingMotion.transition.delay).toBe(HEADING_DELAY_S);
    expect(buttonsMotion.transition.delay).toBe(BUTTONS_DELAY_S);
  });
});
