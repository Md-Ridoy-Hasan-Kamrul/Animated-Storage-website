import { useEffect } from 'react';
import { FONT_HREF, FONT_LINK_ID } from '../constants';

export function useNeoFonts() {
  useEffect(() => {
    let link = document.getElementById(FONT_LINK_ID);
    let created = false;
    if (!link) {
      link = document.createElement('link');
      link.id = FONT_LINK_ID;
      link.rel = 'stylesheet';
      link.href = FONT_HREF;
      document.head.appendChild(link);
      created = true;
    }
    return () => {
      if (created && link?.parentNode) {
        link.parentNode.removeChild(link);
      }
    };
  }, []);
}
