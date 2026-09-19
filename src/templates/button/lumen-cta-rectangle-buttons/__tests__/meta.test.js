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
  LUMEN_CTA_DEFAULT_PROPS,
  LUMEN_CTA_SHA256,
  LUMEN_HTML_SHA256,
  PREVIEW_STILL,
  SOURCE_REVISION,
  VARIANT_ID,
} from '../constants';
import { meta } from '../meta';
import { LUMEN_CTA_RECTANGLE_BUTTONS_PROMPT } from '../prompt';
import { RECTANGLE_BUTTONS_DEFAULTS } from '../RectangleButtons';

describe('Lumen CTA Rectangle Buttons — meta', () => {
  it('registers the Button card Lumen CTA Rectangle Buttons', () => {
    expect(meta.id).toBe(CARD_ID);
    expect(meta.title).toBe(CARD_TITLE);
    expect(meta.title).toBe('Lumen CTA Rectangle Buttons');
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
      '/images/Assets%20Lumen%20CTA%20Rectangle%20Buttons/LumenCTARectangleButtons.png',
    );
  });

  it('binds copy prompt to the exact pasted body', () => {
    expect(meta.fullPrompt).toBe(LUMEN_CTA_RECTANGLE_BUTTONS_PROMPT);
    expect(LUMEN_CTA_RECTANGLE_BUTTONS_PROMPT.startsWith('# Integrate <RectangleButtons />')).toBe(
      true,
    );
    expect(LUMEN_CTA_RECTANGLE_BUTTONS_PROMPT).toContain('SHA-256 ff30e28c2781');
    expect(LUMEN_CTA_RECTANGLE_BUTTONS_PROMPT).toContain('@designcodeio/threeui');
    expect(LUMEN_CTA_RECTANGLE_BUTTONS_PROMPT).toContain('Lumen CTA');
    expect(LUMEN_CTA_RECTANGLE_BUTTONS_PROMPT).toContain('lumen-cta');
    expect(LUMEN_CTA_RECTANGLE_BUTTONS_PROMPT).toContain(
      'https://threeui.com/source-code/lumen-cta.json',
    );
    expect(LUMEN_CTA_RECTANGLE_BUTTONS_PROMPT).not.toContain('Role & Prerequisites');
    expect(LUMEN_CTA_RECTANGLE_BUTTONS_PROMPT).not.toContain('Test-Driven Development');
    expect(meta.fullPrompt.length).toBe(LUMEN_CTA_RECTANGLE_BUTTONS_PROMPT.length);
  });

  it('uses lumen-cta-rectangle-buttons routes', () => {
    expect(meta.detailPath).toBe('/templates/lumen-cta-rectangle-buttons');
    expect(meta.livePath).toBe(ROUTES.LUMEN_CTA_RECTANGLE_BUTTONS);
    expect(ROUTES.LUMEN_CTA_RECTANGLE_BUTTONS).toBe('/p/lumen-cta-rectangle-buttons');
  });

  it('copies the npm preview snippet for this card id', () => {
    const snippet = getKmotionNpmSnippet(meta.id, 'react');
    expect(snippet).toContain(`npm install ${KMOTION_PACKAGE}`);
    expect(snippet).toContain(`<Preview id="${meta.id}" />`);
    expect(KMOTION_TEMPLATE_IDS).toContain(meta.id);
    expect(embedUrl(meta.id)).toBe(`http://localhost:5173/p/${meta.id}`);
  });
});

describe('Lumen CTA source contract', () => {
  it('keeps the configured lumen-cta host defaults', () => {
    expect(SOURCE_REVISION).toBe('ff30e28c2781');
    expect(VARIANT_ID).toBe('lumen-cta');
    expect(LUMEN_CTA_DEFAULT_PROPS).toEqual(RECTANGLE_BUTTONS_DEFAULTS);
    expect(LUMEN_CTA_SHA256).toBe(
      '437b62c7b9b3009f1fc80fc24e81f2014c1bab9567ba1afcff314b72c6b0b519',
    );
    expect(LUMEN_HTML_SHA256).toBe(
      '8992e7c0ceb4c306502f5c296f1fd3e8c8602372d1a217fa1f3b5e49445ec28d',
    );
  });

  it('lists packaged assets for hash checks', () => {
    expect(ASSET_MANIFEST).toHaveLength(4);
    expect(ASSET_MANIFEST.every((entry) => entry.path && entry.bytes && entry.sha256)).toBe(true);
  });
});
