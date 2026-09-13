import { ROUTES } from '../../../../config';
import { getKmotionNpmSnippet, KMOTION_PACKAGE } from '../../../../utils/kmotionNpmSnippet';
import {
  BADGE_LABEL,
  BRAND_NAME,
  CTA_LABEL,
  DETAIL_CARD_IMAGE_COUNT,
  HEADING_LINE_ONE,
  NAV_LINKS,
  PAGE_TITLE,
  STATS,
  VIDEO_LABELS,
} from '../constants';
import { HERO_VIDEO, HERO_VIDEO_LOCAL, MARQUEE_GIFS, OVERLAY_PNG, VIDEO_URLS } from '../content';
import { meta } from '../meta';
import { STILLMIND_PROMPT } from '../prompt';

describe('Stillmind meta', () => {
  it('registers Hero card Stillmind', () => {
    expect(meta.id).toBe('stillmind');
    expect(meta.title).toBe(PAGE_TITLE);
    expect(meta.category).toBe('Hero');
    expect(meta.height).toBe('h-[272px]');
  });

  it('binds copy prompt to the exact pasted body', () => {
    expect(meta.fullPrompt).toBe(STILLMIND_PROMPT);
    expect(STILLMIND_PROMPT.startsWith('Create a fullscreen cinematic hero')).toBe(true);
    VIDEO_URLS.forEach((url) => expect(STILLMIND_PROMPT).toContain(url));
    expect(STILLMIND_PROMPT).toContain(OVERLAY_PNG);
    expect(STILLMIND_PROMPT).toContain(BRAND_NAME);
    expect(STILLMIND_PROMPT).not.toContain('/images/Assets Stillmind');
  });

  it('uses stillmind routes', () => {
    expect(meta.detailPath).toBe('/templates/stillmind');
    expect(meta.livePath).toBe(ROUTES.STILLMIND);
  });

  it('copies the npm preview snippet for this card id', () => {
    const snippet = getKmotionNpmSnippet(meta.id, 'react');
    expect(snippet).toContain(`npm install ${KMOTION_PACKAGE}`);
    expect(snippet).toContain(`<Preview id="${meta.id}" />`);
  });
});

describe('Stillmind content', () => {
  it('keeps CloudFront as source of record and local paths for playback', () => {
    expect(HERO_VIDEO).toBe(VIDEO_URLS[0]);
    expect(HERO_VIDEO_LOCAL).toBe('/images/Assets Stillmind/golden-hour.mp4');
  });

  it('keeps exact Lumora copy, labels, and stats', () => {
    expect(BRAND_NAME).toBe('Lumora');
    expect(CTA_LABEL).toBe('Get Started');
    expect(BADGE_LABEL).toContain('10,000 minds');
    expect(HEADING_LINE_ONE).toBe('Clarity in an Endlessly');
    expect(NAV_LINKS.map((link) => link.label)).toEqual([
      'How It Works',
      'Features',
      'Pricing',
      'Community',
    ]);
    expect(VIDEO_LABELS).toEqual(['Golden Hour', 'Still Water', 'Deep Woods', 'Quiet Dawn']);
    expect(STATS).toHaveLength(4);
  });

  it('pads gallery card images for TemplateDetail', () => {
    expect(MARQUEE_GIFS).toHaveLength(DETAIL_CARD_IMAGE_COUNT);
  });
});
