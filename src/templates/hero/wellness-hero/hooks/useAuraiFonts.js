import { useEffect } from 'react';
import {
  FONT_ASKAN_HREF,
  FONT_ASKAN_ID,
  FONT_INTER_HREF,
  FONT_INTER_ID,
  FONT_PRECONNECT_ASKAN,
  FONT_PRECONNECT_ASKAN_ID,
  FONT_PRECONNECT_GAPI,
  FONT_PRECONNECT_GAPI_ID,
  FONT_PRECONNECT_GSTATIC,
  FONT_PRECONNECT_GSTATIC_ID,
} from '../constants';

function ensureLink({ id, rel, href, crossOrigin }) {
  let node = document.getElementById(id);
  if (node) return { node, created: false };
  node = document.createElement('link');
  node.id = id;
  node.rel = rel;
  node.href = href;
  if (crossOrigin) node.crossOrigin = crossOrigin;
  document.head.appendChild(node);
  return { node, created: true };
}

export function useAuraiFonts() {
  useEffect(() => {
    const created = [
      ensureLink({ id: FONT_PRECONNECT_GAPI_ID, rel: 'preconnect', href: FONT_PRECONNECT_GAPI }),
      ensureLink({
        id: FONT_PRECONNECT_GSTATIC_ID,
        rel: 'preconnect',
        href: FONT_PRECONNECT_GSTATIC,
        crossOrigin: 'anonymous',
      }),
      ensureLink({ id: FONT_PRECONNECT_ASKAN_ID, rel: 'preconnect', href: FONT_PRECONNECT_ASKAN }),
      ensureLink({ id: FONT_INTER_ID, rel: 'stylesheet', href: FONT_INTER_HREF }),
      ensureLink({ id: FONT_ASKAN_ID, rel: 'stylesheet', href: FONT_ASKAN_HREF }),
    ];

    return () => {
      created.forEach(({ node, created: didCreate }) => {
        if (didCreate && node?.parentNode) node.parentNode.removeChild(node);
      });
    };
  }, []);
}
