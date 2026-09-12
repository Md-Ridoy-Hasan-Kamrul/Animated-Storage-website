import {
  getCapsuleTravel,
  shouldPinActiveLabel,
  shouldShowReset,
} from '../utils/capsuleTravel';

describe('capsule travel', () => {
  it('moves a label to the controller centre on desktop', () => {
    const cell = { offsetLeft: 528, offsetWidth: 176, offsetTop: 0, offsetHeight: 72 };
    const controller = { clientWidth: 880, clientHeight: 72 };
    const { dx, dy } = getCapsuleTravel(cell, controller, {
      mobile: false,
      viewportHeight: 900,
    });
    expect(dx).toBeCloseTo(440 - (528 + 88), 4);
    expect(dy).toBe(0);
  });

  it('aims at 4dvh from the controller top on mobile', () => {
    const cell = { offsetLeft: 0, offsetWidth: 160, offsetTop: 48, offsetHeight: 54 };
    const controller = { clientWidth: 350, clientHeight: 156 };
    const { dx, dy } = getCapsuleTravel(cell, controller, {
      mobile: true,
      viewportHeight: 800,
    });
    expect(dx).toBeCloseTo(175 - 80, 4);
    expect(dy).toBeCloseTo(32 - (48 + 27), 4);
  });

  it('keeps the chosen label pinned through selected, then shows Reset', () => {
    expect(shouldPinActiveLabel('collapsed')).toBe(true);
    expect(shouldPinActiveLabel('selected')).toBe(true);
    expect(shouldPinActiveLabel('reversing')).toBe(false);
    expect(shouldShowReset('selected', true)).toBe(true);
    expect(shouldShowReset('reversing', true)).toBe(true);
    expect(shouldShowReset('collapsed', true)).toBe(false);
  });
});
