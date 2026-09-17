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
  WOVEN_CLOTH_WASHI_SHA256,
} from '../constants';
import { meta } from '../meta';
import { WOVEN_CLOTH_WASHI_PROMPT } from '../prompt';
import { resolvePaletteFilter } from '../utils/paletteFilter';

describe('Washi Noren Woven Cloth — meta', () => {
  it('registers the 3D Website card Washi Noren Woven Cloth', () => {
    expect(meta.id).toBe(CARD_ID);
    expect(meta.title).toBe(CARD_TITLE);
    expect(meta.title).toBe('Washi Noren Woven Cloth');
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
    expect(meta.fullPrompt).toBe(WOVEN_CLOTH_WASHI_PROMPT);
    expect(WOVEN_CLOTH_WASHI_PROMPT.startsWith('# Integrate <WovenCloth />')).toBe(true);
    expect(WOVEN_CLOTH_WASHI_PROMPT).toContain('Variant: **Washi Noren**');
    expect(WOVEN_CLOTH_WASHI_PROMPT).toContain('variant="washi"');
    expect(WOVEN_CLOTH_WASHI_PROMPT).toContain('SHA-256 9bfd56ef7579');
    expect(WOVEN_CLOTH_WASHI_PROMPT).toContain('@designcodeio/threeui');
    expect(WOVEN_CLOTH_WASHI_PROMPT).toContain(
      'https://threeui.com/source-code/woven-cloth.json',
    );
    expect(WOVEN_CLOTH_WASHI_PROMPT).not.toContain('Role & Prerequisites');
    expect(WOVEN_CLOTH_WASHI_PROMPT).not.toContain('Test-Driven Development');
    expect(meta.fullPrompt.length).toBe(WOVEN_CLOTH_WASHI_PROMPT.length);
  });

  it('uses woven-cloth-washi routes', () => {
    expect(meta.detailPath).toBe('/templates/woven-cloth-washi');
    expect(meta.livePath).toBe(ROUTES.WOVEN_CLOTH_WASHI);
    expect(ROUTES.WOVEN_CLOTH_WASHI).toBe('/p/woven-cloth-washi');
  });

  it('copies the npm preview snippet for this card id', () => {
    const snippet = getKmotionNpmSnippet(meta.id, 'react');
    expect(snippet).toContain(`npm install ${KMOTION_PACKAGE}`);
    expect(snippet).toContain(`<Preview id="${meta.id}" />`);
    expect(KMOTION_TEMPLATE_IDS).toContain(meta.id);
    expect(embedUrl(meta.id)).toBe(`http://localhost:5173/p/${meta.id}`);
  });
});

describe('Washi Noren source contract', () => {
  it('keeps the configured companion host defaults', () => {
    expect(SOURCE_URL).toBe('/effects/woven-cloth-washi.html');
    expect(SOURCE_REVISION).toBe('9bfd56ef7579');
    expect(VARIANT_ID).toBe('washi');
    expect(DEFAULT_HUE).toBe(0);
    expect(DEFAULT_SATURATION).toBe(1);
    expect(DEFAULT_BRIGHTNESS).toBe(1);
    expect(WOVEN_CLOTH_WASHI_SHA256).toBe(
      '00e5971f139e5427e56a062c12d7e8e3590938b9a400753693b360d1e4d1a5c1',
    );
    expect(FOCUSED_DOCUMENT_SHA256).toBe(WOVEN_CLOTH_WASHI_SHA256);
  });

  it('lists every required packaged asset for hash checks', () => {
    expect(ASSET_MANIFEST).toHaveLength(8);
    expect(ASSET_MANIFEST.every((entry) => entry.path && entry.bytes && entry.sha256)).toBe(
      true,
    );
  });

  it('omits outer palette filter at source-exact defaults', () => {
    expect(resolvePaletteFilter(0, 1, 1)).toBeUndefined();
    expect(resolvePaletteFilter(4, 1.05, 0.9)).toBe(
      'hue-rotate(4deg) saturate(1.05) brightness(0.9)',
    );
  });
});
