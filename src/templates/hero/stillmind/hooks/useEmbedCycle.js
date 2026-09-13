import { useEffect } from 'react';
import { EMBED_CYCLE_MS, VIDEO_COUNT } from '../constants';
import { nextVideoIndex } from '../utils/videoSwitch';

export function useEmbedCycle(enabled, selectVideo, activeVideo, isTransitioning) {
  useEffect(() => {
    if (!enabled || isTransitioning) return undefined;
    const id = window.setTimeout(() => {
      selectVideo(nextVideoIndex(activeVideo, VIDEO_COUNT));
    }, EMBED_CYCLE_MS);
    return () => window.clearTimeout(id);
  }, [activeVideo, enabled, isTransitioning, selectVideo]);
}
