import { useEffect, useRef } from 'react';
import { DESKTOP_SCRUB_MIN, SCRUB_SENSITIVITY, SEEK_EPSILON } from '../constants';
import { isDesktopWidth, resolveScrubOrigin, timeFromMouseDelta } from '../utils/mouseScrub';

export function useMouseScrub(videoRef, { enabled = true } = {}) {
  const targetRef = useRef(0);
  const seekingRef = useRef(false);
  const prevXRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !enabled) return undefined;

    const applySeek = () => {
      if (seekingRef.current) return;
      if (Math.abs(video.currentTime - targetRef.current) < SEEK_EPSILON) return;
      seekingRef.current = true;
      try {
        video.currentTime = targetRef.current;
      } catch {
        seekingRef.current = false;
      }
    };

    const onSeeked = () => {
      seekingRef.current = false;
      if (Math.abs(video.currentTime - targetRef.current) > SEEK_EPSILON) applySeek();
    };

    const onMove = (event) => {
      if (!isDesktopWidth(window.innerWidth, DESKTOP_SCRUB_MIN)) return;
      if (prevXRef.current == null) {
        prevXRef.current = event.clientX;
        return;
      }
      const delta = event.clientX - prevXRef.current;
      prevXRef.current = event.clientX;
      targetRef.current = timeFromMouseDelta(
        resolveScrubOrigin(targetRef.current, video.currentTime),
        delta,
        window.innerWidth,
        video.duration || 0,
        SCRUB_SENSITIVITY,
      );
      applySeek();
    };

    video.addEventListener('seeked', onSeeked);
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => {
      video.removeEventListener('seeked', onSeeked);
      window.removeEventListener('mousemove', onMove);
    };
  }, [enabled, videoRef]);
}
