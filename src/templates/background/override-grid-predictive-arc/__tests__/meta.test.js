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
  DEFAULT_GAP,
  DEFAULT_MODE,
  DEFAULT_SIZE,
  DEFAULT_SPEED,
  FOCUSED_DOCUMENT_SHA256,
  OVERRIDE_GRID_HTML_SHA256,
  SOURCE_REVISION,
  SOURCE_URL,
  VARIANT_ID,
} from '../constants';
import { meta } from '../meta';
import { OVERRIDE_GRID_PREDICTIVE_ARC_PROMPT } from '../prompt';
import { resolvePaletteFilter } from '../utils/paletteFilter';

describe('Override Grid Predictive Arc — meta', () => {
  it('registers the Background card Override Grid Predictive Arc', () => {
    expect(meta.id).toBe(CARD_ID);
    expect(meta.title).toBe(CARD_TITLE);
    expect(meta.title).toBe('Override Grid Predictive Arc');
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
    expect(meta.fullPrompt).toBe(OVERRIDE_GRID_PREDICTIVE_ARC_PROMPT);
    expect(OVERRIDE_GRID_PREDICTIVE_ARC_PROMPT.startsWith('# Integrate <PredictiveArcCanvas />')).toBe(
      true,
    );
    expect(OVERRIDE_GRID_PREDICTIVE_ARC_PROMPT).toContain('Variant: **Override Grid**');
    expect(OVERRIDE_GRID_PREDICTIVE_ARC_PROMPT).toContain('variant="override-grid"');
    expect(OVERRIDE_GRID_PREDICTIVE_ARC_PROMPT).toContain('size={48}');
    expect(OVERRIDE_GRID_PREDICTIVE_ARC_PROMPT).toContain('SHA-256 fa86582fc870');
    expect(OVERRIDE_GRID_PREDICTIVE_ARC_PROMPT).toContain('@designcodeio/threeui');
    expect(OVERRIDE_GRID_PREDICTIVE_ARC_PROMPT).toContain(
      'https://threeui.com/source-code/predictive-arc.json',
    );
    expect(OVERRIDE_GRID_PREDICTIVE_ARC_PROMPT).not.toContain('Role & Prerequisites');
    expect(OVERRIDE_GRID_PREDICTIVE_ARC_PROMPT).not.toContain('Test-Driven Development');
    expect(meta.fullPrompt.length).toBe(OVERRIDE_GRID_PREDICTIVE_ARC_PROMPT.length);
  });

  it('uses override-grid-predictive-arc routes', () => {
    expect(meta.detailPath).toBe('/templates/override-grid-predictive-arc');
    expect(meta.livePath).toBe(ROUTES.OVERRIDE_GRID_PREDICTIVE_ARC);
    expect(ROUTES.OVERRIDE_GRID_PREDICTIVE_ARC).toBe('/p/override-grid-predictive-arc');
  });

  it('copies the npm preview snippet for this card id', () => {
    const snippet = getKmotionNpmSnippet(meta.id, 'react');
    expect(snippet).toContain(`npm install ${KMOTION_PACKAGE}`);
    expect(snippet).toContain(`<Preview id="${meta.id}" />`);
    expect(KMOTION_TEMPLATE_IDS).toContain(meta.id);
    expect(embedUrl(meta.id)).toBe(`http://localhost:5173/p/${meta.id}`);
  });
});

describe('Override Grid source contract', () => {
  it('keeps the configured host defaults', () => {
    expect(SOURCE_URL).toBe('/effects/override-grid-predictive-arc.html');
    expect(SOURCE_REVISION).toBe('fa86582fc870');
    expect(VARIANT_ID).toBe('override-grid');
    expect(DEFAULT_SIZE).toBe(48);
    expect(DEFAULT_GAP).toBe(2);
    expect(DEFAULT_MODE).toBe('dark');
    expect(DEFAULT_SPEED).toBe(1);
    expect(OVERRIDE_GRID_HTML_SHA256).toBe(
      'dc7800f2b6b6329b8b71ea4a06b82af91cff8379701c6a7fa4c9a92d47f89d6c',
    );
    expect(FOCUSED_DOCUMENT_SHA256).toBe(
      '989dd75a8188ba1ad0552ae990bf9dce4d372e3cfbde7726c31b06db4762b099',
    );
  });

  it('lists every required packaged asset for hash checks', () => {
    expect(ASSET_MANIFEST).toHaveLength(17);
    expect(ASSET_MANIFEST.every((entry) => entry.path && entry.bytes && entry.sha256)).toBe(
      true,
    );
  });

  it('omits outer palette filter at source-exact defaults', () => {
    expect(resolvePaletteFilter(0, 1, 1)).toBeUndefined();
    expect(resolvePaletteFilter(10, 1.1, 0.95)).toBe(
      'hue-rotate(10deg) saturate(1.1) brightness(0.95)',
    );
  });
});
