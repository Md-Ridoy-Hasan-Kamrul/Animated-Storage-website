import { useEffect } from 'react';
import { FONT_HREF, FONT_LINK_ID } from '../constants';

const FONT_PRECONNECT = [
  { id: 'ltx-world-preconnect-googleapis', href: 'https://fonts.googleapis.com' },
  {
    id: 'ltx-world-preconnect-gstatic',
    href: 'https://fonts.gstatic.com',
    crossOrigin: 'anonymous',
  },
];

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

export function useLtxFonts() {
  useEffect(() => {
    const created = FONT_PRECONNECT.map((item) =>
      ensureLink({ ...item, rel: 'preconnect' }),
    );
    const sheet = ensureLink({
      id: FONT_LINK_ID,
      rel: 'stylesheet',
      href: FONT_HREF,
    });
    created.push(sheet);

    return () => {
      created.forEach(({ node, created: didCreate }) => {
        if (didCreate && node?.parentNode) node.parentNode.removeChild(node);
      });
    };
  }, []);
}
