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
  CONSTELLATION_FIELD_DEFAULT_PROPS,
  CONSTELLATION_FIELD_HTML_SHA256,
  PREVIEW_STILL,
  SOURCE_REVISION,
  SOURCE_URL,
  VARIANT_ID,
} from '../constants';
import { meta } from '../meta';
import { CONSTELLATION_FIELD_PROMPT } from '../prompt';
import { CONSTELLATION_FIELD_DEFAULTS } from '../ConstellationField';

describe('Constellation Field Default Variant — meta', () => {
  it('registers the Background card Constellation Field Default Variant', () => {
    expect(meta.id).toBe(CARD_ID);
    expect(meta.title).toBe(CARD_TITLE);
    expect(meta.title).toBe('Constellation Field Default Variant');
    expect(meta.category).toBe('Background');
    expect(meta.categorySlug).toBe('background');
    expect(meta.height).toBe('h-[272px]');
  });

  it('keeps Background on the gallery navbar tabs', () => {
    expect(CATEGORIES).toContain('Background');
    expect(CATEGORY_SLUGS.Background).toBe('background');
    expect(ACTIVE_TEMPLATE_CATEGORIES).toContain('Background');
  });

  it('binds previewImage to a public still path', () => {
    expect(meta.previewImage).toBe(PREVIEW_STILL);
    expect(meta.previewGif).toBe(PREVIEW_STILL);
    expect(PREVIEW_STILL).toBe(
      '/images/Assets%20Constellation%20Field%20Default%20Variant/ConstellationFieldDefaultVariant.png',
    );
  });

  it('binds copy prompt to the exact pasted body', () => {
    expect(meta.fullPrompt).toBe(CONSTELLATION_FIELD_PROMPT);
    expect(CONSTELLATION_FIELD_PROMPT.startsWith('# Integrate <ConstellationField />')).toBe(true);
    expect(CONSTELLATION_FIELD_PROMPT).toContain('SHA-256 1920ad4fe34f');
    expect(CONSTELLATION_FIELD_PROMPT).toContain('@designcodeio/threeui');
    expect(CONSTELLATION_FIELD_PROMPT).toContain('mode="dark"');
    expect(CONSTELLATION_FIELD_PROMPT).toContain('strokeWidth={1.00}');
    expect(CONSTELLATION_FIELD_PROMPT).toContain(
      'https://threeui.com/source-code/constellation-field.json',
    );
    expect(CONSTELLATION_FIELD_PROMPT).not.toContain('Role & Prerequisites');
    expect(CONSTELLATION_FIELD_PROMPT).not.toContain('Test-Driven Development');
    expect(meta.fullPrompt.length).toBe(CONSTELLATION_FIELD_PROMPT.length);
  });

  it('uses constellation-field routes', () => {
    expect(meta.detailPath).toBe('/templates/constellation-field');
    expect(meta.livePath).toBe(ROUTES.CONSTELLATION_FIELD);
    expect(ROUTES.CONSTELLATION_FIELD).toBe('/p/constellation-field');
  });

  it('copies the npm preview snippet for this card id', () => {
    const snippet = getKmotionNpmSnippet(meta.id, 'react');
    expect(snippet).toContain(`npm install ${KMOTION_PACKAGE}`);
    expect(snippet).toContain(`<Preview id="${meta.id}" />`);
    expect(KMOTION_TEMPLATE_IDS).toContain(meta.id);
    expect(embedUrl(meta.id)).toBe(`http://localhost:5173/p/${meta.id}`);
  });
});

describe('Constellation Field source contract', () => {
  it('keeps the configured constellation-field host defaults', () => {
    expect(SOURCE_REVISION).toBe('1920ad4fe34f');
    expect(VARIANT_ID).toBe('constellation-field');
    expect(SOURCE_URL).toBe('/effects/constellation-field.html');
    expect(CONSTELLATION_FIELD_DEFAULT_PROPS).toEqual(CONSTELLATION_FIELD_DEFAULTS);
    expect(CONSTELLATION_FIELD_HTML_SHA256).toBe(
      '1920ad4fe34f2ed2348e3a52110c37b4969bc45d71ff29f2738cb4542ad9f610',
    );
  });

  it('lists every required packaged asset for hash checks', () => {
    expect(ASSET_MANIFEST).toHaveLength(12);
    expect(ASSET_MANIFEST.every((entry) => entry.path && entry.bytes && entry.sha256)).toBe(true);
  });
});
