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
  ELEMENTAL_MARKS_HTML_SHA256,
  ELEMENTS_COMPONENT_SHA256,
  ELEMENTS_DEFAULT_PROPS,
  SOURCE_REVISION,
  SOURCE_URL,
  VARIANT_ID,
} from '../constants';
import { meta } from '../meta';
import { ELEMENTS_PROMPT } from '../prompt';
import { ELEMENTS_DEFAULTS } from '../ElementsBackground';

describe('Elements — meta', () => {
  it('registers the Background card Elements', () => {
    expect(meta.id).toBe(CARD_ID);
    expect(meta.title).toBe(CARD_TITLE);
    expect(meta.title).toBe('Elements');
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
    expect(meta.fullPrompt).toBe(ELEMENTS_PROMPT);
    expect(ELEMENTS_PROMPT.startsWith('# Integrate <ElementsCollection />')).toBe(true);
    expect(ELEMENTS_PROMPT).toContain('SHA-256 7a6871fe99fa');
    expect(ELEMENTS_PROMPT).toContain('@designcodeio/threeui');
    expect(ELEMENTS_PROMPT).toContain('variant="water"');
    expect(ELEMENTS_PROMPT).toContain('particleAmount={1.00}');
    expect(ELEMENTS_PROMPT).toContain('https://threeui.com/source-code/elemental-water.json');
    expect(ELEMENTS_PROMPT).not.toContain('Role & Prerequisites');
    expect(ELEMENTS_PROMPT).not.toContain('Test-Driven Development');
    expect(meta.fullPrompt.length).toBe(ELEMENTS_PROMPT.length);
  });

  it('uses elements routes', () => {
    expect(meta.detailPath).toBe('/templates/elements');
    expect(meta.livePath).toBe(ROUTES.ELEMENTS);
    expect(ROUTES.ELEMENTS).toBe('/p/elements');
  });

  it('copies the npm preview snippet for this card id', () => {
    const snippet = getKmotionNpmSnippet(meta.id, 'react');
    expect(snippet).toContain(`npm install ${KMOTION_PACKAGE}`);
    expect(snippet).toContain(`<Preview id="${meta.id}" />`);
    expect(KMOTION_TEMPLATE_IDS).toContain(meta.id);
    expect(embedUrl(meta.id)).toBe(`http://localhost:5173/p/${meta.id}`);
  });
});

describe('Elements source contract', () => {
  it('keeps the configured water host defaults', () => {
    expect(SOURCE_REVISION).toBe('7a6871fe99fa');
    expect(VARIANT_ID).toBe('water');
    expect(SOURCE_URL).toBe('/effects/elemental-water.html');
    expect(ELEMENTS_DEFAULT_PROPS).toEqual(ELEMENTS_DEFAULTS);
    expect(ELEMENTS_COMPONENT_SHA256).toBe(
      '04dfbb5d8e91e71772a34b4f963e2335458c4ffdace33071fa28b731a053ba95',
    );
    expect(ELEMENTAL_MARKS_HTML_SHA256).toBe(
      '7a6871fe99fa5e1551b27b2601f2a22dd23320ea2c90b5432c9c8e071f0b1d1d',
    );
  });

  it('lists every required packaged asset for hash checks', () => {
    expect(ASSET_MANIFEST).toHaveLength(5);
    expect(ASSET_MANIFEST.every((entry) => entry.path && entry.bytes && entry.sha256)).toBe(true);
  });
});
