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
      htmlOverflowX: html.style.overflowX,
      htmlOverflowY: html.style.overflowY,
      htmlHeight: html.style.height,
      bodyBg: body.style.backgroundColor,
      overflowX: body.style.overflowX,
      overflowY: body.style.overflowY,
      bodyHeight: body.style.height,
      scrollBehavior: html.style.scrollBehavior,
      rootBg: root?.style.backgroundColor,
      rootOverflow: root?.style.overflow,
      rootHeight: root?.style.height,
    };

    html.classList.add(PAGE_HTML_CLASS);
    document.title = PAGE_TITLE;
    html.style.backgroundColor = PAGE_BG;
    html.style.scrollBehavior = 'auto';
    html.style.overflowX = 'hidden';
    html.style.overflowY = 'scroll';
    html.style.height = 'auto';
    body.style.backgroundColor = PAGE_BG;
    body.style.color = PAGE_INK;
    body.style.overflowX = 'visible';
    body.style.overflowY = 'visible';
    body.style.height = 'auto';
    if (root) {
      root.style.backgroundColor = PAGE_BG;
      root.style.overflow = 'visible';
      root.style.height = 'auto';
    }

    return () => {
      html.classList.remove(PAGE_HTML_CLASS);
      document.title = prev.title || 'Kmotion';
      html.style.backgroundColor = prev.htmlBg;
      html.style.scrollBehavior = prev.scrollBehavior;
      html.style.overflowX = prev.htmlOverflowX;
      html.style.overflowY = prev.htmlOverflowY;
      html.style.height = prev.htmlHeight;
      body.style.backgroundColor = prev.bodyBg;
      body.style.color = '';
      body.style.overflowX = prev.overflowX;
      body.style.overflowY = prev.overflowY;
      body.style.height = prev.bodyHeight;
      if (root) {
        root.style.backgroundColor = prev.rootBg || '';
        root.style.overflow = prev.rootOverflow || '';
        root.style.height = prev.rootHeight || '';
      }
    };
  }, []);
}
