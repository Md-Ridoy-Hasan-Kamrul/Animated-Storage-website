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
  PARTICLE_DRIFT_DEFAULT_PROPS,
  PARTICLE_DRIFT_HTML_SHA256,
  PREVIEW_STILL,
  SOURCE_REVISION,
  SOURCE_URL,
  VARIANT_ID,
} from '../constants';
import { meta } from '../meta';
import { PARTICLE_DRIFT_CONSTELLATION_FIELD_PROMPT } from '../prompt';
import { PARTICLE_DRIFT_DEFAULTS } from '../ConstellationField';

describe('Particle Drift Constellation Field — meta', () => {
  it('registers the Background card Particle Drift Constellation Field', () => {
    expect(meta.id).toBe(CARD_ID);
    expect(meta.title).toBe(CARD_TITLE);
    expect(meta.title).toBe('Particle Drift Constellation Field');
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
      '/images/Assets%20Particle%20Drift%20Constellation%20Field/ParticleDriftConstellationField.png',
    );
  });

  it('binds copy prompt to the exact pasted body', () => {
    expect(meta.fullPrompt).toBe(PARTICLE_DRIFT_CONSTELLATION_FIELD_PROMPT);
    expect(
      PARTICLE_DRIFT_CONSTELLATION_FIELD_PROMPT.startsWith(
        '# Integrate <ConstellationField />',
      ),
    ).toBe(true);
    expect(PARTICLE_DRIFT_CONSTELLATION_FIELD_PROMPT).toContain('SHA-256 1920ad4fe34f');
    expect(PARTICLE_DRIFT_CONSTELLATION_FIELD_PROMPT).toContain('@designcodeio/threeui');
    expect(PARTICLE_DRIFT_CONSTELLATION_FIELD_PROMPT).toContain('variant="particle-drift"');
    expect(PARTICLE_DRIFT_CONSTELLATION_FIELD_PROMPT).toContain('mode="dark"');
    expect(PARTICLE_DRIFT_CONSTELLATION_FIELD_PROMPT).toContain(
      'https://threeui.com/source-code/particle-drift.json',
    );
    expect(PARTICLE_DRIFT_CONSTELLATION_FIELD_PROMPT).not.toContain('Role & Prerequisites');
    expect(PARTICLE_DRIFT_CONSTELLATION_FIELD_PROMPT).not.toContain('Test-Driven Development');
    expect(meta.fullPrompt.length).toBe(PARTICLE_DRIFT_CONSTELLATION_FIELD_PROMPT.length);
  });

  it('uses particle-drift-constellation-field routes', () => {
    expect(meta.detailPath).toBe('/templates/particle-drift-constellation-field');
    expect(meta.livePath).toBe(ROUTES.PARTICLE_DRIFT_CONSTELLATION_FIELD);
    expect(ROUTES.PARTICLE_DRIFT_CONSTELLATION_FIELD).toBe(
      '/p/particle-drift-constellation-field',
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

describe('Particle Drift source contract', () => {
  it('keeps the configured particle-drift host defaults', () => {
    expect(SOURCE_REVISION).toBe('1920ad4fe34f');
    expect(VARIANT_ID).toBe('particle-drift');
    expect(SOURCE_URL).toBe('/effects/particle-drift.html');
    expect(PARTICLE_DRIFT_DEFAULT_PROPS).toEqual(PARTICLE_DRIFT_DEFAULTS);
    expect(PARTICLE_DRIFT_HTML_SHA256).toBe(
      '7fad6cc8c54c0385c472c2879762b3fd2bfb061820bf925034d7a58a0048eb27',
    );
  });

  it('lists every required packaged asset for hash checks', () => {
    expect(ASSET_MANIFEST).toHaveLength(4);
    expect(ASSET_MANIFEST.every((entry) => entry.path && entry.bytes && entry.sha256)).toBe(true);
  });
});
