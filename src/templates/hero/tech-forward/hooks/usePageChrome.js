import { useLayoutEffect } from 'react';
import { PAGE_BG, PAGE_HTML_CLASS, PAGE_INK, PAGE_TITLE } from '../constants';

export function usePageChrome() {
  useLayoutEffect(() => {
    const html = document.documentElement;
    const { body } = document;
    const root = document.getElementById('root');
    const prev = {
      title: document.title,
      htmlBg: html.style.backgroundColor,
      bodyBg: body.style.backgroundColor,
      htmlOverflow: html.style.overflow,
      bodyOverflow: body.style.overflow,
    };

    html.classList.add(PAGE_HTML_CLASS);
    document.title = PAGE_TITLE;
    html.style.backgroundColor = PAGE_BG;
    html.style.overflow = 'hidden';
    body.style.backgroundColor = PAGE_BG;
    body.style.color = PAGE_INK;
    body.style.overflow = 'hidden';
    if (root) root.style.backgroundColor = PAGE_BG;

    return () => {
      html.classList.remove(PAGE_HTML_CLASS);
      document.title = prev.title || 'Kmotion';
      html.style.backgroundColor = prev.htmlBg;
      html.style.overflow = prev.htmlOverflow;
      body.style.backgroundColor = prev.bodyBg;
      body.style.overflow = prev.bodyOverflow;
      body.style.color = '';
      if (root) root.style.backgroundColor = '';
    };
  }, []);
}
