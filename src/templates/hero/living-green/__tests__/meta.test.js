import { ROUTES } from '../../../../config';
import { TEMPLATES as KMOTION_TEMPLATE_IDS, embedUrl } from '../../../../../packages/kmotion/src/core';
import { getKmotionNpmSnippet, KMOTION_PACKAGE } from '../../../../utils/kmotionNpmSnippet';
import { CATEGORIES, CATEGORY_SLUGS } from '../../../../templates';
import {
  ASSET_MANIFEST,
  CARD_ID,
  CARD_TITLE,
  INNER_GREEN_HTML_SHA256,
  SOURCE_REVISION,
  SOURCE_URL,
  SYLVA_DEFAULT_PROPS,
  SYLVA_VARIANT,
} from '../constants';
import { meta } from '../meta';
import { SYLVA_PROMPT } from '../prompt';

describe('Living Green Sylva meta', () => {
  it('registers the Hero card Living Green Sylva', () => {
    expect(meta.id).toBe(CARD_ID);
    expect(meta.title).toBe(CARD_TITLE);
    expect(meta.title).toBe('Living Green Sylva');
    expect(meta.category).toBe('Hero');
    expect(meta.categorySlug).toBe('hero');
    expect(meta.height).toBe('h-[272px]');
  });

  it('keeps Hero on the gallery navbar tabs', () => {
    expect(CATEGORIES).toContain('Hero');
    expect(CATEGORY_SLUGS.Hero).toBe('hero');
  });

  it('binds copy prompt to the exact pasted body', () => {
    expect(meta.fullPrompt).toBe(SYLVA_PROMPT);
    expect(SYLVA_PROMPT.startsWith('# Integrate <SylvaHero />')).toBe(true);
    expect(SYLVA_PROMPT).toContain('SHA-256 05f359ce157a');
    expect(SYLVA_PROMPT).toContain('@designcodeio/threeui');
    expect(SYLVA_PROMPT).toContain('variant="living-green"');
    expect(SYLVA_PROMPT).toContain('headingFont="lexend"');
    expect(SYLVA_PROMPT).toContain('primaryColor="#ffffff"');
    expect(SYLVA_PROMPT).toContain(
      'https://threeui.com/landing-pages/inner-green-3d.html',
    );
    expect(SYLVA_PROMPT).not.toContain('Role & Prerequisites');
    expect(SYLVA_PROMPT).not.toContain('Test-Driven Development');
    expect(meta.fullPrompt.length).toBe(SYLVA_PROMPT.length);
  });

  it('uses living-green routes', () => {
    expect(meta.detailPath).toBe('/templates/living-green');
    expect(meta.livePath).toBe(ROUTES.LIVING_GREEN);
    expect(ROUTES.LIVING_GREEN).toBe('/p/living-green');
  });

  it('copies the npm preview snippet for this card id', () => {
    const snippet = getKmotionNpmSnippet(meta.id, 'react');
    expect(snippet).toContain(`npm install ${KMOTION_PACKAGE}`);
    expect(snippet).toContain(`<Preview id="${meta.id}" />`);
    expect(KMOTION_TEMPLATE_IDS).toContain(meta.id);
    expect(embedUrl(meta.id)).toBe(`http://localhost:5173/p/${meta.id}`);
  });
});

describe('Sylva Living Green source contract', () => {
  it('keeps the configured host defaults', () => {
    expect(SOURCE_URL).toBe('/landing-pages/inner-green-3d.html');
    expect(SOURCE_REVISION).toBe('05f359ce157a');
    expect(INNER_GREEN_HTML_SHA256).toBe(
      '69c3694bd63f44ef9f007ebe4dac57a83e4402e0cdf6b54dd10b96dd4f05e197',
    );
    expect(SYLVA_VARIANT).toBe('living-green');
    expect(SYLVA_DEFAULT_PROPS).toEqual({
      variant: 'living-green',
      headingFont: 'lexend',
      bodyFont: 'lexend',
      headingWeight: '300',
      bodyWeight: '300',
      primaryColor: '#ffffff',
      headingSize: 63,
      bodySize: 16.5,
      headingLetterSpacing: -0.006,
    });
  });

  it('lists every required packaged asset for hash checks', () => {
    expect(ASSET_MANIFEST).toHaveLength(5);
    expect(ASSET_MANIFEST.every((entry) => entry.path && entry.bytes && entry.sha256)).toBe(
      true,
    );
  });
});
