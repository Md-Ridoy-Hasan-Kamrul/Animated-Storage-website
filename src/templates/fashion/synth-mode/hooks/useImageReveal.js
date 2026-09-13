import { useEffect, useRef, useState } from 'react';
import { GRID_MIN, SMOOTH_EASE } from '../constants';
import {
  gridCellSize,
  normalizeCursor,
  paintSpotlightMask,
  parallaxTarget,
  sizeCanvas,
  spotlightRadius,
  stepParallax,
  stepPoint,
} from '../utils/revealMath';

const ORIGIN = { x: 0, y: 0 };

export function useImageReveal({ followPointer = true, setRawRef } = {}) {
  const mouseRef = useRef(ORIGIN);
  const smoothRef = useRef(ORIGIN);
  const parallaxRef = useRef(ORIGIN);
  const canvasRef = useRef(null);
  const rafRef = useRef(0);
  const [maskUrl, setMaskUrl] = useState('');
  const [grid, setGrid] = useState({ cell: GRID_MIN, x: 0, y: 0 });

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
      if (dataUrl) setMaskUrl(dataUrl);

      const { cx, cy } = normalizeCursor(x, y, width, height);
      parallaxRef.current = stepParallax(parallaxRef.current, parallaxTarget(cx, cy));
      setGrid({
        cell: gridCellSize(width),
        x: parallaxRef.current.x,
        y: parallaxRef.current.y,
      });

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
  }, [followPointer, setRawRef]);

  return { maskUrl, grid };
}
