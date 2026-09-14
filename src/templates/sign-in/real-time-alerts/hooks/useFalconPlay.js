import { useEffect } from 'react';

export function useFalconPlay(rootRef) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;
    const videos = Array.from(root.querySelectorAll('video'));

    const play = (video) => {
      video.muted = true;
      video.playsInline = true;
      const request = video.play();
      if (request && typeof request.catch === 'function') request.catch(() => {});
    };

    const playAll = () => videos.forEach(play);
    const onVisible = () => {
      if (document.visibilityState === 'visible') playAll();
    };

    videos.forEach((video) => {
      video.addEventListener('canplay', playAll);
      video.addEventListener('loadeddata', playAll);
    });
    document.addEventListener('visibilitychange', onVisible);
    playAll();

    return () => {
      videos.forEach((video) => {
        video.removeEventListener('canplay', playAll);
        video.removeEventListener('loadeddata', playAll);
      });
      document.removeEventListener('visibilitychange', onVisible);
    };
  }, [rootRef]);
}
