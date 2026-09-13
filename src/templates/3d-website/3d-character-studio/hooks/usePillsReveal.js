import { useEffect, useState } from 'react';
import { PILLS_REVEAL_MS } from '../constants';

export function usePillsReveal(delayMs = PILLS_REVEAL_MS) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setVisible(true), delayMs);
    return () => window.clearTimeout(timer);
  }, [delayMs]);

  return visible;
}
