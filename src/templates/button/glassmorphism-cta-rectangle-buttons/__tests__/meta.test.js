import { ROUTES } from '../../../../config';
import { TEMPLATES as KMOTION_TEMPLATE_IDS, embedUrl } from '../../../../../packages/kmotion/src/core';
import { getKmotionNpmSnippet, KMOTION_PACKAGE } from '../../../../utils/kmotionNpmSnippet';
import {
  ACTIVE_TEMPLATE_CATEGORIES,
  CATEGORIES,
  CATEGORY_SLUGS,
} from '../../../../templates';
import {
  ASSET_MANIFEST,
  CARD_ID,
  CARD_TITLE,
  GLASSMORPHISM_CTA_DEFAULT_PROPS,
  GLASSMORPHISM_CTA_HTML_SHA256,
  NEUFORM_ISOLATED_EFFECTS_SHA256,
  PREVIEW_STILL,
  SOURCE_REVISION,
  VARIANT_ID,
} from '../constants';
import { meta } from '../meta';
import { GLASSMORPHISM_CTA_RECTANGLE_BUTTONS_PROMPT } from '../prompt';
import { RECTANGLE_BUTTONS_DEFAULTS } from '../RectangleButtons';

describe('Glassmorphism CTA Rectangle Buttons — meta', () => {
  it('registers the Button card Glassmorphism CTA Rectangle Buttons', () => {
    expect(meta.id).toBe(CARD_ID);
    expect(meta.title).toBe(CARD_TITLE);
    expect(meta.title).toBe('Glassmorphism CTA Rectangle Buttons');
    expect(meta.category).toBe('Button');
    expect(meta.categorySlug).toBe('button');
    expect(meta.height).toBe('h-[272px]');
  });

  it('keeps Button on the gallery navbar tabs', () => {
    expect(CATEGORIES).toContain('Button');
    expect(CATEGORY_SLUGS.Button).toBe('button');
    expect(ACTIVE_TEMPLATE_CATEGORIES).toContain('Button');
  });

  it('binds previewImage to a public still path', () => {
    expect(meta.previewImage).toBe(PREVIEW_STILL);
    expect(meta.previewGif).toBe(PREVIEW_STILL);
    expect(PREVIEW_STILL).toBe(
      '/images/Assets%20Glassmorphism%20CTA%20Rectangle%20Buttons/GlassmorphismCTARectangleButtons.png',
    );
  });

  it('binds copy prompt to the exact pasted body', () => {
    expect(meta.fullPrompt).toBe(GLASSMORPHISM_CTA_RECTANGLE_BUTTONS_PROMPT);
    expect(
      GLASSMORPHISM_CTA_RECTANGLE_BUTTONS_PROMPT.startsWith('# Integrate <RectangleButtons />'),
    ).toBe(true);
    expect(GLASSMORPHISM_CTA_RECTANGLE_BUTTONS_PROMPT).toContain('SHA-256 ff30e28c2781');
    expect(GLASSMORPHISM_CTA_RECTANGLE_BUTTONS_PROMPT).toContain('@designcodeio/threeui');
    expect(GLASSMORPHISM_CTA_RECTANGLE_BUTTONS_PROMPT).toContain('Glassmorphism CTA');
    expect(GLASSMORPHISM_CTA_RECTANGLE_BUTTONS_PROMPT).toContain('glassmorphism-cta');
    expect(GLASSMORPHISM_CTA_RECTANGLE_BUTTONS_PROMPT).toContain(
      'https://threeui.com/source-code/glassmorphism-cta.json',
    );
    expect(GLASSMORPHISM_CTA_RECTANGLE_BUTTONS_PROMPT).not.toContain('Role & Prerequisites');
    expect(GLASSMORPHISM_CTA_RECTANGLE_BUTTONS_PROMPT).not.toContain('Test-Driven Development');
    expect(meta.fullPrompt.length).toBe(GLASSMORPHISM_CTA_RECTANGLE_BUTTONS_PROMPT.length);
  });

  it('uses glassmorphism-cta-rectangle-buttons routes', () => {
    expect(meta.detailPath).toBe('/templates/glassmorphism-cta-rectangle-buttons');
    expect(meta.livePath).toBe(ROUTES.GLASSMORPHISM_CTA_RECTANGLE_BUTTONS);
    expect(ROUTES.GLASSMORPHISM_CTA_RECTANGLE_BUTTONS).toBe(
      '/p/glassmorphism-cta-rectangle-buttons',
    );
  });

  it('copies the npm preview snippet for this card id', () => {
    const snippet = getKmotionNpmSnippet(meta.id, 'react');
    expect(snippet).toContain(`npm install ${KMOTION_PACKAGE}`);
    expect(snippet).toContain(`<Preview id="${meta.id}" />`);
    expect(KMOTION_TEMPLATE_IDS).toContain(meta.id);
    expect(embedUrl(meta.id)).toBe(`http://localhost:5173/p/${meta.id}`);
  });
});

describe('Glassmorphism CTA source contract', () => {
  it('keeps the configured glassmorphism-cta host defaults', () => {
    expect(SOURCE_REVISION).toBe('ff30e28c2781');
    expect(VARIANT_ID).toBe('glassmorphism-cta');
    expect(GLASSMORPHISM_CTA_DEFAULT_PROPS).toEqual(RECTANGLE_BUTTONS_DEFAULTS);
    expect(NEUFORM_ISOLATED_EFFECTS_SHA256).toBe(
      'fe9856234253bc3c1a13b3afb84f3d84644dfa6d578e7203bb3e1dd5eced1b75',
    );
    expect(GLASSMORPHISM_CTA_HTML_SHA256).toBe(
      'b535a5f6e778924906fa1625cf610841b847d52c17487dad83215dd5921a3863',
    );
  });

  it('lists packaged assets for hash checks', () => {
    expect(ASSET_MANIFEST).toHaveLength(4);
    expect(ASSET_MANIFEST.every((entry) => entry.path && entry.bytes && entry.sha256)).toBe(true);
  });
});
