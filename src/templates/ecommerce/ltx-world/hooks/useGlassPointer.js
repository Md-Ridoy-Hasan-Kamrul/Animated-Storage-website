import { useCallback } from 'react';

export function useGlassPointer() {
  return useCallback((event) => {
    const node = event.currentTarget;
    const box = node.getBoundingClientRect();
    if (box.width < 1 || box.height < 1) return;
    const x = ((event.clientX - box.left) / box.width) * 100;
    const y = ((event.clientY - box.top) / box.height) * 100;
    node.style.setProperty('--glass-x', `${x}%`);
    node.style.setProperty('--glass-y', `${y}%`);
  }, []);
}
