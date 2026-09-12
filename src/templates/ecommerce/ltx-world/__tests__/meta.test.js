import { meta } from '../meta';
import { LTX_WORLD_PROMPT } from '../prompt';
import { ROUTES } from '../../../../config';
import { CLIP_URLS, MARQUEE_GIFS } from '../content';
import { BRANCHES, DETAIL_CARD_IMAGE_COUNT, MEDIA_BASE, PAGE_TITLE } from '../constants';

describe('LTX World meta', () => {
  it('registers Ecommerce card LTX World', () => {
    expect(meta.id).toBe('ltx-world');
    expect(meta.title).toBe('LTX World');
    expect(meta.category).toBe('Ecommerce');
    expect(meta.likes).toBe(3750);
    expect(meta.height).toBe('h-[272px]');
  });

  it('binds copy prompt to prompt.js export', () => {
    expect(meta.fullPrompt).toBe(LTX_WORLD_PROMPT);
    expect(LTX_WORLD_PROMPT).toContain(PAGE_TITLE);
    expect(LTX_WORLD_PROMPT).toContain('Reset from Scene');
    expect(LTX_WORLD_PROMPT).toContain('Pause in place');
  });

  it('uses ltx-world routes', () => {
    expect(meta.detailPath).toBe('/templates/ltx-world');
    expect(meta.livePath).toBe(ROUTES.LTX_WORLD);
  });
});

describe('LTX World clips', () => {
  it('keeps verbatim R2 URLs and does not rewrite them in the copy prompt', () => {
    expect(MEDIA_BASE).toBe('https://pub-86dc5b5484314368ac5436a674b0d919.r2.dev/designs/');
    expect(CLIP_URLS['colorway-forward']).toBe(`${MEDIA_BASE}video-1.mp4`);
    expect(CLIP_URLS['scene-reverse']).toBe(`${MEDIA_BASE}video-2-reverse.mp4`);
    expect(CLIP_URLS['light-forward']).toBe(`${MEDIA_BASE}video-3.mp4`);
    expect(CLIP_URLS['fullLook-reverse']).toBe(`${MEDIA_BASE}video-4-reverse.mp4`);
    expect(LTX_WORLD_PROMPT).toContain('video-1.mp4');
    expect(LTX_WORLD_PROMPT).toContain(MEDIA_BASE);
    expect(Object.keys(CLIP_URLS)).toHaveLength(8);
    expect(BRANCHES.map((b) => b.label)).toEqual(['Scene', 'Lighting', 'Clothing', 'Cast']);
  });

  it('pads gallery card images for TemplateDetail', () => {
    expect(MARQUEE_GIFS).toHaveLength(DETAIL_CARD_IMAGE_COUNT);
  });
});
