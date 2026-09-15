import { ROUTES } from '../../../../config';
import { TEMPLATES as KMOTION_TEMPLATE_IDS, embedUrl } from '../../../../../packages/kmotion/src/core';
import { getKmotionNpmSnippet, KMOTION_PACKAGE } from '../../../../utils/kmotionNpmSnippet';
import { ACTIVE_TEMPLATE_CATEGORIES, CATEGORIES, CATEGORY_SLUGS } from '../../../../templates';
import {
  BADGE_COPY,
  CARD_ID,
  CARD_TITLE,
  DETAIL_CARD_IMAGE_COUNT,
  H1_COPY,
  HL1_COPY,
  LOGIN_LABEL,
  PAGE_TITLE,
} from '../constants';
import { HERO_VIDEO, HERO_VIDEO_LOCAL, MARQUEE_GIFS } from '../content';
import { meta } from '../meta';
import { REAL_TIME_ALERTS_PROMPT } from '../prompt';

describe('Real-Time Alerts meta', () => {
  it('registers the Sign in card Real Time Alerts', () => {
    expect(meta.id).toBe(CARD_ID);
    expect(meta.title).toBe(CARD_TITLE);
    expect(meta.title).toBe('Real Time Alerts');
    expect(meta.category).toBe('Sign in');
    expect(meta.categorySlug).toBe('sign-in');
    expect(meta.height).toBe('h-[272px]');
  });

  it('adds Sign in to the gallery navbar tabs', () => {
    expect(CATEGORIES).toContain('Sign in');
    expect(CATEGORY_SLUGS['Sign in']).toBe('sign-in');
    expect(ACTIVE_TEMPLATE_CATEGORIES).toContain('Sign in');
  });

  it('binds copy prompt to the exact pasted body', () => {
    expect(meta.fullPrompt).toBe(REAL_TIME_ALERTS_PROMPT);
    expect(REAL_TIME_ALERTS_PROMPT.startsWith('Build a single, self-contained `index.html` file')).toBe(
      true,
    );
    expect(REAL_TIME_ALERTS_PROMPT).toContain(HERO_VIDEO);
    expect(REAL_TIME_ALERTS_PROMPT).toContain(HL1_COPY);
    expect(REAL_TIME_ALERTS_PROMPT).toContain(BADGE_COPY);
    expect(REAL_TIME_ALERTS_PROMPT).toContain(PAGE_TITLE);
    expect(REAL_TIME_ALERTS_PROMPT).not.toContain('real-time-alerts');
    expect(REAL_TIME_ALERTS_PROMPT).not.toContain('webpack');
    expect(REAL_TIME_ALERTS_PROMPT).not.toContain('/images/Assets Real-Time Alerts');
    expect(meta.fullPrompt.length).toBe(REAL_TIME_ALERTS_PROMPT.length);
  });

  it('uses real-time-alerts routes', () => {
    expect(meta.detailPath).toBe('/templates/real-time-alerts');
    expect(meta.livePath).toBe(ROUTES.REAL_TIME_ALERTS);
    expect(ROUTES.REAL_TIME_ALERTS).toBe('/p/real-time-alerts');
  });

  it('copies the npm preview snippet for this card id', () => {
    const snippet = getKmotionNpmSnippet(meta.id, 'react');
    expect(snippet).toContain(`npm install ${KMOTION_PACKAGE}`);
    expect(snippet).toContain(`<Preview id="${meta.id}" />`);
    expect(KMOTION_TEMPLATE_IDS).toContain(meta.id);
    expect(embedUrl(meta.id)).toBe(`http://localhost:5173/p/${meta.id}`);
  });
});

describe('Real-Time Alerts content', () => {
  it('keeps CloudFront as source of record and a local falcon fallback', () => {
    expect(HERO_VIDEO).toContain('hf_20260813_052122_e77a27e6-17f1-4794-889b-3ceaa0e9e8cb.mp4');
    expect(HERO_VIDEO_LOCAL).toBe('/images/Assets Real-Time Alerts/falcon.mp4');
    expect(MARQUEE_GIFS).toHaveLength(DETAIL_CARD_IMAGE_COUNT);
    expect(H1_COPY).toBe('Welcome Back!');
    expect(LOGIN_LABEL).toBe('Login');
  });
});
