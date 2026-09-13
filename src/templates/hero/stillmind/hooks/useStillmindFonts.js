import { useEffect } from 'react';
import {
  FONT_HREF,
  FONT_LINK_ID,
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

export function useStillmindFonts() {
  useEffect(() => {
    const created = [
      ensureLink({ id: FONT_PRECONNECT_GAPI_ID, rel: 'preconnect', href: FONT_PRECONNECT_GAPI }),
      ensureLink({
        id: FONT_PRECONNECT_GSTATIC_ID,
        rel: 'preconnect',
        href: FONT_PRECONNECT_GSTATIC,
        crossOrigin: 'anonymous',
      }),
      ensureLink({ id: FONT_LINK_ID, rel: 'stylesheet', href: FONT_HREF }),
    ];

    return () => {
      created.forEach(({ node, created: didCreate }) => {
        if (didCreate && node?.parentNode) node.parentNode.removeChild(node);
      });
    };
  }, []);
}
