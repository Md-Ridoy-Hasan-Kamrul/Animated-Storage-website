import { useEffect, useRef, useState } from 'react';
import {
  DT_MAX,
  LERP_TAU,
  SEEK_GAP,
  SNAP,
  WATCHDOG_MS,
} from '../constants';
import { HERO_VIDEO, HERO_VIDEO_LOCAL } from '../content';
import { buildFrameBank, canBuildFrameBank } from '../utils/frameBank';
import { shouldSeekFallback, stepLerp } from '../utils/lerpTime';
import { drawNearestFrame } from '../utils/paintFrame';
import { getProgress } from '../utils/scrollProgress';

function prefersReducedMotion() {
  return Boolean(window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches);
}

export function useVideoScrub() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const bankRef = useRef([]);
  const lruRef = useRef(new Map());
  const currentRef = useRef(0);
  const lastTsRef = useRef(0);
  const lastProgressRef = useRef(-1);
  const readyRef = useRef(false);
  const drawingRef = useRef(false);
  const [progress, setProgress] = useState(0);
  const [canvasLive, setCanvasLive] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return undefined;

    const onDuration = () => {
      /* duration is read live from the element */
    };
    video.addEventListener('loadedmetadata', onDuration);

    let raf = 0;
    const tick = (now) => {
      const last = lastTsRef.current || now;
      const dt = Math.min(DT_MAX, (now - last) / 1000);
      lastTsRef.current = now;

      const container = containerRef.current;
      const p = getProgress(
        window.scrollY,
        container?.offsetHeight || document.documentElement.scrollHeight,
        window.innerHeight,
      );
      const snapped = Math.round(p / SNAP) * SNAP;
      if (snapped !== lastProgressRef.current) {
        lastProgressRef.current = snapped;
        setProgress(snapped);
      }

      const duration = video.duration || 0;
      if (duration > 0) {
        const target = p * duration;
        currentRef.current = prefersReducedMotion()
          ? target
          : stepLerp(currentRef.current, target, dt, LERP_TAU, SNAP);

        if (readyRef.current && bankRef.current.length) {
          if (!drawingRef.current) {
            drawingRef.current = true;
            drawNearestFrame(canvasRef.current, bankRef.current, lruRef.current, currentRef.current)
              .then((painted) => {
                if (painted) setCanvasLive((live) => live || painted);
              })
              .finally(() => {
                drawingRef.current = false;
              });
          }
        } else if (shouldSeekFallback(video.currentTime, currentRef.current, video.seeking, SEEK_GAP)) {
          try {
            video.currentTime = currentRef.current;
          } catch {
            /* ignore unseekable */
          }
        }
      }

      raf = window.requestAnimationFrame(tick);
    };
    raf = window.requestAnimationFrame(tick);

    return () => {
      window.cancelAnimationFrame(raf);
      video.removeEventListener('loadedmetadata', onDuration);
    };
  }, []);

  useEffect(() => {
    if (!canBuildFrameBank()) return undefined;
    const controller = new AbortController();
    let watchdog = 0;
    let cancelled = false;

    const start = () => {
      watchdog = window.setTimeout(() => {
        readyRef.current = false;
        setCanvasLive(false);
      }, WATCHDOG_MS);

      buildFrameBank([HERO_VIDEO, HERO_VIDEO_LOCAL], { signal: controller.signal })
        .then((bank) => {
          if (cancelled || !bank.length) return;
          bankRef.current = bank;
          readyRef.current = true;
        })
        .catch(() => {
          readyRef.current = false;
        });
    };

    if (document.readyState === 'complete') start();
    else window.addEventListener('load', start, { once: true });

    return () => {
      cancelled = true;
      controller.abort();
      window.clearTimeout(watchdog);
      window.removeEventListener('load', start);
      lruRef.current.forEach((bitmap) => bitmap?.close?.());
      lruRef.current.clear();
    };
  }, []);

  useEffect(() => {
    const onResize = () => {
      const container = containerRef.current;
      const p = getProgress(
        window.scrollY,
        container?.offsetHeight || document.documentElement.scrollHeight,
        window.innerHeight,
      );
      setProgress(Math.round(p / SNAP) * SNAP);
    };
    window.addEventListener('resize', onResize);
    window.addEventListener('orientationchange', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
      window.removeEventListener('orientationchange', onResize);
    };
  }, []);

  return { videoRef, canvasRef, containerRef, progress, canvasLive };
}
