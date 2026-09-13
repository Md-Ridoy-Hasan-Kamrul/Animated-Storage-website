import { ROUTES } from '../../../../config';
import { TEMPLATES as KMOTION_TEMPLATE_IDS, embedUrl } from '../../../../../packages/kmotion/src/core';
import { getKmotionNpmSnippet, KMOTION_PACKAGE } from '../../../../utils/kmotionNpmSnippet';
import { CATEGORIES, CATEGORY_SLUGS } from '../../../../templates';
import {
  CARD_ID,
  CARD_TITLE,
  CTA_LABEL,
  DETAIL_CARD_IMAGE_COUNT,
  HEADLINE_LINE_ONE,
  STAT_TITLE,
  STAT_VALUE,
} from '../constants';
import { MARQUEE_GIFS, OVERLAY_IMAGE, REVEAL_VIDEO } from '../content';
import { meta } from '../meta';
import { NIKE_HOVER_PROMPT } from '../prompt';

describe('Nike Hover meta', () => {
  it('registers the Features card Nike Hover', () => {
    expect(meta.id).toBe(CARD_ID);
    expect(meta.title).toBe(CARD_TITLE);
    expect(meta.title).toBe('Nike Hover');
    expect(meta.category).toBe('Features');
    expect(meta.categorySlug).toBe('features');
    expect(meta.height).toBe('h-[272px]');
  });

  it('adds Features to the gallery navbar tabs', () => {
    expect(CATEGORIES).toContain('Features');
    expect(CATEGORY_SLUGS.Features).toBe('features');
  });

  it('binds copy prompt to the exact pasted body', () => {
    expect(meta.fullPrompt).toBe(NIKE_HOVER_PROMPT);
    expect(NIKE_HOVER_PROMPT.startsWith('Create a single full-viewport')).toBe(true);
    expect(NIKE_HOVER_PROMPT).toContain(OVERLAY_IMAGE);
    expect(NIKE_HOVER_PROMPT).toContain(REVEAL_VIDEO);
    expect(NIKE_HOVER_PROMPT).toContain(STAT_VALUE);
    expect(NIKE_HOVER_PROMPT).toContain(STAT_TITLE);
    expect(NIKE_HOVER_PROMPT).not.toContain('/images/Assets Nike Hover');
    expect(NIKE_HOVER_PROMPT).not.toContain('nike-hover');
    expect(NIKE_HOVER_PROMPT).not.toContain('webpack');
  });

  it('uses nike-hover routes', () => {
    expect(meta.detailPath).toBe('/templates/nike-hover');
    expect(meta.livePath).toBe(ROUTES.NIKE_HOVER);
  });

  it('copies the npm preview snippet for this card id', () => {
    const snippet = getKmotionNpmSnippet(meta.id, 'react');
    expect(snippet).toContain(`npm install ${KMOTION_PACKAGE}`);
    expect(snippet).toContain(`<Preview id="${meta.id}" />`);
    expect(KMOTION_TEMPLATE_IDS).toContain(meta.id);
    expect(embedUrl(meta.id)).toBe(`http://localhost:5173/p/${meta.id}`);
  });
});

describe('Nike Hover content', () => {
  it('keeps the exact overlay and video URLs', () => {
    expect(OVERLAY_IMAGE).toContain('02604201313.png');
    expect(REVEAL_VIDEO).toContain('pikaso.cdnpk.net');
    expect(HEADLINE_LINE_ONE).toBe('Bringing Aerospace-');
    expect(CTA_LABEL).toBe('THE SCIENCE OF IMPACT CONTROL');
  });

  it('pads gallery card images for TemplateDetail', () => {
    expect(MARQUEE_GIFS).toHaveLength(DETAIL_CARD_IMAGE_COUNT);
  });
});
