import { useEffect } from 'react';
import { PAGE_TITLE } from '../constants';

const PAGE_BG = 'hsl(0 0% 4%)';

/** Document chrome for dark forced theme; restores on leave. */
export function usePageChrome() {
  useEffect(() => {
    const prev = {
      title: document.title,
      htmlBg: document.documentElement.style.backgroundColor,
      bodyBg: document.body.style.backgroundColor,
      bodyColor: document.body.style.color,
      bodyMargin: document.body.style.margin,
      bodyPadding: document.body.style.padding,
    };

    document.title = PAGE_TITLE;
    document.documentElement.style.backgroundColor = PAGE_BG;
    document.body.style.backgroundColor = PAGE_BG;
    document.body.style.color = 'hsl(0 0% 96%)';
    document.body.style.margin = '0';
    document.body.style.padding = '0';

    const root = document.getElementById('root');
    const prevRootBg = root?.style.backgroundColor;
    if (root) root.style.backgroundColor = PAGE_BG;

    return () => {
      document.title = prev.title || 'Kmotion';
      document.documentElement.style.backgroundColor = prev.htmlBg;
      document.body.style.backgroundColor = prev.bodyBg;
      document.body.style.color = prev.bodyColor;
      document.body.style.margin = prev.bodyMargin;
      document.body.style.padding = prev.bodyPadding;
      if (root) root.style.backgroundColor = prevRootBg || '';
    };
  }, []);
}
