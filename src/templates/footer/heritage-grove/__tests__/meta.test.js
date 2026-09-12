import { meta } from '../meta';
import { HERITAGE_GROVE_PROMPT } from '../prompt';
import { ROUTES } from '../../../../config';
import { HERO_POSTER, HERO_VIDEO, HERO_VIDEO_LOCAL, MARQUEE_GIFS } from '../content';
import {
  BRAND_BLURB,
  BRAND_NAME,
  CARE_LINKS,
  CONTACTS,
  DETAIL_CARD_IMAGE_COUNT,
  HERITAGE_LINKS,
  LEGAL_LINKS,
  SHOP_LINKS,
  SOCIAL_LINKS,
} from '../constants';

describe('Heritage Grove meta', () => {
  it('registers Footer card Heritage Grove', () => {
    expect(meta.id).toBe('heritage-grove');
    expect(meta.title).toBe('Heritage Grove');
    expect(meta.category).toBe('Footer');
    expect(meta.height).toBe('h-[272px]');
  });

  it('binds copy prompt to prompt.js export', () => {
    expect(meta.fullPrompt).toBe(HERITAGE_GROVE_PROMPT);
  });

  it('uses heritage-grove routes', () => {
    expect(meta.detailPath).toBe('/templates/heritage-grove');
    expect(meta.livePath).toBe(ROUTES.HERITAGE_GROVE);
  });
});

describe('Heritage Grove content', () => {
  it('keeps original CloudFront video and poster URLs in the copy prompt', () => {
    expect(HERO_VIDEO).toBe(
      'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260901_122529_931c22c8-8d2d-47c0-ad51-b97f56a91e42.mp4',
    );
    expect(HERO_POSTER).toBe(
      'https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/4f690bd1-881a-4192-82f2-d714d34c8fb9.png',
    );
    expect(HERITAGE_GROVE_PROMPT).toContain(HERO_VIDEO);
    expect(HERITAGE_GROVE_PROMPT).toContain(HERO_POSTER);
    expect(HERITAGE_GROVE_PROMPT).not.toContain('/images/Assets Heritage Grove/hero.mp4');
    expect(HERO_VIDEO_LOCAL).toBe('/images/Assets Heritage Grove/hero.mp4');
  });

  it('keeps exact footer copy', () => {
    expect(BRAND_NAME).toBe('Heritage Grove');
    expect(BRAND_BLURB).toContain('lasting imprint');
    expect(CONTACTS.map((c) => c.label)).toEqual([
      'care@heritage.com',
      '+91 00000 00000',
      'India',
    ]);
    expect(SHOP_LINKS).toHaveLength(6);
    expect(HERITAGE_LINKS).toContain('Our Craftwork');
    expect(CARE_LINKS).toContain("Where's My Order");
    expect(LEGAL_LINKS).toEqual(['Privacy Notice', 'Terms & Policies', 'Cookie Notice']);
    expect(SOCIAL_LINKS.map((s) => s.label)).toEqual([
      'Facebook',
      'Twitter',
      'Instagram',
      'LinkedIn',
    ]);
  });

  it('pads gallery card images for TemplateDetail', () => {
    expect(MARQUEE_GIFS).toHaveLength(DETAIL_CARD_IMAGE_COUNT);
  });
});
