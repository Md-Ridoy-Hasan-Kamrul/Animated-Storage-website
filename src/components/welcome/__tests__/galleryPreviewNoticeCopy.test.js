import {
  GALLERY_PREVIEW_NOTICE,
  GALLERY_PREVIEW_NOTICE_STORAGE_KEY,
} from '../galleryPreviewNoticeCopy';

describe('gallery preview notice copy', () => {
  it('keeps clear, readable instructions for View mode', () => {
    expect(GALLERY_PREVIEW_NOTICE_STORAGE_KEY).toBe('kmotion-gallery-preview-notice-v1');
    expect(GALLERY_PREVIEW_NOTICE.title).toMatch(/View mode/i);
    expect(GALLERY_PREVIEW_NOTICE.lead.toLowerCase()).toContain('still');
    expect(GALLERY_PREVIEW_NOTICE.steps).toHaveLength(3);
    expect(GALLERY_PREVIEW_NOTICE.buttonLabel).toBe('I understand');
  });
});
