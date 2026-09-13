import { ROUTES } from '../../../../config';
import { TEMPLATES as KMOTION_TEMPLATE_IDS, embedUrl } from '../../../../../packages/kmotion/src/core';
import {
  getKmotionNpmSnippet,
  KMOTION_PACKAGE,
  KMOTION_STACKS,
} from '../../../../utils/kmotionNpmSnippet';
import {
  BRAND_NAME,
  CARD_ID,
  CARD_TITLE,
  CAPABILITIES,
  DETAIL_CARD_IMAGE_COUNT,
  H1_LINE_ONE,
  H2_LINE_ONE,
  HERO_BADGE,
  MITHA_ALT,
  NAV_CTA_LABEL,
  NAV_LINKS,
  PAGE_TITLE,
  PRIMARY_CTA,
  S2_BADGE,
  SERVICES,
} from '../constants';
import {
  HERO_POSTER_LOCAL,
  HERO_VIDEO,
  HERO_VIDEO_LOCAL,
  MARQUEE_GIFS,
  MITHA_PORTRAIT,
} from '../content';
import { meta } from '../meta';
import { NOVA_PROMPT } from '../prompt';

describe('Intelligent Operations meta', () => {
  it('registers the Agency card Intelligent Operations', () => {
    expect(meta.id).toBe(CARD_ID);
    expect(meta.title).toBe(CARD_TITLE);
    expect(meta.title).toBe('Intelligent Operations');
    expect(meta.category).toBe('Agency');
    expect(meta.height).toBe('h-[272px]');
  });

  it('binds copy prompt to the exact pasted body', () => {
    expect(meta.fullPrompt).toBe(NOVA_PROMPT);
    expect(NOVA_PROMPT).toHaveLength(10447);
    expect(NOVA_PROMPT.startsWith('# Exact recreation prompt — NovaAI landing page')).toBe(true);
    expect(NOVA_PROMPT.endsWith('Visual match to current NovaAI page at `localhost:5199`.')).toBe(true);
    expect(NOVA_PROMPT).toContain(HERO_VIDEO);
    expect(NOVA_PROMPT).toContain(MITHA_PORTRAIT);
    expect(NOVA_PROMPT).toContain(PAGE_TITLE);
    expect(NOVA_PROMPT).toContain(BRAND_NAME);
    expect(NOVA_PROMPT).not.toContain('/images/Assets Intelligent Operations');
    expect(NOVA_PROMPT).not.toContain('webpack');
    expect(NOVA_PROMPT).not.toContain('intelligent-operations');
    expect(NOVA_PROMPT).not.toContain('Kmotion');
  });

  it('uses intelligent-operations routes', () => {
    expect(meta.detailPath).toBe('/templates/intelligent-operations');
    expect(meta.livePath).toBe(ROUTES.INTELLIGENT_OPERATIONS);
  });

  it('copies the npm preview snippet for this card id', () => {
    KMOTION_STACKS.forEach(({ id: stack }) => {
      const snippet = getKmotionNpmSnippet(meta.id, stack);
      expect(snippet).toContain(`npm install ${KMOTION_PACKAGE}`);
      expect(snippet).toContain(meta.id);
    });
    expect(getKmotionNpmSnippet(meta.id, 'react')).toBe(
      [
        `npm install ${KMOTION_PACKAGE}`,
        '',
        `import { Preview } from "${KMOTION_PACKAGE}/react";`,
        '',
        `<Preview id="${meta.id}" />`,
      ].join('\n'),
    );
    expect(KMOTION_TEMPLATE_IDS).toContain(meta.id);
    expect(embedUrl(meta.id)).toBe(`http://localhost:5173/p/${meta.id}`);
    expect(embedUrl(meta.id)).not.toContain('embed=1');
  });
});

describe('Intelligent Operations content', () => {
  it('keeps CloudFront as source of record and local paths for playback', () => {
    expect(HERO_VIDEO).toContain('hf_20260729_102822');
    expect(HERO_VIDEO_LOCAL).toBe('/images/Assets Intelligent Operations/hero.mp4');
    expect(HERO_POSTER_LOCAL).toBe('/images/Assets Intelligent Operations/hero-poster.jpg');
    expect(MITHA_PORTRAIT).toContain('images.higgs.ai');
  });

  it('keeps exact NovaAI copy', () => {
    expect(BRAND_NAME).toBe('novaai');
    expect(NAV_CTA_LABEL).toBe('Get Free Consultation');
    expect(NAV_LINKS.map((link) => link.label)).toEqual(['Projects', 'About', 'Blog', 'Contact']);
    expect(SERVICES).toEqual([
      '/ AI AUTOMATION',
      '/ AI INTEGRATION',
      '/ AI AGENT DEVELOPMENT',
    ]);
    expect(HERO_BADGE).toBe('We Automate 100+ Businesses');
    expect(H1_LINE_ONE).toBe('Clear. Precise.');
    expect(S2_BADGE).toBe('Insight On Demand');
    expect(H2_LINE_ONE).toBe('Learn to see');
    expect(PRIMARY_CTA).toBe('Run the demo');
    expect(MITHA_ALT).toBe('Mitha, co-founder of NovaAI');
    expect(CAPABILITIES).toHaveLength(3);
    expect(CAPABILITIES[0].title).toBe('Real-time vision');
  });

  it('pads gallery card images for TemplateDetail', () => {
    expect(MARQUEE_GIFS).toHaveLength(DETAIL_CARD_IMAGE_COUNT);
  });
});
