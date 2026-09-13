import {
  FRAME_FALLBACK_RATIO,
  FRAME_FPS,
  FRAME_MAX,
  FRAME_MAX_WIDTH,
  FRAME_MIN,
  SEEK_TAIL,
} from '../constants';
import { frameCountFromDuration, seekTimeFromProgress } from './scrubMath';

export function cacheCanvasSize(videoWidth, videoHeight, maxWidth) {
  const width = Math.min(maxWidth, videoWidth > 0 ? videoWidth : maxWidth);
  const ratio = videoWidth > 0 && videoHeight > 0 ? videoHeight / videoWidth : FRAME_FALLBACK_RATIO;
  return {
    width,
    height: Math.max(1, Math.round(width * ratio)),
  };
}

function waitForEvent(target, eventName, signal) {
  return new Promise((resolve, reject) => {
    const finish = (fn) => {
      target.removeEventListener(eventName, onEvent);
      signal?.removeEventListener('abort', onAbort);
      fn();
    };
    const onEvent = () => finish(resolve);
    const onAbort = () => finish(() => reject(new DOMException('aborted', 'AbortError')));
    target.addEventListener(eventName, onEvent, { once: true });
    if (signal?.aborted) {
      onAbort();
      return;
    }
    signal?.addEventListener('abort', onAbort, { once: true });
  });
}

async function seekVideo(video, time, signal) {
  video.currentTime = time;
  await waitForEvent(video, 'seeked', signal);
}

export async function extractFrameBitmaps(src, { signal } = {}) {
  const video = document.createElement('video');
  video.muted = true;
  video.playsInline = true;
  video.preload = 'auto';
  video.src = src;

  await waitForEvent(video, 'loadeddata', signal);
  const count = frameCountFromDuration(video.duration, FRAME_FPS, FRAME_MIN, FRAME_MAX);
  const size = cacheCanvasSize(video.videoWidth, video.videoHeight, FRAME_MAX_WIDTH);
  const canvas = document.createElement('canvas');
  canvas.width = size.width;
  canvas.height = size.height;
  const ctx = canvas.getContext('2d');
  if (!ctx) return [];

  const frames = [];
  for (let index = 0; index < count; index += 1) {
    if (signal?.aborted) break;
    const progress = count <= 1 ? 0 : index / (count - 1);
    await seekVideo(video, seekTimeFromProgress(progress, video.duration, SEEK_TAIL), signal);
    ctx.drawImage(video, 0, 0, size.width, size.height);
    if (typeof createImageBitmap === 'function') {
      frames.push(await createImageBitmap(canvas));
    } else {
      frames.push(canvas);
    }
  }

  video.removeAttribute('src');
  video.load();
  return frames;
}
