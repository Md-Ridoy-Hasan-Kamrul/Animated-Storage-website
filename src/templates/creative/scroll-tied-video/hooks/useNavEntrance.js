import { useEffect, useState } from 'react';
import { NAV_ENTRANCE_DELAY_MS } from '../constants';

export function useNavEntrance(delayMs = NAV_ENTRANCE_DELAY_MS) {
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setEntered(true), delayMs);
    return () => window.clearTimeout(timer);
  }, [delayMs]);

  return entered;
}
