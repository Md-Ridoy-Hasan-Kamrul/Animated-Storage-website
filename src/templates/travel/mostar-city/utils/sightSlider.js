import { SIGHT_SET_COUNT } from '../constants';

export function buildSightCopies(sights, setCount = SIGHT_SET_COUNT) {
  return Array.from({ length: setCount }, (_, setIndex) =>
    sights.map((sight, cardIndex) => ({
      ...sight,
      key: `${setIndex}-${cardIndex}`,
      sightIndex: setIndex * sights.length + cardIndex,
    })),
  ).flat();
}

export function initialActiveSight(originalCount) {
  return originalCount;
}

export function moveActiveSight(active, dir) {
  return active + dir;
}

export function normalizeActiveSight(active, originalCount) {
  if (active >= originalCount * 2) return active - originalCount;
  if (active < originalCount) return active + originalCount;
  return active;
}

export function needsSightJump(active, originalCount) {
  return active >= originalCount * 2 || active < originalCount;
}

export function sightShiftPx(cardWidth, gap, activeSight) {
  return -(cardWidth + gap) * activeSight;
}
