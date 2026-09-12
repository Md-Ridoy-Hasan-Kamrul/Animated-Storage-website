import { meta } from '../meta';
import { VELORAH_PROMPT } from '../prompt';
import { ROUTES } from '../../../../config';
import { HERO_VIDEO, HERO_VIDEO_LOCAL, MARQUEE_GIFS } from '../content';
import {
  BRAND_NAME,
  CTA_LABEL,
  DETAIL_CARD_IMAGE_COUNT,
  HEADLINE_EMPHASIS,
  HEADLINE_PREFIX,
  NAV_LINKS,
  SUBTEXT,
} from '../constants';

describe('Velorah meta', () => {
  it('registers Agency card Velorah', () => {
    expect(meta.id).toBe('velorah');
    expect(meta.title).toBe('Velorah');
    expect(meta.category).toBe('Agency');
    expect(meta.height).toBe('h-[272px]');
  });

  it('binds copy prompt to prompt.js export', () => {
    expect(meta.fullPrompt).toBe(VELORAH_PROMPT);
  });

  it('uses velorah routes', () => {
    expect(meta.detailPath).toBe('/templates/velorah');
    expect(meta.livePath).toBe(ROUTES.VELORAH);
  });
});

describe('Velorah content', () => {
  it('keeps CloudFront as source of record and local path for playback', () => {
    expect(HERO_VIDEO).toBe(
      'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4',
    );
    expect(HERO_VIDEO_LOCAL).toBe('/images/Assets Velorah/hero.mp4');
    expect(VELORAH_PROMPT).toContain(HERO_VIDEO);
    expect(VELORAH_PROMPT).not.toContain('/images/Assets Velorah/hero.mp4');
  });

  it('keeps exact brand, nav, headline, and CTA copy', () => {
    expect(BRAND_NAME).toBe('Velorah');
    expect(CTA_LABEL).toBe('Begin Journey');
    expect(NAV_LINKS.map((link) => link.label)).toEqual([
      'Home',
      'Studio',
      'About',
      'Journal',
      'Reach Us',
    ]);
    expect(NAV_LINKS[0].active).toBe(true);
    expect(HEADLINE_PREFIX).toBe('Where');
    expect(HEADLINE_EMPHASIS).toEqual(['dreams', 'through the silence.']);
    expect(SUBTEXT).toContain('deep thinkers');
    expect(SUBTEXT).toContain('quiet rebels');
  });

  it('pads gallery card images for TemplateDetail', () => {
    expect(MARQUEE_GIFS).toHaveLength(DETAIL_CARD_IMAGE_COUNT);
  });
});
