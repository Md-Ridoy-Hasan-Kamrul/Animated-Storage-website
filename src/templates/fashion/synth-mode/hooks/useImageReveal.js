import { useEffect, useRef } from 'react';
import { GRID_MIN, SMOOTH_EASE } from '../constants';
import {
  gridCellSize,
  gridPatternPath,
  normalizeCursor,
  paintSpotlightMask,
  parallaxTarget,
  sizeCanvas,
  spotlightRadius,
  stepParallax,
  stepPoint,
} from '../utils/revealMath';

const ORIGIN = { x: 0, y: 0 };

/**
 * Drive reveal mask + grid via DOM refs — no per-frame React state.
 */
export function useImageReveal({
  followPointer = true,
  setRawRef,
  revealRef,
  patternRef,
  patternPathRef,
} = {}) {
  const mouseRef = useRef(ORIGIN);
  const smoothRef = useRef(ORIGIN);
  const parallaxRef = useRef(ORIGIN);
  const canvasRef = useRef(null);
  const rafRef = useRef(0);
  const lastCellRef = useRef(GRID_MIN);

  useEffect(() => {
    if (setRawRef) {
      setRawRef.current = (x, y) => {
        mouseRef.current = { x, y };
      };
    }

    const canvas = document.createElement('canvas');
    canvasRef.current = canvas;

    const onMove = (event) => {
      mouseRef.current = { x: event.clientX, y: event.clientY };
    };

    const onResize = () => {
      sizeCanvas(canvas, window.innerWidth, window.innerHeight);
    };

    const tick = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      if (canvas.width !== width || canvas.height !== height) {
        sizeCanvas(canvas, width, height);
      }

      smoothRef.current = stepPoint(smoothRef.current, mouseRef.current, SMOOTH_EASE);
      const { x, y } = smoothRef.current;
      const radius = spotlightRadius(width);
      const ctx = canvas.getContext('2d');
      const dataUrl = paintSpotlightMask(ctx, x, y, radius);
      const reveal = revealRef?.current;
      if (reveal && dataUrl) {
        reveal.style.maskImage = `url(${dataUrl})`;
        reveal.style.webkitMaskImage = `url(${dataUrl})`;
        reveal.style.opacity = '1';
      }

      const { cx, cy } = normalizeCursor(x, y, width, height);
      parallaxRef.current = stepParallax(parallaxRef.current, parallaxTarget(cx, cy));
      const cell = gridCellSize(width);
      const pattern = patternRef?.current;
      if (pattern) {
        pattern.setAttribute('width', String(cell));
        pattern.setAttribute('height', String(cell));
        pattern.setAttribute('x', String(parallaxRef.current.x));
        pattern.setAttribute('y', String(parallaxRef.current.y));
        if (cell !== lastCellRef.current && patternPathRef?.current) {
          lastCellRef.current = cell;
          patternPathRef.current.setAttribute('d', gridPatternPath(cell));
        }
      }

      rafRef.current = window.requestAnimationFrame(tick);
    };

    if (followPointer) window.addEventListener('mousemove', onMove);
    window.addEventListener('resize', onResize);
    onResize();
    rafRef.current = window.requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('resize', onResize);
      window.cancelAnimationFrame(rafRef.current);
    };
  }, [followPointer, patternPathRef, patternRef, revealRef, setRawRef]);
}
