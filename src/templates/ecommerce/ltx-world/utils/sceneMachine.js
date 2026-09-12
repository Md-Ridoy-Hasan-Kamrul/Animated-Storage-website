export const SCENE_BASE = 'base';

export const HOLD_GUARD_DEFAULT_S = 0.08;
export const HOLD_GUARD_SCENE_REVERSE_S = 0.18;
export const TITLE_HIDE_RATIO = 0.12;
export const TITLE_HIDE_MAX_S = 0.9;

export function getHoldGuardSeconds(branchId, direction) {
  if (branchId === 'scene' && direction === 'reverse') {
    return HOLD_GUARD_SCENE_REVERSE_S;
  }
  return HOLD_GUARD_DEFAULT_S;
}

export function getTitleHideDelaySeconds(durationSeconds) {
  return Math.min(durationSeconds * TITLE_HIDE_RATIO, TITLE_HIDE_MAX_S);
}

export function canStartForward(scene) {
  return scene === SCENE_BASE;
}

export function canStartReverse(scene) {
  return scene !== SCENE_BASE;
}

export function isSameBranchSelected(scene, branchId) {
  return scene === branchId;
}

export function getClipDurationSeconds(branch, direction) {
  return direction === 'forward' ? branch.forwardDuration : branch.reverseDuration;
}

export function getHoldAtSeconds(branch, direction) {
  const duration = getClipDurationSeconds(branch, direction);
  return Math.max(0, duration - getHoldGuardSeconds(branch.id, direction));
}
