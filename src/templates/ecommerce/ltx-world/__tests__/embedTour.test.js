import {
  EMBED_TOUR_HOLD_MS,
  EMBED_TOUR_RETURN_MS,
  EMBED_TOUR_START_MS,
  getEmbedTourDelay,
  getEmbedTourStep,
  pickNextTourBranch,
} from '../utils/embedTour';

describe('embed tour', () => {
  it('plays the next ready branch and wraps around', () => {
    const ready = { scene: true, light: true, colorway: false, fullLook: true };
    expect(pickNextTourBranch(null, ready)).toBe('scene');
    expect(pickNextTourBranch('scene', ready)).toBe('light');
    expect(pickNextTourBranch('light', ready)).toBe('fullLook');
    expect(pickNextTourBranch('fullLook', ready)).toBe('scene');
  });

  it('waits while locked or playing, then forwards from base and reverses from a branch', () => {
    expect(getEmbedTourStep({ scene: 'base', playback: 'ready', locked: false })).toBe(
      'forward',
    );
    expect(getEmbedTourStep({ scene: 'scene', playback: 'ready', locked: false })).toBe(
      'reverse',
    );
    expect(getEmbedTourStep({ scene: 'base', playback: 'playing', locked: false })).toBe(
      'wait',
    );
    expect(getEmbedTourStep({ scene: 'base', playback: 'ready', locked: true })).toBe(
      'wait',
    );
  });

  it('holds the selected scene before Reset so the card can show the destination', () => {
    expect(getEmbedTourDelay('forward', false)).toBe(EMBED_TOUR_START_MS);
    expect(getEmbedTourDelay('forward', true)).toBe(EMBED_TOUR_RETURN_MS);
    expect(getEmbedTourDelay('reverse', true)).toBe(EMBED_TOUR_HOLD_MS);
    expect(getEmbedTourDelay('wait', false)).toBe(0);
  });
});
