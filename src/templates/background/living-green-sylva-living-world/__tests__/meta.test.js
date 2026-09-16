import { ROUTES } from '../../../../config';
import { TEMPLATES as KMOTION_TEMPLATE_IDS, embedUrl } from '../../../../../packages/kmotion/src/core';
import { getKmotionNpmSnippet, KMOTION_PACKAGE } from '../../../../utils/kmotionNpmSnippet';
import { CATEGORIES, CATEGORY_SLUGS } from '../../../../templates';
import {
  ASSET_MANIFEST,
  CARD_ID,
  CARD_TITLE,
  INNER_GREEN_HTML_SHA256,
  SCENE_DOCUMENT_SHA256,
  SOURCE_REVISION,
  SOURCE_URL,
  SYLVA_LIVING_WORLD_DEFAULT_PROPS,
  THREE_RUNTIME_SHA256,
  THREEUI_CSS_SHA256,
} from '../constants';
import { meta } from '../meta';
import { SYLVA_LIVING_WORLD_PROMPT } from '../prompt';

describe('Living Green Sylva Living World — meta', () => {
  it('registers the Background card Living Green Sylva Living World', () => {
    expect(meta.id).toBe(CARD_ID);
    expect(meta.title).toBe(CARD_TITLE);
    expect(meta.title).toBe('Living Green Sylva Living World');
    expect(meta.category).toBe('Background');
    expect(meta.categorySlug).toBe('background');
    expect(meta.height).toBe('h-[272px]');
  });

  it('keeps Background on the gallery navbar tabs', () => {
    expect(CATEGORIES).toContain('Background');
    expect(CATEGORY_SLUGS.Background).toBe('background');
  });

  it('binds copy prompt to the exact pasted body', () => {
    expect(meta.fullPrompt).toBe(SYLVA_LIVING_WORLD_PROMPT);
    expect(SYLVA_LIVING_WORLD_PROMPT.startsWith('# Integrate <SylvaLivingWorldScene />')).toBe(
      true,
    );
    expect(SYLVA_LIVING_WORLD_PROMPT).toContain('SHA-256 fd922291297d');
    expect(SYLVA_LIVING_WORLD_PROMPT).toContain('@designcodeio/threeui');
    expect(SYLVA_LIVING_WORLD_PROMPT).toContain('variant="living-green"');
    expect(SYLVA_LIVING_WORLD_PROMPT).toContain(
      'https://threeui.com/source-code/sylva-living-world.json',
    );
    expect(SYLVA_LIVING_WORLD_PROMPT).not.toContain('Role & Prerequisites');
    expect(SYLVA_LIVING_WORLD_PROMPT).not.toContain('Test-Driven Development');
    expect(SYLVA_LIVING_WORLD_PROMPT).not.toContain('Skill.md');
    expect(meta.fullPrompt.length).toBe(SYLVA_LIVING_WORLD_PROMPT.length);
  });

  it('uses living-green-sylva-living-world routes', () => {
    expect(meta.detailPath).toBe('/templates/living-green-sylva-living-world');
    expect(meta.livePath).toBe(ROUTES.LIVING_GREEN_SYLVA_LIVING_WORLD);
    expect(ROUTES.LIVING_GREEN_SYLVA_LIVING_WORLD).toBe(
      '/p/living-green-sylva-living-world',
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

describe('Sylva Living World source contract', () => {
  it('keeps the configured host defaults', () => {
    expect(SOURCE_URL).toBe('/effects/sylva-living-world-living-green.html');
    expect(SOURCE_REVISION).toBe('fd922291297d');
    expect(INNER_GREEN_HTML_SHA256).toBe(
      '69c3694bd63f44ef9f007ebe4dac57a83e4402e0cdf6b54dd10b96dd4f05e197',
    );
    expect(THREE_RUNTIME_SHA256).toBe(
      '8a5f7249903b54d30f79f708699d2fed2d6a1d0741a4cd41377d1f01bb5a2271',
    );
    expect(THREEUI_CSS_SHA256).toBe(
      'efe4447139f1358dd8e9be68edf6fa46cbefbd1de423a4d6c439ca61d2c8eccf',
    );
    expect(SCENE_DOCUMENT_SHA256).toBe(
      '338df6dd8b2551f0064c2accf9357d50a98da6f1238f1b8937f9bf82b6b8aac3',
    );
    expect(SYLVA_LIVING_WORLD_DEFAULT_PROPS).toEqual({
      variant: 'living-green',
    });
  });

  it('lists every required packaged asset for hash checks', () => {
    expect(ASSET_MANIFEST.length).toBeGreaterThanOrEqual(4);
    expect(ASSET_MANIFEST.every((entry) => entry.path && entry.bytes && entry.sha256)).toBe(
      true,
    );
  });
});
