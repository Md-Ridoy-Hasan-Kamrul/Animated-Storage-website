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
  CLOUD_FIELD_DEFAULT_PROPS,
  PREVIEW_STILL,
  SOURCE_REVISION,
  SOURCE_URL,
  STRATA_CLOUD_HTML_SHA256,
  VARIANT_ID,
} from '../constants';
import { meta } from '../meta';
import { CLOUD_FIELD_PORTAL_FIELD_PROMPT } from '../prompt';
import { PORTAL_FIELD_DEFAULTS } from '../PortalFieldCollection';

describe('Cloud Field Portal Field — meta', () => {
  it('registers the Background card Cloud Field Portal Field', () => {
    expect(meta.id).toBe(CARD_ID);
    expect(meta.title).toBe(CARD_TITLE);
    expect(meta.title).toBe('Cloud Field Portal Field');
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
      '/images/Assets%20Cloud%20Field%20Portal%20Field/CloudFieldPortalField.png',
    );
  });

  it('binds copy prompt to the exact pasted body', () => {
    expect(meta.fullPrompt).toBe(CLOUD_FIELD_PORTAL_FIELD_PROMPT);
    expect(
      CLOUD_FIELD_PORTAL_FIELD_PROMPT.startsWith('# Integrate <PortalFieldCollection />'),
    ).toBe(true);
    expect(CLOUD_FIELD_PORTAL_FIELD_PROMPT).toContain('SHA-256 f90e34f83d51');
    expect(CLOUD_FIELD_PORTAL_FIELD_PROMPT).toContain('@designcodeio/threeui');
    expect(CLOUD_FIELD_PORTAL_FIELD_PROMPT).toContain('variant="cloud-field"');
    expect(CLOUD_FIELD_PORTAL_FIELD_PROMPT).toContain(
      'https://threeui.com/source-code/cloud-field.json',
    );
    expect(CLOUD_FIELD_PORTAL_FIELD_PROMPT).not.toContain('Role & Prerequisites');
    expect(CLOUD_FIELD_PORTAL_FIELD_PROMPT).not.toContain('Test-Driven Development');
    expect(meta.fullPrompt.length).toBe(CLOUD_FIELD_PORTAL_FIELD_PROMPT.length);
  });

  it('uses cloud-field-portal-field routes', () => {
    expect(meta.detailPath).toBe('/templates/cloud-field-portal-field');
    expect(meta.livePath).toBe(ROUTES.CLOUD_FIELD_PORTAL_FIELD);
    expect(ROUTES.CLOUD_FIELD_PORTAL_FIELD).toBe('/p/cloud-field-portal-field');
  });

  it('copies the npm preview snippet for this card id', () => {
    const snippet = getKmotionNpmSnippet(meta.id, 'react');
    expect(snippet).toContain(`npm install ${KMOTION_PACKAGE}`);
    expect(snippet).toContain(`<Preview id="${meta.id}" />`);
    expect(KMOTION_TEMPLATE_IDS).toContain(meta.id);
    expect(embedUrl(meta.id)).toBe(`http://localhost:5173/p/${meta.id}`);
  });
});

describe('Cloud Field source contract', () => {
  it('keeps the configured cloud-field host defaults', () => {
    expect(SOURCE_REVISION).toBe('f90e34f83d51');
    expect(VARIANT_ID).toBe('cloud-field');
    expect(SOURCE_URL).toBe('/effects/cloud-field.html');
    expect(CLOUD_FIELD_DEFAULT_PROPS).toEqual(PORTAL_FIELD_DEFAULTS);
    expect(STRATA_CLOUD_HTML_SHA256).toBe(
      'c5a8085b413d310fe1c9a2deb39bcd5d8ecf0d545a4462f576a1c9b9c49f34fc',
    );
  });

  it('lists every required packaged asset for hash checks', () => {
    expect(ASSET_MANIFEST).toHaveLength(4);
    expect(ASSET_MANIFEST.every((entry) => entry.path && entry.bytes && entry.sha256)).toBe(true);
  });
});
