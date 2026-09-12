import { useCallback, useEffect, useState } from 'react';
import { nextChapterIndex } from '../utils/chapterCycle';

/**
 * Auto-cycles chapters; click resets the interval.
 */
export function useChapterCycle(initial, length, intervalMs) {
  const [activeChapter, setActiveChapter] = useState(initial);

  useEffect(() => {
    const id = window.setInterval(() => {
      setActiveChapter((prev) => nextChapterIndex(prev, length));
    }, intervalMs);
    return () => window.clearInterval(id);
  }, [activeChapter, intervalMs, length]);

  const selectChapter = useCallback((index) => {
    setActiveChapter(index);
  }, []);

  return { activeChapter, selectChapter };
}
