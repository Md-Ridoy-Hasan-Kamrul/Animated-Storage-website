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
      overflowX: body.style.overflowX,
      scrollBehavior: html.style.scrollBehavior,
      rootBg: root?.style.backgroundColor,
    };

    const isEmbed = new URLSearchParams(window.location.search).get('embed') === '1';
    document.title = PAGE_TITLE;
    html.style.backgroundColor = PAGE_BG;
    html.style.scrollBehavior = isEmbed ? 'auto' : 'smooth';
    body.style.backgroundColor = PAGE_BG;
    body.style.color = PAGE_INK;
    body.style.overflowX = 'hidden';
    if (root) root.style.backgroundColor = PAGE_BG;

    return () => {
      document.title = prev.title || 'Kmotion';
      html.style.backgroundColor = prev.htmlBg;
      html.style.scrollBehavior = prev.scrollBehavior;
      body.style.backgroundColor = prev.bodyBg;
      body.style.color = '';
      body.style.overflowX = prev.overflowX;
      if (root) root.style.backgroundColor = prev.rootBg || '';
    };
  }, []);
}
