import { useEffect, useState } from 'react';

export function useEmbedMode() {
  const [isEmbed, setIsEmbed] = useState(
    () =>
      typeof window !== 'undefined' &&
      new URLSearchParams(window.location.search).get('embed') === '1',
  );
  const [isFramed, setIsFramed] = useState(
    () => typeof window !== 'undefined' && window.self !== window.top,
  );
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    const embed = new URLSearchParams(window.location.search).get('embed') === '1';
    const framed = window.self !== window.top;
    setIsEmbed(embed);
    setIsFramed(framed);
    setIsStandalone(!framed && !embed);
  }, []);

  return { isEmbed, isFramed, isStandalone, isPreview: isEmbed || isFramed };
}
