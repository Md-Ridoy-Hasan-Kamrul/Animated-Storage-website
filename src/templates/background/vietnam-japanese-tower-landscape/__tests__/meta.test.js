import { ROUTES } from '../../../../config';
import { TEMPLATES as KMOTION_TEMPLATE_IDS, embedUrl } from '../../../../../packages/kmotion/src/core';
import { getKmotionNpmSnippet, KMOTION_PACKAGE } from '../../../../utils/kmotionNpmSnippet';
import { CATEGORIES, CATEGORY_SLUGS } from '../../../../templates';
import {
  ASSET_MANIFEST,
  CARD_ID,
  CARD_TITLE,
  VIETNAMESE_TOWER_DEFAULT_PROPS,
  FOCUSED_DOCUMENT_SHA256,
  SOURCE_REVISION,
  SOURCE_URL,
  THREEUI_CSS_SHA256,
  TOWERS_HTML_SHA256,
} from '../constants';
import { meta } from '../meta';
import { VIETNAM_JAPANESE_TOWER_LANDSCAPE_PROMPT } from '../prompt';

describe('Vietnamese Tower Landscape — meta', () => {
  it('registers the Background card Vietnamese Tower Landscape', () => {
    expect(meta.id).toBe(CARD_ID);
    expect(meta.title).toBe(CARD_TITLE);
    expect(meta.title).toBe('Vietnamese Tower Landscape');
    expect(meta.category).toBe('Background');
    expect(meta.categorySlug).toBe('background');
    expect(meta.height).toBe('h-[272px]');
  });

  it('keeps Background on the gallery navbar tabs', () => {
    expect(CATEGORIES).toContain('Background');
    expect(CATEGORY_SLUGS.Background).toBe('background');
  });

  it('binds copy prompt to the exact pasted body', () => {
    expect(meta.fullPrompt).toBe(VIETNAM_JAPANESE_TOWER_LANDSCAPE_PROMPT);
    expect(
      VIETNAM_JAPANESE_TOWER_LANDSCAPE_PROMPT.startsWith('# Integrate <JapaneseTowerLandscape />'),
    ).toBe(true);
    expect(VIETNAM_JAPANESE_TOWER_LANDSCAPE_PROMPT).toContain('SHA-256 7810e7163c02');
    expect(VIETNAM_JAPANESE_TOWER_LANDSCAPE_PROMPT).toContain('@designcodeio/threeui');
    expect(VIETNAM_JAPANESE_TOWER_LANDSCAPE_PROMPT).toContain('country="vietnam"');
    expect(VIETNAM_JAPANESE_TOWER_LANDSCAPE_PROMPT).toContain('Variant: **Vietnam**');
    expect(VIETNAM_JAPANESE_TOWER_LANDSCAPE_PROMPT).toContain(
      'https://threeui.com/source-code/japanese-tower.json',
    );
    expect(VIETNAM_JAPANESE_TOWER_LANDSCAPE_PROMPT).not.toContain('Role & Prerequisites');
    expect(VIETNAM_JAPANESE_TOWER_LANDSCAPE_PROMPT).not.toContain('Test-Driven Development');
    expect(meta.fullPrompt.length).toBe(VIETNAM_JAPANESE_TOWER_LANDSCAPE_PROMPT.length);
  });

  it('uses vietnam-japanese-tower-landscape routes', () => {
    expect(meta.detailPath).toBe('/templates/vietnam-japanese-tower-landscape');
    expect(meta.livePath).toBe(ROUTES.VIETNAM_JAPANESE_TOWER_LANDSCAPE);
    expect(ROUTES.VIETNAM_JAPANESE_TOWER_LANDSCAPE).toBe('/p/vietnam-japanese-tower-landscape');
  });

  it('copies the npm preview snippet for this card id', () => {
    const snippet = getKmotionNpmSnippet(meta.id, 'react');
    expect(snippet).toContain(`npm install ${KMOTION_PACKAGE}`);
    expect(snippet).toContain(`<Preview id="${meta.id}" />`);
    expect(KMOTION_TEMPLATE_IDS).toContain(meta.id);
    expect(embedUrl(meta.id)).toBe(`http://localhost:5173/p/${meta.id}`);
  });
});

describe('Vietnamese Tower Landscape source contract', () => {
  it('keeps the configured host defaults', () => {
    expect(SOURCE_URL).toBe('/effects/japanese-tower-landscape.html');
    expect(SOURCE_REVISION).toBe('7810e7163c02');
    expect(TOWERS_HTML_SHA256).toBe(
      '7810e7163c027f654235032fb1eed48846b68bf80f5b1c1c4292e01694b71f3d',
    );
    expect(THREEUI_CSS_SHA256).toBe(
      'efe4447139f1358dd8e9be68edf6fa46cbefbd1de423a4d6c439ca61d2c8eccf',
    );
    expect(FOCUSED_DOCUMENT_SHA256).toBe(
      'e1bff45ed76f2a98f766e39cc04f5ba6b48d20827c22f41e9acf7becef22be83',
    );
    expect(VIETNAMESE_TOWER_DEFAULT_PROPS).toEqual({
      country: 'vietnam',
    });
  });

  it('lists every required packaged asset for hash checks', () => {
    expect(ASSET_MANIFEST).toHaveLength(3);
    expect(ASSET_MANIFEST.every((entry) => entry.path && entry.bytes && entry.sha256)).toBe(true);
  });
});
