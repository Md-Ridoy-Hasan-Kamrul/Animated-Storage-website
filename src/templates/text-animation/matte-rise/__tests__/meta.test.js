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
  MATTE_RISE_DEFAULT_PROPS,
  PREVIEW_STILL,
  SOURCE_REVISION,
  VARIANT_ID,
} from '../constants';
import { meta } from '../meta';
import { MATTE_RISE_PROMPT } from '../prompt';
import { GALLERY_HEADING_DEFAULTS } from '../GalleryHeading';

describe('Matte Rise — meta', () => {
  it('registers the Text Animation card Matte Rise', () => {
    expect(meta.id).toBe(CARD_ID);
    expect(meta.title).toBe(CARD_TITLE);
    expect(meta.title).toBe('Matte Rise');
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
    expect(PREVIEW_STILL).toBe('/images/Assets%20Matte%20Rise/MatteRise.png');
  });

  it('binds copy prompt to the exact pasted body', () => {
    expect(meta.fullPrompt).toBe(MATTE_RISE_PROMPT);
    expect(MATTE_RISE_PROMPT.startsWith('# Integrate <GalleryHeading />')).toBe(true);
    expect(MATTE_RISE_PROMPT).toContain('SHA-256 8e42d2d5b497');
    expect(MATTE_RISE_PROMPT).toContain('@designcodeio/threeui');
    expect(MATTE_RISE_PROMPT).toContain('Matte Rise');
    expect(MATTE_RISE_PROMPT).toContain('rising-diagonal');
    expect(MATTE_RISE_PROMPT).toContain('variant="rising-diagonal"');
    expect(MATTE_RISE_PROMPT).toContain(
      'https://threeui.com/source-code/gallery-heading.json',
    );
    expect(MATTE_RISE_PROMPT).not.toContain('Role & Prerequisites');
    expect(MATTE_RISE_PROMPT).not.toContain('Test-Driven Development');
    expect(meta.fullPrompt.length).toBe(MATTE_RISE_PROMPT.length);
  });

  it('uses matte-rise routes', () => {
    expect(meta.detailPath).toBe('/templates/matte-rise');
    expect(meta.livePath).toBe(ROUTES.MATTE_RISE);
    expect(ROUTES.MATTE_RISE).toBe('/p/matte-rise');
  });

  it('copies the npm preview snippet for this card id', () => {
    const snippet = getKmotionNpmSnippet(meta.id, 'react');
    expect(snippet).toContain(`npm install ${KMOTION_PACKAGE}`);
    expect(snippet).toContain(`<Preview id="${meta.id}" />`);
    expect(KMOTION_TEMPLATE_IDS).toContain(meta.id);
    expect(embedUrl(meta.id)).toBe(`http://localhost:5173/p/${meta.id}`);
  });
});

describe('Matte Rise source contract', () => {
  it('keeps the configured rising-diagonal host defaults', () => {
    expect(SOURCE_REVISION).toBe('8e42d2d5b497');
    expect(VARIANT_ID).toBe('rising-diagonal');
    expect(MATTE_RISE_DEFAULT_PROPS).toEqual(GALLERY_HEADING_DEFAULTS);
  });

  it('lists packaged assets for hash checks', () => {
    expect(ASSET_MANIFEST).toHaveLength(5);
    expect(ASSET_MANIFEST.every((entry) => entry.path && entry.bytes && entry.sha256)).toBe(true);
  });
});
