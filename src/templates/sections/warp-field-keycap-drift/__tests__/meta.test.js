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
  SOURCE_REVISION,
  THREEUI_CSS_SHA256,
  WARP_FIELD_COMPONENT_SHA256,
  WARP_FIELD_KEYCAP_DRIFT_PROPS,
  WARP_FIELD_RENDERER_SHA256,
  WARP_FIELD_VARIANT,
} from '../constants';
import { meta } from '../meta';
import { WARP_FIELD_KEYCAP_DRIFT_PROMPT } from '../prompt';

describe('Keycap Drift Warp Field — meta', () => {
  it('registers the Sections card Keycap Drift Warp Field', () => {
    expect(meta.id).toBe(CARD_ID);
    expect(meta.title).toBe(CARD_TITLE);
    expect(meta.title).toBe('Keycap Drift Warp Field');
    expect(meta.category).toBe('Sections');
    expect(meta.categorySlug).toBe('sections');
    expect(meta.height).toBe('h-[272px]');
  });

  it('keeps Sections on the gallery navbar tabs', () => {
    expect(CATEGORIES).toContain('Sections');
    expect(CATEGORY_SLUGS.Sections).toBe('sections');
    expect(ACTIVE_TEMPLATE_CATEGORIES).toContain('Sections');
  });

  it('binds copy prompt to the exact pasted body', () => {
    expect(meta.fullPrompt).toBe(WARP_FIELD_KEYCAP_DRIFT_PROMPT);
    expect(WARP_FIELD_KEYCAP_DRIFT_PROMPT.startsWith('# Integrate <WarpFieldBackground />')).toBe(
      true,
    );
    expect(WARP_FIELD_KEYCAP_DRIFT_PROMPT).toContain('SHA-256 bd7c486164d8');
    expect(WARP_FIELD_KEYCAP_DRIFT_PROMPT).toContain('variant="keycaps"');
    expect(WARP_FIELD_KEYCAP_DRIFT_PROMPT).toContain('Keycap Drift');
    expect(WARP_FIELD_KEYCAP_DRIFT_PROMPT).toContain(
      'https://threeui.com/source-code/warp-field.json',
    );
    expect(WARP_FIELD_KEYCAP_DRIFT_PROMPT).not.toContain('Role & Prerequisites');
    expect(WARP_FIELD_KEYCAP_DRIFT_PROMPT).not.toContain('Test-Driven Development');
    expect(meta.fullPrompt.length).toBe(WARP_FIELD_KEYCAP_DRIFT_PROMPT.length);
  });

  it('uses warp-field-keycap-drift routes', () => {
    expect(meta.detailPath).toBe('/templates/warp-field-keycap-drift');
    expect(meta.livePath).toBe(ROUTES.WARP_FIELD_KEYCAP_DRIFT);
    expect(ROUTES.WARP_FIELD_KEYCAP_DRIFT).toBe('/p/warp-field-keycap-drift');
  });

  it('copies the npm preview snippet for this card id', () => {
    const snippet = getKmotionNpmSnippet(meta.id, 'react');
    expect(snippet).toContain(`npm install ${KMOTION_PACKAGE}`);
    expect(snippet).toContain(`<Preview id="${meta.id}" />`);
    expect(KMOTION_TEMPLATE_IDS).toContain(meta.id);
    expect(embedUrl(meta.id)).toBe(`http://localhost:5173/p/${meta.id}`);
  });
});

describe('Keycap Drift Warp Field source contract', () => {
  it('keeps the configured keycaps variant host defaults', () => {
    expect(SOURCE_REVISION).toBe('bd7c486164d8');
    expect(WARP_FIELD_VARIANT).toBe('keycaps');
    expect(WARP_FIELD_KEYCAP_DRIFT_PROPS).toEqual({
      variant: 'keycaps',
      speed: 15,
      streakOpacity: 0.6,
      tileOpacity: 0.9,
      fov: 75,
      hue: 0,
      saturation: 1,
      brightness: 1,
    });
    expect(WARP_FIELD_COMPONENT_SHA256).toBe(
      'c78637ee3419deed6c364f4252ed77adfda3a215eb1b82510450a9b7fadefcbe',
    );
    expect(WARP_FIELD_RENDERER_SHA256).toBe(
      'c9872c53dd505dea2d87c79e34b9eedd358b5dc32b385d48280fe252f595a44e',
    );
    expect(THREEUI_CSS_SHA256).toBe(
      'efe4447139f1358dd8e9be68edf6fa46cbefbd1de423a4d6c439ca61d2c8eccf',
    );
  });

  it('lists every required packaged asset for hash checks', () => {
    expect(ASSET_MANIFEST).toHaveLength(4);
    expect(ASSET_MANIFEST.every((entry) => entry.path && entry.bytes && entry.sha256)).toBe(
      true,
    );
  });
});
