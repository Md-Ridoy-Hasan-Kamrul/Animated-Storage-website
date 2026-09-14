import { useEffect, useState } from 'react';
import { isMobileWidth } from '../utils/viewport';

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' ? isMobileWidth(window.innerWidth) : false,
  );

  useEffect(() => {
    const sync = () => setIsMobile(isMobileWidth(window.innerWidth));
    sync();
    window.addEventListener('resize', sync);
    return () => window.removeEventListener('resize', sync);
  }, []);

  return isMobile;
}
