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
  FLOW_FIELD_DEFAULT_PROPS,
  FLOW_FIELD_HTML_SHA256,
  PREVIEW_STILL,
  SOURCE_REVISION,
  SOURCE_URL,
  VARIANT_ID,
} from '../constants';
import { meta } from '../meta';
import { FLOW_FIELD_PORTAL_FIELD_PROMPT } from '../prompt';
import { PORTAL_FIELD_DEFAULTS } from '../PortalFieldCollection';

describe('Flow Field Portal Field — meta', () => {
  it('registers the Background card Flow Field Portal Field', () => {
    expect(meta.id).toBe(CARD_ID);
    expect(meta.title).toBe(CARD_TITLE);
    expect(meta.title).toBe('Flow Field Portal Field');
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
      '/images/Assets%20Flow%20Field%20Portal%20Field/FlowFieldPortalField.png',
    );
  });

  it('binds copy prompt to the exact pasted body', () => {
    expect(meta.fullPrompt).toBe(FLOW_FIELD_PORTAL_FIELD_PROMPT);
    expect(
      FLOW_FIELD_PORTAL_FIELD_PROMPT.startsWith('# Integrate <PortalFieldCollection />'),
    ).toBe(true);
    expect(FLOW_FIELD_PORTAL_FIELD_PROMPT).toContain('SHA-256 f90e34f83d51');
    expect(FLOW_FIELD_PORTAL_FIELD_PROMPT).toContain('@designcodeio/threeui');
    expect(FLOW_FIELD_PORTAL_FIELD_PROMPT).toContain('variant="flow-field"');
    expect(FLOW_FIELD_PORTAL_FIELD_PROMPT).toContain(
      'https://threeui.com/source-code/flow-field.json',
    );
    expect(FLOW_FIELD_PORTAL_FIELD_PROMPT).not.toContain('Role & Prerequisites');
    expect(FLOW_FIELD_PORTAL_FIELD_PROMPT).not.toContain('Test-Driven Development');
    expect(meta.fullPrompt.length).toBe(FLOW_FIELD_PORTAL_FIELD_PROMPT.length);
  });

  it('uses flow-field-portal-field routes', () => {
    expect(meta.detailPath).toBe('/templates/flow-field-portal-field');
    expect(meta.livePath).toBe(ROUTES.FLOW_FIELD_PORTAL_FIELD);
    expect(ROUTES.FLOW_FIELD_PORTAL_FIELD).toBe('/p/flow-field-portal-field');
  });

  it('copies the npm preview snippet for this card id', () => {
    const snippet = getKmotionNpmSnippet(meta.id, 'react');
    expect(snippet).toContain(`npm install ${KMOTION_PACKAGE}`);
    expect(snippet).toContain(`<Preview id="${meta.id}" />`);
    expect(KMOTION_TEMPLATE_IDS).toContain(meta.id);
    expect(embedUrl(meta.id)).toBe(`http://localhost:5173/p/${meta.id}`);
  });
});

describe('Flow Field source contract', () => {
  it('keeps the configured flow-field host defaults', () => {
    expect(SOURCE_REVISION).toBe('f90e34f83d51');
    expect(VARIANT_ID).toBe('flow-field');
    expect(SOURCE_URL).toBe('/effects/flow-field.html');
    expect(FLOW_FIELD_DEFAULT_PROPS).toEqual(PORTAL_FIELD_DEFAULTS);
    expect(FLOW_FIELD_HTML_SHA256).toBe(
      '78eaf8ce34317bb66c44b72069ff36c622987ef61d3e703e8ea5800e089eb0b2',
    );
  });

  it('lists every required packaged asset for hash checks', () => {
    expect(ASSET_MANIFEST).toHaveLength(4);
    expect(ASSET_MANIFEST.every((entry) => entry.path && entry.bytes && entry.sha256)).toBe(true);
  });
});
