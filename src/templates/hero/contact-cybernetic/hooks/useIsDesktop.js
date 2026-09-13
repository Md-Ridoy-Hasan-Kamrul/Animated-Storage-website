import { useEffect, useState } from 'react';
import { DESKTOP_SCRUB_MIN } from '../constants';
import { isDesktopWidth } from '../utils/mouseScrub';

export function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(() =>
    typeof window !== 'undefined' ? isDesktopWidth(window.innerWidth, DESKTOP_SCRUB_MIN) : false,
  );

  useEffect(() => {
    const sync = () => setIsDesktop(isDesktopWidth(window.innerWidth, DESKTOP_SCRUB_MIN));
    sync();
    window.addEventListener('resize', sync);
    return () => window.removeEventListener('resize', sync);
  }, []);

  return isDesktop;
}
