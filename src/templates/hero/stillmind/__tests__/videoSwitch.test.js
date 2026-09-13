import { canChangeVideo, isDeepWoods, nextVideoIndex } from '../utils/videoSwitch';
import { DEEP_WOODS_INDEX, VIDEO_COUNT } from '../constants';

describe('video switch math', () => {
  it('blocks the current clip and mid-crossfade clicks', () => {
    expect(canChangeVideo(0, 0, false)).toBe(false);
    expect(canChangeVideo(1, 0, true)).toBe(false);
    expect(canChangeVideo(2, 0, false)).toBe(true);
  });

  it('walks the four clips in a loop', () => {
    expect(nextVideoIndex(0, VIDEO_COUNT)).toBe(1);
    expect(nextVideoIndex(3, VIDEO_COUNT)).toBe(0);
  });

  it('flags Deep Woods as the third clip', () => {
    expect(isDeepWoods(2, DEEP_WOODS_INDEX)).toBe(true);
    expect(isDeepWoods(0, DEEP_WOODS_INDEX)).toBe(false);
  });
});
