import { useEffect } from 'react';
import { PAGE_BG, PAGE_INK, PAGE_TITLE } from '../constants';

export function usePageChrome() {
  useEffect(() => {
    const prev = {
      title: document.title,
      htmlBg: document.documentElement.style.backgroundColor,
      bodyBg: document.body.style.backgroundColor,
    };

    document.title = PAGE_TITLE;
    document.documentElement.style.backgroundColor = PAGE_BG;
    document.body.style.backgroundColor = PAGE_BG;
    document.body.style.color = PAGE_INK;

    const root = document.getElementById('root');
    const prevRoot = root?.style.backgroundColor;
    if (root) root.style.backgroundColor = PAGE_BG;

    return () => {
      document.title = prev.title || 'Kmotion';
      document.documentElement.style.backgroundColor = prev.htmlBg;
      document.body.style.backgroundColor = prev.bodyBg;
      document.body.style.color = '';
      if (root) root.style.backgroundColor = prevRoot || '';
    };
  }, []);
}
