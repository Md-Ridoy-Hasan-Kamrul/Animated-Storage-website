import { useEffect, useState } from 'react';
import { getLayoutMetrics } from '../utils/getLayoutMetrics';

const LAYOUT_FALLBACK_WIDTH = 1440;

const readViewportWidth = () =>
  typeof window === 'undefined' ? LAYOUT_FALLBACK_WIDTH : window.innerWidth;

/**
 * Tracks viewport width and returns responsive layout tokens for the shell.
 */
export const useResponsiveLayout = () => {
  const [metrics, setMetrics] = useState(() => getLayoutMetrics(readViewportWidth()));

  useEffect(() => {
    const sync = () => {
      setMetrics(getLayoutMetrics(window.innerWidth));
    };

    sync();
    window.addEventListener('resize', sync);
    return () => window.removeEventListener('resize', sync);
  }, []);

  return metrics;
};
