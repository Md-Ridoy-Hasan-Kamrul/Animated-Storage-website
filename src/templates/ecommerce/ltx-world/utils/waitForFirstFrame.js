import {
  FIRST_FRAME_MEDIA_TIME_MAX_S,
  FIRST_FRAME_TIMEOUT_MS,
  READY_STATE_HAVE_CURRENT_DATA,
  SEEK_EPSILON_S,
} from '../constants';

function waitDoubleRaf() {
  return new Promise((resolve) => {
    requestAnimationFrame(() => {
      requestAnimationFrame(resolve);
    });
  });
}

export function waitForFirstFrame(video, token, getToken) {
  return new Promise((resolve, reject) => {
    let settled = false;
    let frameHandle = 0;
    let timeoutId = 0;
    let remaining = FIRST_FRAME_TIMEOUT_MS;
    let lastTick = Date.now();

    const cleanup = () => {
      if (frameHandle && video.cancelVideoFrameCallback) {
        video.cancelVideoFrameCallback(frameHandle);
      }
      video.removeEventListener('playing', onPlaying);
      document.removeEventListener('visibilitychange', onVisibility);
      window.clearTimeout(timeoutId);
    };

    const fail = (error) => {
      if (settled || getToken() !== token) return;
      settled = true;
      cleanup();
      reject(error);
    };

    const succeed = () => {
      if (settled || getToken() !== token) return;
      settled = true;
      cleanup();
      resolve();
    };

    const isFreshFrame = (mediaTime = video.currentTime) =>
      video.readyState >= READY_STATE_HAVE_CURRENT_DATA &&
      mediaTime <= FIRST_FRAME_MEDIA_TIME_MAX_S;

    const armTimeout = () => {
      window.clearTimeout(timeoutId);
      if (document.hidden) return;
      lastTick = Date.now();
      timeoutId = window.setTimeout(() => {
        fail(new Error('First frame timeout'));
      }, remaining);
    };

    const onVisibility = () => {
      if (document.hidden) {
        remaining -= Date.now() - lastTick;
        window.clearTimeout(timeoutId);
        video.pause();
        try {
          video.currentTime = 0;
        } catch {
          /* ignore */
        }
        return;
      }
      const replay = video.play();
      if (replay && typeof replay.catch === 'function') {
        replay.catch(() => {});
      }
      armTimeout();
    };

    const onPlaying = async () => {
      await waitDoubleRaf();
      if (isFreshFrame()) succeed();
    };

    const onFrame = (_now, meta) => {
      if (getToken() !== token) return;
      if (isFreshFrame(meta.mediaTime)) {
        succeed();
        return;
      }
      if (video.requestVideoFrameCallback) {
        frameHandle = video.requestVideoFrameCallback(onFrame);
      }
    };

    document.addEventListener('visibilitychange', onVisibility);
    video.addEventListener('playing', onPlaying);
    if (video.requestVideoFrameCallback) {
      frameHandle = video.requestVideoFrameCallback(onFrame);
    }
    armTimeout();
  });
}

export function waitForSeeked(video) {
  if (video.currentTime <= SEEK_EPSILON_S) return Promise.resolve();
  return new Promise((resolve) => {
    const onSeeked = () => {
      video.removeEventListener('seeked', onSeeked);
      resolve();
    };
    video.addEventListener('seeked', onSeeked);
    video.currentTime = 0;
  });
}
