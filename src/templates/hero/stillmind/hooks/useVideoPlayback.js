import { useEffect, useRef } from 'react';
import { VIDEO_COUNT } from '../constants';

export function useVideoPlayback() {
  const videosRef = useRef([]);

  useEffect(() => {
    const nodes = videosRef.current.filter(Boolean);

    const tryPlay = (video) => {
      video.muted = true;
      video.playsInline = true;
      const play = video.play();
      if (play && typeof play.catch === 'function') play.catch(() => {});
    };

    const onVisible = () => {
      if (document.visibilityState === 'visible') nodes.forEach(tryPlay);
    };

    nodes.forEach((video) => {
      video.addEventListener('canplay', () => tryPlay(video));
      video.addEventListener('loadeddata', () => tryPlay(video));
      tryPlay(video);
    });
    document.addEventListener('visibilitychange', onVisible);

    return () => {
      document.removeEventListener('visibilitychange', onVisible);
    };
  }, []);

  const setVideoRef = (index) => (node) => {
    videosRef.current[index] = node;
  };

  return { setVideoRef, count: VIDEO_COUNT };
}
