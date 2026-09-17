import { useEffect, useState } from 'react';
import { INTERSECTION_ROOT_MARGIN } from '../constants';

export function useHostVisibility(hostRef) {
  const [documentVisible, setDocumentVisible] = useState(
    () => typeof document === 'undefined' || !document.hidden,
  );
  const [hostVisible, setHostVisible] = useState(true);

  useEffect(() => {
    const host = hostRef.current;
    if (!host || typeof IntersectionObserver === 'undefined') return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setHostVisible(entry?.isIntersecting ?? true);
      },
      { rootMargin: INTERSECTION_ROOT_MARGIN },
    );

    observer.observe(host);
    return () => observer.disconnect();
  }, [hostRef]);

  useEffect(() => {
    if (typeof document === 'undefined') return undefined;

    const update = () => setDocumentVisible(!document.hidden);
    document.addEventListener('visibilitychange', update);
    return () => document.removeEventListener('visibilitychange', update);
  }, []);

  return hostVisible && documentVisible;
}
