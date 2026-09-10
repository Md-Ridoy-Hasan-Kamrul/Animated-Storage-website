import { useEffect, useRef, useState } from 'react';
import {
  LOADING_COMPLETE_DELAY_MS,
  LOADING_DURATION_MS,
  LOADING_WORD_INTERVAL_MS,
  LOADING_WORDS,
} from '../constants';
import { nextCycleIndex } from '../utils/cycleIndex';
import { progressFromElapsed } from '../utils/loadingProgress';

/**
 * RAF loading counter 0→100 and cycling splash words.
 * @param {{ enabled: boolean, onComplete: () => void }} options
 */
export function useLoadingCounter({ enabled, onComplete }) {
  const [count, setCount] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);
  const completedRef = useRef(false);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    if (!enabled) return undefined;

    const start = performance.now();
    let rafId = 0;

    const tick = (now) => {
      const next = progressFromElapsed(now - start, LOADING_DURATION_MS);
      setCount(next);
      if (next < 100) {
        rafId = requestAnimationFrame(tick);
        return;
      }
      if (!completedRef.current) {
        completedRef.current = true;
        window.setTimeout(() => {
          onCompleteRef.current?.();
        }, LOADING_COMPLETE_DELAY_MS);
      }
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [enabled]);

  useEffect(() => {
    if (!enabled) return undefined;
    const id = window.setInterval(() => {
      setWordIndex((i) => nextCycleIndex(i, LOADING_WORDS.length));
    }, LOADING_WORD_INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [enabled]);

  return {
    count,
    word: LOADING_WORDS[wordIndex],
    wordIndex,
  };
}
