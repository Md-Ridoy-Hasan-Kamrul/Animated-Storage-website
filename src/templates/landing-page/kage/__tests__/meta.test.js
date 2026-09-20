import { ROUTES } from '../../../../config';
import { TEMPLATES as KMOTION_TEMPLATE_IDS, embedUrl } from '../../../../../packages/kmotion/src/core';
import { getKmotionNpmSnippet, KMOTION_PACKAGE } from '../../../../utils/kmotionNpmSnippet';
import { CATEGORIES, CATEGORY_SLUGS } from '../../../../templates';
import {
  ASSET_MANIFEST,
  CARD_ID,
  CARD_TITLE,
  KAGE_DEFAULT_PROPS,
  KAGE_HTML_SHA256,
  SOURCE_REVISION,
  SOURCE_URL,
} from '../constants';
import { meta } from '../meta';
import { KAGE_PROMPT } from '../prompt';
import { KAGE_SKILL, KAGE_USAGE } from '../sourceDocs';
import { resolveTemplateSourceDocs, buildCodeFetchCandidates } from '../../../../utils/resolveTemplateSourceDocs';

describe('KAGE meta', () => {
  it('registers the Landing Page card KAGE', () => {
    expect(meta.id).toBe(CARD_ID);
    expect(meta.title).toBe(CARD_TITLE);
    expect(meta.title).toBe('KAGE');
    expect(meta.category).toBe('Landing Page');
    expect(meta.categorySlug).toBe('landing-page');
    expect(meta.height).toBe('h-[272px]');
  });

  it('keeps Landing Page on the gallery navbar tabs', () => {
    expect(CATEGORIES).toContain('Landing Page');
    expect(CATEGORY_SLUGS['Landing Page']).toBe('landing-page');
  });

  it('binds copy prompt to the exact pasted body', () => {
    expect(meta.fullPrompt).toBe(KAGE_PROMPT);
    expect(KAGE_PROMPT.startsWith('# Integrate <KageLandingPage />')).toBe(true);
    expect(KAGE_PROMPT).toContain('SHA-256 c8e06b90397a');
    expect(KAGE_PROMPT).toContain('@designcodeio/threeui');
    expect(KAGE_PROMPT).toContain('headingFont="onest"');
    expect(KAGE_PROMPT).toContain('primaryColor="#e0231c"');
    expect(KAGE_PROMPT).toContain('https://threeui.com/landing-pages/kage.html');
    expect(KAGE_PROMPT).not.toContain('Role & Prerequisites');
    expect(KAGE_PROMPT).not.toContain('Test-Driven Development');
    expect(meta.fullPrompt.length).toBe(KAGE_PROMPT.length);
  });

  it('uses kage routes', () => {
    expect(meta.detailPath).toBe('/templates/kage');
    expect(meta.livePath).toBe(ROUTES.KAGE);
    expect(ROUTES.KAGE).toBe('/p/kage');
  });

  it('copies the npm preview snippet for this card id', () => {
    const snippet = getKmotionNpmSnippet(meta.id, 'react');
    expect(snippet).toContain(`npm install ${KMOTION_PACKAGE}`);
    expect(snippet).toContain(`<Preview id="${meta.id}" />`);
    expect(KMOTION_TEMPLATE_IDS).toContain(meta.id);
    expect(embedUrl(meta.id)).toBe(`http://localhost:5173/p/${meta.id}`);
  });
});

describe('KAGE source contract', () => {
  it('keeps the configured host defaults', () => {
    expect(SOURCE_URL).toBe('/landing-pages/kage.html');
    expect(SOURCE_REVISION).toBe('c8e06b90397a');
    expect(KAGE_HTML_SHA256.startsWith(SOURCE_REVISION)).toBe(true);
    expect(KAGE_DEFAULT_PROPS).toEqual({
      headingFont: 'onest',
      bodyFont: 'onest',
      headingWeight: '400',
      bodyWeight: '300',
      primaryColor: '#e0231c',
      headingSize: 46,
      bodySize: 17,
      headingLetterSpacing: -0.012,
    });
  });

  it('lists every required packaged asset for hash checks', () => {
    expect(ASSET_MANIFEST).toHaveLength(17);
    expect(ASSET_MANIFEST.every((entry) => entry.path && entry.bytes && entry.sha256)).toBe(true);
  });

  it('exposes Usage / Code / Skill.md for the details source panel', () => {
    expect(meta.usage).toBe(KAGE_USAGE);
    expect(meta.usage).toContain('KageLandingPage');
    expect(meta.usage).toContain('primaryColor="#e0231c"');
    expect(meta.codeUrl).toBe(SOURCE_URL);
    expect(meta.codeUrl).toBe('/landing-pages/kage.html');
    expect(meta.skill).toBe(KAGE_SKILL);
    expect(meta.skill).toContain('Build Kage');
    expect(meta.skill).toContain('SHA-256 c8e06b90397a');
    expect(meta.componentName).toBe('KageLandingPage');

    const docs = resolveTemplateSourceDocs(meta);
    expect(docs.usage).toContain('headingFont="onest"');
    expect(docs.skill).toContain('add-kage-landing-page');
    expect(buildCodeFetchCandidates(meta)).toEqual(['/landing-pages/kage.html']);
  });
});
