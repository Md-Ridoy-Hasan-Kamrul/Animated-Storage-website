export function canChangeVideo(nextIndex, activeIndex, isTransitioning) {
  return Number.isFinite(nextIndex) && nextIndex !== activeIndex && !isTransitioning;
}

export function nextVideoIndex(activeIndex, count) {
  if (count <= 0) return 0;
  return (activeIndex + 1) % count;
}

export function isDeepWoods(activeIndex, woodsIndex) {
  return activeIndex === woodsIndex;
}
