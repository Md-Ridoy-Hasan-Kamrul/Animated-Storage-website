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
  ASHEN_PRESS_HTML_SHA256,
  CARD_ID,
  CARD_TITLE,
  FOCUSED_DOCUMENT_SHA256,
  SOURCE_REVISION,
  SOURCE_URL,
  THREEUI_CSS_SHA256,
} from '../constants';
import { meta } from '../meta';
import { ASHEN_PRESS_PROMPT } from '../prompt';

describe('Book shelf — meta', () => {
  it('registers the Hero card Book shelf', () => {
    expect(meta.id).toBe(CARD_ID);
    expect(meta.title).toBe(CARD_TITLE);
    expect(meta.title).toBe('Book shelf');
    expect(meta.category).toBe('Hero');
    expect(meta.categorySlug).toBe('hero');
    expect(meta.height).toBe('h-[272px]');
  });

  it('keeps Hero on the gallery navbar tabs', () => {
    expect(CATEGORIES).toContain('Hero');
    expect(CATEGORY_SLUGS.Hero).toBe('hero');
    expect(ACTIVE_TEMPLATE_CATEGORIES).toContain('Hero');
  });

  it('binds copy prompt to the exact pasted body', () => {
    expect(meta.fullPrompt).toBe(ASHEN_PRESS_PROMPT);
    expect(ASHEN_PRESS_PROMPT.startsWith('# Integrate <AshenPress />')).toBe(true);
    expect(ASHEN_PRESS_PROMPT).toContain('SHA-256 5fe2554e578a');
    expect(ASHEN_PRESS_PROMPT).toContain('@designcodeio/threeui');
    expect(ASHEN_PRESS_PROMPT).toContain('<AshenPress />');
    expect(ASHEN_PRESS_PROMPT).toContain(
      'https://threeui.com/source-code/ashen-press.json',
    );
    expect(ASHEN_PRESS_PROMPT).not.toContain('Role & Prerequisites');
    expect(ASHEN_PRESS_PROMPT).not.toContain('Test-Driven Development');
    expect(meta.fullPrompt.length).toBe(ASHEN_PRESS_PROMPT.length);
  });

  it('uses ashen-press routes', () => {
    expect(meta.detailPath).toBe('/templates/ashen-press');
    expect(meta.livePath).toBe(ROUTES.ASHEN_PRESS);
    expect(ROUTES.ASHEN_PRESS).toBe('/p/ashen-press');
  });

  it('copies the npm preview snippet for this card id', () => {
    const snippet = getKmotionNpmSnippet(meta.id, 'react');
    expect(snippet).toContain(`npm install ${KMOTION_PACKAGE}`);
    expect(snippet).toContain(`<Preview id="${meta.id}" />`);
    expect(KMOTION_TEMPLATE_IDS).toContain(meta.id);
    expect(embedUrl(meta.id)).toBe(`http://localhost:5173/p/${meta.id}`);
  });
});

describe('Ashen Press source contract', () => {
  it('keeps the configured host defaults', () => {
    expect(SOURCE_URL).toBe('/effects/ashen-press.html');
    expect(SOURCE_REVISION).toBe('5fe2554e578a');
    expect(ASHEN_PRESS_HTML_SHA256).toBe(
      '5fe2554e578acac5d55cb466a9564440e7767e38797981f8e829dfd2de0bc90f',
    );
    expect(THREEUI_CSS_SHA256).toBe(
      'efe4447139f1358dd8e9be68edf6fa46cbefbd1de423a4d6c439ca61d2c8eccf',
    );
    expect(FOCUSED_DOCUMENT_SHA256).toBe(ASHEN_PRESS_HTML_SHA256);
  });

  it('lists every required packaged asset for hash checks', () => {
    expect(ASSET_MANIFEST).toHaveLength(3);
    expect(ASSET_MANIFEST.every((entry) => entry.path && entry.bytes && entry.sha256)).toBe(
      true,
    );
  });
});
