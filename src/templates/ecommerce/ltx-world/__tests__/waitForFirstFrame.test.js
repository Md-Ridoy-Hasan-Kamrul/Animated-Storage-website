import { FIRST_FRAME_TIMEOUT_MS, SEEK_EPSILON_S } from '../constants';
import { waitForFirstFrame, waitForSeeked } from '../utils/waitForFirstFrame';

const createMockVideo = ({
  readyState = 2,
  currentTime = 0,
  hasRvfc = true,
} = {}) => {
  const listeners = {};
  const video = {
    readyState,
    currentTime,
    pause: jest.fn(),
    play: jest.fn(() => Promise.resolve()),
    addEventListener: (type, fn) => {
      listeners[type] = listeners[type] || [];
      listeners[type].push(fn);
    },
    removeEventListener: (type, fn) => {
      listeners[type] = (listeners[type] || []).filter((handler) => handler !== fn);
    },
    emit(type) {
      (listeners[type] || []).forEach((handler) => handler());
    },
  };

  if (hasRvfc) {
    video.requestVideoFrameCallback = jest.fn((callback) => {
      video.frameCallback = callback;
      return 1;
    });
    video.cancelVideoFrameCallback = jest.fn();
  }

  return video;
};

describe('waitForSeeked', () => {
  it('resolves immediately when already at the start frame', async () => {
    const video = createMockVideo({ currentTime: SEEK_EPSILON_S });
    await expect(waitForSeeked(video)).resolves.toBeUndefined();
  });

  it('rewinds and waits for seeked when currentTime is above epsilon', async () => {
    const video = createMockVideo({ currentTime: 1.25 });
    const pending = waitForSeeked(video);
    expect(video.currentTime).toBe(0);
    video.emit('seeked');
    await pending;
  });
});

describe('waitForFirstFrame', () => {
  it('resolves only when rVFC reports a fresh decoded frame', async () => {
    const video = createMockVideo();
    const token = 7;
    const pending = waitForFirstFrame(video, token, () => token);
    video.frameCallback(0, { mediaTime: 0.04 });
    await expect(pending).resolves.toBeUndefined();
  });

  it('keeps waiting when mediaTime is a stale endpoint frame', async () => {
    jest.useFakeTimers();
    const video = createMockVideo();
    const token = 3;
    const pending = waitForFirstFrame(video, token, () => token);
    video.frameCallback(0, { mediaTime: 2.08 });
    expect(video.requestVideoFrameCallback).toHaveBeenCalledTimes(2);
    pending.catch(() => {});
    jest.advanceTimersByTime(FIRST_FRAME_TIMEOUT_MS);
    await expect(pending).rejects.toThrow('First frame timeout');
    jest.useRealTimers();
  });

  it('rejects on timeout and never treats timeout as a decoded frame', async () => {
    jest.useFakeTimers();
    const video = createMockVideo({ hasRvfc: false });
    const token = 1;
    const pending = waitForFirstFrame(video, token, () => token);
    const expectation = expect(pending).rejects.toThrow('First frame timeout');
    jest.advanceTimersByTime(FIRST_FRAME_TIMEOUT_MS);
    await expectation;
    jest.useRealTimers();
  });
});
