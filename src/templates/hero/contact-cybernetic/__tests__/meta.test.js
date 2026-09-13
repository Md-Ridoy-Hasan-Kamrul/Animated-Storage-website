import { ROUTES } from '../../../../config';
import { TEMPLATES as KMOTION_TEMPLATE_IDS, embedUrl } from '../../../../../packages/kmotion/src/core';
import { getKmotionNpmSnippet, KMOTION_PACKAGE } from '../../../../utils/kmotionNpmSnippet';
import { CATEGORIES, CATEGORY_SLUGS } from '../../../../templates';
import {
  BRAND_NAME,
  CARD_ID,
  CARD_TITLE,
  DETAIL_CARD_IMAGE_COUNT,
  HEADLINE_TEXT,
  SERVICE_OPTIONS,
} from '../constants';
import { HERO_VIDEO, HERO_VIDEO_LOCAL, MARQUEE_GIFS } from '../content';
import { meta } from '../meta';
import { CONTACT_CYBERNETIC_PROMPT } from '../prompt';

describe('Contact Cybernetic meta', () => {
  it('registers the Hero card Contact Cybernetic', () => {
    expect(meta.id).toBe(CARD_ID);
    expect(meta.title).toBe(CARD_TITLE);
    expect(meta.title).toBe('Contact Cybernetic');
    expect(meta.category).toBe('Hero');
    expect(meta.categorySlug).toBe('hero');
    expect(meta.height).toBe('h-[272px]');
  });

  it('keeps Hero on the gallery navbar tabs', () => {
    expect(CATEGORIES).toContain('Hero');
    expect(CATEGORY_SLUGS.Hero).toBe('hero');
  });

  it('binds copy prompt to the exact pasted body', () => {
    expect(meta.fullPrompt).toBe(CONTACT_CYBERNETIC_PROMPT);
    expect(CONTACT_CYBERNETIC_PROMPT.startsWith('Build a modern, interactive hero')).toBe(true);
    expect(CONTACT_CYBERNETIC_PROMPT).toContain(HERO_VIDEO);
    expect(CONTACT_CYBERNETIC_PROMPT).toContain('Mainframe');
    expect(CONTACT_CYBERNETIC_PROMPT).toContain("we'd love to");
    expect(CONTACT_CYBERNETIC_PROMPT).toContain('What sort of service?');
    expect(CONTACT_CYBERNETIC_PROMPT).not.toContain('/images/Assets Contact Cybernetic');
    expect(CONTACT_CYBERNETIC_PROMPT).not.toContain('contact-cybernetic');
    expect(CONTACT_CYBERNETIC_PROMPT).not.toContain('webpack');
    expect(meta.fullPrompt.length).toBe(CONTACT_CYBERNETIC_PROMPT.length);
  });

  it('uses contact-cybernetic routes', () => {
    expect(meta.detailPath).toBe('/templates/contact-cybernetic');
    expect(meta.livePath).toBe(ROUTES.CONTACT_CYBERNETIC);
    expect(ROUTES.CONTACT_CYBERNETIC).toBe('/p/contact-cybernetic');
  });

  it('copies the npm preview snippet for this card id', () => {
    const snippet = getKmotionNpmSnippet(meta.id, 'react');
    expect(snippet).toContain(`npm install ${KMOTION_PACKAGE}`);
    expect(snippet).toContain(`<Preview id="${meta.id}" />`);
    expect(KMOTION_TEMPLATE_IDS).toContain(meta.id);
    expect(embedUrl(meta.id)).toBe(`http://localhost:5173/p/${meta.id}`);
  });
});

describe('Contact Cybernetic content', () => {
  it('keeps CloudFront as source of record', () => {
    expect(HERO_VIDEO).toBe(
      'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260601_110537_3a579fa0-7bbc-4d94-9d25-0e816c7840f5.mp4',
    );
    expect(HERO_VIDEO_LOCAL).toBe('/images/Assets Contact Cybernetic/hero.mp4');
    expect(MARQUEE_GIFS).toHaveLength(DETAIL_CARD_IMAGE_COUNT);
    expect(BRAND_NAME).toBe('Mainframe®');
    expect(HEADLINE_TEXT).toContain('hear from you!');
    expect(SERVICE_OPTIONS).toEqual(['Brand', 'Digital', 'Campaign', 'Other']);
  });
});
