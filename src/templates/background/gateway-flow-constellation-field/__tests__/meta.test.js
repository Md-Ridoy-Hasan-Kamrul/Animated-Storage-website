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
  GATEWAY_FLOW_DEFAULT_PROPS,
  GATEWAY_FLOW_HTML_SHA256,
  PREVIEW_STILL,
  SOURCE_REVISION,
  SOURCE_URL,
  VARIANT_ID,
} from '../constants';
import { meta } from '../meta';
import { GATEWAY_FLOW_CONSTELLATION_FIELD_PROMPT } from '../prompt';
import { GATEWAY_FLOW_DEFAULTS } from '../ConstellationField';

describe('Gateway Flow Constellation Field — meta', () => {
  it('registers the Background card Gateway Flow Constellation Field', () => {
    expect(meta.id).toBe(CARD_ID);
    expect(meta.title).toBe(CARD_TITLE);
    expect(meta.title).toBe('Gateway Flow Constellation Field');
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
      '/images/Assets%20Gateway%20Flow%20Constellation%20Field/GatewayFlowConstellationField.png',
    );
  });

  it('binds copy prompt to the exact pasted body', () => {
    expect(meta.fullPrompt).toBe(GATEWAY_FLOW_CONSTELLATION_FIELD_PROMPT);
    expect(
      GATEWAY_FLOW_CONSTELLATION_FIELD_PROMPT.startsWith(
        '# Integrate <ConstellationField />',
      ),
    ).toBe(true);
    expect(GATEWAY_FLOW_CONSTELLATION_FIELD_PROMPT).toContain('SHA-256 1920ad4fe34f');
    expect(GATEWAY_FLOW_CONSTELLATION_FIELD_PROMPT).toContain('@designcodeio/threeui');
    expect(GATEWAY_FLOW_CONSTELLATION_FIELD_PROMPT).toContain('variant="gateway-flow"');
    expect(GATEWAY_FLOW_CONSTELLATION_FIELD_PROMPT).toContain('mode="dark"');
    expect(GATEWAY_FLOW_CONSTELLATION_FIELD_PROMPT).toContain(
      'https://threeui.com/source-code/gateway-flow.json',
    );
    expect(GATEWAY_FLOW_CONSTELLATION_FIELD_PROMPT).not.toContain('Role & Prerequisites');
    expect(GATEWAY_FLOW_CONSTELLATION_FIELD_PROMPT).not.toContain('Test-Driven Development');
    expect(meta.fullPrompt.length).toBe(GATEWAY_FLOW_CONSTELLATION_FIELD_PROMPT.length);
  });

  it('uses gateway-flow-constellation-field routes', () => {
    expect(meta.detailPath).toBe('/templates/gateway-flow-constellation-field');
    expect(meta.livePath).toBe(ROUTES.GATEWAY_FLOW_CONSTELLATION_FIELD);
    expect(ROUTES.GATEWAY_FLOW_CONSTELLATION_FIELD).toBe(
      '/p/gateway-flow-constellation-field',
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

describe('Gateway Flow source contract', () => {
  it('keeps the configured gateway-flow host defaults', () => {
    expect(SOURCE_REVISION).toBe('1920ad4fe34f');
    expect(VARIANT_ID).toBe('gateway-flow');
    expect(SOURCE_URL).toBe('/effects/gateway-flow.html');
    expect(GATEWAY_FLOW_DEFAULT_PROPS).toEqual(GATEWAY_FLOW_DEFAULTS);
    expect(GATEWAY_FLOW_HTML_SHA256).toBe(
      'c5a1de43138ffba96b9f0ecdcf3c054ae251ec94344e88c6ad502bae362b17d0',
    );
  });

  it('lists every required packaged asset for hash checks', () => {
    expect(ASSET_MANIFEST).toHaveLength(4);
    expect(ASSET_MANIFEST.every((entry) => entry.path && entry.bytes && entry.sha256)).toBe(true);
  });
});
