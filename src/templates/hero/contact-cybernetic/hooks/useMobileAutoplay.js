import { useEffect } from 'react';

export function useMobileAutoplay(videoRef, { enabled = true } = {}) {
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !enabled) return undefined;

    video.muted = true;
    video.playsInline = true;
    video.autoplay = true;
    video.loop = true;
    const request = video.play();
    if (request && typeof request.catch === 'function') request.catch(() => {});

    return () => {
      video.pause();
    };
  }, [enabled, videoRef]);
}
