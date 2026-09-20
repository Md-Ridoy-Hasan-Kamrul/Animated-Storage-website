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
  PREVIEW_STILL,
  HALFTONE_LOOP_DEFAULT_PROPS,
  SOURCE_REVISION,
  VARIANT_ID,
} from '../constants';
import { meta } from '../meta';
import { HALFTONE_LOOP_PROMPT } from '../prompt';
import { GALLERY_HEADING_DEFAULTS } from '../GalleryHeading';

describe('Halftone Loop — meta', () => {
  it('registers the Text Animation card Halftone Loop', () => {
    expect(meta.id).toBe(CARD_ID);
    expect(meta.title).toBe(CARD_TITLE);
    expect(meta.title).toBe('Halftone Loop');
    expect(meta.category).toBe('Text Animation');
    expect(meta.categorySlug).toBe('text-animation');
    expect(meta.height).toBe('h-[272px]');
  });

  it('keeps Text Animation on the gallery navbar tabs', () => {
    expect(CATEGORIES).toContain('Text Animation');
    expect(CATEGORY_SLUGS['Text Animation']).toBe('text-animation');
    expect(ACTIVE_TEMPLATE_CATEGORIES).toContain('Text Animation');
  });

  it('binds previewImage to a public still path', () => {
    expect(meta.previewImage).toBe(PREVIEW_STILL);
    expect(meta.previewGif).toBe(PREVIEW_STILL);
    expect(PREVIEW_STILL).toBe('/images/Assets%20Halftone%20Loop/HalftoneLoop.png');
  });

  it('binds copy prompt to the exact pasted body', () => {
    expect(meta.fullPrompt).toBe(HALFTONE_LOOP_PROMPT);
    expect(HALFTONE_LOOP_PROMPT.startsWith('# Integrate <GalleryHeading />')).toBe(true);
    expect(HALFTONE_LOOP_PROMPT).toContain('SHA-256 8e42d2d5b497');
    expect(HALFTONE_LOOP_PROMPT).toContain('@designcodeio/threeui');
    expect(HALFTONE_LOOP_PROMPT).toContain('Halftone Loop');
    expect(HALFTONE_LOOP_PROMPT).toContain('vertical-loop');
    expect(HALFTONE_LOOP_PROMPT).toContain('variant="vertical-loop"');
    expect(HALFTONE_LOOP_PROMPT).toContain(
      'https://threeui.com/source-code/gallery-heading.json',
    );
    expect(HALFTONE_LOOP_PROMPT).not.toContain('Role & Prerequisites');
    expect(HALFTONE_LOOP_PROMPT).not.toContain('Test-Driven Development');
    expect(meta.fullPrompt.length).toBe(HALFTONE_LOOP_PROMPT.length);
  });

  it('uses halftone-loop routes', () => {
    expect(meta.detailPath).toBe('/templates/halftone-loop');
    expect(meta.livePath).toBe(ROUTES.HALFTONE_LOOP);
    expect(ROUTES.HALFTONE_LOOP).toBe('/p/halftone-loop');
  });

  it('copies the npm preview snippet for this card id', () => {
    const snippet = getKmotionNpmSnippet(meta.id, 'react');
    expect(snippet).toContain(`npm install ${KMOTION_PACKAGE}`);
    expect(snippet).toContain(`<Preview id="${meta.id}" />`);
    expect(KMOTION_TEMPLATE_IDS).toContain(meta.id);
    expect(embedUrl(meta.id)).toBe(`http://localhost:5173/p/${meta.id}`);
  });
});

describe('Halftone Loop source contract', () => {
  it('keeps the configured vertical-loop host defaults', () => {
    expect(SOURCE_REVISION).toBe('8e42d2d5b497');
    expect(VARIANT_ID).toBe('vertical-loop');
    expect(HALFTONE_LOOP_DEFAULT_PROPS).toEqual(GALLERY_HEADING_DEFAULTS);
  });

  it('lists packaged assets for hash checks', () => {
    expect(ASSET_MANIFEST).toHaveLength(5);
    expect(ASSET_MANIFEST.every((entry) => entry.path && entry.bytes && entry.sha256)).toBe(true);
  });
});
