import { useEffect, useState } from 'react';
import { MOBILE_MAX, TABLET_MAX } from '../constants';

function readViewport() {
  const width = window.innerWidth;
  const isMobile = width <= MOBILE_MAX;
  const isTablet = width > MOBILE_MAX && width <= TABLET_MAX;
  return { isMobile, isTablet, isDesktop: !isMobile && !isTablet };
}

export function useViewport() {
  const [viewport, setViewport] = useState(() =>
    typeof window === 'undefined'
      ? { isMobile: false, isTablet: false, isDesktop: true }
      : readViewport(),
  );

  useEffect(() => {
    const onResize = () => setViewport(readViewport());
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return viewport;
}
