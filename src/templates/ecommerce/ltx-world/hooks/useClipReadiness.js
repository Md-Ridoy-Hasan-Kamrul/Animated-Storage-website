import { useEffect, useMemo, useState } from 'react';
import { BRANCHES, CLIP_KEYS, READY_STATE_HAVE_CURRENT_DATA } from '../constants';

const isReady = (video) => Boolean(video && video.readyState >= READY_STATE_HAVE_CURRENT_DATA);

export function useClipReadiness(videosRef) {
  const [readyMap, setReadyMap] = useState(() =>
    CLIP_KEYS.reduce((acc, key) => {
      acc[key] = false;
      return acc;
    }, {}),
  );

  useEffect(() => {
    const videos = videosRef.current;
    const cleanups = CLIP_KEYS.map((key) => {
      const video = videos[key];
      if (!video) return () => {};

      const mark = () => {
        if (!isReady(video)) return;
        setReadyMap((prev) => (prev[key] ? prev : { ...prev, [key]: true }));
      };

      mark();
      video.addEventListener('loadeddata', mark);
      return () => video.removeEventListener('loadeddata', mark);
    });

    return () => {
      cleanups.forEach((fn) => fn());
    };
  }, [videosRef]);

  const pairReady = useMemo(
    () =>
      BRANCHES.reduce((acc, branch) => {
        acc[branch.id] = Boolean(
          readyMap[`${branch.id}-forward`] && readyMap[`${branch.id}-reverse`],
        );
        return acc;
      }, {}),
    [readyMap],
  );

  return { readyMap, pairReady };
}
