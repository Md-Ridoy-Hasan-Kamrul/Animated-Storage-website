import { advanceEmbedProgress, scrollYFromProgress } from '../utils/embedTour';

describe('embed tour', () => {
  it('advances progress over the loop and reverses at the ends', () => {
    expect(advanceEmbedProgress(0.25, 1, 1.5, 6)).toEqual({ progress: 0.5, dir: 1 });
    expect(advanceEmbedProgress(0.95, 1, 1, 10)).toEqual({ progress: 1, dir: -1 });
    expect(advanceEmbedProgress(0.05, -1, 1, 10)).toEqual({ progress: 0, dir: 1 });
  });

  it('maps progress onto the scroll track', () => {
    expect(scrollYFromProgress(0.5, 4000)).toBe(2000);
    expect(scrollYFromProgress(2, 4000)).toBe(4000);
    expect(scrollYFromProgress(0.2, 0)).toBe(0);
  });
});
