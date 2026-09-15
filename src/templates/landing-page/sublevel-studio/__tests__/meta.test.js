import { ROUTES } from '../../../../config';
import { TEMPLATES as KMOTION_TEMPLATE_IDS, embedUrl } from '../../../../../packages/kmotion/src/core';
import { getKmotionNpmSnippet, KMOTION_PACKAGE } from '../../../../utils/kmotionNpmSnippet';
import { CATEGORIES, CATEGORY_SLUGS } from '../../../../templates';
import {
  ASSET_MANIFEST,
  CARD_ID,
  CARD_TITLE,
  SOURCE_REVISION,
  SOURCE_URL,
  SUBLEVEL_STUDIO_HTML_SHA256,
} from '../constants';
import { meta } from '../meta';
import { SUBLEVEL_STUDIO_PROMPT } from '../prompt';

describe('Sublevel Studio meta', () => {
  it('registers the Landing Page card Sublevel Studio', () => {
    expect(meta.id).toBe(CARD_ID);
    expect(meta.title).toBe(CARD_TITLE);
    expect(meta.title).toBe('Sublevel Studio');
    expect(meta.category).toBe('Landing Page');
    expect(meta.categorySlug).toBe('landing-page');
    expect(meta.height).toBe('h-[272px]');
  });

  it('keeps Landing Page on the gallery navbar tabs', () => {
    expect(CATEGORIES).toContain('Landing Page');
    expect(CATEGORY_SLUGS['Landing Page']).toBe('landing-page');
  });

  it('binds copy prompt to the exact pasted body', () => {
    expect(meta.fullPrompt).toBe(SUBLEVEL_STUDIO_PROMPT);
    expect(SUBLEVEL_STUDIO_PROMPT.startsWith('# Integrate <SublevelStudioLandingPage />')).toBe(
      true,
    );
    expect(SUBLEVEL_STUDIO_PROMPT).toContain('SHA-256 91db5c1bb779');
    expect(SUBLEVEL_STUDIO_PROMPT).toContain('@designcodeio/threeui');
    expect(SUBLEVEL_STUDIO_PROMPT).toContain('<SublevelStudioLandingPage />');
    expect(SUBLEVEL_STUDIO_PROMPT).toContain(
      'https://threeui.com/landing-pages/sublevel-studio.html',
    );
    expect(SUBLEVEL_STUDIO_PROMPT).not.toContain('Role & Prerequisites');
    expect(SUBLEVEL_STUDIO_PROMPT).not.toContain('Test-Driven Development');
    expect(meta.fullPrompt.length).toBe(SUBLEVEL_STUDIO_PROMPT.length);
  });

  it('uses sublevel-studio routes', () => {
    expect(meta.detailPath).toBe('/templates/sublevel-studio');
    expect(meta.livePath).toBe(ROUTES.SUBLEVEL_STUDIO);
    expect(ROUTES.SUBLEVEL_STUDIO).toBe('/p/sublevel-studio');
  });

  it('copies the npm preview snippet for this card id', () => {
    const snippet = getKmotionNpmSnippet(meta.id, 'react');
    expect(snippet).toContain(`npm install ${KMOTION_PACKAGE}`);
    expect(snippet).toContain(`<Preview id="${meta.id}" />`);
    expect(KMOTION_TEMPLATE_IDS).toContain(meta.id);
    expect(embedUrl(meta.id)).toBe(`http://localhost:5173/p/${meta.id}`);
  });
});

describe('Sublevel Studio source contract', () => {
  it('keeps the configured host defaults', () => {
    expect(SOURCE_URL).toBe('/landing-pages/sublevel-studio.html');
    expect(SOURCE_REVISION).toBe('91db5c1bb779');
    expect(SUBLEVEL_STUDIO_HTML_SHA256.startsWith(SOURCE_REVISION)).toBe(true);
  });

  it('lists every required packaged asset for hash checks', () => {
    expect(ASSET_MANIFEST).toHaveLength(1);
    expect(ASSET_MANIFEST.every((entry) => entry.path && entry.bytes && entry.sha256)).toBe(
      true,
    );
  });
});
