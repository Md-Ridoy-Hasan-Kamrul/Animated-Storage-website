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
  PREVIEW_STILL,
  SIGN_UP_PILL_DEFAULT_PROPS,
  SOURCE_REVISION,
  VARIANT_ID,
} from '../constants';
import { meta } from '../meta';
import { SIGN_UP_PILL_LIQUID_METAL_BUTTON_PROMPT } from '../prompt';
import { LIQUID_METAL_BUTTON_DEFAULTS } from '../LiquidMetalButton';

describe('Sign up Pill — meta', () => {
  it('registers the Button card Sign up Pill', () => {
    expect(meta.id).toBe(CARD_ID);
    expect(meta.title).toBe(CARD_TITLE);
    expect(meta.title).toBe('Sign up Pill');
    expect(meta.category).toBe('Button');
    expect(meta.categorySlug).toBe('button');
    expect(meta.height).toBe('h-[272px]');
  });

  it('keeps Button on the gallery navbar tabs', () => {
    expect(CATEGORIES).toContain('Button');
    expect(CATEGORY_SLUGS.Button).toBe('button');
    expect(ACTIVE_TEMPLATE_CATEGORIES).toContain('Button');
  });

  it('binds previewImage to a public still path', () => {
    expect(meta.previewImage).toBe(PREVIEW_STILL);
    expect(meta.previewGif).toBe(PREVIEW_STILL);
    expect(PREVIEW_STILL).toBe('/images/Assets%20Sign%20up%20Pill/SignUpPill.png');
  });

  it('binds copy prompt to the exact pasted body', () => {
    expect(meta.fullPrompt).toBe(SIGN_UP_PILL_LIQUID_METAL_BUTTON_PROMPT);
    expect(SIGN_UP_PILL_LIQUID_METAL_BUTTON_PROMPT.startsWith('# Integrate <LiquidMetalButton />')).toBe(
      true,
    );
    expect(SIGN_UP_PILL_LIQUID_METAL_BUTTON_PROMPT).toContain('SHA-256 76624e881a3a');
    expect(SIGN_UP_PILL_LIQUID_METAL_BUTTON_PROMPT).toContain('@designcodeio/threeui');
    expect(SIGN_UP_PILL_LIQUID_METAL_BUTTON_PROMPT).toContain('Sign up Pill');
    expect(SIGN_UP_PILL_LIQUID_METAL_BUTTON_PROMPT).toContain('variant="pill"');
    expect(SIGN_UP_PILL_LIQUID_METAL_BUTTON_PROMPT).toContain(
      'https://threeui.com/source-code/liquid-metal-button.json',
    );
    expect(SIGN_UP_PILL_LIQUID_METAL_BUTTON_PROMPT).not.toContain('Role & Prerequisites');
    expect(SIGN_UP_PILL_LIQUID_METAL_BUTTON_PROMPT).not.toContain('Test-Driven Development');
    expect(meta.fullPrompt.length).toBe(SIGN_UP_PILL_LIQUID_METAL_BUTTON_PROMPT.length);
  });

  it('uses sign-up-pill-liquid-metal-button routes', () => {
    expect(meta.detailPath).toBe('/templates/sign-up-pill-liquid-metal-button');
    expect(meta.livePath).toBe(ROUTES.SIGN_UP_PILL_LIQUID_METAL_BUTTON);
    expect(ROUTES.SIGN_UP_PILL_LIQUID_METAL_BUTTON).toBe('/p/sign-up-pill-liquid-metal-button');
  });

  it('copies the npm preview snippet for this card id', () => {
    const snippet = getKmotionNpmSnippet(meta.id, 'react');
    expect(snippet).toContain(`npm install ${KMOTION_PACKAGE}`);
    expect(snippet).toContain(`<Preview id="${meta.id}" />`);
    expect(KMOTION_TEMPLATE_IDS).toContain(meta.id);
    expect(embedUrl(meta.id)).toBe(`http://localhost:5173/p/${meta.id}`);
  });
});

describe('Sign up Pill source contract', () => {
  it('keeps the configured pill host defaults', () => {
    expect(SOURCE_REVISION).toBe('76624e881a3a');
    expect(VARIANT_ID).toBe('pill');
    expect(SIGN_UP_PILL_DEFAULT_PROPS).toEqual(LIQUID_METAL_BUTTON_DEFAULTS);
  });

  it('lists packaged assets for hash checks', () => {
    expect(ASSET_MANIFEST).toHaveLength(4);
    expect(ASSET_MANIFEST.every((entry) => entry.path && entry.bytes && entry.sha256)).toBe(true);
  });
});
