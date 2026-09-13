import { meta } from '../meta';
import { CAST_RENDER_PROMPT } from '../prompt';
import { ROUTES } from '../../../../config';
import { HERO_VIDEO, HERO_VIDEO_LOCAL, MARQUEE_GIFS } from '../content';
import {
  BRAND_NAME,
  DETAIL_CARD_IMAGE_COUNT,
  NAV_LINKS,
  PANELS,
  VIDEO_URL,
} from '../constants';

describe('Cast & Render meta', () => {
  it('registers 3d Website card Cast & Render', () => {
    expect(meta.id).toBe('cast-render');
    expect(meta.title).toBe('Cast & Render');
    expect(meta.category).toBe('3d Website');
    expect(meta.height).toBe('h-[272px]');
  });

  it('binds copy prompt to prompt.js export', () => {
    expect(meta.fullPrompt).toBe(CAST_RENDER_PROMPT);
    expect(CAST_RENDER_PROMPT).toContain('3D Object Studio');
    expect(CAST_RENDER_PROMPT).toContain(VIDEO_URL);
    expect(CAST_RENDER_PROMPT).not.toContain(HERO_VIDEO_LOCAL);
  });

  it('uses cast-render routes', () => {
    expect(meta.detailPath).toBe('/templates/cast-render');
    expect(meta.livePath).toBe(ROUTES.CAST_RENDER);
  });
});

describe('Cast & Render content', () => {
  it('keeps CloudFront as source of record and local path for playback', () => {
    expect(HERO_VIDEO).toBe(VIDEO_URL);
    expect(HERO_VIDEO_LOCAL).toBe('/images/Assets Cast Render/hero.mp4');
  });

  it('keeps exact brand, nav, and panel copy', () => {
    expect(BRAND_NAME).toBe('Cast & Render');
    expect(NAV_LINKS.map((link) => link.label)).toEqual(['Works', 'About', 'Start a brief']);
    expect(PANELS.map((panel) => panel.ctaLabel)).toEqual([
      'View the reel',
      'Tour our space',
      'Start a brief',
    ]);
    expect(PANELS[0].sub).toContain('queue that starts before the sun');
  });

  it('pads gallery card images for TemplateDetail', () => {
    expect(MARQUEE_GIFS).toHaveLength(DETAIL_CARD_IMAGE_COUNT);
  });
});
