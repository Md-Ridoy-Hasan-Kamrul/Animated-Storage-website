import { BRANCHES } from '../constants';

export const EMBED_TOUR_BRANCH_IDS = Object.freeze(BRANCHES.map((branch) => branch.id));
export const EMBED_TOUR_START_MS = 800;
export const EMBED_TOUR_HOLD_MS = 650;
export const EMBED_TOUR_RETURN_MS = 480;

export function pickNextTourBranch(lastId, pairReady, ids = EMBED_TOUR_BRANCH_IDS) {
  const start = lastId ? ids.indexOf(lastId) + 1 : 0;
  const offset = start < 0 ? 0 : start;
  for (let i = 0; i < ids.length; i += 1) {
    const id = ids[(offset + i) % ids.length];
    if (pairReady[id]) return id;
  }
  return null;
}

export function getEmbedTourStep({ scene, playback, locked }) {
  if (locked || playback !== 'ready') return 'wait';
  if (scene === 'base') return 'forward';
  return 'reverse';
}

export function getEmbedTourDelay(step, hasLooped) {
  if (step === 'forward') {
    return hasLooped ? EMBED_TOUR_RETURN_MS : EMBED_TOUR_START_MS;
  }
  if (step === 'reverse') return EMBED_TOUR_HOLD_MS;
  return 0;
}
