import { JOIN_TOAST_PREFIX, NAV_DURATION_S, NAV_Y, VIDEO_FROM_SCALE } from '../constants';
import { isValidEmail, joinToastMessage, normalizeEmail } from '../utils/email';
import { copyMotion, navMotion, videoMotion } from '../utils/motionPresets';

describe('Wellness Hero email', () => {
  it('validates and formats the join toast', () => {
    expect(normalizeEmail('  a@b.co  ')).toBe('a@b.co');
    expect(isValidEmail('')).toBe(false);
    expect(isValidEmail('not-an-email')).toBe(false);
    expect(isValidEmail('calm@aurai.com')).toBe(true);
    expect(joinToastMessage(JOIN_TOAST_PREFIX, 'calm@aurai.com')).toBe(
      'Joined the list: calm@aurai.com',
    );
  });
});

describe('Wellness Hero motion', () => {
  it('fades the film and slides nav and copy', () => {
    expect(videoMotion.initial.scale).toBe(VIDEO_FROM_SCALE);
    expect(navMotion.initial.y).toBe(NAV_Y);
    expect(navMotion.transition.duration).toBe(NAV_DURATION_S);
    expect(copyMotion.initial.opacity).toBe(0);
  });
});
