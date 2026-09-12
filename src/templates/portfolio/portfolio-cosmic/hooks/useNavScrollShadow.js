import { useEffect, useState } from 'react';
import { NAV_SHADOW_SCROLL_Y } from '../constants';

export function useNavScrollShadow() {
  const [elevated, setElevated] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setElevated(window.scrollY > NAV_SHADOW_SCROLL_Y);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return elevated;
}
