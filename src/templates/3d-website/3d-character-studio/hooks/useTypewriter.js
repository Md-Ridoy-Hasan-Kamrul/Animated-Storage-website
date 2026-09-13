import { useEffect, useState } from 'react';
import { TYPEWRITER_DELAY_MS, TYPEWRITER_SPEED_MS } from '../constants';
import { isTypewriterDone, nextTypedLength } from '../utils/typewriter';

export function useTypewriter(
  text,
  speed = TYPEWRITER_SPEED_MS,
  startDelay = TYPEWRITER_DELAY_MS,
) {
  const [length, setLength] = useState(0);
  const total = text.length;
  const done = isTypewriterDone(length, total);

  useEffect(() => {
    setLength(0);
    let intervalId = 0;
    const startId = window.setTimeout(() => {
      intervalId = window.setInterval(() => {
        setLength((current) => {
          const next = nextTypedLength(current, total);
          if (next >= total) window.clearInterval(intervalId);
          return next;
        });
      }, speed);
    }, startDelay);

    return () => {
      window.clearTimeout(startId);
      window.clearInterval(intervalId);
    };
  }, [speed, startDelay, text, total]);

  return { displayed: text.slice(0, length), done };
}
