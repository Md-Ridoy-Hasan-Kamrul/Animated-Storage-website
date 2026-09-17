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
  BLUE_SCREEN_CRT_DEFAULT_PROPS,
  CARD_ID,
  CARD_TITLE,
  CRT_SHADERS_SHA256,
  SOURCE_REVISION,
  VARIANT_ID,
} from '../constants';
import { meta } from '../meta';
import { BLUE_SCREEN_CRT_PROMPT } from '../prompt';
import { CRT_STYLES } from '../crtScreens';

describe('Blue Screen CRT — meta', () => {
  it('registers the Background card Blue Screen CRT', () => {
    expect(meta.id).toBe(CARD_ID);
    expect(meta.title).toBe(CARD_TITLE);
    expect(meta.title).toBe('Blue Screen CRT');
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
    expect(meta.fullPrompt).toBe(BLUE_SCREEN_CRT_PROMPT);
    expect(BLUE_SCREEN_CRT_PROMPT.startsWith('# Integrate <CrtBackground />')).toBe(true);
    expect(BLUE_SCREEN_CRT_PROMPT).toContain('SHA-256 860a1eb1d4c9');
    expect(BLUE_SCREEN_CRT_PROMPT).toContain('@designcodeio/threeui');
    expect(BLUE_SCREEN_CRT_PROMPT).toContain('variant="blue-screen"');
    expect(BLUE_SCREEN_CRT_PROMPT).toContain('speed={1.00}');
    expect(BLUE_SCREEN_CRT_PROMPT).not.toContain('typeSpeed');
    expect(BLUE_SCREEN_CRT_PROMPT).not.toContain('variant="terminal"');
    expect(BLUE_SCREEN_CRT_PROMPT).not.toContain('variant="cinematic"');
    expect(BLUE_SCREEN_CRT_PROMPT).toContain('https://threeui.com/source-code/crt.json');
    expect(BLUE_SCREEN_CRT_PROMPT).not.toContain('Role & Prerequisites');
    expect(BLUE_SCREEN_CRT_PROMPT).not.toContain('Test-Driven Development');
    expect(meta.fullPrompt.length).toBe(BLUE_SCREEN_CRT_PROMPT.length);
  });

  it('uses blue-screen-crt routes', () => {
    expect(meta.detailPath).toBe('/templates/blue-screen-crt');
    expect(meta.livePath).toBe(ROUTES.BLUE_SCREEN_CRT);
    expect(ROUTES.BLUE_SCREEN_CRT).toBe('/p/blue-screen-crt');
  });

  it('copies the npm preview snippet for this card id', () => {
    const snippet = getKmotionNpmSnippet(meta.id, 'react');
    expect(snippet).toContain(`npm install ${KMOTION_PACKAGE}`);
    expect(snippet).toContain(`<Preview id="${meta.id}" />`);
    expect(KMOTION_TEMPLATE_IDS).toContain(meta.id);
    expect(embedUrl(meta.id)).toBe(`http://localhost:5173/p/${meta.id}`);
  });
});

describe('Blue Screen CRT source contract', () => {
  it('keeps the configured blue-screen host defaults', () => {
    expect(SOURCE_REVISION).toBe('860a1eb1d4c9');
    expect(VARIANT_ID).toBe('blue-screen');
    expect(BLUE_SCREEN_CRT_DEFAULT_PROPS.variant).toBe('blue-screen');
    expect(BLUE_SCREEN_CRT_DEFAULT_PROPS.speed).toBe(1);
    expect(BLUE_SCREEN_CRT_DEFAULT_PROPS.motion).toBe(1);
    expect(CRT_STYLES['blue-screen'].background).toBe('#050a24');
    expect(CRT_STYLES['blue-screen'].noise).toBe(1);
    expect(CRT_SHADERS_SHA256).toBe(
      'cf3a7c747d1cac495c705529954e2491ad885489ddd5110724f8f4b3553f1592',
    );
  });

  it('lists every required packaged asset for hash checks', () => {
    expect(ASSET_MANIFEST).toHaveLength(5);
    expect(ASSET_MANIFEST.every((entry) => entry.path && entry.bytes && entry.sha256)).toBe(true);
  });
});
