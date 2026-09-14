import { useEffect, useRef } from 'react';
import { PLAY_RETRY_MS } from '../constants';
import { playMuted } from '../utils/playVideo';

export function useAutoplayRetry() {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return undefined;

    const play = () => playMuted(video);
    const onVisible = () => {
      if (document.visibilityState === 'visible') play();
    };

    play();
    const timer = window.setInterval(play, PLAY_RETRY_MS);
    video.addEventListener('canplay', play);
    video.addEventListener('loadeddata', play);
    video.addEventListener('loadedmetadata', play);
    document.addEventListener('visibilitychange', onVisible);
    document.addEventListener('click', play);
    document.addEventListener('touchstart', play);

    let io;
    if (typeof IntersectionObserver !== 'undefined') {
      io = new IntersectionObserver(
        (entries) => {
          if (entries.some((entry) => entry.isIntersecting)) play();
        },
        { threshold: 0.1 },
      );
      io.observe(video);
    }

    return () => {
      window.clearInterval(timer);
      io?.disconnect();
      video.removeEventListener('canplay', play);
      video.removeEventListener('loadeddata', play);
      video.removeEventListener('loadedmetadata', play);
      document.removeEventListener('visibilitychange', onVisible);
      document.removeEventListener('click', play);
      document.removeEventListener('touchstart', play);
    };
  }, []);

  return videoRef;
}
