export function playMuted(video) {
  if (!video) return;
  video.muted = true;
  video.defaultMuted = true;
  video.playsInline = true;
  if (typeof video.setAttribute === 'function') {
    video.setAttribute('muted', '');
    video.setAttribute('playsinline', '');
  }
  const request = video.play();
  if (request && typeof request.catch === 'function') request.catch(() => {});
}
