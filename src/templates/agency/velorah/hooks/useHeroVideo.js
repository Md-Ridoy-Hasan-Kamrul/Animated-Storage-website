import { useEffect, useRef } from 'react';

/** Forces muted loop playback (needed in gallery iframes and after tab focus). */
export function useHeroVideo() {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return undefined;

    const tryPlay = () => {
      video.muted = true;
      video.playsInline = true;
      const play = video.play();
      if (play && typeof play.catch === 'function') {
        play.catch(() => {});
      }
    };

    video.addEventListener('canplay', tryPlay);
    video.addEventListener('loadeddata', tryPlay);
    tryPlay();

    const onVisible = () => {
      if (document.visibilityState === 'visible') tryPlay();
    };
    document.addEventListener('visibilitychange', onVisible);

    return () => {
      video.removeEventListener('canplay', tryPlay);
      video.removeEventListener('loadeddata', tryPlay);
      document.removeEventListener('visibilitychange', onVisible);
    };
  }, []);

  return videoRef;
}
