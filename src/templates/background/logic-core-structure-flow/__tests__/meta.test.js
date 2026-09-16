import { ROUTES } from '../../../../config';
import { TEMPLATES as KMOTION_TEMPLATE_IDS, embedUrl } from '../../../../../packages/kmotion/src/core';
import { getKmotionNpmSnippet, KMOTION_PACKAGE } from '../../../../utils/kmotionNpmSnippet';
import { CATEGORIES, CATEGORY_SLUGS } from '../../../../templates';
import {
  ASSET_MANIFEST,
  CARD_ID,
  CARD_TITLE,
  FOCUSED_DOCUMENT_SHA256,
  PLATFORM_CORE_HTML_SHA256,
  SOURCE_REVISION,
  SOURCE_URL,
  STRUCTURE_FLOW_DEFAULT_PROPS,
  THREEUI_CSS_SHA256,
} from '../constants';
import { meta } from '../meta';
import { LOGIC_CORE_STRUCTURE_FLOW_PROMPT } from '../prompt';

describe('Logic Core Structure Flow — meta', () => {
  it('registers the Background card Logic Core Structure Flow', () => {
    expect(meta.id).toBe(CARD_ID);
    expect(meta.title).toBe(CARD_TITLE);
    expect(meta.title).toBe('Logic Core Structure Flow');
    expect(meta.category).toBe('Background');
    expect(meta.categorySlug).toBe('background');
    expect(meta.height).toBe('h-[272px]');
  });

  it('keeps Background on the gallery navbar tabs', () => {
    expect(CATEGORIES).toContain('Background');
    expect(CATEGORY_SLUGS.Background).toBe('background');
  });

  it('binds copy prompt to the exact pasted body', () => {
    expect(meta.fullPrompt).toBe(LOGIC_CORE_STRUCTURE_FLOW_PROMPT);
    expect(
      LOGIC_CORE_STRUCTURE_FLOW_PROMPT.startsWith('# Integrate <StructureFlowCollection />'),
    ).toBe(true);
    expect(LOGIC_CORE_STRUCTURE_FLOW_PROMPT).toContain('SHA-256 40eb5bac81e3');
    expect(LOGIC_CORE_STRUCTURE_FLOW_PROMPT).toContain('@designcodeio/threeui');
    expect(LOGIC_CORE_STRUCTURE_FLOW_PROMPT).toContain('variant="logic-core"');
    expect(LOGIC_CORE_STRUCTURE_FLOW_PROMPT).toContain('hue={0}');
    expect(LOGIC_CORE_STRUCTURE_FLOW_PROMPT).toContain('saturation={1.00}');
    expect(LOGIC_CORE_STRUCTURE_FLOW_PROMPT).toContain('brightness={1.00}');
    expect(LOGIC_CORE_STRUCTURE_FLOW_PROMPT).toContain(
      'https://threeui.com/source-code/logic-core.json',
    );
    expect(LOGIC_CORE_STRUCTURE_FLOW_PROMPT).not.toContain('Role & Prerequisites');
    expect(LOGIC_CORE_STRUCTURE_FLOW_PROMPT).not.toContain('Test-Driven Development');
    expect(meta.fullPrompt.length).toBe(LOGIC_CORE_STRUCTURE_FLOW_PROMPT.length);
  });

  it('uses logic-core-structure-flow routes', () => {
    expect(meta.detailPath).toBe('/templates/logic-core-structure-flow');
    expect(meta.livePath).toBe(ROUTES.LOGIC_CORE_STRUCTURE_FLOW);
    expect(ROUTES.LOGIC_CORE_STRUCTURE_FLOW).toBe('/p/logic-core-structure-flow');
  });

  it('copies the npm preview snippet for this card id', () => {
    const snippet = getKmotionNpmSnippet(meta.id, 'react');
    expect(snippet).toContain(`npm install ${KMOTION_PACKAGE}`);
    expect(snippet).toContain(`<Preview id="${meta.id}" />`);
    expect(KMOTION_TEMPLATE_IDS).toContain(meta.id);
    expect(embedUrl(meta.id)).toBe(`http://localhost:5173/p/${meta.id}`);
  });
});

describe('Logic Core Structure Flow source contract', () => {
  it('keeps the configured host defaults', () => {
    expect(SOURCE_URL).toBe('/effects/logic-core-structure-flow.html');
    expect(SOURCE_REVISION).toBe('40eb5bac81e3');
    expect(PLATFORM_CORE_HTML_SHA256).toBe(
      '0f6889add89b389ba687fc6828c1f9415e5d8d54005492a91f3a79641ba42e31',
    );
    expect(THREEUI_CSS_SHA256).toBe(
      'efe4447139f1358dd8e9be68edf6fa46cbefbd1de423a4d6c439ca61d2c8eccf',
    );
    expect(FOCUSED_DOCUMENT_SHA256).toBe(
      '5447af3d242309ebb2ad842eea08aab340a784ac6f13a7342bbc26c7a86055a1',
    );
    expect(STRUCTURE_FLOW_DEFAULT_PROPS).toEqual({
      variant: 'logic-core',
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
