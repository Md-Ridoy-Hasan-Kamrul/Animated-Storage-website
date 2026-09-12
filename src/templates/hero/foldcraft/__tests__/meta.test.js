import { meta } from '../meta';
import { FOLDCRAFT_PROMPT } from '../prompt';
import { ROUTES } from '../../../../config';
import { HERO_VIDEO, HERO_VIDEO_LOCAL, MARQUEE_GIFS } from '../content';
import {
  BADGE_LABEL,
  BRAND_NAME,
  DETAIL_CARD_IMAGE_COUNT,
  EXPLORE_LABEL,
  HEADLINE_LINES,
  NAV_LINKS,
  SUBTEXT,
  TALK_LABEL,
} from '../constants';

describe('Foldcraft meta', () => {
  it('registers Hero card Foldcraft', () => {
    expect(meta.id).toBe('foldcraft');
    expect(meta.title).toBe('Foldcraft');
    expect(meta.category).toBe('Hero');
    expect(meta.height).toBe('h-[272px]');
  });

  it('binds copy prompt to prompt.js export', () => {
    expect(meta.fullPrompt).toBe(FOLDCRAFT_PROMPT);
  });

  it('uses foldcraft routes', () => {
    expect(meta.detailPath).toBe('/templates/foldcraft');
    expect(meta.livePath).toBe(ROUTES.FOLDCRAFT);
  });
});

describe('Foldcraft content', () => {
  it('keeps CloudFront as source of record and local path for playback', () => {
    expect(HERO_VIDEO).toBe(
      'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260622_204221_5339e40b-e73d-4ab0-9c65-79c18c66fd50.mp4',
    );
    expect(HERO_VIDEO_LOCAL).toBe('/images/Assets Foldcraft/hero.mp4');
    expect(FOLDCRAFT_PROMPT).toContain(HERO_VIDEO);
    expect(FOLDCRAFT_PROMPT).not.toContain('/images/Assets Foldcraft/hero.mp4');
  });

  it('keeps exact brand, nav, headline, and CTA copy', () => {
    expect(BRAND_NAME).toBe('Foldcraft');
    expect(TALK_LABEL).toBe("Let's Talk");
    expect(EXPLORE_LABEL).toBe('Explore Work');
    expect(BADGE_LABEL).toBe('Brand & Visual Storytelling');
    expect(NAV_LINKS.map((link) => link.label)).toEqual([
      'Home',
      'Projects',
      'Studio',
      'Reach Us',
    ]);
    expect(HEADLINE_LINES).toEqual([
      'Shaping visual',
      'narratives,',
      'one pixel at a time.',
    ]);
    expect(SUBTEXT).toContain('endless pursuit of beauty');
  });

  it('pads gallery card images for TemplateDetail', () => {
    expect(MARQUEE_GIFS).toHaveLength(DETAIL_CARD_IMAGE_COUNT);
  });
});
