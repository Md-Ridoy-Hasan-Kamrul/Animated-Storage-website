import { clampTime, resolveScrubOrigin, timeFromMouseDelta } from '../utils/mouseScrub';
import { nextTypedLength, isTypewriterDone } from '../utils/typewriter';
import { SCRUB_SENSITIVITY } from '../constants';

describe('mouse scrub', () => {
  it('clamps target time to the clip duration', () => {
    expect(clampTime(-1, 10)).toBe(0);
    expect(clampTime(12, 10)).toBe(10);
    expect(clampTime(4, 0)).toBe(0);
  });

  it('converts horizontal delta into a duration-scaled seek offset', () => {
    const next = timeFromMouseDelta(2, 200, 1000, 10, SCRUB_SENSITIVITY);
    expect(next).toBeCloseTo(2 + 0.2 * 0.8 * 10, 5);
  });

  it('keeps time 0 as a valid scrub origin', () => {
    expect(resolveScrubOrigin(0, 4)).toBe(0);
    expect(resolveScrubOrigin(undefined, 4)).toBe(4);
  });
});

describe('typewriter', () => {
  it('reveals one character and completes at the last index', () => {
    expect(nextTypedLength(3, 10)).toBe(4);
    expect(nextTypedLength(10, 10)).toBe(10);
    expect(isTypewriterDone(10, 10)).toBe(true);
    expect(isTypewriterDone(4, 10)).toBe(false);
  });
});
