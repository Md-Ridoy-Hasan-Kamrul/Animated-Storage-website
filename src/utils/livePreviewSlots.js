/** Hard cap on simultaneous gallery live iframes (each may nest WebGL). */
export const MAX_GALLERY_LIVE_PREVIEWS = 2;

const holders = new Set();
const waiters = new Set();

function notifyWaiters() {
  if (holders.size >= MAX_GALLERY_LIVE_PREVIEWS || waiters.size === 0) return;
  [...waiters].forEach((notify) => notify());
}

/**
 * Try to reserve a live-preview slot for `ownerId`.
 * @returns {boolean} true if this owner now holds a slot
 */
export function acquireLivePreviewSlot(ownerId) {
  if (!ownerId) return false;
  if (holders.has(ownerId)) return true;
  if (holders.size >= MAX_GALLERY_LIVE_PREVIEWS) return false;
  holders.add(ownerId);
  return true;
}

/** Release a slot and wake queued cards. */
export function releaseLivePreviewSlot(ownerId) {
  if (!ownerId || !holders.has(ownerId)) return;
  holders.delete(ownerId);
  notifyWaiters();
}

/** Subscribe when a slot may have freed (returns unsubscribe). */
export function onLivePreviewSlotAvailable(notify) {
  waiters.add(notify);
  return () => waiters.delete(notify);
}

/** Test helper — clears holders and waiters. */
export function resetLivePreviewSlots() {
  holders.clear();
  waiters.clear();
}

export function getLivePreviewSlotCount() {
  return holders.size;
}
