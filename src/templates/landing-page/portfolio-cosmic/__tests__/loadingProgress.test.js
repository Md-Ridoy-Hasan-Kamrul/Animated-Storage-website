import { padCount, progressFromElapsed } from '../utils/loadingProgress';

describe('progressFromElapsed', () => {
  it('returns 0 at start', () => {
    expect(progressFromElapsed(0, 2700)).toBe(0);
  });

  it('returns 100 at or past duration', () => {
    expect(progressFromElapsed(2700, 2700)).toBe(100);
    expect(progressFromElapsed(3000, 2700)).toBe(100);
  });

  it('interpolates mid progress', () => {
    expect(progressFromElapsed(1350, 2700)).toBe(50);
  });

  it('treats non-positive duration as complete', () => {
    expect(progressFromElapsed(0, 0)).toBe(100);
    expect(progressFromElapsed(100, -1)).toBe(100);
  });
});

describe('padCount', () => {
  it('pads to three digits by default', () => {
    expect(padCount(0)).toBe('000');
    expect(padCount(7)).toBe('007');
    expect(padCount(100)).toBe('100');
  });
});
