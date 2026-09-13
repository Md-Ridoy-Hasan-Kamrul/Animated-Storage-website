export function layerOpacities(hasVideoFrame, cacheReady) {
  const posterHidden = hasVideoFrame || cacheReady;
  return {
    poster: posterHidden ? 0 : 1,
    video: hasVideoFrame && !cacheReady ? 1 : 0,
    canvas: cacheReady ? 1 : 0,
  };
}
