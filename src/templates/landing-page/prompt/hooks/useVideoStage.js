import { useEffect, useRef, useState } from 'react';
import { VIDEO_LEFT, VIDEO_RIGHT } from '../content';
import {
  VIDEO_READY_FAILSAFE_MS,
  HERO_PARALLAX_X_PX,
  HERO_PARALLAX_Y_PX,
  HERO_PARALLAX_LERP,
  HERO_STAGE_SCALE,
} from '../constants';
import {
  getDeadZonePx,
  isInDeadZone,
  mouseNormX,
  mouseNormY,
  prefersMouseScrub,
  resolveActiveSide,
  scrubProgress,
} from '../utils/videoScrub';

const DEMO_SWEEP_MS = 4200;

async function blobUrl(remoteUrl) {
  const res = await fetch(remoteUrl);
  if (!res.ok) throw new Error(`Failed to fetch ${remoteUrl}`);
  const blob = await res.blob();
  return URL.createObjectURL(blob);
}

/**
 * Hero girl: dual videos + mouse scrub (prompt 1G) + L/R/T/B parallax.
 */
export function useVideoStage({ isEmbed = false } = {}) {
  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const stageRef = useRef(null);
  const activeSideRef = useRef('right');
  const hasMouseRef = useRef(false);
  const cursorXRef = useRef(
    typeof window !== 'undefined' ? window.innerWidth / 2 : 0,
  );
  const cursorYRef = useRef(
    typeof window !== 'undefined' ? window.innerHeight / 2 : 0,
  );

  const [srcLeft, setSrcLeft] = useState(VIDEO_LEFT);
  const [srcRight, setSrcRight] = useState(VIDEO_RIGHT);
  const [ready, setReady] = useState(false);
  const [activeSide, setActiveSide] = useState('right');

  // Prefer blob URLs so seeking / decode is reliable in iframes
  useEffect(() => {
    let leftBlob;
    let rightBlob;
    let cancelled = false;

    (async () => {
      try {
        const [l, r] = await Promise.all([blobUrl(VIDEO_LEFT), blobUrl(VIDEO_RIGHT)]);
        if (cancelled) {
          URL.revokeObjectURL(l);
          URL.revokeObjectURL(r);
          return;
        }
        leftBlob = l;
        rightBlob = r;
        setSrcLeft(l);
        setSrcRight(r);
      } catch {
        /* keep remote URLs */
      }
    })();

    return () => {
      cancelled = true;
      if (leftBlob) URL.revokeObjectURL(leftBlob);
      if (rightBlob) URL.revokeObjectURL(rightBlob);
    };
  }, []);

  useEffect(() => {
    const left = leftRef.current;
    const right = rightRef.current;
    if (!left || !right) return undefined;

    let leftOk = false;
    let rightOk = false;
    const check = () => {
      if (leftOk && rightOk) setReady(true);
    };
    const onLeft = () => {
      leftOk = true;
      check();
    };
    const onRight = () => {
      rightOk = true;
      check();
    };

    left.addEventListener('loadeddata', onLeft);
    right.addEventListener('loadeddata', onRight);
    if (left.readyState >= 2) onLeft();
    if (right.readyState >= 2) onRight();

    const failsafe = window.setTimeout(() => setReady(true), VIDEO_READY_FAILSAFE_MS);

    return () => {
      window.clearTimeout(failsafe);
      left.removeEventListener('loadeddata', onLeft);
      right.removeEventListener('loadeddata', onRight);
    };
  }, [srcLeft, srcRight]);

  useEffect(() => {
    let raf = 0;
    const demoStart = performance.now();
    let lastMoveAt = 0;
    let parallaxX = 0;
    let parallaxY = 0;

    const onMove = (event) => {
      hasMouseRef.current = true;
      lastMoveAt = performance.now();
      cursorXRef.current = event.clientX;
      cursorYRef.current = event.clientY;
    };
    window.addEventListener('mousemove', onMove, { passive: true });

    const applyScrub = (video, progress) => {
      if (!video || !Number.isFinite(video.duration) || video.duration <= 0) return;
      if (video.seeking) return;
      const next = progress * video.duration;
      if (Math.abs(video.currentTime - next) < 0.04) return;
      try {
        video.currentTime = next;
      } catch {
        /* ignore */
      }
    };

    const applyParallax = (nx, ny) => {
      const stage = stageRef.current;
      if (!stage) return;
      const targetX = nx * HERO_PARALLAX_X_PX;
      const targetY = ny * HERO_PARALLAX_Y_PX;
      parallaxX += (targetX - parallaxX) * HERO_PARALLAX_LERP;
      parallaxY += (targetY - parallaxY) * HERO_PARALLAX_LERP;
      stage.style.transform = `translate3d(${parallaxX.toFixed(2)}px, ${parallaxY.toFixed(2)}px, 0) scale(${HERO_STAGE_SCALE})`;
    };

    const tick = (now) => {
      const vh = window.innerHeight;
      const width = window.innerWidth;
      const height = window.innerHeight;
      const left = leftRef.current;
      const right = rightRef.current;
      const scrolledPast = window.scrollY > vh;

      if (scrolledPast) {
        if (left) left.style.visibility = 'hidden';
        if (right) right.style.visibility = 'hidden';
        raf = requestAnimationFrame(tick);
        return;
      }
      if (left) left.style.visibility = 'visible';
      if (right) right.style.visibility = 'visible';

      if (isEmbed && now - lastMoveAt > 350) {
        const t = ((now - demoStart) % DEMO_SWEEP_MS) / DEMO_SWEEP_MS;
        const waveX = Math.sin(t * Math.PI * 2);
        const waveY = Math.cos(t * Math.PI * 2);
        cursorXRef.current = width / 2 + waveX * width * 0.4;
        cursorYRef.current = height / 2 + waveY * height * 0.22;
        hasMouseRef.current = true;
      }

      applyParallax(
        mouseNormX(cursorXRef.current, width),
        mouseNormY(cursorYRef.current, height),
      );

      const scrub = prefersMouseScrub(hasMouseRef.current) || isEmbed;
      if (scrub) {
        left?.pause();
        right?.pause();

        const x = cursorXRef.current;
        const dead = getDeadZonePx(width);
        const side = resolveActiveSide(x, width, dead, activeSideRef.current);
        activeSideRef.current = side;

        if (isInDeadZone(x, width, dead)) {
          if (left && !left.seeking) left.currentTime = 0;
          if (right && !right.seeking) right.currentTime = 0;
          const hold = activeSideRef.current;
          setActiveSide((prev) => (prev === hold ? prev : hold));
        } else {
          setActiveSide((prev) => (prev === side ? prev : side));
          applyScrub(side === 'right' ? right : left, scrubProgress(x, width, dead, side));
        }
      }

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
    };
  }, [isEmbed]);

  useEffect(() => {
    if (prefersMouseScrub(hasMouseRef.current) || isEmbed) return undefined;
    if (window.innerWidth >= 1024) return undefined;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce || !ready) return undefined;

    const left = leftRef.current;
    const right = rightRef.current;
    if (!left || !right) return undefined;

    setActiveSide('left');
    left.play().catch(() => {});

    const onLeftEnded = () => {
      setActiveSide('right');
      right.currentTime = 0;
      right.play().catch(() => {});
    };
    const onRightEnded = () => {
      setActiveSide('left');
      left.currentTime = 0;
      left.play().catch(() => {});
    };

    left.addEventListener('ended', onLeftEnded);
    right.addEventListener('ended', onRightEnded);
    return () => {
      left.removeEventListener('ended', onLeftEnded);
      right.removeEventListener('ended', onRightEnded);
    };
  }, [ready, isEmbed]);

  return {
    leftRef,
    rightRef,
    stageRef,
    ready,
    activeSide,
    srcLeft,
    srcRight,
  };
}
