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
  LIQUID_FORM_DEFAULT_PROPS,
  LIQUID_FORM_SHADERS_SHA256,
  SOURCE_REVISION,
} from '../constants';
import { meta } from '../meta';
import { LIQUID_FORM_PROMPT } from '../prompt';
import { LIQUID_FORM_DEFAULTS } from '../LiquidFormBackground';

describe('Liquid Form — meta', () => {
  it('registers the Background card Liquid Form', () => {
    expect(meta.id).toBe(CARD_ID);
    expect(meta.title).toBe(CARD_TITLE);
    expect(meta.title).toBe('Liquid Form');
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
    expect(meta.fullPrompt).toBe(LIQUID_FORM_PROMPT);
    expect(LIQUID_FORM_PROMPT.startsWith('# Integrate <LiquidFormBackground />')).toBe(true);
    expect(LIQUID_FORM_PROMPT).toContain('SHA-256 acc0cbacb914');
    expect(LIQUID_FORM_PROMPT).toContain('@designcodeio/threeui');
    expect(LIQUID_FORM_PROMPT).toContain('tintAmount={0.00}');
    expect(LIQUID_FORM_PROMPT).toContain('camera={5.5}');
    expect(LIQUID_FORM_PROMPT).toContain(
      'https://threeui.com/source-code/liquid-form.json',
    );
    expect(LIQUID_FORM_PROMPT).not.toContain('Role & Prerequisites');
    expect(LIQUID_FORM_PROMPT).not.toContain('Test-Driven Development');
    expect(meta.fullPrompt.length).toBe(LIQUID_FORM_PROMPT.length);
  });

  it('uses liquid-form routes', () => {
    expect(meta.detailPath).toBe('/templates/liquid-form');
    expect(meta.livePath).toBe(ROUTES.LIQUID_FORM);
    expect(ROUTES.LIQUID_FORM).toBe('/p/liquid-form');
  });

  it('copies the npm preview snippet for this card id', () => {
    const snippet = getKmotionNpmSnippet(meta.id, 'react');
    expect(snippet).toContain(`npm install ${KMOTION_PACKAGE}`);
    expect(snippet).toContain(`<Preview id="${meta.id}" />`);
    expect(KMOTION_TEMPLATE_IDS).toContain(meta.id);
    expect(embedUrl(meta.id)).toBe(`http://localhost:5173/p/${meta.id}`);
  });
});

describe('Liquid Form source contract', () => {
  it('keeps the configured host defaults', () => {
    expect(SOURCE_REVISION).toBe('acc0cbacb914');
    expect(LIQUID_FORM_DEFAULT_PROPS).toEqual(LIQUID_FORM_DEFAULTS);
    expect(LIQUID_FORM_DEFAULTS.tintAmount).toBe(0);
    expect(LIQUID_FORM_DEFAULTS.camera).toBe(5.5);
    expect(LIQUID_FORM_SHADERS_SHA256).toBe(
      '5ec6722aa75a4b3e5815ae811105201668e8d88a060d4bab46b38e87f136c7ea',
    );
  });

  it('lists every required packaged asset for hash checks', () => {
    expect(ASSET_MANIFEST).toHaveLength(3);
    expect(ASSET_MANIFEST.every((entry) => entry.path && entry.bytes && entry.sha256)).toBe(
      true,
    );
  });
});
