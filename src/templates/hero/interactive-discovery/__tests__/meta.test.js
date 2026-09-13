import { ROUTES } from '../../../../config';
import { TEMPLATES as KMOTION_TEMPLATE_IDS, embedUrl } from '../../../../../packages/kmotion/src/core';
import { getKmotionNpmSnippet, KMOTION_PACKAGE } from '../../../../utils/kmotionNpmSnippet';
import {
  BRAND_NAME,
  CARD_ID,
  CARD_TITLE,
  COPY_LEFT,
  CTA_LABEL,
  DETAIL_CARD_IMAGE_COUNT,
  HEADING_LINE_ONE,
  HEADING_LINE_TWO,
  NAV_LINKS,
  SIGN_UP_LABEL,
} from '../constants';
import { BG_IMAGE_1, BG_IMAGE_2, MARQUEE_GIFS } from '../content';
import { meta } from '../meta';
import { LITHOS_PROMPT } from '../prompt';

describe('Interactive Discovery meta', () => {
  it('registers the Hero card Interactive Discovery', () => {
    expect(meta.id).toBe(CARD_ID);
    expect(meta.title).toBe(CARD_TITLE);
    expect(meta.title).toBe('Interactive Discovery');
    expect(meta.category).toBe('Hero');
    expect(meta.height).toBe('h-[272px]');
  });

  it('binds copy prompt to the exact pasted body', () => {
    expect(meta.fullPrompt).toBe(LITHOS_PROMPT);
    expect(LITHOS_PROMPT.startsWith('Build a full-screen, dark-themed hero section')).toBe(true);
    expect(LITHOS_PROMPT).toContain(BG_IMAGE_1);
    expect(LITHOS_PROMPT).toContain(BG_IMAGE_2);
    expect(LITHOS_PROMPT).toContain(BRAND_NAME);
    expect(LITHOS_PROMPT).toContain(HEADING_LINE_ONE);
    expect(LITHOS_PROMPT).toContain(HEADING_LINE_TWO);
    expect(LITHOS_PROMPT).not.toContain('/images/Assets');
    expect(LITHOS_PROMPT).not.toContain('interactive-discovery');
    expect(LITHOS_PROMPT).not.toContain('webpack');
  });

  it('uses interactive-discovery routes', () => {
    expect(meta.detailPath).toBe('/templates/interactive-discovery');
    expect(meta.livePath).toBe(ROUTES.INTERACTIVE_DISCOVERY);
  });

  it('copies the npm preview snippet for this card id', () => {
    const snippet = getKmotionNpmSnippet(meta.id, 'react');
    expect(snippet).toContain(`npm install ${KMOTION_PACKAGE}`);
    expect(snippet).toContain(`<Preview id="${meta.id}" />`);
    expect(KMOTION_TEMPLATE_IDS).toContain(meta.id);
    expect(embedUrl(meta.id)).toBe(`http://localhost:5173/p/${meta.id}`);
  });
});

describe('Interactive Discovery content', () => {
  it('keeps the exact Higgs image URLs', () => {
    expect(BG_IMAGE_1).toContain('hf_20260609_195923');
    expect(BG_IMAGE_2).toContain('hf_20260609_201152');
  });

  it('keeps exact Lithos copy', () => {
    expect(BRAND_NAME).toBe('Lithos');
    expect(NAV_LINKS.map((link) => link.label)).toEqual([
      'Course',
      'Field Guides',
      'Geology',
      'Plans',
      'Live Tour',
    ]);
    expect(SIGN_UP_LABEL).toBe('Sign Up');
    expect(CTA_LABEL).toBe('Start Digging');
    expect(COPY_LEFT).toContain('Every layer of sediment');
  });

  it('pads gallery card images for TemplateDetail', () => {
    expect(MARQUEE_GIFS).toHaveLength(DETAIL_CARD_IMAGE_COUNT);
  });
});
