import { READY_STATE_HAVE_CURRENT_DATA } from '../constants';

export function parkVideoAtStart(video) {
  if (!video || video.readyState < READY_STATE_HAVE_CURRENT_DATA) return false;
  video.pause();
  try {
    video.currentTime = 0;
  } catch {
    /* ignore unseekable frames */
  }
  return true;
}
