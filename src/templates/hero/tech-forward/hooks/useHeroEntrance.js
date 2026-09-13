import { useEffect, useState } from 'react';
import { ENTRANCE_HIDDEN, ENTRANCE_VISIBLE } from '../constants';

export function useHeroEntrance() {
  const [phase, setPhase] = useState(ENTRANCE_HIDDEN);

  useEffect(() => {
    let secondFrame = 0;
    const firstFrame = window.requestAnimationFrame(() => {
      secondFrame = window.requestAnimationFrame(() => {
        setPhase(ENTRANCE_VISIBLE);
      });
    });

    return () => {
      window.cancelAnimationFrame(firstFrame);
      window.cancelAnimationFrame(secondFrame);
    };
  }, []);

  return phase;
}
