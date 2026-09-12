import { useEffect } from 'react';
import Hls from 'hls.js';
import { HLS_STREAM_URL } from '../constants';

/**
 * Attaches Mux HLS to a video element; cleans up on unmount.
 * @param {React.RefObject<HTMLVideoElement|null>} videoRef
 * @param {{ enabled?: boolean }} [options]
 */
export function useHlsVideo(videoRef, { enabled = true } = {}) {
  useEffect(() => {
    if (!enabled) return undefined;
    const video = videoRef.current;
    if (!video) return undefined;

    let hls = null;

    if (Hls.isSupported()) {
      hls = new Hls({ enableWorker: true });
      hls.loadSource(HLS_STREAM_URL);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play().catch(() => {});
      });
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = HLS_STREAM_URL;
      video.addEventListener('loadedmetadata', () => {
        video.play().catch(() => {});
      });
    }

    return () => {
      if (hls) {
        hls.destroy();
      }
      video.removeAttribute('src');
      video.load();
    };
  }, [videoRef, enabled]);
}
