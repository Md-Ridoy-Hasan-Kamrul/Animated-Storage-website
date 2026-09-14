import { useEffect, useState } from 'react';
import { PREVIEW_POSES } from '../constants';
import { previewPoseDelay } from '../utils/previewCycle';

export function usePreviewHover(enabled) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!enabled) {
      setIndex(0);
      return undefined;
    }

    let current = 0;
    let timeoutId;
    const tick = () => {
      timeoutId = window.setTimeout(() => {
        current = (current + 1) % PREVIEW_POSES.length;
        setIndex(current);
        tick();
      }, previewPoseDelay(PREVIEW_POSES[current]));
    };
    tick();

    return () => window.clearTimeout(timeoutId);
  }, [enabled]);

  return enabled ? PREVIEW_POSES[index] : null;
}
