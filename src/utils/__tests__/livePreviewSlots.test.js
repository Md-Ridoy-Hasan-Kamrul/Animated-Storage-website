import {
  MAX_GALLERY_LIVE_PREVIEWS,
  acquireLivePreviewSlot,
  getLivePreviewSlotCount,
  onLivePreviewSlotAvailable,
  releaseLivePreviewSlot,
  resetLivePreviewSlots,
} from '../livePreviewSlots';

describe('livePreviewSlots', () => {
  afterEach(() => {
    resetLivePreviewSlots();
  });

  it('caps concurrent live gallery previews', () => {
    expect(MAX_GALLERY_LIVE_PREVIEWS).toBe(2);
    expect(acquireLivePreviewSlot('a')).toBe(true);
    expect(acquireLivePreviewSlot('b')).toBe(true);
    expect(acquireLivePreviewSlot('c')).toBe(false);
    expect(getLivePreviewSlotCount()).toBe(2);
  });

  it('releases a slot and notifies waiters', () => {
    acquireLivePreviewSlot('a');
    acquireLivePreviewSlot('b');

    const notify = jest.fn();
    const unsubscribe = onLivePreviewSlotAvailable(notify);

    releaseLivePreviewSlot('a');
    expect(notify).toHaveBeenCalledTimes(1);
    expect(acquireLivePreviewSlot('c')).toBe(true);
    expect(getLivePreviewSlotCount()).toBe(2);

    unsubscribe();
  });

  it('is idempotent for the same owner', () => {
    expect(acquireLivePreviewSlot('a')).toBe(true);
    expect(acquireLivePreviewSlot('a')).toBe(true);
    expect(getLivePreviewSlotCount()).toBe(1);
  });
});
