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
  INTERFACE_LINES_DEFAULT_PROPS,
  INTERFACE_LINES_HTML_SHA256,
  PREVIEW_STILL,
  SOURCE_REVISION,
  SOURCE_URL,
  VARIANT_ID,
} from '../constants';
import { meta } from '../meta';
import { INTERFACE_LINES_CONSTELLATION_FIELD_PROMPT } from '../prompt';
import { INTERFACE_LINES_DEFAULTS } from '../ConstellationField';

describe('Interface Lines Constellation Field — meta', () => {
  it('registers the Background card Interface Lines Constellation Field', () => {
    expect(meta.id).toBe(CARD_ID);
    expect(meta.title).toBe(CARD_TITLE);
    expect(meta.title).toBe('Interface Lines Constellation Field');
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
      '/images/Assets%20Interface%20Lines%20Constellation%20Field/InterfaceLinesConstellationField.png',
    );
  });

  it('binds copy prompt to the exact pasted body', () => {
    expect(meta.fullPrompt).toBe(INTERFACE_LINES_CONSTELLATION_FIELD_PROMPT);
    expect(
      INTERFACE_LINES_CONSTELLATION_FIELD_PROMPT.startsWith(
        '# Integrate <ConstellationField />',
      ),
    ).toBe(true);
    expect(INTERFACE_LINES_CONSTELLATION_FIELD_PROMPT).toContain('SHA-256 1920ad4fe34f');
    expect(INTERFACE_LINES_CONSTELLATION_FIELD_PROMPT).toContain('@designcodeio/threeui');
    expect(INTERFACE_LINES_CONSTELLATION_FIELD_PROMPT).toContain('variant="interface-lines"');
    expect(INTERFACE_LINES_CONSTELLATION_FIELD_PROMPT).toContain('mode="dark"');
    expect(INTERFACE_LINES_CONSTELLATION_FIELD_PROMPT).toContain(
      'https://threeui.com/source-code/interface-lines.json',
    );
    expect(INTERFACE_LINES_CONSTELLATION_FIELD_PROMPT).not.toContain('Role & Prerequisites');
    expect(INTERFACE_LINES_CONSTELLATION_FIELD_PROMPT).not.toContain('Test-Driven Development');
    expect(meta.fullPrompt.length).toBe(INTERFACE_LINES_CONSTELLATION_FIELD_PROMPT.length);
  });

  it('uses interface-lines-constellation-field routes', () => {
    expect(meta.detailPath).toBe('/templates/interface-lines-constellation-field');
    expect(meta.livePath).toBe(ROUTES.INTERFACE_LINES_CONSTELLATION_FIELD);
    expect(ROUTES.INTERFACE_LINES_CONSTELLATION_FIELD).toBe(
      '/p/interface-lines-constellation-field',
    );
  });

  it('copies the npm preview snippet for this card id', () => {
    const snippet = getKmotionNpmSnippet(meta.id, 'react');
    expect(snippet).toContain(`npm install ${KMOTION_PACKAGE}`);
    expect(snippet).toContain(`<Preview id="${meta.id}" />`);
    expect(KMOTION_TEMPLATE_IDS).toContain(meta.id);
    expect(embedUrl(meta.id)).toBe(`http://localhost:5173/p/${meta.id}`);
  });
});

describe('Interface Lines source contract', () => {
  it('keeps the configured interface-lines host defaults', () => {
    expect(SOURCE_REVISION).toBe('1920ad4fe34f');
    expect(VARIANT_ID).toBe('interface-lines');
    expect(SOURCE_URL).toBe('/effects/interface-lines.html');
    expect(INTERFACE_LINES_DEFAULT_PROPS).toEqual(INTERFACE_LINES_DEFAULTS);
    expect(INTERFACE_LINES_HTML_SHA256).toBe(
      '608cbc6976996b8a5b6c4aaba4bee4d6f2dd44579b819df45914f35bc310d2cc',
    );
  });

  it('lists every required packaged asset for hash checks', () => {
    expect(ASSET_MANIFEST).toHaveLength(4);
    expect(ASSET_MANIFEST.every((entry) => entry.path && entry.bytes && entry.sha256)).toBe(true);
  });
});
