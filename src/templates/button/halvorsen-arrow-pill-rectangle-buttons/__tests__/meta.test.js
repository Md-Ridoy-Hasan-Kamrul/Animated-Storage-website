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
  HALVORSEN_ARROW_PILL_DEFAULT_PROPS,
  PREVIEW_STILL,
  RECTANGLE_BUTTONS_SHA256,
  SOURCE_REVISION,
  VARIANT_ID,
} from '../constants';
import { meta } from '../meta';
import { HALVORSEN_ARROW_PILL_RECTANGLE_BUTTONS_PROMPT } from '../prompt';
import { RECTANGLE_BUTTONS_DEFAULTS } from '../RectangleButtons';

describe('Halvorsen Arrow Pill Rectangle Buttons — meta', () => {
  it('registers the Button card Halvorsen Arrow Pill Rectangle Buttons', () => {
    expect(meta.id).toBe(CARD_ID);
    expect(meta.title).toBe(CARD_TITLE);
    expect(meta.title).toBe('Halvorsen Arrow Pill Rectangle Buttons');
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
      '/images/Assets%20Halvorsen%20Arrow%20Pill%20Rectangle%20Buttons/HalvorsenArrowPillRectangleButtons.png',
    );
  });

  it('binds copy prompt to the exact pasted body', () => {
    expect(meta.fullPrompt).toBe(HALVORSEN_ARROW_PILL_RECTANGLE_BUTTONS_PROMPT);
    expect(
      HALVORSEN_ARROW_PILL_RECTANGLE_BUTTONS_PROMPT.startsWith('# Integrate <RectangleButtons />'),
    ).toBe(true);
    expect(HALVORSEN_ARROW_PILL_RECTANGLE_BUTTONS_PROMPT).toContain('SHA-256 ff30e28c2781');
    expect(HALVORSEN_ARROW_PILL_RECTANGLE_BUTTONS_PROMPT).toContain('@designcodeio/threeui');
    expect(HALVORSEN_ARROW_PILL_RECTANGLE_BUTTONS_PROMPT).toContain('Halvorsen Arrow Pill');
    expect(HALVORSEN_ARROW_PILL_RECTANGLE_BUTTONS_PROMPT).toContain('halvorsen-arrow-pill');
    expect(HALVORSEN_ARROW_PILL_RECTANGLE_BUTTONS_PROMPT).toContain(
      'https://threeui.com/source-code/rectangle-buttons.json',
    );
    expect(HALVORSEN_ARROW_PILL_RECTANGLE_BUTTONS_PROMPT).not.toContain('Role & Prerequisites');
    expect(HALVORSEN_ARROW_PILL_RECTANGLE_BUTTONS_PROMPT).not.toContain('Test-Driven Development');
    expect(meta.fullPrompt.length).toBe(HALVORSEN_ARROW_PILL_RECTANGLE_BUTTONS_PROMPT.length);
  });

  it('uses halvorsen-arrow-pill-rectangle-buttons routes', () => {
    expect(meta.detailPath).toBe('/templates/halvorsen-arrow-pill-rectangle-buttons');
    expect(meta.livePath).toBe(ROUTES.HALVORSEN_ARROW_PILL_RECTANGLE_BUTTONS);
    expect(ROUTES.HALVORSEN_ARROW_PILL_RECTANGLE_BUTTONS).toBe(
      '/p/halvorsen-arrow-pill-rectangle-buttons',
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

describe('Halvorsen Arrow Pill source contract', () => {
  it('keeps the configured halvorsen-arrow-pill host defaults', () => {
    expect(SOURCE_REVISION).toBe('ff30e28c2781');
    expect(VARIANT_ID).toBe('halvorsen-arrow-pill');
    expect(HALVORSEN_ARROW_PILL_DEFAULT_PROPS).toEqual(RECTANGLE_BUTTONS_DEFAULTS);
    expect(RECTANGLE_BUTTONS_SHA256).toBe(
      'ff30e28c278193a90f63c93aba77bc6c5c6a8a8f01ec8882392957851146f083',
    );
  });

  it('lists packaged assets for hash checks', () => {
    expect(ASSET_MANIFEST).toHaveLength(1);
    expect(ASSET_MANIFEST.every((entry) => entry.path && entry.bytes && entry.sha256)).toBe(true);
  });
});
