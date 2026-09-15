import { useCallback, useEffect, useRef } from 'react';
import { CURSOR_HIDDEN, CURSOR_LERP } from '../constants';
import { hiddenCursor, stepCursor } from '../utils/spotlightMath';

/** Pointer tracking via refs — never push x/y through React state. */
export function useSmoothCursor({ followPointer = true } = {}) {
  const mouse = useRef(hiddenCursor(CURSOR_HIDDEN));
  const smoothRef = useRef(hiddenCursor(CURSOR_HIDDEN));
  const rafRef = useRef(0);

  const setRaw = useCallback((x, y) => {
    mouse.current = { x, y };
  }, []);

  useEffect(() => {
    const onMove = (event) => {
      mouse.current = { x: event.clientX, y: event.clientY };
    };

    const tick = () => {
      smoothRef.current = stepCursor(smoothRef.current, mouse.current, CURSOR_LERP);
      rafRef.current = window.requestAnimationFrame(tick);
    };

    if (followPointer) window.addEventListener('mousemove', onMove);
    rafRef.current = window.requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.cancelAnimationFrame(rafRef.current);
    };
  }, [followPointer]);

  return { smoothRef, setRaw };
}
