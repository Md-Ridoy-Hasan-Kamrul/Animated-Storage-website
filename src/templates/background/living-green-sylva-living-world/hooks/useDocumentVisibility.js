import { useEffect, useState } from 'react';

/** Tracks document.visibilityState for tab lifecycle. */
export function useDocumentVisibility() {
  const [documentVisible, setDocumentVisible] = useState(
    () => typeof document === 'undefined' || !document.hidden,
  );

  useEffect(() => {
    if (typeof document === 'undefined') return undefined;
    const update = () => setDocumentVisible(!document.hidden);
    document.addEventListener('visibilitychange', update);
    return () => document.removeEventListener('visibilitychange', update);
  }, []);

  return documentVisible;
}
