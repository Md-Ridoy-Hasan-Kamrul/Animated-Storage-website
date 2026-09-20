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
  RAKING_DEFAULT_PROPS,
  SOURCE_REVISION,
  VARIANT_ID,
} from '../constants';
import { meta } from '../meta';
import { RAKING_LIGHT_PILL_PROMPT } from '../prompt';
import { SHADER_BUTTONS_DEFAULTS } from '../ShaderButtons';

describe('Raking Light Pill — meta', () => {
  it('registers the Button card Raking Light Pill', () => {
    expect(meta.id).toBe(CARD_ID);
    expect(meta.title).toBe(CARD_TITLE);
    expect(meta.title).toBe('Raking Light Pill');
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
    expect(PREVIEW_STILL).toBe('/images/Assets%20Raking%20Light%20Pill/RakingLightPill.png');
  });

  it('binds copy prompt to the exact pasted body', () => {
    expect(meta.fullPrompt).toBe(RAKING_LIGHT_PILL_PROMPT);
    expect(RAKING_LIGHT_PILL_PROMPT.startsWith('# Integrate <ShaderButtons />')).toBe(true);
    expect(RAKING_LIGHT_PILL_PROMPT).toContain('SHA-256 6f56c4f91814');
    expect(RAKING_LIGHT_PILL_PROMPT).toContain('@designcodeio/threeui');
    expect(RAKING_LIGHT_PILL_PROMPT).toContain('Raking Light Pill');
    expect(RAKING_LIGHT_PILL_PROMPT).toContain('raking-light-pill');
    expect(RAKING_LIGHT_PILL_PROMPT).toContain('variant="raking-light-pill"');
    expect(RAKING_LIGHT_PILL_PROMPT).toContain(
      'https://threeui.com/source-code/star-portal.json',
    );
    expect(RAKING_LIGHT_PILL_PROMPT).not.toContain('Role & Prerequisites');
    expect(RAKING_LIGHT_PILL_PROMPT).not.toContain('Test-Driven Development');
    expect(meta.fullPrompt.length).toBe(RAKING_LIGHT_PILL_PROMPT.length);
  });

  it('uses raking-light-pill routes', () => {
    expect(meta.detailPath).toBe('/templates/raking-light-pill');
    expect(meta.livePath).toBe(ROUTES.RAKING_LIGHT_PILL);
    expect(ROUTES.RAKING_LIGHT_PILL).toBe('/p/raking-light-pill');
  });

  it('copies the npm preview snippet for this card id', () => {
    const snippet = getKmotionNpmSnippet(meta.id, 'react');
    expect(snippet).toContain(`npm install ${KMOTION_PACKAGE}`);
    expect(snippet).toContain(`<Preview id="${meta.id}" />`);
    expect(KMOTION_TEMPLATE_IDS).toContain(meta.id);
    expect(embedUrl(meta.id)).toBe(`http://localhost:5173/p/${meta.id}`);
  });
});

describe('Raking Light Pill source contract', () => {
  it('keeps the configured raking-light-pill host defaults', () => {
    expect(SOURCE_REVISION).toBe('6f56c4f91814');
    expect(VARIANT_ID).toBe('raking-light-pill');
    expect(RAKING_DEFAULT_PROPS).toEqual(SHADER_BUTTONS_DEFAULTS);
  });

  it('lists packaged assets for hash checks', () => {
    expect(ASSET_MANIFEST).toHaveLength(10);
    expect(ASSET_MANIFEST.every((entry) => entry.path && entry.bytes && entry.sha256)).toBe(true);
  });
});
