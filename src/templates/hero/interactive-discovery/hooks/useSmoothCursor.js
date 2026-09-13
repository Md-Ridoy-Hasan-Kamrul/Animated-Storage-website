import { useCallback, useEffect, useRef, useState } from 'react';
import { CURSOR_HIDDEN, CURSOR_LERP } from '../constants';
import { hiddenCursor, stepCursor } from '../utils/spotlightMath';

export function useSmoothCursor({ followPointer = true } = {}) {
  const mouse = useRef(hiddenCursor(CURSOR_HIDDEN));
  const smooth = useRef(hiddenCursor(CURSOR_HIDDEN));
  const rafRef = useRef(0);
  const [cursorPos, setCursorPos] = useState(() => hiddenCursor(CURSOR_HIDDEN));

  const setRaw = useCallback((x, y) => {
    mouse.current = { x, y };
  }, []);

  useEffect(() => {
    const onMove = (event) => {
      mouse.current = { x: event.clientX, y: event.clientY };
    };

    const tick = () => {
      smooth.current = stepCursor(smooth.current, mouse.current, CURSOR_LERP);
      setCursorPos({ x: smooth.current.x, y: smooth.current.y });
      rafRef.current = window.requestAnimationFrame(tick);
    };

    if (followPointer) window.addEventListener('mousemove', onMove);
    rafRef.current = window.requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.cancelAnimationFrame(rafRef.current);
    };
  }, [followPointer]);

  return { cursorPos, setRaw };
}
