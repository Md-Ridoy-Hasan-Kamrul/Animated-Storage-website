import { useEffect, useState } from 'react';

export function useEmbedMode() {
  const [isEmbed, setIsEmbed] = useState(
    () =>
      typeof window !== 'undefined' &&
      new URLSearchParams(window.location.search).get('embed') === '1',
  );
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    const embed = new URLSearchParams(window.location.search).get('embed') === '1';
    setIsEmbed(embed);
    setIsStandalone(window.self === window.top && !embed);
  }, []);

  return { isEmbed, isStandalone };
}
