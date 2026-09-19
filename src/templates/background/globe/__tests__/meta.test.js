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
  ENERGY_ORB_SHADERS_SHA256,
  GLOBE_DEFAULT_PROPS,
  SOURCE_REVISION,
  VARIANT_ID,
} from '../constants';
import { meta } from '../meta';
import { GLOBE_PROMPT } from '../prompt';
import { ENERGY_ORB_DEFAULTS } from '../EnergyOrb';

describe('Globe — meta', () => {
  it('registers the Background card Globe', () => {
    expect(meta.id).toBe(CARD_ID);
    expect(meta.title).toBe(CARD_TITLE);
    expect(meta.title).toBe('Globe');
    expect(meta.category).toBe('Background');
    expect(meta.categorySlug).toBe('background');
    expect(meta.height).toBe('h-[272px]');
  });

  it('keeps Background on the gallery navbar tabs', () => {
    expect(CATEGORIES).toContain('Background');
    expect(CATEGORY_SLUGS.Background).toBe('background');
    expect(ACTIVE_TEMPLATE_CATEGORIES).toContain('Background');
  });

  it('binds copy prompt to the exact pasted body', () => {
    expect(meta.fullPrompt).toBe(GLOBE_PROMPT);
    expect(GLOBE_PROMPT.startsWith('# Integrate <GlobeCollection />')).toBe(true);
    expect(GLOBE_PROMPT).toContain('SHA-256 03b1b8e2c440 / 3de7fdcb6239 / 7a88f26e4d8');
    expect(GLOBE_PROMPT).toContain('@designcodeio/threeui');
    expect(GLOBE_PROMPT).toContain('variant="energy-orb"');
    expect(GLOBE_PROMPT).toContain('smokeStrength={1.00}');
    expect(GLOBE_PROMPT).toContain('starDensity={1.00}');
    expect(GLOBE_PROMPT).toContain('https://threeui.com/source-code/energy-orb.json');
    expect(GLOBE_PROMPT).not.toContain('Role & Prerequisites');
    expect(GLOBE_PROMPT).not.toContain('Test-Driven Development');
    expect(meta.fullPrompt.length).toBe(GLOBE_PROMPT.length);
  });

  it('uses globe routes', () => {
    expect(meta.detailPath).toBe('/templates/globe');
    expect(meta.livePath).toBe(ROUTES.GLOBE);
    expect(ROUTES.GLOBE).toBe('/p/globe');
  });

  it('copies the npm preview snippet for this card id', () => {
    const snippet = getKmotionNpmSnippet(meta.id, 'react');
    expect(snippet).toContain(`npm install ${KMOTION_PACKAGE}`);
    expect(snippet).toContain(`<Preview id="${meta.id}" />`);
    expect(KMOTION_TEMPLATE_IDS).toContain(meta.id);
    expect(embedUrl(meta.id)).toBe(`http://localhost:5173/p/${meta.id}`);
  });
});

describe('Globe source contract', () => {
  it('keeps the configured energy-orb host defaults', () => {
    expect(SOURCE_REVISION).toBe('03b1b8e2c440 / 3de7fdcb6239 / 7a88f26e4d8');
    expect(VARIANT_ID).toBe('energy-orb');
    expect(GLOBE_DEFAULT_PROPS.variant).toBe('energy-orb');
    const { variant: _variant, ...energyProps } = GLOBE_DEFAULT_PROPS;
    expect(energyProps).toEqual(ENERGY_ORB_DEFAULTS);
    expect(ENERGY_ORB_SHADERS_SHA256).toBe(
      '03b1b8e2c44042ac1e880003e55016a641329028205c62dcd17e535b99496aec',
    );
  });

  it('lists every required packaged asset for hash checks', () => {
    expect(ASSET_MANIFEST).toHaveLength(6);
    expect(ASSET_MANIFEST.every((entry) => entry.path && entry.bytes && entry.sha256)).toBe(true);
  });
});
