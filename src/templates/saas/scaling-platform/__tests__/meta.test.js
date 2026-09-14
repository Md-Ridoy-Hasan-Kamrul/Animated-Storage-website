import { ROUTES } from '../../../../config';
import { TEMPLATES as KMOTION_TEMPLATE_IDS, embedUrl } from '../../../../../packages/kmotion/src/core';
import { getKmotionNpmSnippet, KMOTION_PACKAGE } from '../../../../utils/kmotionNpmSnippet';
import { ACTIVE_TEMPLATE_CATEGORIES, CATEGORIES, CATEGORY_SLUGS } from '../../../../templates';
import {
  ABOUT_BODY,
  ACCENT,
  BRAND_NAME,
  CARD_ID,
  CARD_TITLE,
  DETAIL_CARD_IMAGE_COUNT,
} from '../constants';
import { ABOUT_VIDEO, HERO_VIDEO, HERO_VIDEO_LOCAL, MARQUEE_GIFS } from '../content';
import { meta } from '../meta';
import { SCALING_PLATFORM_PROMPT } from '../prompt';

describe('Scaling Platform meta', () => {
  it('registers the SaaS card Scaling Platform', () => {
    expect(meta.id).toBe(CARD_ID);
    expect(meta.title).toBe(CARD_TITLE);
    expect(meta.title).toBe('Scaling Platform');
    expect(meta.category).toBe('SaaS');
    expect(meta.categorySlug).toBe('saas');
    expect(meta.height).toBe('h-[272px]');
  });

  it('keeps SaaS on the gallery navbar tabs', () => {
    expect(CATEGORIES).toContain('SaaS');
    expect(CATEGORY_SLUGS.SaaS).toBe('saas');
    expect(ACTIVE_TEMPLATE_CATEGORIES).toContain('SaaS');
  });

  it('binds copy prompt to the exact pasted body', () => {
    expect(meta.fullPrompt).toBe(SCALING_PLATFORM_PROMPT);
    expect(SCALING_PLATFORM_PROMPT.startsWith('# Prompt: Recreate the Targo hero + about sections')).toBe(
      true,
    );
    expect(SCALING_PLATFORM_PROMPT).toContain(HERO_VIDEO);
    expect(SCALING_PLATFORM_PROMPT).toContain(ABOUT_VIDEO);
    expect(SCALING_PLATFORM_PROMPT).toContain(BRAND_NAME);
    expect(SCALING_PLATFORM_PROMPT).toContain(ABOUT_BODY);
    expect(SCALING_PLATFORM_PROMPT).toContain(ACCENT);
    expect(SCALING_PLATFORM_PROMPT).toContain('Quantico');
    expect(SCALING_PLATFORM_PROMPT).not.toContain('/images/Assets Scaling Platform');
    expect(SCALING_PLATFORM_PROMPT).not.toContain('scaling-platform-page');
    expect(SCALING_PLATFORM_PROMPT).not.toContain('webpack');
    expect(meta.fullPrompt.length).toBe(SCALING_PLATFORM_PROMPT.length);
  });

  it('uses scaling-platform routes', () => {
    expect(meta.detailPath).toBe('/templates/scaling-platform');
    expect(meta.livePath).toBe(ROUTES.SCALING_PLATFORM);
    expect(ROUTES.SCALING_PLATFORM).toBe('/p/scaling-platform');
  });

  it('copies the npm preview snippet for this card id', () => {
    const snippet = getKmotionNpmSnippet(meta.id, 'react');
    expect(snippet).toContain(`npm install ${KMOTION_PACKAGE}`);
    expect(snippet).toContain(`<Preview id="${meta.id}" />`);
    expect(KMOTION_TEMPLATE_IDS).toContain(meta.id);
    expect(embedUrl(meta.id)).toBe(`http://localhost:5173/p/${meta.id}`);
  });
});

describe('Scaling Platform content', () => {
  it('keeps CloudFront as source of record', () => {
    expect(HERO_VIDEO).toBe(
      'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260823_050407_500d0339-ab28-41c1-9688-132a74a3b5aa.mp4',
    );
    expect(ABOUT_VIDEO).toBe(
      'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260823_063501_2e2c8971-de1e-473a-8611-a0c9ae7ee186.mp4',
    );
    expect(HERO_VIDEO_LOCAL).toBe('/images/scaling-platform/hero.mp4?v=hd1');
    expect(MARQUEE_GIFS).toHaveLength(DETAIL_CARD_IMAGE_COUNT);
  });
});
