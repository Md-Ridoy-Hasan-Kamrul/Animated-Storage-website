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
  DEFAULT_BRIGHTNESS,
  DEFAULT_HUE,
  DEFAULT_SATURATION,
  FOCUSED_DOCUMENT_SHA256,
  SOURCE_REVISION,
  SOURCE_URL,
  VARIANT_ID,
  WOVEN_CLOTH_IRIDESCENT_SHA256,
} from '../constants';
import { meta } from '../meta';
import { WOVEN_CLOTH_IRIDESCENT_PROMPT } from '../prompt';
import { resolvePaletteFilter } from '../utils/paletteFilter';

describe('Iridescent Silk Woven Cloth — meta', () => {
  it('registers the 3D Website card Iridescent Silk Woven Cloth', () => {
    expect(meta.id).toBe(CARD_ID);
    expect(meta.title).toBe(CARD_TITLE);
    expect(meta.title).toBe('Iridescent Silk Woven Cloth');
    expect(meta.category).toBe('3d Website');
    expect(meta.categorySlug).toBe('3d-website');
    expect(meta.height).toBe('h-[272px]');
  });

  it('keeps 3d Website on the gallery navbar tabs', () => {
    expect(CATEGORIES).toContain('3d Website');
    expect(CATEGORY_SLUGS['3d Website']).toBe('3d-website');
    expect(ACTIVE_TEMPLATE_CATEGORIES).toContain('3d Website');
  });

  it('binds copy prompt to the exact pasted body', () => {
    expect(meta.fullPrompt).toBe(WOVEN_CLOTH_IRIDESCENT_PROMPT);
    expect(WOVEN_CLOTH_IRIDESCENT_PROMPT.startsWith('# Integrate <WovenCloth />')).toBe(true);
    expect(WOVEN_CLOTH_IRIDESCENT_PROMPT).toContain('Variant: **Iridescent Silk**');
    expect(WOVEN_CLOTH_IRIDESCENT_PROMPT).toContain('variant="iridescent"');
    expect(WOVEN_CLOTH_IRIDESCENT_PROMPT).toContain('SHA-256 9bfd56ef7579');
    expect(WOVEN_CLOTH_IRIDESCENT_PROMPT).toContain('@designcodeio/threeui');
    expect(WOVEN_CLOTH_IRIDESCENT_PROMPT).toContain(
      'https://threeui.com/source-code/woven-cloth.json',
    );
    expect(WOVEN_CLOTH_IRIDESCENT_PROMPT).not.toContain('Role & Prerequisites');
    expect(WOVEN_CLOTH_IRIDESCENT_PROMPT).not.toContain('Test-Driven Development');
    expect(meta.fullPrompt.length).toBe(WOVEN_CLOTH_IRIDESCENT_PROMPT.length);
  });

  it('uses woven-cloth-iridescent routes', () => {
    expect(meta.detailPath).toBe('/templates/woven-cloth-iridescent');
    expect(meta.livePath).toBe(ROUTES.WOVEN_CLOTH_IRIDESCENT);
    expect(ROUTES.WOVEN_CLOTH_IRIDESCENT).toBe('/p/woven-cloth-iridescent');
  });

  it('copies the npm preview snippet for this card id', () => {
    const snippet = getKmotionNpmSnippet(meta.id, 'react');
    expect(snippet).toContain(`npm install ${KMOTION_PACKAGE}`);
    expect(snippet).toContain(`<Preview id="${meta.id}" />`);
    expect(KMOTION_TEMPLATE_IDS).toContain(meta.id);
    expect(embedUrl(meta.id)).toBe(`http://localhost:5173/p/${meta.id}`);
  });
});

describe('Iridescent Silk source contract', () => {
  it('keeps the configured companion host defaults', () => {
    expect(SOURCE_URL).toBe('/effects/woven-cloth-iridescent.html');
    expect(SOURCE_REVISION).toBe('9bfd56ef7579');
    expect(VARIANT_ID).toBe('iridescent');
    expect(DEFAULT_HUE).toBe(0);
    expect(DEFAULT_SATURATION).toBe(1);
    expect(DEFAULT_BRIGHTNESS).toBe(1);
    expect(WOVEN_CLOTH_IRIDESCENT_SHA256).toBe(
      'e3b14adac39dfef04ed0bb0df99e86a1aa0aaf7cea4f8ecc4d5e0931b48bee7b',
    );
    expect(FOCUSED_DOCUMENT_SHA256).toBe(WOVEN_CLOTH_IRIDESCENT_SHA256);
  });

  it('lists every required packaged asset for hash checks', () => {
    expect(ASSET_MANIFEST).toHaveLength(8);
    expect(ASSET_MANIFEST.every((entry) => entry.path && entry.bytes && entry.sha256)).toBe(
      true,
    );
  });

  it('omits outer palette filter at source-exact defaults', () => {
    expect(resolvePaletteFilter(0, 1, 1)).toBeUndefined();
    expect(resolvePaletteFilter(8, 1.1, 0.95)).toBe(
      'hue-rotate(8deg) saturate(1.1) brightness(0.95)',
    );
  });
});
