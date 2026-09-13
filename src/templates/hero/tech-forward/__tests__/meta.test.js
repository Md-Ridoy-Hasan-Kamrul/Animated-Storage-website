import { ROUTES } from '../../../../config';
import { TEMPLATES as KMOTION_TEMPLATE_IDS, embedUrl } from '../../../../../packages/kmotion/src/core';
import { getKmotionNpmSnippet, KMOTION_PACKAGE } from '../../../../utils/kmotionNpmSnippet';
import { CATEGORIES, CATEGORY_SLUGS } from '../../../../templates';
import {
  BRAND_NAME,
  CARD_ID,
  CARD_TITLE,
  CTA_FEATURES,
  DETAIL_CARD_IMAGE_COUNT,
  HEADLINE_LINE_TWO,
  SUBTITLE,
} from '../constants';
import { HERO_VIDEO, HERO_VIDEO_LOCAL, MARQUEE_GIFS, PREVIEW_STILL } from '../content';
import { meta } from '../meta';
import { TECH_FORWARD_PROMPT } from '../prompt';

describe('Tech-Forward meta', () => {
  it('registers the Hero card Tech-Forward', () => {
    expect(meta.id).toBe(CARD_ID);
    expect(meta.title).toBe(CARD_TITLE);
    expect(meta.title).toBe('Tech-Forward');
    expect(meta.category).toBe('Hero');
    expect(meta.categorySlug).toBe('hero');
    expect(meta.height).toBe('h-[272px]');
  });

  it('keeps Hero on the gallery navbar tabs', () => {
    expect(CATEGORIES).toContain('Hero');
    expect(CATEGORY_SLUGS.Hero).toBe('hero');
  });

  it('binds copy prompt to the exact pasted body', () => {
    expect(meta.fullPrompt).toBe(TECH_FORWARD_PROMPT);
    expect(TECH_FORWARD_PROMPT.startsWith('Create a full-screen hero')).toBe(true);
    expect(TECH_FORWARD_PROMPT).toContain(HERO_VIDEO);
    expect(TECH_FORWARD_PROMPT).toContain(BRAND_NAME);
    expect(TECH_FORWARD_PROMPT).toContain(SUBTITLE);
    expect(TECH_FORWARD_PROMPT).toContain(HEADLINE_LINE_TWO);
    expect(TECH_FORWARD_PROMPT).toContain(CTA_FEATURES);
    expect(TECH_FORWARD_PROMPT).not.toContain('/images/Assets Tech-Forward');
    expect(TECH_FORWARD_PROMPT).not.toContain('tech-forward');
    expect(TECH_FORWARD_PROMPT).not.toContain('webpack');
    expect(meta.fullPrompt.length).toBe(TECH_FORWARD_PROMPT.length);
  });

  it('uses tech-forward routes', () => {
    expect(meta.detailPath).toBe('/templates/tech-forward');
    expect(meta.livePath).toBe(ROUTES.TECH_FORWARD);
    expect(ROUTES.TECH_FORWARD).toBe('/p/tech-forward');
  });

  it('copies the npm preview snippet for this card id', () => {
    const snippet = getKmotionNpmSnippet(meta.id, 'react');
    expect(snippet).toContain(`npm install ${KMOTION_PACKAGE}`);
    expect(snippet).toContain(`<Preview id="${meta.id}" />`);
    expect(KMOTION_TEMPLATE_IDS).toContain(meta.id);
    expect(embedUrl(meta.id)).toBe(`http://localhost:5173/p/${meta.id}`);
  });
});

describe('Tech-Forward content', () => {
  it('keeps CloudFront as source of record', () => {
    expect(HERO_VIDEO).toBe(
      'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260508_215831_c6a8989c-d716-4d8d-8745-e972a2eec711.mp4',
    );
    expect(HERO_VIDEO_LOCAL).toBe('/images/Assets Tech-Forward/hero.mp4');
    expect(PREVIEW_STILL).toBe('/images/Assets Tech-Forward/preview.svg');
    expect(MARQUEE_GIFS).toHaveLength(DETAIL_CARD_IMAGE_COUNT);
  });
});
