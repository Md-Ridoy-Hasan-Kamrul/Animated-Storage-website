import { useEffect, useState } from 'react';

/** True while the host element intersects the viewport. */
export function useHostVisibility(hostRef) {
  const [hostVisible, setHostVisible] = useState(true);

  useEffect(() => {
    const host = hostRef.current;
    if (!host || typeof IntersectionObserver === 'undefined') return undefined;
    const observer = new IntersectionObserver(([entry]) => {
      setHostVisible(entry?.isIntersecting ?? true);
    });
    observer.observe(host);
    return () => observer.disconnect();
  }, [hostRef]);

  return hostVisible;
}
