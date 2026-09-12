import {
  canStartForward,
  canStartReverse,
  getHoldAtSeconds,
  getHoldGuardSeconds,
  getTitleHideDelaySeconds,
  isSameBranchSelected,
} from '../utils/sceneMachine';
import { BRANCHES } from '../constants';

describe('LTX scene machine', () => {
  it('only allows forward from base and reverse from a selected branch', () => {
    expect(canStartForward('base')).toBe(true);
    expect(canStartForward('scene')).toBe(false);
    expect(canStartReverse('base')).toBe(false);
    expect(canStartReverse('colorway')).toBe(true);
  });

  it('blocks branch-to-branch hops', () => {
    expect(isSameBranchSelected('light', 'scene')).toBe(false);
    expect(isSameBranchSelected('light', 'light')).toBe(true);
  });

  it('uses the Scene reverse hold guard and default otherwise', () => {
    expect(getHoldGuardSeconds('scene', 'reverse')).toBe(0.18);
    expect(getHoldGuardSeconds('scene', 'forward')).toBe(0.08);
    expect(getHoldGuardSeconds('fullLook', 'reverse')).toBe(0.08);
  });

  it('clamps title hide delay to 12% of duration, max 0.9s', () => {
    expect(getTitleHideDelaySeconds(2.08)).toBeCloseTo(0.2496, 4);
    expect(getTitleHideDelaySeconds(20)).toBe(0.9);
  });

  it('holds Scene reverse 0.18s before duration and others 0.08s', () => {
    const scene = BRANCHES.find((branch) => branch.id === 'scene');
    const cast = BRANCHES.find((branch) => branch.id === 'fullLook');
    expect(getHoldAtSeconds(scene, 'reverse')).toBeCloseTo(1.9, 4);
    expect(getHoldAtSeconds(scene, 'forward')).toBeCloseTo(2, 4);
    expect(getHoldAtSeconds(cast, 'reverse')).toBeCloseTo(2.4, 4);
    expect(getHoldAtSeconds(scene, 'reverse', 2.1)).toBeCloseTo(1.92, 4);
  });
});
