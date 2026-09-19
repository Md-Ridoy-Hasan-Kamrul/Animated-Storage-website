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
  MATRIX_FIELD_DEFAULT_PROPS,
  MATRIX_FIELD_HTML_SHA256,
  PREVIEW_STILL,
  SOURCE_REVISION,
  SOURCE_URL,
  VARIANT_ID,
} from '../constants';
import { meta } from '../meta';
import { MATRIX_JUNCTION_LASER_PROMPT } from '../prompt';
import { LASER_COLLECTION_DEFAULTS } from '../LaserCollection';

describe('Matrix Junction Laser — meta', () => {
  it('registers the Background card Matrix Junction Laser', () => {
    expect(meta.id).toBe(CARD_ID);
    expect(meta.title).toBe(CARD_TITLE);
    expect(meta.title).toBe('Matrix Junction Laser');
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
      '/images/Assets%20Matrix%20Junction%20Laser/MatrixJunctionLaser.png',
    );
  });

  it('binds copy prompt to the exact pasted body', () => {
    expect(meta.fullPrompt).toBe(MATRIX_JUNCTION_LASER_PROMPT);
    expect(MATRIX_JUNCTION_LASER_PROMPT.startsWith('# Integrate <LaserCollection />')).toBe(true);
    expect(MATRIX_JUNCTION_LASER_PROMPT).toContain('SHA-256 70cc015d5175');
    expect(MATRIX_JUNCTION_LASER_PROMPT).toContain('@designcodeio/threeui');
    expect(MATRIX_JUNCTION_LASER_PROMPT).toContain('Matrix Junction');
    expect(MATRIX_JUNCTION_LASER_PROMPT).toContain('matrix-field');
    expect(MATRIX_JUNCTION_LASER_PROMPT).toContain(
      'https://threeui.com/source-code/matrix-field.json',
    );
    expect(MATRIX_JUNCTION_LASER_PROMPT).not.toContain('Role & Prerequisites');
    expect(MATRIX_JUNCTION_LASER_PROMPT).not.toContain('Test-Driven Development');
    expect(meta.fullPrompt.length).toBe(MATRIX_JUNCTION_LASER_PROMPT.length);
  });

  it('uses matrix-junction-laser routes', () => {
    expect(meta.detailPath).toBe('/templates/matrix-junction-laser');
    expect(meta.livePath).toBe(ROUTES.MATRIX_JUNCTION_LASER);
    expect(ROUTES.MATRIX_JUNCTION_LASER).toBe('/p/matrix-junction-laser');
  });

  it('copies the npm preview snippet for this card id', () => {
    const snippet = getKmotionNpmSnippet(meta.id, 'react');
    expect(snippet).toContain(`npm install ${KMOTION_PACKAGE}`);
    expect(snippet).toContain(`<Preview id="${meta.id}" />`);
    expect(KMOTION_TEMPLATE_IDS).toContain(meta.id);
    expect(embedUrl(meta.id)).toBe(`http://localhost:5173/p/${meta.id}`);
  });
});

describe('Matrix Field source contract', () => {
  it('keeps the configured matrix-field host defaults', () => {
    expect(SOURCE_REVISION).toBe('70cc015d5175');
    expect(VARIANT_ID).toBe('matrix-field');
    expect(SOURCE_URL).toBe('/effects/matrix-field.html');
    expect(MATRIX_FIELD_DEFAULT_PROPS).toEqual(LASER_COLLECTION_DEFAULTS);
    expect(MATRIX_FIELD_HTML_SHA256).toBe(
      '7ee84b44ccad91f131563f34c633596a4c105512e8f0aa4303736f77681db835',
    );
  });

  it('lists every required packaged asset for hash checks', () => {
    expect(ASSET_MANIFEST).toHaveLength(7);
    expect(ASSET_MANIFEST.every((entry) => entry.path && entry.bytes && entry.sha256)).toBe(true);
  });
});
