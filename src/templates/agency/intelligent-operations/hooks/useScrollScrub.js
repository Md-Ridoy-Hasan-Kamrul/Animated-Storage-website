import { useEffect, useRef, useState } from 'react';
import {
  CANVAS_DPR_CAP,
  EXTRACT_YIELD_MS,
  LERP_FACTOR,
  SEEK_GAP,
  SEEK_TAIL,
  VIDEO_HAVE_CURRENT_DATA,
} from '../constants';
import { HERO_VIDEO_LOCAL } from '../content';
import { drawCover } from '../utils/coverMath';
import { extractFrameBitmaps } from '../utils/frameCache';
import {
  canvasDpr,
  frameIndexFromProgress,
  lerpToward,
  scrollProgress,
  seekTimeFromProgress,
  shouldSeekFallback,
} from '../utils/scrubMath';

function prefersReducedMotion() {
  return Boolean(window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches);
}

function sizeCanvas(canvas) {
  const dpr = canvasDpr(window.devicePixelRatio, CANVAS_DPR_CAP);
  const width = Math.max(1, Math.round(canvas.clientWidth * dpr));
  const height = Math.max(1, Math.round(canvas.clientHeight * dpr));
  if (canvas.width !== width || canvas.height !== height) {
    canvas.width = width;
    canvas.height = height;
  }
  return { width, height };
}

function paintFrame(canvas, source) {
  if (!canvas || !source) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  const { width, height } = sizeCanvas(canvas);
  drawCover(ctx, source, width, height);
}

export function useScrollScrub() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const framesRef = useRef([]);
  const smoothedRef = useRef(0);
  const [hasVideoFrame, setHasVideoFrame] = useState(false);
  const [cacheReady, setCacheReady] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return undefined;

    const markFrame = () => setHasVideoFrame(true);
    video.addEventListener('loadeddata', markFrame);
    video.addEventListener('canplay', markFrame);
    return () => {
      video.removeEventListener('loadeddata', markFrame);
      video.removeEventListener('canplay', markFrame);
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return undefined;

    const controller = new AbortController();
    let yieldTimer = 0;
    let cancelled = false;

    const startExtract = () => {
      yieldTimer = window.setTimeout(() => {
        extractFrameBitmaps(HERO_VIDEO_LOCAL, { signal: controller.signal })
          .then((frames) => {
            if (cancelled || !frames.length) return;
            framesRef.current = frames;
            setCacheReady(true);
          })
          .catch(() => {
            if (!cancelled) setCacheReady(false);
          });
      }, EXTRACT_YIELD_MS);
    };

    if (video.readyState >= VIDEO_HAVE_CURRENT_DATA) {
      startExtract();
    } else {
      video.addEventListener('loadeddata', startExtract, { once: true });
    }

    return () => {
      cancelled = true;
      controller.abort();
      window.clearTimeout(yieldTimer);
      video.removeEventListener('loadeddata', startExtract);
      framesRef.current.forEach((frame) => frame?.close?.());
      framesRef.current = [];
    };
  }, []);

  useEffect(() => {
    let raf = 0;

    const tick = () => {
      const target = scrollProgress(
        window.scrollY,
        document.documentElement.scrollHeight,
        window.innerHeight,
      );
      smoothedRef.current = prefersReducedMotion()
        ? target
        : lerpToward(smoothedRef.current, target, LERP_FACTOR);

      const frames = framesRef.current;
      const canvas = canvasRef.current;
      const video = videoRef.current;

      if (frames.length && canvas) {
        paintFrame(canvas, frames[frameIndexFromProgress(smoothedRef.current, frames.length)]);
      } else if (video && Number.isFinite(video.duration) && video.duration > 0) {
        const nextTime = seekTimeFromProgress(smoothedRef.current, video.duration, SEEK_TAIL);
        if (shouldSeekFallback(video.currentTime, nextTime, video.seeking, SEEK_GAP)) {
          try {
            video.currentTime = nextTime;
          } catch {
            /* ignore unseekable */
          }
        }
      }

      raf = window.requestAnimationFrame(tick);
    };

    raf = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(raf);
  }, []);

  return { videoRef, canvasRef, hasVideoFrame, cacheReady };
}
