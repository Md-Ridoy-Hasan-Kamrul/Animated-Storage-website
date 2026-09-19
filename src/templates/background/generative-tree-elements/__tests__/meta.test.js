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
  GENERATIVE_TREE_DEFAULT_PROPS,
  GENERATIVE_TREE_HTML_SHA256,
  PREVIEW_STILL,
  SOURCE_REVISION,
  SOURCE_URL,
  VARIANT_ID,
} from '../constants';
import { meta } from '../meta';
import { GENERATIVE_TREE_ELEMENTS_PROMPT } from '../prompt';
import { GENERATIVE_TREE_DEFAULTS } from '../GenerativeTree';

describe('Generative Tree Elements — meta', () => {
  it('registers the Background card Generative Tree Elements', () => {
    expect(meta.id).toBe(CARD_ID);
    expect(meta.title).toBe(CARD_TITLE);
    expect(meta.title).toBe('Generative Tree Elements');
    expect(meta.category).toBe('Background');
    expect(meta.categorySlug).toBe('background');
    expect(meta.height).toBe('h-[272px]');
  });

  it('keeps Background on the gallery navbar tabs', () => {
    expect(CATEGORIES).toContain('Background');
    expect(CATEGORY_SLUGS.Background).toBe('background');
    expect(ACTIVE_TEMPLATE_CATEGORIES).toContain('Background');
  });

  it('binds previewImage to a public still path', () => {
    expect(meta.previewImage).toBe(PREVIEW_STILL);
    expect(meta.previewGif).toBe(PREVIEW_STILL);
    expect(PREVIEW_STILL).toBe(
      '/images/Assets%20Generative%20Tree%20Elements/GenerativeTreeElements.png',
    );
  });

  it('binds copy prompt to the exact pasted body', () => {
    expect(meta.fullPrompt).toBe(GENERATIVE_TREE_ELEMENTS_PROMPT);
    expect(GENERATIVE_TREE_ELEMENTS_PROMPT.startsWith('# Integrate <ElementsCollection />')).toBe(
      true,
    );
    expect(GENERATIVE_TREE_ELEMENTS_PROMPT).toContain('SHA-256 7a6871fe99fa');
    expect(GENERATIVE_TREE_ELEMENTS_PROMPT).toContain('variant="generative-tree"');
    expect(GENERATIVE_TREE_ELEMENTS_PROMPT).toContain(
      'https://threeui.com/source-code/generative-tree.json',
    );
    expect(GENERATIVE_TREE_ELEMENTS_PROMPT).not.toContain('Role & Prerequisites');
    expect(GENERATIVE_TREE_ELEMENTS_PROMPT).not.toContain('Test-Driven Development');
    expect(GENERATIVE_TREE_ELEMENTS_PROMPT).not.toContain('bird');
    expect(meta.fullPrompt.length).toBe(GENERATIVE_TREE_ELEMENTS_PROMPT.length);
  });

  it('uses generative-tree-elements routes', () => {
    expect(meta.detailPath).toBe('/templates/generative-tree-elements');
    expect(meta.livePath).toBe(ROUTES.GENERATIVE_TREE_ELEMENTS);
    expect(ROUTES.GENERATIVE_TREE_ELEMENTS).toBe('/p/generative-tree-elements');
  });

  it('copies the npm preview snippet for this card id', () => {
    const snippet = getKmotionNpmSnippet(meta.id, 'react');
    expect(snippet).toContain(`npm install ${KMOTION_PACKAGE}`);
    expect(snippet).toContain(`<Preview id="${meta.id}" />`);
    expect(KMOTION_TEMPLATE_IDS).toContain(meta.id);
    expect(embedUrl(meta.id)).toBe(`http://localhost:5173/p/${meta.id}`);
  });
});

describe('Generative Tree Elements source contract', () => {
  it('keeps the configured generative-tree host defaults', () => {
    expect(SOURCE_REVISION).toBe('7a6871fe99fa');
    expect(VARIANT_ID).toBe('generative-tree');
    expect(SOURCE_URL).toBe('/effects/generative-tree.html');
    expect(GENERATIVE_TREE_DEFAULT_PROPS.speed).toBe(GENERATIVE_TREE_DEFAULTS.speed);
    expect(GENERATIVE_TREE_DEFAULT_PROPS.size).toBe(GENERATIVE_TREE_DEFAULTS.size);
    expect(GENERATIVE_TREE_DEFAULT_PROPS.particleAmount).toBe(
      GENERATIVE_TREE_DEFAULTS.particleAmount,
    );
    expect(GENERATIVE_TREE_HTML_SHA256).toBe(
      '8ea51733bddf5cc44df338ef9af3a21633d62daa92c17fde5faa2fcab90fa0ef',
    );
  });

  it('lists every required packaged asset for hash checks', () => {
    expect(ASSET_MANIFEST).toHaveLength(4);
    expect(ASSET_MANIFEST.every((entry) => entry.path && entry.bytes && entry.sha256)).toBe(true);
  });
});
