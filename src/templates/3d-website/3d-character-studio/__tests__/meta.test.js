import { meta } from '../meta';
import { MAINFRAME_PROMPT } from '../prompt';
import { ROUTES } from '../../../../config';
import { HERO_VIDEO, HERO_VIDEO_LOCAL, MARQUEE_GIFS } from '../content';
import {
  BRAND_NAME,
  CONTACT_EMAIL,
  DETAIL_CARD_IMAGE_COUNT,
  NAV_LINKS,
  PILL_LABELS,
  TYPEWRITER_MIN_HEIGHT_PX,
  TYPEWRITER_TEXT,
  VIDEO_URL,
} from '../constants';

describe('3D Character Studio meta', () => {
  it('registers 3d Website card 3D Character Studio', () => {
    expect(meta.id).toBe('3d-character-studio');
    expect(meta.title).toBe('3D Character Studio');
    expect(meta.category).toBe('3d Website');
    expect(meta.height).toBe('h-[272px]');
  });

  it('binds copy prompt to prompt.js export', () => {
    expect(meta.fullPrompt).toBe(MAINFRAME_PROMPT);
    expect(MAINFRAME_PROMPT).toContain(VIDEO_URL);
    expect(MAINFRAME_PROMPT).not.toContain(HERO_VIDEO_LOCAL);
  });

  it('uses 3d-character-studio routes', () => {
    expect(meta.detailPath).toBe('/templates/3d-character-studio');
    expect(meta.livePath).toBe(ROUTES.CHARACTER_STUDIO);
  });
});

describe('3D Character Studio content', () => {
  it('keeps CloudFront as source of record and local path for playback', () => {
    expect(HERO_VIDEO).toBe(VIDEO_URL);
    expect(HERO_VIDEO_LOCAL).toBe('/images/Assets 3D Character Studio/hero.mp4');
  });

  it('keeps exact brand, nav, typewriter, and pill copy', () => {
    expect(BRAND_NAME).toBe('Mainframe®');
    expect(CONTACT_EMAIL).toBe('hello@mainframe.co');
    expect(NAV_LINKS.map((link) => link.label)).toEqual([
      'Labs',
      'Studio',
      'Openings',
      'Shop',
    ]);
    expect(TYPEWRITER_TEXT).toContain('Good taste tends to find us');
    expect(TYPEWRITER_MIN_HEIGHT_PX).toBe(54);
    expect(PILL_LABELS).toEqual([
      'Pitch us an idea',
      'Come work here',
      'Send a brief hello',
      'See how we operate',
    ]);
  });

  it('pads gallery card images for TemplateDetail', () => {
    expect(MARQUEE_GIFS).toHaveLength(DETAIL_CARD_IMAGE_COUNT);
  });
});
