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
  LUMINA_WEAVERS_CLOTH_SHA256,
  SOURCE_REVISION,
  SOURCE_URL,
  THREEUI_CSS_SHA256,
} from '../constants';
import { meta } from '../meta';
import { WOVEN_CLOTH_PROMPT } from '../prompt';
import { resolvePaletteFilter } from '../utils/paletteFilter';

describe('Woven Cloth — meta', () => {
  it('registers the 3D Website card Woven Cloth', () => {
    expect(meta.id).toBe(CARD_ID);
    expect(meta.title).toBe(CARD_TITLE);
    expect(meta.title).toBe('Woven Cloth');
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
    expect(meta.fullPrompt).toBe(WOVEN_CLOTH_PROMPT);
    expect(WOVEN_CLOTH_PROMPT.startsWith('# Integrate <WovenCloth />')).toBe(true);
    expect(WOVEN_CLOTH_PROMPT).toContain('SHA-256 9bfd56ef7579');
    expect(WOVEN_CLOTH_PROMPT).toContain('@designcodeio/threeui');
    expect(WOVEN_CLOTH_PROMPT).toContain('<WovenCloth');
    expect(WOVEN_CLOTH_PROMPT).toContain('hue={0}');
    expect(WOVEN_CLOTH_PROMPT).toContain(
      'https://threeui.com/source-code/woven-cloth.json',
    );
    expect(WOVEN_CLOTH_PROMPT).not.toContain('Role & Prerequisites');
    expect(WOVEN_CLOTH_PROMPT).not.toContain('Test-Driven Development');
    expect(meta.fullPrompt.length).toBe(WOVEN_CLOTH_PROMPT.length);
  });

  it('uses woven-cloth routes', () => {
    expect(meta.detailPath).toBe('/templates/woven-cloth');
    expect(meta.livePath).toBe(ROUTES.WOVEN_CLOTH);
    expect(ROUTES.WOVEN_CLOTH).toBe('/p/woven-cloth');
  });

  it('copies the npm preview snippet for this card id', () => {
    const snippet = getKmotionNpmSnippet(meta.id, 'react');
    expect(snippet).toContain(`npm install ${KMOTION_PACKAGE}`);
    expect(snippet).toContain(`<Preview id="${meta.id}" />`);
    expect(KMOTION_TEMPLATE_IDS).toContain(meta.id);
    expect(embedUrl(meta.id)).toBe(`http://localhost:5173/p/${meta.id}`);
  });
});

describe('Woven Cloth source contract', () => {
  it('keeps the configured host defaults', () => {
    expect(SOURCE_URL).toBe('/effects/woven-cloth.html');
    expect(SOURCE_REVISION).toBe('9bfd56ef7579');
    expect(DEFAULT_HUE).toBe(0);
    expect(DEFAULT_SATURATION).toBe(1);
    expect(DEFAULT_BRIGHTNESS).toBe(1);
    expect(LUMINA_WEAVERS_CLOTH_SHA256).toBe(
      '9bfd56ef7579a92cb6385b3e93866bc3ff54fa4489a0febb9809b720e2946fb6',
    );
    expect(THREEUI_CSS_SHA256).toBe(
      'efe4447139f1358dd8e9be68edf6fa46cbefbd1de423a4d6c439ca61d2c8eccf',
    );
    expect(FOCUSED_DOCUMENT_SHA256).toBe(
      '5deffeac66e69efbd796020c5176bd15459f82da51bc88286992d4b019803ac6',
    );
  });

  it('lists every required packaged asset for hash checks', () => {
    expect(ASSET_MANIFEST).toHaveLength(8);
    expect(ASSET_MANIFEST.every((entry) => entry.path && entry.bytes && entry.sha256)).toBe(
      true,
    );
  });

  it('omits outer palette filter at source-exact defaults', () => {
    expect(resolvePaletteFilter(0, 1, 1)).toBeUndefined();
    expect(resolvePaletteFilter(12, 1.2, 0.9)).toBe(
      'hue-rotate(12deg) saturate(1.2) brightness(0.9)',
    );
  });
});
