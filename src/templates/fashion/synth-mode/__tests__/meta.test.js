import { ROUTES } from '../../../../config';
import { TEMPLATES as KMOTION_TEMPLATE_IDS, embedUrl } from '../../../../../packages/kmotion/src/core';
import { getKmotionNpmSnippet, KMOTION_PACKAGE } from '../../../../utils/kmotionNpmSnippet';
import { CATEGORIES, CATEGORY_SLUGS } from '../../../../templates';
import {
  BRAND,
  CARD_ID,
  CARD_TITLE,
  CTA_LABEL,
  DETAIL_CARD_IMAGE_COUNT,
  DRAWER_SHOP_TITLE,
  GARMENTS,
  HEADLINE_LINES,
} from '../constants';
import { BG_IMAGE_1, BG_IMAGE_2, MARQUEE_GIFS } from '../content';
import { meta } from '../meta';
import { SYNTH_MODE_PROMPT } from '../prompt';

describe('Synth Mode meta', () => {
  it('registers the Fashion card Synth Mode', () => {
    expect(meta.id).toBe(CARD_ID);
    expect(meta.title).toBe(CARD_TITLE);
    expect(meta.title).toBe('Synth Mode');
    expect(meta.category).toBe('Fashion');
    expect(meta.categorySlug).toBe('fashion');
    expect(meta.height).toBe('h-[272px]');
  });

  it('adds Fashion to the gallery navbar tabs', () => {
    expect(CATEGORIES).toContain('Fashion');
    expect(CATEGORY_SLUGS.Fashion).toBe('fashion');
  });

  it('binds copy prompt to the exact pasted body', () => {
    expect(meta.fullPrompt).toBe(SYNTH_MODE_PROMPT);
    expect(SYNTH_MODE_PROMPT.startsWith('Build a pure-white')).toBe(true);
    expect(SYNTH_MODE_PROMPT).toContain(BG_IMAGE_1);
    expect(SYNTH_MODE_PROMPT).toContain(BG_IMAGE_2);
    expect(SYNTH_MODE_PROMPT).toContain(BRAND);
    expect(SYNTH_MODE_PROMPT).toContain(HEADLINE_LINES.join(' '));
    expect(SYNTH_MODE_PROMPT).toContain(CTA_LABEL);
    expect(SYNTH_MODE_PROMPT).toContain(DRAWER_SHOP_TITLE);
    expect(SYNTH_MODE_PROMPT).toContain(GARMENTS[0].title);
    expect(SYNTH_MODE_PROMPT).not.toContain('/images/Assets Synth Mode');
    expect(SYNTH_MODE_PROMPT).not.toContain('synth-mode');
    expect(SYNTH_MODE_PROMPT).not.toContain('webpack');
    expect(meta.fullPrompt.length).toBe(SYNTH_MODE_PROMPT.length);
  });

  it('uses synth-mode routes', () => {
    expect(meta.detailPath).toBe('/templates/synth-mode');
    expect(meta.livePath).toBe(ROUTES.SYNTH_MODE);
    expect(ROUTES.SYNTH_MODE).toBe('/p/synth-mode');
  });

  it('copies the npm preview snippet for this card id', () => {
    const snippet = getKmotionNpmSnippet(meta.id, 'react');
    expect(snippet).toContain(`npm install ${KMOTION_PACKAGE}`);
    expect(snippet).toContain(`<Preview id="${meta.id}" />`);
    expect(KMOTION_TEMPLATE_IDS).toContain(meta.id);
    expect(embedUrl(meta.id)).toBe(`http://localhost:5173/p/${meta.id}`);
  });
});

describe('Synth Mode content', () => {
  it('keeps the exact Higgs / CloudFront image URLs', () => {
    expect(BG_IMAGE_1).toContain('hf_20260802_074534');
    expect(BG_IMAGE_2).toContain('hf_20260802_075145');
    expect(MARQUEE_GIFS).toHaveLength(DETAIL_CARD_IMAGE_COUNT);
  });
});
