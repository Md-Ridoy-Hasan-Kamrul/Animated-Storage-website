export function nextPreviewClip(current, desired) {
  if (current === desired) return null;
  return current ? { id: current, reverse: true } : desired ? { id: desired, reverse: false } : null;
}
