import { useEffect } from 'react';

const FONT_HREF =
  'https://fonts.googleapis.com/css2?family=Inter+Tight:wght@500&display=swap';

/** Loads Inter Tight only while the Prompt live page is mounted. */
export function usePromptFont() {
  useEffect(() => {
    const existing = document.querySelector(`link[data-prompt-font="1"]`);
    if (existing) return undefined;

    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = FONT_HREF;
    link.dataset.promptFont = '1';
    document.head.appendChild(link);

    return () => {
      link.remove();
    };
  }, []);
}
