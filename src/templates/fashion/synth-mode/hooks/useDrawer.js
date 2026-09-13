import { useCallback, useState } from 'react';

export function useDrawer() {
  const [drawer, setDrawer] = useState(null);

  const openDrawer = useCallback((id) => {
    setDrawer(id);
  }, []);

  const closeDrawer = useCallback(() => {
    setDrawer(null);
  }, []);

  return { drawer, openDrawer, closeDrawer };
}
