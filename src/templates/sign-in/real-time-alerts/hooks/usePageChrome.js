import { useLayoutEffect } from 'react';
import {
  BODY_STACKED,
  BODY_TABPORT,
  ENTRY_FALLBACK_MS,
  ENTRY_PENDING_CLASS,
  FRAMED_HTML_CLASS,
  PAGE_BG,
  PAGE_HTML_CLASS,
  PAGE_INK,
  PAGE_TITLE,
} from '../constants';

export function usePageChrome() {
  useLayoutEffect(() => {
    const html = document.documentElement;
    const { body } = document;
    const root = document.getElementById('root');
    const prev = {
      title: document.title,
      htmlBg: html.style.backgroundColor,
      bodyBg: body.style.backgroundColor,
    };

    const framed = window.self !== window.top;
    html.classList.add(PAGE_HTML_CLASS, ENTRY_PENDING_CLASS);
    if (framed) html.classList.add(FRAMED_HTML_CLASS);
    document.title = PAGE_TITLE;
    html.style.backgroundColor = PAGE_BG;
    body.style.backgroundColor = PAGE_BG;
    body.style.color = PAGE_INK;
    if (root) root.style.backgroundColor = PAGE_BG;

    window.__entryFallback = window.setTimeout(() => {
      html.classList.remove(ENTRY_PENDING_CLASS);
    }, ENTRY_FALLBACK_MS);

    return () => {
      window.clearTimeout(window.__entryFallback);
      html.classList.remove(PAGE_HTML_CLASS, FRAMED_HTML_CLASS, ENTRY_PENDING_CLASS);
      document.title = prev.title || 'Kmotion';
      html.style.backgroundColor = prev.htmlBg;
      body.style.backgroundColor = prev.bodyBg;
      body.style.color = '';
      body.classList.remove(BODY_TABPORT, BODY_STACKED);
      if (root) root.style.backgroundColor = '';
    };
  }, []);
}
