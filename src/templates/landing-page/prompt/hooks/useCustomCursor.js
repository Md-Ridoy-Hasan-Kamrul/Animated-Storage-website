import { useEffect, useRef } from 'react';
import { BREAKPOINT_DESKTOP } from '../constants';

/** Desktop custom cursor — DOM left/top follow (prompt 1A). */
export function useCustomCursor(enabled) {
  const cursorRef = useRef(null);

  useEffect(() => {
    if (!enabled) return undefined;

    const onMove = (event) => {
      const node = cursorRef.current;
      if (!node) return;
      if (window.innerWidth < BREAKPOINT_DESKTOP) {
        node.style.opacity = '0';
        return;
      }
      node.style.opacity = '1';
      node.style.left = `${event.clientX}px`;
      node.style.top = `${event.clientY}px`;
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, [enabled]);

  return cursorRef;
}
