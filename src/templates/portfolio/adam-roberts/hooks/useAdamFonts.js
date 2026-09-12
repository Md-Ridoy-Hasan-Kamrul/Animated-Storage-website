import { useEffect } from 'react';
import { FONT_LINKS } from '../constants';

function applyLinkProps(el, spec) {
  el.rel = spec.rel;
  el.href = spec.href;
  if (spec.crossOrigin) {
    el.crossOrigin = spec.crossOrigin;
  }
}

export function useAdamFonts() {
  useEffect(() => {
    const created = [];

    FONT_LINKS.forEach((spec) => {
      if (document.getElementById(spec.id)) return;
      const link = document.createElement('link');
      link.id = spec.id;
      applyLinkProps(link, spec);
      document.head.appendChild(link);
      created.push(link);
    });

    return () => {
      created.forEach((link) => {
        if (link.parentNode) link.parentNode.removeChild(link);
      });
    };
  }, []);
}
