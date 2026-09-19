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
  LASER_SHADERS_SHA256,
  PREVIEW_STILL,
  SOURCE_REVISION,
  VANISHING_ARRAY_DEFAULT_PROPS,
  VARIANT_ID,
  VARIANT_INDEX,
} from '../constants';
import { meta } from '../meta';
import { VANISHING_ARRAY_LASER_PROMPT } from '../prompt';
import { LASER_COLLECTION_DEFAULTS } from '../LaserCollection';

describe('Vanishing Array Laser — meta', () => {
  it('registers the Background card Vanishing Array Laser', () => {
    expect(meta.id).toBe(CARD_ID);
    expect(meta.title).toBe(CARD_TITLE);
    expect(meta.title).toBe('Vanishing Array Laser');
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
      '/images/Assets%20Vanishing%20Array%20Laser/VanishingArrayLaser.png',
    );
  });

  it('binds copy prompt to the exact pasted body', () => {
    expect(meta.fullPrompt).toBe(VANISHING_ARRAY_LASER_PROMPT);
    expect(VANISHING_ARRAY_LASER_PROMPT.startsWith('# Integrate <LaserCollection />')).toBe(true);
    expect(VANISHING_ARRAY_LASER_PROMPT).toContain('SHA-256 70cc015d5175');
    expect(VANISHING_ARRAY_LASER_PROMPT).toContain('@designcodeio/threeui');
    expect(VANISHING_ARRAY_LASER_PROMPT).toContain('Vanishing Array');
    expect(VANISHING_ARRAY_LASER_PROMPT).toContain('variant="vanishing-array"');
    expect(VANISHING_ARRAY_LASER_PROMPT).toContain(
      'https://threeui.com/source-code/matrix-field.json',
    );
    expect(VANISHING_ARRAY_LASER_PROMPT).not.toContain('Role & Prerequisites');
    expect(VANISHING_ARRAY_LASER_PROMPT).not.toContain('Test-Driven Development');
    expect(meta.fullPrompt.length).toBe(VANISHING_ARRAY_LASER_PROMPT.length);
  });

  it('uses vanishing-array-laser routes', () => {
    expect(meta.detailPath).toBe('/templates/vanishing-array-laser');
    expect(meta.livePath).toBe(ROUTES.VANISHING_ARRAY_LASER);
    expect(ROUTES.VANISHING_ARRAY_LASER).toBe('/p/vanishing-array-laser');
  });

  it('copies the npm preview snippet for this card id', () => {
    const snippet = getKmotionNpmSnippet(meta.id, 'react');
    expect(snippet).toContain(`npm install ${KMOTION_PACKAGE}`);
    expect(snippet).toContain(`<Preview id="${meta.id}" />`);
    expect(KMOTION_TEMPLATE_IDS).toContain(meta.id);
    expect(embedUrl(meta.id)).toBe(`http://localhost:5173/p/${meta.id}`);
  });
});

describe('Vanishing Array source contract', () => {
  it('keeps the configured vanishing-array host defaults', () => {
    expect(SOURCE_REVISION).toBe('70cc015d5175');
    expect(VARIANT_ID).toBe('vanishing-array');
    expect(VARIANT_INDEX).toBe(1);
    expect(VANISHING_ARRAY_DEFAULT_PROPS).toEqual(LASER_COLLECTION_DEFAULTS);
    expect(LASER_SHADERS_SHA256).toBe(
      '91248e937612f2d11b8dde4716d3546e47cd192ad36ebc76e1860f728285f967',
    );
  });

  it('lists every required packaged asset for hash checks', () => {
    expect(ASSET_MANIFEST).toHaveLength(6);
    expect(ASSET_MANIFEST.every((entry) => entry.path && entry.bytes && entry.sha256)).toBe(true);
  });
});
