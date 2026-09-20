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
  SOURCE_REVISION,
  TACTILE_DEFAULT_PROPS,
  VARIANT_ID,
} from '../constants';
import { meta } from '../meta';
import { TACTILE_BUTTON_PROMPT } from '../prompt';
import { SHADER_BUTTONS_DEFAULTS } from '../ShaderButtons';

describe('Tactile — meta', () => {
  it('registers the Button card Tactile', () => {
    expect(meta.id).toBe(CARD_ID);
    expect(meta.title).toBe(CARD_TITLE);
    expect(meta.title).toBe('Tactile');
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
    expect(PREVIEW_STILL).toBe('/images/Assets%20Tactile/Tactile.png');
  });

  it('binds copy prompt to the exact pasted body', () => {
    expect(meta.fullPrompt).toBe(TACTILE_BUTTON_PROMPT);
    expect(TACTILE_BUTTON_PROMPT.startsWith('# Integrate <ShaderButtons />')).toBe(true);
    expect(TACTILE_BUTTON_PROMPT).toContain('SHA-256 6f56c4f91814');
    expect(TACTILE_BUTTON_PROMPT).toContain('@designcodeio/threeui');
    expect(TACTILE_BUTTON_PROMPT).toContain('Tactile');
    expect(TACTILE_BUTTON_PROMPT).toContain('tactile-button');
    expect(TACTILE_BUTTON_PROMPT).toContain('variant="tactile-button"');
    expect(TACTILE_BUTTON_PROMPT).toContain(
      'https://threeui.com/source-code/tactile-button.json',
    );
    expect(TACTILE_BUTTON_PROMPT).not.toContain('Role & Prerequisites');
    expect(TACTILE_BUTTON_PROMPT).not.toContain('Test-Driven Development');
    expect(meta.fullPrompt.length).toBe(TACTILE_BUTTON_PROMPT.length);
  });

  it('uses tactile-button routes', () => {
    expect(meta.detailPath).toBe('/templates/tactile-button');
    expect(meta.livePath).toBe(ROUTES.TACTILE_BUTTON);
    expect(ROUTES.TACTILE_BUTTON).toBe('/p/tactile-button');
  });

  it('copies the npm preview snippet for this card id', () => {
    const snippet = getKmotionNpmSnippet(meta.id, 'react');
    expect(snippet).toContain(`npm install ${KMOTION_PACKAGE}`);
    expect(snippet).toContain(`<Preview id="${meta.id}" />`);
    expect(KMOTION_TEMPLATE_IDS).toContain(meta.id);
    expect(embedUrl(meta.id)).toBe(`http://localhost:5173/p/${meta.id}`);
  });
});

describe('Tactile source contract', () => {
  it('keeps the configured tactile host defaults', () => {
    expect(SOURCE_REVISION).toBe('6f56c4f91814');
    expect(VARIANT_ID).toBe('tactile-button');
    expect(TACTILE_DEFAULT_PROPS).toEqual(SHADER_BUTTONS_DEFAULTS);
  });

  it('lists packaged assets for hash checks', () => {
    expect(ASSET_MANIFEST).toHaveLength(4);
    expect(ASSET_MANIFEST.every((entry) => entry.path && entry.bytes && entry.sha256)).toBe(true);
  });
});
