import { useEffect } from 'react';
import {
  FONT_HREF,
  FONT_LINK_ID,
  FONT_PRECONNECT_HREF,
  FONT_PRECONNECT_ID,
} from '../constants';

function ensureLink({ id, rel, href }) {
  let node = document.getElementById(id);
  if (node) return { node, created: false };
  node = document.createElement('link');
  node.id = id;
  node.rel = rel;
  node.href = href;
  document.head.appendChild(node);
  return { node, created: true };
}

export function useVectrusFonts() {
  useEffect(() => {
    const created = [
      ensureLink({ id: FONT_PRECONNECT_ID, rel: 'preconnect', href: FONT_PRECONNECT_HREF }),
      ensureLink({ id: FONT_LINK_ID, rel: 'stylesheet', href: FONT_HREF }),
    ];
    return () => {
      created.forEach(({ node, created: didCreate }) => {
        if (didCreate && node?.parentNode) node.parentNode.removeChild(node);
      });
    };
  }, []);
}
