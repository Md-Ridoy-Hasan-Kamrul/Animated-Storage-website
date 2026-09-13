export function setVideoPlayback(video, isPlaying) {
  if (!video) return;
  try {
    if (isPlaying) {
      const play = video.play?.();
      if (play && typeof play.catch === 'function') play.catch(() => {});
      return;
    }
    if (video.readyState > 0) video.pause?.();
  } catch {
    /* jsdom and autoplay blocks */
  }
}
