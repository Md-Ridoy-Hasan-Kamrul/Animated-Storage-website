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
  STAR_PORTAL_DEFAULT_PROPS,
  VARIANT_ID,
} from '../constants';
import { meta } from '../meta';
import { STAR_PORTAL_PROMPT } from '../prompt';
import { SHADER_BUTTONS_DEFAULTS } from '../ShaderButtons';

describe('Star Portal — meta', () => {
  it('registers the Button card Star Portal', () => {
    expect(meta.id).toBe(CARD_ID);
    expect(meta.title).toBe(CARD_TITLE);
    expect(meta.title).toBe('Star Portal');
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
    expect(PREVIEW_STILL).toBe('/images/Assets%20Star%20Portal/StarPortal.png');
  });

  it('binds copy prompt to the exact pasted body', () => {
    expect(meta.fullPrompt).toBe(STAR_PORTAL_PROMPT);
    expect(STAR_PORTAL_PROMPT.startsWith('# Integrate <ShaderButtons />')).toBe(true);
    expect(STAR_PORTAL_PROMPT).toContain('SHA-256 6f56c4f91814');
    expect(STAR_PORTAL_PROMPT).toContain('@designcodeio/threeui');
    expect(STAR_PORTAL_PROMPT).toContain('Star Portal');
    expect(STAR_PORTAL_PROMPT).toContain('star-portal');
    expect(STAR_PORTAL_PROMPT).toContain('https://threeui.com/source-code/star-portal.json');
    expect(STAR_PORTAL_PROMPT).not.toContain('Role & Prerequisites');
    expect(STAR_PORTAL_PROMPT).not.toContain('Test-Driven Development');
    expect(meta.fullPrompt.length).toBe(STAR_PORTAL_PROMPT.length);
  });

  it('uses star-portal routes', () => {
    expect(meta.detailPath).toBe('/templates/star-portal');
    expect(meta.livePath).toBe(ROUTES.STAR_PORTAL);
    expect(ROUTES.STAR_PORTAL).toBe('/p/star-portal');
  });

  it('copies the npm preview snippet for this card id', () => {
    const snippet = getKmotionNpmSnippet(meta.id, 'react');
    expect(snippet).toContain(`npm install ${KMOTION_PACKAGE}`);
    expect(snippet).toContain(`<Preview id="${meta.id}" />`);
    expect(KMOTION_TEMPLATE_IDS).toContain(meta.id);
    expect(embedUrl(meta.id)).toBe(`http://localhost:5173/p/${meta.id}`);
  });
});

describe('Star Portal source contract', () => {
  it('keeps the configured star-portal host defaults', () => {
    expect(SOURCE_REVISION).toBe('6f56c4f91814');
    expect(VARIANT_ID).toBe('star-portal');
    expect(STAR_PORTAL_DEFAULT_PROPS).toEqual(SHADER_BUTTONS_DEFAULTS);
  });

  it('lists packaged assets for hash checks', () => {
    expect(ASSET_MANIFEST).toHaveLength(11);
    expect(ASSET_MANIFEST.every((entry) => entry.path && entry.bytes && entry.sha256)).toBe(true);
  });
});
