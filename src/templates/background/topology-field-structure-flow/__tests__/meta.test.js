import { ROUTES } from '../../../../config';
import { TEMPLATES as KMOTION_TEMPLATE_IDS, embedUrl } from '../../../../../packages/kmotion/src/core';
import { getKmotionNpmSnippet, KMOTION_PACKAGE } from '../../../../utils/kmotionNpmSnippet';
import { CATEGORIES, CATEGORY_SLUGS } from '../../../../templates';
import {
  ASSET_MANIFEST,
  CARD_ID,
  CARD_TITLE,
  FOCUSED_DOCUMENT_SHA256,
  NEXUS_TOPOLOGY_HTML_SHA256,
  SOURCE_REVISION,
  SOURCE_URL,
  STRUCTURE_FLOW_DEFAULT_PROPS,
  THREEUI_CSS_SHA256,
} from '../constants';
import { meta } from '../meta';
import { TOPOLOGY_FIELD_STRUCTURE_FLOW_PROMPT } from '../prompt';

describe('Topology Field Structure Flow — meta', () => {
  it('registers the Background card Topology Field Structure Flow', () => {
    expect(meta.id).toBe(CARD_ID);
    expect(meta.title).toBe(CARD_TITLE);
    expect(meta.title).toBe('Topology Field Structure Flow');
    expect(meta.category).toBe('Background');
    expect(meta.categorySlug).toBe('background');
    expect(meta.height).toBe('h-[272px]');
  });

  it('keeps Background on the gallery navbar tabs', () => {
    expect(CATEGORIES).toContain('Background');
    expect(CATEGORY_SLUGS.Background).toBe('background');
  });

  it('binds copy prompt to the exact pasted body', () => {
    expect(meta.fullPrompt).toBe(TOPOLOGY_FIELD_STRUCTURE_FLOW_PROMPT);
    expect(
      TOPOLOGY_FIELD_STRUCTURE_FLOW_PROMPT.startsWith('# Integrate <StructureFlowCollection />'),
    ).toBe(true);
    expect(TOPOLOGY_FIELD_STRUCTURE_FLOW_PROMPT).toContain('SHA-256 40eb5bac81e3');
    expect(TOPOLOGY_FIELD_STRUCTURE_FLOW_PROMPT).toContain('@designcodeio/threeui');
    expect(TOPOLOGY_FIELD_STRUCTURE_FLOW_PROMPT).toContain('variant="topology-field"');
    expect(TOPOLOGY_FIELD_STRUCTURE_FLOW_PROMPT).toContain('hue={0}');
    expect(TOPOLOGY_FIELD_STRUCTURE_FLOW_PROMPT).toContain('saturation={1.00}');
    expect(TOPOLOGY_FIELD_STRUCTURE_FLOW_PROMPT).toContain('brightness={1.00}');
    expect(TOPOLOGY_FIELD_STRUCTURE_FLOW_PROMPT).toContain(
      'https://threeui.com/source-code/topology-field.json',
    );
    expect(TOPOLOGY_FIELD_STRUCTURE_FLOW_PROMPT).not.toContain('Role & Prerequisites');
    expect(TOPOLOGY_FIELD_STRUCTURE_FLOW_PROMPT).not.toContain('Test-Driven Development');
    expect(meta.fullPrompt.length).toBe(TOPOLOGY_FIELD_STRUCTURE_FLOW_PROMPT.length);
  });

  it('uses topology-field-structure-flow routes', () => {
    expect(meta.detailPath).toBe('/templates/topology-field-structure-flow');
    expect(meta.livePath).toBe(ROUTES.TOPOLOGY_FIELD_STRUCTURE_FLOW);
    expect(ROUTES.TOPOLOGY_FIELD_STRUCTURE_FLOW).toBe('/p/topology-field-structure-flow');
  });

  it('copies the npm preview snippet for this card id', () => {
    const snippet = getKmotionNpmSnippet(meta.id, 'react');
    expect(snippet).toContain(`npm install ${KMOTION_PACKAGE}`);
    expect(snippet).toContain(`<Preview id="${meta.id}" />`);
    expect(KMOTION_TEMPLATE_IDS).toContain(meta.id);
    expect(embedUrl(meta.id)).toBe(`http://localhost:5173/p/${meta.id}`);
  });
});

describe('Topology Field Structure Flow source contract', () => {
  it('keeps the configured host defaults', () => {
    expect(SOURCE_URL).toBe('/effects/topology-field-structure-flow.html');
    expect(SOURCE_REVISION).toBe('40eb5bac81e3');
    expect(NEXUS_TOPOLOGY_HTML_SHA256).toBe(
      '2cf632d75ed5a88b32df82839cf9608d8542f7e08b5a0e3072fce94825d1c98d',
    );
    expect(THREEUI_CSS_SHA256).toBe(
      'efe4447139f1358dd8e9be68edf6fa46cbefbd1de423a4d6c439ca61d2c8eccf',
    );
    expect(FOCUSED_DOCUMENT_SHA256).toBe(
      '0cb7ffda0d98fd782c3fe8e5daac82170fd44d3ada1576d2a6fb1466242868e8',
    );
    expect(STRUCTURE_FLOW_DEFAULT_PROPS).toEqual({
      variant: 'topology-field',
      hue: 0,
      saturation: 1,
      brightness: 1,
    });
  });

  it('lists every required packaged asset for hash checks', () => {
    expect(ASSET_MANIFEST).toHaveLength(3);
    expect(ASSET_MANIFEST.every((entry) => entry.path && entry.bytes && entry.sha256)).toBe(
      true,
    );
  });
});
