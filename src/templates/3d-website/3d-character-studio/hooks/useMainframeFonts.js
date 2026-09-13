import { useEffect } from 'react';
import {
  FONT_BODY_HREF,
  FONT_BODY_ID,
  FONT_HEADING_HREF,
  FONT_HEADING_ID,
  FONT_PRECONNECT_HREF,
  FONT_PRECONNECT_ID,
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

export function useMainframeFonts() {
  useEffect(() => {
    const created = [
      ensureLink({
        id: FONT_PRECONNECT_ID,
        rel: 'preconnect',
        href: FONT_PRECONNECT_HREF,
      }),
      ensureLink({ id: FONT_HEADING_ID, rel: 'stylesheet', href: FONT_HEADING_HREF }),
      ensureLink({ id: FONT_BODY_ID, rel: 'stylesheet', href: FONT_BODY_HREF }),
    ];

    return () => {
      created.forEach(({ node, created: didCreate }) => {
        if (didCreate && node?.parentNode) node.parentNode.removeChild(node);
      });
    };
  }, []);
}
