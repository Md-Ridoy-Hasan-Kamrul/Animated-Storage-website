import { useEffect } from 'react';
import { FONT_HREF, FONT_LINK_ID } from '../constants';

const FONT_PRECONNECT = [
  { id: 'cast-render-preconnect-googleapis', href: 'https://fonts.googleapis.com' },
  {
    id: 'cast-render-preconnect-gstatic',
    href: 'https://fonts.gstatic.com',
    crossOrigin: 'anonymous',
  },
  {
    id: 'cast-render-preconnect-video',
    href: 'https://d2ol7oe51mr4n9.cloudfront.net',
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

export function useCastFonts() {
  useEffect(() => {
    const created = FONT_PRECONNECT.map((item) =>
      ensureLink({ ...item, rel: 'preconnect' }),
    );
    created.push(
      ensureLink({ id: FONT_LINK_ID, rel: 'stylesheet', href: FONT_HREF }),
    );

    return () => {
      created.forEach(({ node, created: didCreate }) => {
        if (didCreate && node?.parentNode) node.parentNode.removeChild(node);
      });
    };
  }, []);
}
