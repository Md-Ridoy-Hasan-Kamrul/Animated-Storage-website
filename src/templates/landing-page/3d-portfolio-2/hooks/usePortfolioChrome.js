import { useEffect } from 'react';
import { PAGE_BG, PAGE_TITLE } from '../constants';

/**
 * Syncs document chrome (title, backgrounds, font) while the live page is mounted.
 */
export function usePortfolioChrome() {
  useEffect(() => {
    const prev = {
      title: document.title,
      htmlBg: document.documentElement.style.backgroundColor,
      bodyBg: document.body.style.backgroundColor,
      bodyFont: document.body.style.fontFamily,
      bodyMargin: document.body.style.margin,
      bodyPadding: document.body.style.padding,
    };

    document.title = PAGE_TITLE;
    document.documentElement.style.backgroundColor = PAGE_BG;
    document.body.style.backgroundColor = PAGE_BG;
    document.body.style.fontFamily = "'Kanit', sans-serif";
    document.body.style.margin = '0';
    document.body.style.padding = '0';

    const root = document.getElementById('root');
    const prevRootBg = root?.style.backgroundColor;
    if (root) root.style.backgroundColor = PAGE_BG;

    return () => {
      document.title = prev.title || 'Kmotion';
      document.documentElement.style.backgroundColor = prev.htmlBg;
      document.body.style.backgroundColor = prev.bodyBg;
      document.body.style.fontFamily = prev.bodyFont;
      document.body.style.margin = prev.bodyMargin;
      document.body.style.padding = prev.bodyPadding;
      if (root) root.style.backgroundColor = prevRootBg || '';
    };
  }, []);
}
