import { useEffect } from 'react';

const UNLOCK_EVENTS = ['touchstart', 'pointerdown', 'wheel', 'keydown'];

export function useIosUnlock(clipRef) {
  useEffect(() => {
    const unlock = () => {
      const clip = clipRef.current;
      if (!clip) return;
      const playPromise = clip.play();
      if (playPromise && typeof playPromise.then === 'function') {
        playPromise.then(() => clip.pause()).catch(() => {});
        return;
      }
      clip.pause();
    };

    UNLOCK_EVENTS.forEach((type) => {
      window.addEventListener(type, unlock, { once: true, passive: true });
    });

    return () => {
      UNLOCK_EVENTS.forEach((type) => {
        window.removeEventListener(type, unlock);
      });
    };
  }, [clipRef]);
}
