import { useEffect } from 'react';
import { PAGE_BG, PAGE_INK, PAGE_TITLE } from '../constants';

export function usePageChrome() {
  useEffect(() => {
    const html = document.documentElement;
    const { body } = document;
    const root = document.getElementById('root');
    const prev = {
      title: document.title,
      htmlBg: html.style.backgroundColor,
      bodyBg: body.style.backgroundColor,
      overflow: body.style.overflow,
      rootBg: root?.style.backgroundColor,
    };

    document.title = PAGE_TITLE;
    html.style.backgroundColor = PAGE_BG;
    body.style.backgroundColor = PAGE_BG;
    body.style.color = PAGE_INK;
    body.style.overflow = 'hidden';
    if (root) root.style.backgroundColor = PAGE_BG;

    return () => {
      document.title = prev.title || 'Kmotion';
      html.style.backgroundColor = prev.htmlBg;
      body.style.backgroundColor = prev.bodyBg;
      body.style.color = '';
      body.style.overflow = prev.overflow;
      if (root) root.style.backgroundColor = prev.rootBg || '';
    };
  }, []);
}
