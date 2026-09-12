import { useEffect, useState } from 'react';

/** Flips to true after delayMs (embed can skip wait). */
export function useDelayedFlag(delayMs, { immediate = false } = {}) {
  const [flag, setFlag] = useState(immediate);

  useEffect(() => {
    if (immediate) {
      setFlag(true);
      return undefined;
    }
    const id = window.setTimeout(() => setFlag(true), delayMs);
    return () => window.clearTimeout(id);
  }, [delayMs, immediate]);

  return flag;
}
