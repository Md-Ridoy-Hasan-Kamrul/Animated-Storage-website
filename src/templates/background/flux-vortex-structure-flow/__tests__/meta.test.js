import { ROUTES } from '../../../../config';
import { TEMPLATES as KMOTION_TEMPLATE_IDS, embedUrl } from '../../../../../packages/kmotion/src/core';
import { getKmotionNpmSnippet, KMOTION_PACKAGE } from '../../../../utils/kmotionNpmSnippet';
import { CATEGORIES, CATEGORY_SLUGS } from '../../../../templates';
import {
  ASSET_MANIFEST,
  CARD_ID,
  CARD_TITLE,
  FOCUSED_DOCUMENT_SHA256,
  FLUX_VORTEX_HTML_SHA256,
  SOURCE_REVISION,
  SOURCE_URL,
  STRUCTURE_FLOW_DEFAULT_PROPS,
  THREEUI_CSS_SHA256,
} from '../constants';
import { meta } from '../meta';
import { FLUX_VORTEX_STRUCTURE_FLOW_PROMPT } from '../prompt';

describe('Flux Vortex Structure Flow — meta', () => {
  it('registers the Background card Flux Vortex Structure Flow', () => {
    expect(meta.id).toBe(CARD_ID);
    expect(meta.title).toBe(CARD_TITLE);
    expect(meta.title).toBe('Flux Vortex Structure Flow');
    expect(meta.category).toBe('Background');
    expect(meta.categorySlug).toBe('background');
    expect(meta.height).toBe('h-[272px]');
  });

  it('keeps Background on the gallery navbar tabs', () => {
    expect(CATEGORIES).toContain('Background');
    expect(CATEGORY_SLUGS.Background).toBe('background');
  });

  it('binds copy prompt to the exact pasted body', () => {
    expect(meta.fullPrompt).toBe(FLUX_VORTEX_STRUCTURE_FLOW_PROMPT);
    expect(
      FLUX_VORTEX_STRUCTURE_FLOW_PROMPT.startsWith('# Integrate <StructureFlowCollection />'),
    ).toBe(true);
    expect(FLUX_VORTEX_STRUCTURE_FLOW_PROMPT).toContain('SHA-256 40eb5bac81e3');
    expect(FLUX_VORTEX_STRUCTURE_FLOW_PROMPT).toContain('@designcodeio/threeui');
    expect(FLUX_VORTEX_STRUCTURE_FLOW_PROMPT).toContain('variant="flux-vortex"');
    expect(FLUX_VORTEX_STRUCTURE_FLOW_PROMPT).toContain('speed={1.00}');
    expect(FLUX_VORTEX_STRUCTURE_FLOW_PROMPT).toContain('size={1.00}');
    expect(FLUX_VORTEX_STRUCTURE_FLOW_PROMPT).toContain('length={1.00}');
    expect(FLUX_VORTEX_STRUCTURE_FLOW_PROMPT).toContain('density={1.00}');
    expect(FLUX_VORTEX_STRUCTURE_FLOW_PROMPT).toContain('opacity={1.00}');
    expect(FLUX_VORTEX_STRUCTURE_FLOW_PROMPT).toContain('hue={0}');
    expect(FLUX_VORTEX_STRUCTURE_FLOW_PROMPT).toContain(
      'https://threeui.com/source-code/flux-vortex.json',
    );
    expect(FLUX_VORTEX_STRUCTURE_FLOW_PROMPT).not.toContain('Role & Prerequisites');
    expect(FLUX_VORTEX_STRUCTURE_FLOW_PROMPT).not.toContain('Test-Driven Development');
    expect(meta.fullPrompt.length).toBe(FLUX_VORTEX_STRUCTURE_FLOW_PROMPT.length);
  });

  it('uses flux-vortex-structure-flow routes', () => {
    expect(meta.detailPath).toBe('/templates/flux-vortex-structure-flow');
    expect(meta.livePath).toBe(ROUTES.FLUX_VORTEX_STRUCTURE_FLOW);
    expect(ROUTES.FLUX_VORTEX_STRUCTURE_FLOW).toBe('/p/flux-vortex-structure-flow');
  });

  it('copies the npm preview snippet for this card id', () => {
    const snippet = getKmotionNpmSnippet(meta.id, 'react');
    expect(snippet).toContain(`npm install ${KMOTION_PACKAGE}`);
    expect(snippet).toContain(`<Preview id="${meta.id}" />`);
    expect(KMOTION_TEMPLATE_IDS).toContain(meta.id);
    expect(embedUrl(meta.id)).toBe(`http://localhost:5173/p/${meta.id}`);
  });
});

describe('Flux Vortex Structure Flow source contract', () => {
  it('keeps the configured host defaults', () => {
    expect(SOURCE_URL).toBe('/effects/flux-vortex-structure-flow.html');
    expect(SOURCE_REVISION).toBe('40eb5bac81e3');
    expect(FLUX_VORTEX_HTML_SHA256).toBe(
      'ec02a0cfd079c9345dc11549653b1a52feac11f98ae10051a786da65710b0f1c',
    );
    expect(THREEUI_CSS_SHA256).toBe(
      'efe4447139f1358dd8e9be68edf6fa46cbefbd1de423a4d6c439ca61d2c8eccf',
    );
    expect(FOCUSED_DOCUMENT_SHA256).toBe(
      '40457ec746e01ef03f8ff9cd96ce1c1d6729787112cc1513472eced8bdd4538d',
    );
    expect(STRUCTURE_FLOW_DEFAULT_PROPS).toEqual({
      variant: 'flux-vortex',
      speed: 1,
      size: 1,
      length: 1,
      density: 1,
      opacity: 1,
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
