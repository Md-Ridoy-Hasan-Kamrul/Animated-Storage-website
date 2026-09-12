import { useEffect } from 'react';
import { PAGE_BG, PAGE_INK, PAGE_TITLE } from '../constants';

export function usePageChrome() {
  useEffect(() => {
    const prev = {
      title: document.title,
      htmlBg: document.documentElement.style.backgroundColor,
      htmlOverflow: document.documentElement.style.overflow,
      bodyBg: document.body.style.backgroundColor,
      bodyColor: document.body.style.color,
      bodyOverflow: document.body.style.overflow,
    };

    document.title = PAGE_TITLE;
    document.documentElement.style.backgroundColor = PAGE_BG;
    document.documentElement.style.overflow = 'hidden';
    document.body.style.backgroundColor = PAGE_BG;
    document.body.style.color = PAGE_INK;
    document.body.style.overflow = 'hidden';

    const root = document.getElementById('root');
    const prevRoot = root?.style.backgroundColor;
    if (root) root.style.backgroundColor = PAGE_BG;

    return () => {
      document.title = prev.title || 'Kmotion';
      document.documentElement.style.backgroundColor = prev.htmlBg;
      document.documentElement.style.overflow = prev.htmlOverflow;
      document.body.style.backgroundColor = prev.bodyBg;
      document.body.style.color = prev.bodyColor;
      document.body.style.overflow = prev.bodyOverflow;
      if (root) root.style.backgroundColor = prevRoot || '';
    };
  }, []);
}
