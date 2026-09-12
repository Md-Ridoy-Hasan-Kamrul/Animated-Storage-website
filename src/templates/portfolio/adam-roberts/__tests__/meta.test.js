import { meta } from '../meta';
import { ADAM_ROBERTS_PROMPT } from '../prompt';
import { ROUTES } from '../../../../config';
import {
  BRAND_BLURB_LINES,
  FOOTER_STATS,
  HERO_VIDEO,
  HERO_VIDEO_LOCAL,
  MARQUEE_GIFS,
  WHAT_I_DO,
} from '../content';
import { AWARDS, DETAIL_CARD_IMAGE_COUNT, NAV_LINKS, SERVICES_LIST } from '../constants';

describe('Adam Roberts meta', () => {
  it('registers Portfolio card Adam Roberts', () => {
    expect(meta.id).toBe('adam-roberts');
    expect(meta.title).toBe('Adam Roberts');
    expect(meta.category).toBe('Portfolio');
    expect(meta.height).toBe('h-[272px]');
  });

  it('binds copy prompt to prompt.js export', () => {
    expect(meta.fullPrompt).toBe(ADAM_ROBERTS_PROMPT);
  });

  it('uses adam-roberts routes', () => {
    expect(meta.detailPath).toBe('/templates/adam-roberts');
    expect(meta.livePath).toBe(ROUTES.ADAM_ROBERTS);
  });
});

describe('Adam Roberts content', () => {
  it('keeps the exact CloudFront video URL', () => {
    expect(HERO_VIDEO).toBe(
      'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260725_114042_d2ed2a89-f2fa-449b-9609-da456344257b.mp4',
    );
    expect(HERO_VIDEO_LOCAL).toBe('/images/Assets Adam Roberts/hero.mp4');
  });

  it('keeps brand copy, awards, and nav labels', () => {
    expect(BRAND_BLURB_LINES).toEqual([
      'Grilled Pixels is my',
      'personal brand - I came up',
      'with it in 2004 based on',
      '"cooking up ideas"',
    ]);
    expect(WHAT_I_DO).toContain('top 1%');
    expect(NAV_LINKS.map((l) => l.label)).toEqual([
      'ABOUT',
      'PROCESS',
      'PROJECTS',
      'CATALOG',
      'D.O.T',
      'TALK',
    ]);
    expect(SERVICES_LIST).toHaveLength(6);
    expect(AWARDS.map((a) => a.count)).toEqual(['x1', 'x7', 'x22']);
    expect(FOOTER_STATS).toBe('5 full cases • 82 archive fragments • 22 catalog items');
  });

  it('pads gallery card images for TemplateDetail', () => {
    expect(MARQUEE_GIFS).toHaveLength(DETAIL_CARD_IMAGE_COUNT);
  });
});
