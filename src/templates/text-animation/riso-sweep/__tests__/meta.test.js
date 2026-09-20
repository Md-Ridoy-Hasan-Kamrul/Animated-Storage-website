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
  RISO_SWEEP_DEFAULT_PROPS,
  SOURCE_REVISION,
  VARIANT_ID,
} from '../constants';
import { meta } from '../meta';
import { RISO_SWEEP_PROMPT } from '../prompt';
import { GALLERY_HEADING_DEFAULTS } from '../GalleryHeading';

describe('Riso Sweep — meta', () => {
  it('registers the Text Animation card Riso Sweep', () => {
    expect(meta.id).toBe(CARD_ID);
    expect(meta.title).toBe(CARD_TITLE);
    expect(meta.title).toBe('Riso Sweep');
    expect(meta.category).toBe('Text Animation');
    expect(meta.categorySlug).toBe('text-animation');
    expect(meta.height).toBe('h-[272px]');
  });

  it('keeps Text Animation on the gallery navbar tabs', () => {
    expect(CATEGORIES).toContain('Text Animation');
    expect(CATEGORY_SLUGS['Text Animation']).toBe('text-animation');
    expect(ACTIVE_TEMPLATE_CATEGORIES).toContain('Text Animation');
  });

  it('binds previewImage to a public still path', () => {
    expect(meta.previewImage).toBe(PREVIEW_STILL);
    expect(meta.previewGif).toBe(PREVIEW_STILL);
    expect(PREVIEW_STILL).toBe('/images/Assets%20Riso%20Sweep/RisoSweep.png');
  });

  it('binds copy prompt to the exact pasted body', () => {
    expect(meta.fullPrompt).toBe(RISO_SWEEP_PROMPT);
    expect(RISO_SWEEP_PROMPT.startsWith('# Integrate <GalleryHeading />')).toBe(true);
    expect(RISO_SWEEP_PROMPT).toContain('SHA-256 8e42d2d5b497');
    expect(RISO_SWEEP_PROMPT).toContain('@designcodeio/threeui');
    expect(RISO_SWEEP_PROMPT).toContain('Riso Sweep');
    expect(RISO_SWEEP_PROMPT).toContain('horizontal-sweep');
    expect(RISO_SWEEP_PROMPT).toContain('variant="horizontal-sweep"');
    expect(RISO_SWEEP_PROMPT).toContain(
      'https://threeui.com/source-code/gallery-heading.json',
    );
    expect(RISO_SWEEP_PROMPT).not.toContain('Role & Prerequisites');
    expect(RISO_SWEEP_PROMPT).not.toContain('Test-Driven Development');
    expect(meta.fullPrompt.length).toBe(RISO_SWEEP_PROMPT.length);
  });

  it('uses riso-sweep routes', () => {
    expect(meta.detailPath).toBe('/templates/riso-sweep');
    expect(meta.livePath).toBe(ROUTES.RISO_SWEEP);
    expect(ROUTES.RISO_SWEEP).toBe('/p/riso-sweep');
  });

  it('copies the npm preview snippet for this card id', () => {
    const snippet = getKmotionNpmSnippet(meta.id, 'react');
    expect(snippet).toContain(`npm install ${KMOTION_PACKAGE}`);
    expect(snippet).toContain(`<Preview id="${meta.id}" />`);
    expect(KMOTION_TEMPLATE_IDS).toContain(meta.id);
    expect(embedUrl(meta.id)).toBe(`http://localhost:5173/p/${meta.id}`);
  });
});

describe('Riso Sweep source contract', () => {
  it('keeps the configured horizontal-sweep host defaults', () => {
    expect(SOURCE_REVISION).toBe('8e42d2d5b497');
    expect(VARIANT_ID).toBe('horizontal-sweep');
    expect(RISO_SWEEP_DEFAULT_PROPS).toEqual(GALLERY_HEADING_DEFAULTS);
  });

  it('lists packaged assets for hash checks', () => {
    expect(ASSET_MANIFEST).toHaveLength(5);
    expect(ASSET_MANIFEST.every((entry) => entry.path && entry.bytes && entry.sha256)).toBe(true);
  });
});
