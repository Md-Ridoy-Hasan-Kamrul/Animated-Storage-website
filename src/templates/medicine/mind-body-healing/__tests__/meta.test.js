import { ROUTES } from '../../../../config';
import { TEMPLATES as KMOTION_TEMPLATE_IDS, embedUrl } from '../../../../../packages/kmotion/src/core';
import { getKmotionNpmSnippet, KMOTION_PACKAGE } from '../../../../utils/kmotionNpmSnippet';
import { ACTIVE_TEMPLATE_CATEGORIES, CATEGORIES, CATEGORY_SLUGS } from '../../../../templates';
import {
  BADGE_LABEL,
  BRAND_NAME,
  CARD_ID,
  CARD_TITLE,
  CTA_LABEL,
  DETAIL_CARD_IMAGE_COUNT,
  HEADLINE_LINE_ONE,
  HEADLINE_LINE_TWO,
} from '../constants';
import { AVATAR_REMOTES, HERO_VIDEO, HERO_VIDEO_LOCAL, MARQUEE_GIFS } from '../content';
import { meta } from '../meta';
import { MIND_BODY_HEALING_PROMPT } from '../prompt';

describe('Mind-Body Healing meta', () => {
  it('registers the Medicine card Mind-Body Healing', () => {
    expect(meta.id).toBe(CARD_ID);
    expect(meta.title).toBe(CARD_TITLE);
    expect(meta.title).toBe('Mind-Body Healing');
    expect(meta.category).toBe('Medicine');
    expect(meta.categorySlug).toBe('medicine');
    expect(meta.height).toBe('h-[272px]');
  });

  it('adds Medicine to the gallery navbar tabs', () => {
    expect(CATEGORIES).toContain('Medicine');
    expect(CATEGORY_SLUGS.Medicine).toBe('medicine');
    expect(ACTIVE_TEMPLATE_CATEGORIES).toContain('Medicine');
  });

  it('binds copy prompt to the exact pasted body', () => {
    expect(meta.fullPrompt).toBe(MIND_BODY_HEALING_PROMPT);
    expect(MIND_BODY_HEALING_PROMPT.startsWith('Build a single-page hero landing page for a holistic wellness brand called "Vibrant Wellness."')).toBe(
      true,
    );
    expect(MIND_BODY_HEALING_PROMPT).toContain(HERO_VIDEO);
    expect(MIND_BODY_HEALING_PROMPT).toContain(BRAND_NAME);
    expect(MIND_BODY_HEALING_PROMPT).toContain(HEADLINE_LINE_ONE);
    expect(MIND_BODY_HEALING_PROMPT).toContain(HEADLINE_LINE_TWO);
    expect(MIND_BODY_HEALING_PROMPT).toContain(CTA_LABEL);
    expect(MIND_BODY_HEALING_PROMPT).toContain(BADGE_LABEL);
    AVATAR_REMOTES.forEach((url) => {
      expect(MIND_BODY_HEALING_PROMPT).toContain(url);
    });
    expect(MIND_BODY_HEALING_PROMPT).not.toContain('/images/Assets Mind-Body Healing');
    expect(MIND_BODY_HEALING_PROMPT).not.toContain('mind-body-healing');
    expect(MIND_BODY_HEALING_PROMPT).not.toContain('webpack');
    expect(meta.fullPrompt.length).toBe(MIND_BODY_HEALING_PROMPT.length);
  });

  it('uses mind-body-healing routes', () => {
    expect(meta.detailPath).toBe('/templates/mind-body-healing');
    expect(meta.livePath).toBe(ROUTES.MIND_BODY_HEALING);
    expect(ROUTES.MIND_BODY_HEALING).toBe('/p/mind-body-healing');
  });

  it('copies the npm preview snippet for this card id', () => {
    const snippet = getKmotionNpmSnippet(meta.id, 'react');
    expect(snippet).toContain(`npm install ${KMOTION_PACKAGE}`);
    expect(snippet).toContain(`<Preview id="${meta.id}" />`);
    expect(KMOTION_TEMPLATE_IDS).toContain(meta.id);
    expect(embedUrl(meta.id)).toBe(`http://localhost:5173/p/${meta.id}`);
  });
});

describe('Mind-Body Healing content', () => {
  it('keeps CloudFront and Pexels as sources of record', () => {
    expect(HERO_VIDEO).toBe(
      'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260715_082433_69699cf8-444b-4484-93cc-053e57896dfd.mp4',
    );
    expect(HERO_VIDEO_LOCAL).toBe('/images/Assets Mind-Body Healing/hero.mp4');
    expect(AVATAR_REMOTES).toHaveLength(4);
    expect(MARQUEE_GIFS).toHaveLength(DETAIL_CARD_IMAGE_COUNT);
  });
});
