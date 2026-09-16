import { ROUTES } from '../../../../config';
import { TEMPLATES as KMOTION_TEMPLATE_IDS, embedUrl } from '../../../../../packages/kmotion/src/core';
import { getKmotionNpmSnippet, KMOTION_PACKAGE } from '../../../../utils/kmotionNpmSnippet';
import { CATEGORIES, CATEGORY_SLUGS } from '../../../../templates';
import {
  ASSET_MANIFEST,
  CARD_ID,
  CARD_TITLE,
  FOCUSED_DOCUMENT_SHA256,
  JULIAN_VANCE_NEBULA_HTML_SHA256,
  SOURCE_REVISION,
  SOURCE_URL,
  STRUCTURE_FLOW_DEFAULT_PROPS,
  THREEUI_CSS_SHA256,
} from '../constants';
import { meta } from '../meta';
import { NEBULA_STRUCTURE_FLOW_PROMPT } from '../prompt';

describe('Nebula Structure Flow — meta', () => {
  it('registers the Background card Nebula Structure Flow', () => {
    expect(meta.id).toBe(CARD_ID);
    expect(meta.title).toBe(CARD_TITLE);
    expect(meta.title).toBe('Nebula Structure Flow');
    expect(meta.category).toBe('Background');
    expect(meta.categorySlug).toBe('background');
    expect(meta.height).toBe('h-[272px]');
  });

  it('keeps Background on the gallery navbar tabs', () => {
    expect(CATEGORIES).toContain('Background');
    expect(CATEGORY_SLUGS.Background).toBe('background');
  });

  it('binds copy prompt to the exact pasted body', () => {
    expect(meta.fullPrompt).toBe(NEBULA_STRUCTURE_FLOW_PROMPT);
    expect(NEBULA_STRUCTURE_FLOW_PROMPT.startsWith('# Integrate <StructureFlowCollection />')).toBe(
      true,
    );
    expect(NEBULA_STRUCTURE_FLOW_PROMPT).toContain('SHA-256 40eb5bac81e3');
    expect(NEBULA_STRUCTURE_FLOW_PROMPT).toContain('@designcodeio/threeui');
    expect(NEBULA_STRUCTURE_FLOW_PROMPT).toContain('variant="nebula"');
    expect(NEBULA_STRUCTURE_FLOW_PROMPT).toContain('hue={0}');
    expect(NEBULA_STRUCTURE_FLOW_PROMPT).toContain('saturation={1.00}');
    expect(NEBULA_STRUCTURE_FLOW_PROMPT).toContain('brightness={1.00}');
    expect(NEBULA_STRUCTURE_FLOW_PROMPT).toContain('https://threeui.com/source-code/nebula.json');
    expect(NEBULA_STRUCTURE_FLOW_PROMPT).not.toContain('Role & Prerequisites');
    expect(NEBULA_STRUCTURE_FLOW_PROMPT).not.toContain('Test-Driven Development');
    expect(meta.fullPrompt.length).toBe(NEBULA_STRUCTURE_FLOW_PROMPT.length);
  });

  it('uses nebula-structure-flow routes', () => {
    expect(meta.detailPath).toBe('/templates/nebula-structure-flow');
    expect(meta.livePath).toBe(ROUTES.NEBULA_STRUCTURE_FLOW);
    expect(ROUTES.NEBULA_STRUCTURE_FLOW).toBe('/p/nebula-structure-flow');
  });

  it('copies the npm preview snippet for this card id', () => {
    const snippet = getKmotionNpmSnippet(meta.id, 'react');
    expect(snippet).toContain(`npm install ${KMOTION_PACKAGE}`);
    expect(snippet).toContain(`<Preview id="${meta.id}" />`);
    expect(KMOTION_TEMPLATE_IDS).toContain(meta.id);
    expect(embedUrl(meta.id)).toBe(`http://localhost:5173/p/${meta.id}`);
  });
});

describe('Nebula Structure Flow source contract', () => {
  it('keeps the configured host defaults', () => {
    expect(SOURCE_URL).toBe('/effects/nebula-structure-flow.html');
    expect(SOURCE_REVISION).toBe('40eb5bac81e3');
    expect(JULIAN_VANCE_NEBULA_HTML_SHA256).toBe(
      'e4f3bda31a5c260356790add556a2ae59bb97ad6015a1f84cc6c9801b37e5a4d',
    );
    expect(THREEUI_CSS_SHA256).toBe(
      'efe4447139f1358dd8e9be68edf6fa46cbefbd1de423a4d6c439ca61d2c8eccf',
    );
    expect(FOCUSED_DOCUMENT_SHA256).toBe(
      '2dc36bd7c77020f05f3bb480ba37bae8a416f74548a1ebaad47fb377c453fa53',
    );
    expect(STRUCTURE_FLOW_DEFAULT_PROPS).toEqual({
      variant: 'nebula',
      hue: 0,
      saturation: 1,
      brightness: 1,
    });
  });

  it('lists every required packaged asset for hash checks', () => {
    expect(ASSET_MANIFEST).toHaveLength(3);
    expect(ASSET_MANIFEST.every((entry) => entry.path && entry.bytes && entry.sha256)).toBe(true);
  });
});
