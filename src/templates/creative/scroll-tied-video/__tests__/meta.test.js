import { meta } from '../meta';
import { SCROLL_TIED_VIDEO_PROMPT } from '../prompt';
import { ROUTES } from '../../../../config';
import { getKmotionNpmSnippet, KMOTION_PACKAGE } from '../../../../utils/kmotionNpmSnippet';
import { HERO_VIDEO, HERO_VIDEO_LOCAL, MARQUEE_GIFS } from '../content';
import {
  DETAIL_CARD_IMAGE_COUNT,
  HERO_TITLE,
  NAV_LINKS,
  S3_EYEBROW,
  VIDEO_URL,
} from '../constants';

describe('Scroll Tied Video meta', () => {
  it('registers Creative card Vectrus Energy', () => {
    expect(meta.id).toBe('scroll-tied-video');
    expect(meta.title).toBe('Vectrus Energy');
    expect(meta.category).toBe('Creative');
    expect(meta.height).toBe('h-[272px]');
  });

  it('binds copy prompt to prompt.js export', () => {
    expect(meta.fullPrompt).toBe(SCROLL_TIED_VIDEO_PROMPT);
    expect(SCROLL_TIED_VIDEO_PROMPT).toContain(VIDEO_URL);
    expect(SCROLL_TIED_VIDEO_PROMPT).toContain('VECTRUS ENERGY');
    expect(SCROLL_TIED_VIDEO_PROMPT).not.toContain(HERO_VIDEO_LOCAL);
    expect(SCROLL_TIED_VIDEO_PROMPT.includes('h-[500vh]\u00a0')).toBe(true);
    expect((SCROLL_TIED_VIDEO_PROMPT.match(/\u00a0/g) || []).length).toBe(145);
  });

  it('uses scroll-tied-video routes', () => {
    expect(meta.detailPath).toBe('/templates/scroll-tied-video');
    expect(meta.livePath).toBe(ROUTES.SCROLL_TIED_VIDEO);
  });

  it('copies the npm preview snippet for this card id', () => {
    const snippet = getKmotionNpmSnippet(meta.id, 'react');
    expect(snippet).toContain(`npm install ${KMOTION_PACKAGE}`);
    expect(snippet).toContain(`<Preview id="${meta.id}" />`);
    expect(meta.id).toBe('scroll-tied-video');
  });
});

describe('Scroll Tied Video content', () => {
  it('keeps CloudFront as source of record and local path for playback', () => {
    expect(HERO_VIDEO).toBe(VIDEO_URL);
    expect(HERO_VIDEO_LOCAL).toBe('/images/Assets Scroll Tied Video/hero.mp4');
  });

  it('keeps exact nav and section copy', () => {
    expect(NAV_LINKS.map((link) => link.label)).toEqual([
      'VECTRUS ENERGY',
      'VECTRUS UPSTREAM',
      'VECTRUS MARKETS',
      'VECTRUS SYSTEMS',
      'VECTRUS+',
    ]);
    expect(HERO_TITLE).toBe('Advancing resources for a cleaner future');
    expect(S3_EYEBROW).toBe('Halder | Nordvik');
  });

  it('pads gallery card images for TemplateDetail', () => {
    expect(MARQUEE_GIFS).toHaveLength(DETAIL_CARD_IMAGE_COUNT);
  });
});
