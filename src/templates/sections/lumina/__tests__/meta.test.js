import { meta } from '../meta';
import { LUMINA_PROMPT } from '../prompt';
import { ROUTES } from '../../../../config';
import { HERO_VIDEO, HERO_VIDEO_LOCAL, MARQUEE_GIFS } from '../content';
import {
  CURATOR_CREDIT,
  DETAIL_CARD_IMAGE_COUNT,
  FOOTER_DESCRIPTION,
  LINK_COLUMNS,
  SOCIAL_ICONS,
} from '../constants';

describe('Lumina meta', () => {
  it('registers Sections card Lumina', () => {
    expect(meta.id).toBe('lumina');
    expect(meta.title).toBe('Lumina');
    expect(meta.category).toBe('Sections');
    expect(meta.height).toBe('h-[272px]');
  });

  it('binds copy prompt to prompt.js export', () => {
    expect(meta.fullPrompt).toBe(LUMINA_PROMPT);
  });

  it('uses lumina routes', () => {
    expect(meta.detailPath).toBe('/templates/lumina');
    expect(meta.livePath).toBe(ROUTES.LUMINA);
  });
});

describe('Lumina content', () => {
  it('keeps CloudFront as source of record and local path for playback', () => {
    expect(HERO_VIDEO).toBe(
      'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260429_114316_1c7889ad-2885-410e-b493-98119fee0ddb.mp4',
    );
    expect(HERO_VIDEO_LOCAL).toBe('/images/Assets Lumina/hero.mp4');
  });

  it('keeps footer copy, link columns, and social icons', () => {
    expect(FOOTER_DESCRIPTION).toContain('cosmic wonders');
    expect(CURATOR_CREDIT).toBe('Curated by @GotInGeorgiG');
    expect(LINK_COLUMNS).toHaveLength(3);
    expect(LINK_COLUMNS[0].links).toHaveLength(5);
    expect(LINK_COLUMNS[1].title).toBe('The Mission');
    expect(LINK_COLUMNS[2].links).toContain('Report Concern');
    expect(SOCIAL_ICONS).toEqual([
      'Music2',
      'Facebook',
      'Twitter',
      'Youtube',
      'Instagram',
    ]);
  });

  it('copy prompt tells rebuilders to play the local hero.mp4', () => {
    expect(LUMINA_PROMPT).toContain('/images/Assets Lumina/hero.mp4');
    expect(LUMINA_PROMPT).toContain('liquid-glass');
  });

  it('pads gallery card images for TemplateDetail', () => {
    expect(MARQUEE_GIFS).toHaveLength(DETAIL_CARD_IMAGE_COUNT);
  });
});
