import { ROUTES } from '../../../../config';
import { TEMPLATES as KMOTION_TEMPLATE_IDS, embedUrl } from '../../../../../packages/kmotion/src/core';
import { getKmotionNpmSnippet, KMOTION_PACKAGE } from '../../../../utils/kmotionNpmSnippet';
import { ACTIVE_TEMPLATE_CATEGORIES, CATEGORIES, CATEGORY_SLUGS } from '../../../../templates';
import { CARD_ID, CARD_TITLE, DETAIL_CARD_IMAGE_COUNT, HEADLINE, WORDMARK } from '../constants';
import { MARQUEE_GIFS, PREVIEW_STILL } from '../content';
import { meta } from '../meta';
import { VEYRA_ELECTRIC_PROMPT } from '../prompt';

describe('Veyra Electric meta', () => {
  it('registers the Automative card Veyra Electric', () => {
    expect(meta.id).toBe(CARD_ID);
    expect(meta.title).toBe(CARD_TITLE);
    expect(meta.title).toBe('Veyra Electric');
    expect(meta.category).toBe('Automative');
    expect(meta.categorySlug).toBe('automative');
    expect(meta.height).toBe('h-[272px]');
  });

  it('adds Automative to the gallery navbar tabs', () => {
    expect(CATEGORIES).toContain('Automative');
    expect(CATEGORY_SLUGS.Automative).toBe('automative');
    expect(ACTIVE_TEMPLATE_CATEGORIES).toContain('Automative');
  });

  it('binds copy prompt to the exact pasted body', () => {
    expect(meta.fullPrompt).toBe(VEYRA_ELECTRIC_PROMPT);
    expect(VEYRA_ELECTRIC_PROMPT.startsWith('# Recreate VEYRA — complete coding-agent prompt')).toBe(true);
    expect(VEYRA_ELECTRIC_PROMPT).toContain('https://github.com/amirmushichge/veyra-interactive-car');
    expect(VEYRA_ELECTRIC_PROMPT).toContain('v1.0.0');
    expect(VEYRA_ELECTRIC_PROMPT).toContain(WORDMARK);
    expect(VEYRA_ELECTRIC_PROMPT).toContain(HEADLINE);
    expect(VEYRA_ELECTRIC_PROMPT).toContain('exterior-polished.png');
    expect(VEYRA_ELECTRIC_PROMPT).not.toContain('veyra-electric');
    expect(VEYRA_ELECTRIC_PROMPT).not.toContain('webpack');
    expect(meta.fullPrompt.length).toBe(VEYRA_ELECTRIC_PROMPT.length);
  });

  it('uses veyra-electric routes', () => {
    expect(meta.detailPath).toBe('/templates/veyra-electric');
    expect(meta.livePath).toBe(ROUTES.VEYRA_ELECTRIC);
    expect(ROUTES.VEYRA_ELECTRIC).toBe('/p/veyra-electric');
  });

  it('copies the npm preview snippet for this card id', () => {
    const snippet = getKmotionNpmSnippet(meta.id, 'react');
    expect(snippet).toContain(`npm install ${KMOTION_PACKAGE}`);
    expect(snippet).toContain(`<Preview id="${meta.id}" />`);
    expect(KMOTION_TEMPLATE_IDS).toContain(meta.id);
    expect(embedUrl(meta.id)).toBe(`http://localhost:5173/p/${meta.id}`);
  });
});

describe('Veyra Electric content', () => {
  it('keeps the release exterior as the preview still', () => {
    expect(PREVIEW_STILL).toBe('/media/exterior-polished.png');
    expect(MARQUEE_GIFS).toHaveLength(DETAIL_CARD_IMAGE_COUNT);
  });
});
