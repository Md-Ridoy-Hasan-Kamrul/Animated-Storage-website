export function hiddenPoint(hidden) {
  return { x: hidden, y: hidden };
}

export function makeTrailPoints(count, hidden) {
  return Array.from({ length: count }, () => hiddenPoint(hidden));
}

export function lerpAxis(current, target, factor) {
  return current + (target - current) * factor;
}

export function stepLeader(point, target, factor) {
  return {
    x: lerpAxis(point.x, target.x, factor),
    y: lerpAxis(point.y, target.y, factor),
  };
}

export function stepFollower(point, leader, factor) {
  return {
    x: lerpAxis(point.x, leader.x, factor),
    y: lerpAxis(point.y, leader.y, factor),
  };
}

export function stepTrail(points, target, leaderLerp, followerLerp) {
  if (!points.length) return points;
  const next = points.map((point) => ({ ...point }));
  next[0] = stepLeader(next[0], target, leaderLerp);
  for (let index = 1; index < next.length; index += 1) {
    next[index] = stepFollower(next[index], next[index - 1], followerLerp);
  }
  return next;
}

export function trailRadius(baseRadius, index, step) {
  return baseRadius - index * step;
}

export function trailOpacity(index, step) {
  return 1 - index * step;
}

export function trailIndexFromReverse(count, reversedIndex) {
  return count - 1 - reversedIndex;
}

export function resolveBaseRadius(isMobile, mobileRadius, desktopRadius) {
  return isMobile ? mobileRadius : desktopRadius;
}

export function embedCursorAt(progress, width, height) {
  const turn = progress * Math.PI * 2;
  return {
    x: width * 0.55 + Math.cos(turn) * width * 0.2,
    y: height * 0.48 + Math.sin(turn * 2) * height * 0.16,
  };
}
