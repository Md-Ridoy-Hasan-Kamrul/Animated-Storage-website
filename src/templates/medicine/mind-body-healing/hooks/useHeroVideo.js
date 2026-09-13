import { useEffect, useRef } from 'react';

export function useHeroVideo() {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return undefined;

    const play = () => {
      video.muted = true;
      video.playsInline = true;
      const request = video.play();
      if (request && typeof request.catch === 'function') request.catch(() => {});
    };

    const onVisible = () => {
      if (document.visibilityState === 'visible') play();
    };

    video.addEventListener('canplay', play);
    video.addEventListener('loadeddata', play);
    document.addEventListener('visibilitychange', onVisible);
    play();

    return () => {
      video.removeEventListener('canplay', play);
      video.removeEventListener('loadeddata', play);
      document.removeEventListener('visibilitychange', onVisible);
    };
  }, []);

  return videoRef;
}
