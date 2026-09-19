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
  ATMOSPHERIC_BLADE_DEFAULT_PROPS,
  CARD_ID,
  CARD_TITLE,
  LASER_SHADERS_SHA256,
  PREVIEW_STILL,
  SOURCE_REVISION,
  VARIANT_ID,
} from '../constants';
import { meta } from '../meta';
import { ATMOSPHERIC_BLADE_LASER_PROMPT } from '../prompt';
import { LASER_COLLECTION_DEFAULTS } from '../LaserCollection';

describe('Atmospheric Blade Laser — meta', () => {
  it('registers the Background card Atmospheric Blade Laser', () => {
    expect(meta.id).toBe(CARD_ID);
    expect(meta.title).toBe(CARD_TITLE);
    expect(meta.title).toBe('Atmospheric Blade Laser');
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
      '/images/Assets%20Atmospheric%20Blade%20Laser/AtmosphericBladeLaser.png',
    );
  });

  it('binds copy prompt to the exact pasted body', () => {
    expect(meta.fullPrompt).toBe(ATMOSPHERIC_BLADE_LASER_PROMPT);
    expect(ATMOSPHERIC_BLADE_LASER_PROMPT.startsWith('# Integrate <LaserCollection />')).toBe(
      true,
    );
    expect(ATMOSPHERIC_BLADE_LASER_PROMPT).toContain('SHA-256 70cc015d5175');
    expect(ATMOSPHERIC_BLADE_LASER_PROMPT).toContain('@designcodeio/threeui');
    expect(ATMOSPHERIC_BLADE_LASER_PROMPT).toContain('Atmospheric Blade');
    expect(ATMOSPHERIC_BLADE_LASER_PROMPT).toContain('variant="atmospheric-blade"');
    expect(ATMOSPHERIC_BLADE_LASER_PROMPT).toContain(
      'https://threeui.com/source-code/matrix-field.json',
    );
    expect(ATMOSPHERIC_BLADE_LASER_PROMPT).not.toContain('Role & Prerequisites');
    expect(ATMOSPHERIC_BLADE_LASER_PROMPT).not.toContain('Test-Driven Development');
    expect(meta.fullPrompt.length).toBe(ATMOSPHERIC_BLADE_LASER_PROMPT.length);
  });

  it('uses atmospheric-blade-laser routes', () => {
    expect(meta.detailPath).toBe('/templates/atmospheric-blade-laser');
    expect(meta.livePath).toBe(ROUTES.ATMOSPHERIC_BLADE_LASER);
    expect(ROUTES.ATMOSPHERIC_BLADE_LASER).toBe('/p/atmospheric-blade-laser');
  });

  it('copies the npm preview snippet for this card id', () => {
    const snippet = getKmotionNpmSnippet(meta.id, 'react');
    expect(snippet).toContain(`npm install ${KMOTION_PACKAGE}`);
    expect(snippet).toContain(`<Preview id="${meta.id}" />`);
    expect(KMOTION_TEMPLATE_IDS).toContain(meta.id);
    expect(embedUrl(meta.id)).toBe(`http://localhost:5173/p/${meta.id}`);
  });
});

describe('Atmospheric Blade source contract', () => {
  it('keeps the configured atmospheric-blade host defaults', () => {
    expect(SOURCE_REVISION).toBe('70cc015d5175');
    expect(VARIANT_ID).toBe('atmospheric-blade');
    expect(ATMOSPHERIC_BLADE_DEFAULT_PROPS).toEqual(LASER_COLLECTION_DEFAULTS);
    expect(LASER_SHADERS_SHA256).toBe(
      '91248e937612f2d11b8dde4716d3546e47cd192ad36ebc76e1860f728285f967',
    );
  });

  it('lists every required packaged asset for hash checks', () => {
    expect(ASSET_MANIFEST).toHaveLength(6);
    expect(ASSET_MANIFEST.every((entry) => entry.path && entry.bytes && entry.sha256)).toBe(true);
  });
});
