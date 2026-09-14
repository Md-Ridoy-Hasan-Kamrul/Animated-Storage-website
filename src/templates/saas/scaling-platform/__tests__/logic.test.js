import {
  ACCENT,
  HEADLINE_LINES,
  MOBILE_MAX_PX,
  NAV_LINKS,
  PLAY_RETRY_MS,
} from '../constants';
import { playMuted } from '../utils/playVideo';
import { headlineClass, isMobileWidth } from '../utils/viewport';

describe('Scaling Platform viewport and headline', () => {
  it('treats 700px and below as mobile', () => {
    expect(MOBILE_MAX_PX).toBe(700);
    expect(isMobileWidth(700)).toBe(true);
    expect(isMobileWidth(701)).toBe(false);
    expect(isMobileWidth(320)).toBe(true);
    expect(isMobileWidth(1020)).toBe(false);
  });

  it('marks the staircase indent and cyan BUSINESS line', () => {
    expect(HEADLINE_LINES.map((line) => line.text)).toEqual([
      'SCALING',
      'THE',
      'PLATFORM',
      'FOR',
      'YOUR',
      'BUSINESS',
    ]);
    expect(HEADLINE_LINES.filter((line) => line.indent)).toHaveLength(3);
    expect(HEADLINE_LINES[5].accent).toBe(true);
    expect(headlineClass(HEADLINE_LINES[0])).toBe('sp-headline-line');
    expect(headlineClass(HEADLINE_LINES[3])).toBe('sp-headline-line sp-headline-indent');
    expect(headlineClass(HEADLINE_LINES[5])).toBe('sp-headline-line sp-headline-indent sp-headline-accent');
    expect(ACCENT).toBe('#15BCDF');
  });

  it('keeps nav labels and a 1s muted play retry', () => {
    expect(NAV_LINKS.map((item) => item.label)).toEqual(['HOME', 'ABOUT', 'CONTACT US']);
    expect(PLAY_RETRY_MS).toBe(1000);
  });
});

describe('playMuted', () => {
  it('mutes, sets playsInline, and swallows play rejection', () => {
    const video = {
      muted: false,
      playsInline: false,
      play: jest.fn(() => Promise.reject(new Error('blocked'))),
    };
    expect(() => playMuted(video)).not.toThrow();
    expect(video.muted).toBe(true);
    expect(video.playsInline).toBe(true);
    expect(video.play).toHaveBeenCalled();
  });
});
