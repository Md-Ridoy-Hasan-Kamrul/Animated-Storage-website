import { useEffect, useRef, useState } from 'react';
import { REVEAL_THRESHOLD } from '../constants';

export function useReveal(threshold = REVEAL_THRESHOLD) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || shown) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setShown(true);
      },
      { threshold },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [shown, threshold]);

  return { ref, shown };
}
