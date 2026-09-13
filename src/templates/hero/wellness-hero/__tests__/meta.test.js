import { ROUTES } from '../../../../config';
import { TEMPLATES as KMOTION_TEMPLATE_IDS, embedUrl } from '../../../../../packages/kmotion/src/core';
import { getKmotionNpmSnippet, KMOTION_PACKAGE } from '../../../../utils/kmotionNpmSnippet';
import { CATEGORIES, CATEGORY_SLUGS } from '../../../../templates';
import {
  BRAND_NAME,
  CARD_ID,
  CARD_TITLE,
  DETAIL_CARD_IMAGE_COUNT,
  HEADLINE,
} from '../constants';
import { HERO_VIDEO, HERO_VIDEO_LOCAL, MARQUEE_GIFS } from '../content';
import { meta } from '../meta';
import { WELLNESS_HERO_PROMPT } from '../prompt';

describe('Wellness Hero meta', () => {
  it('registers the Hero card Wellness Hero', () => {
    expect(meta.id).toBe(CARD_ID);
    expect(meta.title).toBe(CARD_TITLE);
    expect(meta.title).toBe('Wellness Hero');
    expect(meta.category).toBe('Hero');
    expect(meta.categorySlug).toBe('hero');
    expect(meta.height).toBe('h-[272px]');
  });

  it('keeps Hero on the gallery navbar tabs', () => {
    expect(CATEGORIES).toContain('Hero');
    expect(CATEGORY_SLUGS.Hero).toBe('hero');
  });

  it('binds copy prompt to the exact pasted body', () => {
    expect(meta.fullPrompt).toBe(WELLNESS_HERO_PROMPT);
    expect(WELLNESS_HERO_PROMPT.startsWith('Build a full-screen hero section landing page for "Aurai"')).toBe(
      true,
    );
    expect(WELLNESS_HERO_PROMPT).toContain(HERO_VIDEO);
    expect(WELLNESS_HERO_PROMPT).toContain(BRAND_NAME);
    expect(WELLNESS_HERO_PROMPT).toContain(HEADLINE);
    expect(WELLNESS_HERO_PROMPT).toContain('Askan Light');
    expect(WELLNESS_HERO_PROMPT).not.toContain('/images/Assets Wellness Hero');
    expect(WELLNESS_HERO_PROMPT).not.toContain('wellness-hero');
    expect(WELLNESS_HERO_PROMPT).not.toContain('webpack');
    expect(meta.fullPrompt.length).toBe(WELLNESS_HERO_PROMPT.length);
  });

  it('uses wellness-hero routes', () => {
    expect(meta.detailPath).toBe('/templates/wellness-hero');
    expect(meta.livePath).toBe(ROUTES.WELLNESS_HERO);
    expect(ROUTES.WELLNESS_HERO).toBe('/p/wellness-hero');
  });

  it('copies the npm preview snippet for this card id', () => {
    const snippet = getKmotionNpmSnippet(meta.id, 'react');
    expect(snippet).toContain(`npm install ${KMOTION_PACKAGE}`);
    expect(snippet).toContain(`<Preview id="${meta.id}" />`);
    expect(KMOTION_TEMPLATE_IDS).toContain(meta.id);
    expect(embedUrl(meta.id)).toBe(`http://localhost:5173/p/${meta.id}`);
  });
});

describe('Wellness Hero content', () => {
  it('keeps CloudFront as source of record', () => {
    expect(HERO_VIDEO).toBe(
      'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260618_174853_aac61aa2-0f3f-4cf1-bc78-7f657dd11164.mp4',
    );
    expect(HERO_VIDEO_LOCAL).toBe('/images/Assets Wellness Hero/hero.mp4');
    expect(MARQUEE_GIFS).toHaveLength(DETAIL_CARD_IMAGE_COUNT);
  });
});
