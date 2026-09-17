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
  CINEMATIC_CRT_DEFAULT_PROPS,
  CRT_SHADERS_SHA256,
  SOURCE_REVISION,
  VARIANT_ID,
} from '../constants';
import { meta } from '../meta';
import { CINEMATIC_CRT_PROMPT } from '../prompt';
import { CRT_STYLES } from '../crtScreens';

describe('Cinematic CRT — meta', () => {
  it('registers the Background card Cinematic CRT', () => {
    expect(meta.id).toBe(CARD_ID);
    expect(meta.title).toBe(CARD_TITLE);
    expect(meta.title).toBe('Cinematic CRT');
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
    expect(meta.fullPrompt).toBe(CINEMATIC_CRT_PROMPT);
    expect(CINEMATIC_CRT_PROMPT.startsWith('# Integrate <CrtBackground />')).toBe(true);
    expect(CINEMATIC_CRT_PROMPT).toContain('SHA-256 860a1eb1d4c9');
    expect(CINEMATIC_CRT_PROMPT).toContain('@designcodeio/threeui');
    expect(CINEMATIC_CRT_PROMPT).toContain('variant="cinematic"');
    expect(CINEMATIC_CRT_PROMPT).toContain('speed={1.00}');
    expect(CINEMATIC_CRT_PROMPT).not.toContain('typeSpeed');
    expect(CINEMATIC_CRT_PROMPT).not.toContain('variant="terminal"');
    expect(CINEMATIC_CRT_PROMPT).toContain('https://threeui.com/source-code/crt.json');
    expect(CINEMATIC_CRT_PROMPT).not.toContain('Role & Prerequisites');
    expect(CINEMATIC_CRT_PROMPT).not.toContain('Test-Driven Development');
    expect(meta.fullPrompt.length).toBe(CINEMATIC_CRT_PROMPT.length);
  });

  it('uses cinematic-crt routes', () => {
    expect(meta.detailPath).toBe('/templates/cinematic-crt');
    expect(meta.livePath).toBe(ROUTES.CINEMATIC_CRT);
    expect(ROUTES.CINEMATIC_CRT).toBe('/p/cinematic-crt');
  });

  it('copies the npm preview snippet for this card id', () => {
    const snippet = getKmotionNpmSnippet(meta.id, 'react');
    expect(snippet).toContain(`npm install ${KMOTION_PACKAGE}`);
    expect(snippet).toContain(`<Preview id="${meta.id}" />`);
    expect(KMOTION_TEMPLATE_IDS).toContain(meta.id);
    expect(embedUrl(meta.id)).toBe(`http://localhost:5173/p/${meta.id}`);
  });
});

describe('Cinematic CRT source contract', () => {
  it('keeps the configured cinematic host defaults', () => {
    expect(SOURCE_REVISION).toBe('860a1eb1d4c9');
    expect(VARIANT_ID).toBe('cinematic');
    expect(CINEMATIC_CRT_DEFAULT_PROPS.variant).toBe('cinematic');
    expect(CINEMATIC_CRT_DEFAULT_PROPS.speed).toBe(1);
    expect(CINEMATIC_CRT_DEFAULT_PROPS.motion).toBe(1);
    expect(CRT_STYLES.cinematic.background).toBe('#07070a');
    expect(CRT_STYLES.cinematic.mono).toBe(1);
    expect(CRT_SHADERS_SHA256).toBe(
      'cf3a7c747d1cac495c705529954e2491ad885489ddd5110724f8f4b3553f1592',
    );
  });

  it('lists every required packaged asset for hash checks', () => {
    expect(ASSET_MANIFEST).toHaveLength(5);
    expect(ASSET_MANIFEST.every((entry) => entry.path && entry.bytes && entry.sha256)).toBe(true);
  });
});
