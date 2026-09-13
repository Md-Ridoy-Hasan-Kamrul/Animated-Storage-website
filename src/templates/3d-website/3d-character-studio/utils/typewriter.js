export function nextTypedLength(current, total) {
  return Math.min(total, current + 1);
}

export function isTypewriterDone(current, total) {
  return current >= total;
}
