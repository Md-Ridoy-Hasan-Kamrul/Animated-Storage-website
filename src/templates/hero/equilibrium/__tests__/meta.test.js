import { ROUTES } from '../../../../config';
import { TEMPLATES as KMOTION_TEMPLATE_IDS, embedUrl } from '../../../../../packages/kmotion/src/core';
import { getKmotionNpmSnippet, KMOTION_PACKAGE } from '../../../../utils/kmotionNpmSnippet';
import { CATEGORIES, CATEGORY_SLUGS } from '../../../../templates';
import { BRAND_NAME, CARD_ID, CARD_TITLE, DETAIL_CARD_IMAGE_COUNT, HEADLINE } from '../constants';
import { HERO_VIDEO, HERO_VIDEO_LOCAL, MARQUEE_GIFS } from '../content';
import { meta } from '../meta';
import { EQUILIBRIUM_PROMPT } from '../prompt';

describe('Equilibrium meta', () => {
  it('registers the Hero card Equilibrium', () => {
    expect(meta.id).toBe(CARD_ID);
    expect(meta.title).toBe(CARD_TITLE);
    expect(meta.title).toBe('Equilibrium');
    expect(meta.category).toBe('Hero');
    expect(meta.categorySlug).toBe('hero');
    expect(meta.height).toBe('h-[272px]');
  });

  it('keeps Hero on the gallery navbar tabs', () => {
    expect(CATEGORIES).toContain('Hero');
    expect(CATEGORY_SLUGS.Hero).toBe('hero');
  });

  it('binds copy prompt to the exact pasted body', () => {
    expect(meta.fullPrompt).toBe(EQUILIBRIUM_PROMPT);
    expect(EQUILIBRIUM_PROMPT.startsWith('Build a full-screen, single-page React + TypeScript + Vite')).toBe(
      true,
    );
    expect(EQUILIBRIUM_PROMPT).toContain(HERO_VIDEO);
    expect(EQUILIBRIUM_PROMPT).toContain(BRAND_NAME);
    expect(EQUILIBRIUM_PROMPT).toContain(HEADLINE);
    expect(EQUILIBRIUM_PROMPT).toContain('liquid-glass');
    expect(EQUILIBRIUM_PROMPT).toContain('Geist');
    expect(EQUILIBRIUM_PROMPT).not.toContain('/images/Assets Equilibrium');
    expect(EQUILIBRIUM_PROMPT).not.toContain('equilibrium-page');
    expect(EQUILIBRIUM_PROMPT).not.toContain('webpack');
    expect(meta.fullPrompt.length).toBe(EQUILIBRIUM_PROMPT.length);
  });

  it('uses equilibrium routes', () => {
    expect(meta.detailPath).toBe('/templates/equilibrium');
    expect(meta.livePath).toBe(ROUTES.EQUILIBRIUM);
    expect(ROUTES.EQUILIBRIUM).toBe('/p/equilibrium');
  });

  it('copies the npm preview snippet for this card id', () => {
    const snippet = getKmotionNpmSnippet(meta.id, 'react');
    expect(snippet).toContain(`npm install ${KMOTION_PACKAGE}`);
    expect(snippet).toContain(`<Preview id="${meta.id}" />`);
    expect(KMOTION_TEMPLATE_IDS).toContain(meta.id);
    expect(embedUrl(meta.id)).toBe(`http://localhost:5173/p/${meta.id}`);
  });
});

describe('Equilibrium content', () => {
  it('keeps CloudFront as source of record', () => {
    expect(HERO_VIDEO).toBe(
      'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260511_230229_7c9bc431-46cf-489a-948d-e8144d8eb5d4.mp4',
    );
    expect(HERO_VIDEO_LOCAL).toBe('/images/Assets Equilibrium/hero.mp4');
    expect(MARQUEE_GIFS).toHaveLength(DETAIL_CARD_IMAGE_COUNT);
  });
});
