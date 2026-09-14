import { useEffect, useState } from 'react';
import { EMBED_ON, EMBED_QUERY } from '../constants';

export function useEmbedMode() {
  const [isEmbed, setIsEmbed] = useState(
    () =>
      typeof window !== 'undefined' &&
      new URLSearchParams(window.location.search).get(EMBED_QUERY) === EMBED_ON,
  );
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    const embed = new URLSearchParams(window.location.search).get(EMBED_QUERY) === EMBED_ON;
    setIsEmbed(embed);
    setIsStandalone(window.self === window.top && !embed);
  }, []);

  return { isEmbed, isStandalone };
}
