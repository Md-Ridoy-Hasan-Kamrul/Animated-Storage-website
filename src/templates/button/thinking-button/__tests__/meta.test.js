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
  THINKING_DEFAULT_PROPS,
  VARIANT_ID,
} from '../constants';
import { meta } from '../meta';
import { THINKING_BUTTON_PROMPT } from '../prompt';
import { SHADER_BUTTONS_DEFAULTS } from '../ShaderButtons';

describe('Thinking — meta', () => {
  it('registers the Button card Thinking', () => {
    expect(meta.id).toBe(CARD_ID);
    expect(meta.title).toBe(CARD_TITLE);
    expect(meta.title).toBe('Thinking');
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
    expect(PREVIEW_STILL).toBe('/images/Assets%20Thinking/Thinking.png');
  });

  it('binds copy prompt to the exact pasted body', () => {
    expect(meta.fullPrompt).toBe(THINKING_BUTTON_PROMPT);
    expect(THINKING_BUTTON_PROMPT.startsWith('# Integrate <ShaderButtons />')).toBe(true);
    expect(THINKING_BUTTON_PROMPT).toContain('SHA-256 6f56c4f91814');
    expect(THINKING_BUTTON_PROMPT).toContain('@designcodeio/threeui');
    expect(THINKING_BUTTON_PROMPT).toContain('Thinking');
    expect(THINKING_BUTTON_PROMPT).toContain('thinking-button');
    expect(THINKING_BUTTON_PROMPT).toContain('variant="thinking-button"');
    expect(THINKING_BUTTON_PROMPT).toContain(
      'https://threeui.com/source-code/thinking-button.json',
    );
    expect(THINKING_BUTTON_PROMPT).not.toContain('Role & Prerequisites');
    expect(THINKING_BUTTON_PROMPT).not.toContain('Test-Driven Development');
    expect(meta.fullPrompt.length).toBe(THINKING_BUTTON_PROMPT.length);
  });

  it('uses thinking-button routes', () => {
    expect(meta.detailPath).toBe('/templates/thinking-button');
    expect(meta.livePath).toBe(ROUTES.THINKING_BUTTON);
    expect(ROUTES.THINKING_BUTTON).toBe('/p/thinking-button');
  });

  it('copies the npm preview snippet for this card id', () => {
    const snippet = getKmotionNpmSnippet(meta.id, 'react');
    expect(snippet).toContain(`npm install ${KMOTION_PACKAGE}`);
    expect(snippet).toContain(`<Preview id="${meta.id}" />`);
    expect(KMOTION_TEMPLATE_IDS).toContain(meta.id);
    expect(embedUrl(meta.id)).toBe(`http://localhost:5173/p/${meta.id}`);
  });
});

describe('Thinking source contract', () => {
  it('keeps the configured thinking host defaults', () => {
    expect(SOURCE_REVISION).toBe('6f56c4f91814');
    expect(VARIANT_ID).toBe('thinking-button');
    expect(THINKING_DEFAULT_PROPS).toEqual(SHADER_BUTTONS_DEFAULTS);
  });

  it('lists packaged assets for hash checks', () => {
    expect(ASSET_MANIFEST).toHaveLength(4);
    expect(ASSET_MANIFEST.every((entry) => entry.path && entry.bytes && entry.sha256)).toBe(true);
  });
});
