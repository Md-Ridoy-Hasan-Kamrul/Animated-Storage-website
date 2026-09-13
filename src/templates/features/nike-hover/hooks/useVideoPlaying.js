import { useCallback, useEffect, useState } from 'react';

export function useVideoPlaying(isMobile, isEmbed) {
  const [isSecondVideoPlaying, setIsSecondVideoPlaying] = useState(false);

  useEffect(() => {
    if (isMobile || isEmbed) setIsSecondVideoPlaying(true);
  }, [isMobile, isEmbed]);

  const setPlaying = useCallback((next) => {
    setIsSecondVideoPlaying(next);
  }, []);

  return { isSecondVideoPlaying, setPlaying };
}
