import { ROUTES } from '../../../../config';
import { getKmotionNpmSnippet, KMOTION_PACKAGE } from '../../../../utils/kmotionNpmSnippet';
import {
  DETAIL_CARD_IMAGE_COUNT,
  FONT_HREF,
  HERO_TAGS,
  HERO_TITLE,
  LOGO_LABEL,
  NAV_LINKS,
  PAGE_TITLE,
} from '../constants';
import { MARQUEE_GIFS, SCENE, SIGHTS } from '../content';
import { meta } from '../meta';
import { MOSTAR_PROMPT } from '../prompt';

describe('Mostar city meta', () => {
  it('registers Travel card Mostar city', () => {
    expect(meta.id).toBe('mostar-city');
    expect(meta.title).toBe(PAGE_TITLE);
    expect(meta.category).toBe('Travel');
    expect(meta.categorySlug).toBe('travel');
    expect(meta.height).toBe('h-[272px]');
  });

  it('binds copy prompt to the exact pasted body', () => {
    expect(meta.fullPrompt).toBe(MOSTAR_PROMPT);
    expect(MOSTAR_PROMPT.startsWith('# PROMPT — Recreate "Mostar city"')).toBe(true);
    expect(MOSTAR_PROMPT).toContain(FONT_HREF);
    expect(MOSTAR_PROMPT).toContain(SCENE.sky);
    expect(MOSTAR_PROMPT).toContain(SCENE.bridge);
    expect(MOSTAR_PROMPT).toContain('Ogg Medium');
    expect(MOSTAR_PROMPT).not.toContain('/images/');
    expect(MOSTAR_PROMPT).not.toContain('how to rebuild');
  });

  it('uses mostar-city routes', () => {
    expect(meta.detailPath).toBe('/templates/mostar-city');
    expect(meta.livePath).toBe(ROUTES.MOSTAR_CITY);
  });

  it('copies the npm preview snippet for this card id', () => {
    const snippet = getKmotionNpmSnippet(meta.id, 'react');
    expect(snippet).toContain(`npm install ${KMOTION_PACKAGE}`);
    expect(snippet).toContain(`<Preview id="${meta.id}" />`);
  });
});

describe('Mostar city content', () => {
  it('keeps exact nav, title, tags, and sight labels', () => {
    expect(LOGO_LABEL).toBe('Bosnia and Herzegovina');
    expect(HERO_TITLE).toBe('MOSTAR');
    expect(NAV_LINKS.map((link) => link.label)).toEqual(['Intro', 'Bridge', 'Bazaar', 'Routes']);
    expect(HERO_TAGS).toEqual(['Old Bridge', 'Neretva River', 'UNESCO old city']);
    expect(SIGHTS.map((sight) => sight.title)).toEqual([
      'Stari Most',
      'Kujundziluk',
      'Koski Mehmed Pasha Mosque',
      'Kajtaz House',
      'War Photo Exhibition',
    ]);
  });

  it('pads gallery card images for TemplateDetail', () => {
    expect(MARQUEE_GIFS).toHaveLength(DETAIL_CARD_IMAGE_COUNT);
  });
});
