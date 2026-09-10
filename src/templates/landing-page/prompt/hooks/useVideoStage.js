import { useEffect, useRef, useState } from 'react';
import { VIDEO_LEFT, VIDEO_RIGHT } from '../content';
import { VIDEO_READY_FAILSAFE_MS } from '../constants';
import {
  getDeadZonePx,
  isInDeadZone,
  prefersMouseScrub,
  resolveActiveSide,
  scrubProgress,
} from '../utils/videoScrub';

const SEEK_EPSILON_S = 0.04;

/**
 * Dual-video hero: mouse X scrubs the girl portrait left/right;
 * dead zone holds last side at frame 0. Touch: alternate play.
 */
export function useVideoStage() {
  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const activeSideRef = useRef('right');
  const cursorXRef = useRef(
    typeof window !== 'undefined' ? window.innerWidth / 2 : 0,
  );
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const left = leftRef.current;
    const right = rightRef.current;
    if (!left || !right) return undefined;

    let loaded = 0;
    const mark = () => {
      loaded += 1;
      // Show as soon as either stream has data so the girl appears quickly
      if (loaded >= 1) setReady(true);
    };

    left.addEventListener('loadeddata', mark);
    right.addEventListener('loadeddata', mark);
    left.addEventListener('canplay', mark);
    right.addEventListener('canplay', mark);
    if (left.readyState >= 2) mark();
    if (right.readyState >= 2) mark();

    const failsafe = window.setTimeout(() => setReady(true), VIDEO_READY_FAILSAFE_MS);

    return () => {
      window.clearTimeout(failsafe);
      left.removeEventListener('loadeddata', mark);
      right.removeEventListener('loadeddata', mark);
      left.removeEventListener('canplay', mark);
      right.removeEventListener('canplay', mark);
    };
  }, []);

  useEffect(() => {
    const onMove = (event) => {
      cursorXRef.current = event.clientX;
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  useEffect(() => {
    let raf = 0;

    const applyScrub = (video, progress) => {
      if (!video || !Number.isFinite(video.duration) || video.duration <= 0) return;
      if (video.seeking) return;
      const next = progress * video.duration;
      if (Math.abs(video.currentTime - next) > SEEK_EPSILON_S) {
        try {
          video.currentTime = next;
        } catch {
          /* ignore seek race */
        }
      }
    };

    const showSide = (side) => {
      const left = leftRef.current;
      const right = rightRef.current;
      const showRight = side !== 'left';
      if (left) {
        left.style.opacity = showRight ? '0' : '1';
        left.style.zIndex = showRight ? '1' : '2';
      }
      if (right) {
        right.style.opacity = showRight ? '1' : '0';
        right.style.zIndex = showRight ? '2' : '1';
      }
    };

    const parkAtStart = (video) => {
      if (!video || video.seeking) return;
      if (video.currentTime > SEEK_EPSILON_S) {
        try {
          video.currentTime = 0;
        } catch {
          /* ignore */
        }
      }
    };

    const tick = () => {
      const vh = window.innerHeight;
      const scrolledPast = window.scrollY > vh;
      const left = leftRef.current;
      const right = rightRef.current;

      if (scrolledPast) {
        if (left) left.style.visibility = 'hidden';
        if (right) right.style.visibility = 'hidden';
        raf = requestAnimationFrame(tick);
        return;
      }

      if (left) left.style.visibility = 'visible';
      if (right) right.style.visibility = 'visible';

      if (prefersMouseScrub()) {
        left?.pause();
        right?.pause();
        const width = window.innerWidth;
        const dead = getDeadZonePx(width);
        const x = cursorXRef.current;
        const side = resolveActiveSide(x, width, dead, activeSideRef.current);
        activeSideRef.current = side;
        const inDead = isInDeadZone(x, width, dead);

        if (inDead) {
          parkAtStart(left);
          parkAtStart(right);
          showSide(activeSideRef.current);
        } else {
          showSide(side);
          const progress = scrubProgress(x, width, dead, side);
          applyScrub(side === 'right' ? right : left, progress);
        }
      }

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    if (prefersMouseScrub()) return undefined;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return undefined;

    const left = leftRef.current;
    const right = rightRef.current;
    if (!left || !right) return undefined;

    left.style.opacity = '1';
    left.style.zIndex = '2';
    right.style.opacity = '0';
    right.style.zIndex = '1';
    left.play().catch(() => {});

    const onLeftEnded = () => {
      left.style.opacity = '0';
      left.style.zIndex = '1';
      right.style.opacity = '1';
      right.style.zIndex = '2';
      right.currentTime = 0;
      right.play().catch(() => {});
    };
    const onRightEnded = () => {
      right.style.opacity = '0';
      right.style.zIndex = '1';
      left.style.opacity = '1';
      left.style.zIndex = '2';
      left.currentTime = 0;
      left.play().catch(() => {});
    };

    left.addEventListener('ended', onLeftEnded);
    right.addEventListener('ended', onRightEnded);
    return () => {
      left.removeEventListener('ended', onLeftEnded);
      right.removeEventListener('ended', onRightEnded);
    };
  }, [ready]);

  return { leftRef, rightRef, ready, VIDEO_LEFT, VIDEO_RIGHT };
}
