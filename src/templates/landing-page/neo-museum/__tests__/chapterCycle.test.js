import {
  formatChapterCounter,
  formatChapterTotal,
  nextChapterIndex,
} from '../utils/chapterCycle';

describe('nextChapterIndex', () => {
  it('wraps after the last chapter', () => {
    expect(nextChapterIndex(0, 5)).toBe(1);
    expect(nextChapterIndex(4, 5)).toBe(0);
  });

  it('handles empty length', () => {
    expect(nextChapterIndex(2, 0)).toBe(0);
  });
});

describe('chapter counters', () => {
  it('pads 1-based display', () => {
    expect(formatChapterCounter(0)).toBe('01');
    expect(formatChapterCounter(2)).toBe('03');
    expect(formatChapterTotal(5)).toBe('05');
  });
});
