import { useCallback, useEffect, useRef, useState } from 'react';
import { CROSSFADE_MS, DEFAULT_VIDEO } from '../constants';
import { canChangeVideo } from '../utils/videoSwitch';

export function useActiveVideo() {
  const [activeVideo, setActiveVideo] = useState(DEFAULT_VIDEO);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const lockRef = useRef(false);

  const selectVideo = useCallback((nextIndex) => {
    if (lockRef.current) return;
    setActiveVideo((current) => {
      if (!canChangeVideo(nextIndex, current, false)) return current;
      lockRef.current = true;
      return nextIndex;
    });
  }, []);

  useEffect(() => {
    if (!lockRef.current) return undefined;
    setIsTransitioning(true);
    const timer = window.setTimeout(() => {
      lockRef.current = false;
      setIsTransitioning(false);
    }, CROSSFADE_MS);
    return () => window.clearTimeout(timer);
  }, [activeVideo]);

  return { activeVideo, isTransitioning, selectVideo };
}
