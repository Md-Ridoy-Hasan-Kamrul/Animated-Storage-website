import { ROUTES } from '../../../../config';
import { TEMPLATES as KMOTION_TEMPLATE_IDS, embedUrl } from '../../../../../packages/kmotion/src/core';
import { getKmotionNpmSnippet, KMOTION_PACKAGE } from '../../../../utils/kmotionNpmSnippet';
import { CATEGORIES, CATEGORY_SLUGS } from '../../../../templates';
import {
  ASSET_MANIFEST,
  CARD_ID,
  CARD_TITLE,
  SKETCHBOOK_DEFAULT_PROPS,
  SKETCHBOOK_HTML_SHA256,
  SOURCE_REVISION,
  SOURCE_URL,
} from '../constants';
import { meta } from '../meta';
import { SKETCHBOOK_PROMPT } from '../prompt';
import { SKETCHBOOK_SKILL, SKETCHBOOK_USAGE } from '../sourceDocs';
import {
  buildCodeFetchCandidates,
  resolveTemplateSourceDocs,
} from '../../../../utils/resolveTemplateSourceDocs';

describe('Sketchbook meta', () => {
  it('registers the Landing Page card Sketchbook', () => {
    expect(meta.id).toBe(CARD_ID);
    expect(meta.title).toBe(CARD_TITLE);
    expect(meta.title).toBe('Sketchbook');
    expect(meta.category).toBe('Landing Page');
    expect(meta.categorySlug).toBe('landing-page');
    expect(meta.height).toBe('h-[272px]');
  });

  it('keeps Landing Page on the gallery navbar tabs', () => {
    expect(CATEGORIES).toContain('Landing Page');
    expect(CATEGORY_SLUGS['Landing Page']).toBe('landing-page');
  });

  it('binds copy prompt to the exact pasted body', () => {
    expect(meta.fullPrompt).toBe(SKETCHBOOK_PROMPT);
    expect(SKETCHBOOK_PROMPT.startsWith('# Integrate <MengToSketchbookLandingPage />')).toBe(
      true,
    );
    expect(SKETCHBOOK_PROMPT).toContain('SHA-256 e0330548b1ac');
    expect(SKETCHBOOK_PROMPT).toContain('@designcodeio/threeui');
    expect(SKETCHBOOK_PROMPT).toContain('headingFont="instrument-serif"');
    expect(SKETCHBOOK_PROMPT).toContain('primaryColor="#2b2721"');
    expect(SKETCHBOOK_PROMPT).toContain(
      'https://threeui.com/landing-pages/meng-to-sketchbook.html',
    );
    expect(SKETCHBOOK_PROMPT).not.toContain('Role & Prerequisites');
    expect(SKETCHBOOK_PROMPT).not.toContain('Test-Driven Development');
    expect(meta.fullPrompt.length).toBe(SKETCHBOOK_PROMPT.length);
  });

  it('uses sketchbook routes', () => {
    expect(meta.detailPath).toBe('/templates/sketchbook');
    expect(meta.livePath).toBe(ROUTES.SKETCHBOOK);
    expect(ROUTES.SKETCHBOOK).toBe('/p/sketchbook');
  });

  it('copies the npm preview snippet for this card id', () => {
    const snippet = getKmotionNpmSnippet(meta.id, 'react');
    expect(snippet).toContain(`npm install ${KMOTION_PACKAGE}`);
    expect(snippet).toContain(`<Preview id="${meta.id}" />`);
    expect(KMOTION_TEMPLATE_IDS).toContain(meta.id);
    expect(embedUrl(meta.id)).toBe(`http://localhost:5173/p/${meta.id}`);
  });
});

describe('Sketchbook source contract', () => {
  it('keeps the configured host defaults', () => {
    expect(SOURCE_URL).toBe('/landing-pages/meng-to-sketchbook.html');
    expect(SOURCE_REVISION).toBe('e0330548b1ac');
    expect(SKETCHBOOK_HTML_SHA256.startsWith(SOURCE_REVISION)).toBe(true);
    expect(SKETCHBOOK_DEFAULT_PROPS).toEqual({
      headingFont: 'instrument-serif',
      bodyFont: 'newsreader',
      headingWeight: '400',
      bodyWeight: '400',
      primaryColor: '#2b2721',
      headingSize: 30,
      bodySize: 20,
      headingLetterSpacing: 0.01,
    });
  });

  it('lists every required packaged asset for hash checks', () => {
    expect(ASSET_MANIFEST).toHaveLength(18);
    expect(ASSET_MANIFEST.every((entry) => entry.path && entry.bytes && entry.sha256)).toBe(
      true,
    );
  });

  it('exposes Usage / Code / Skill.md for the details source panel', () => {
    expect(meta.usage).toBe(SKETCHBOOK_USAGE);
    expect(meta.usage).toContain('MengToSketchbookLandingPage');
    expect(meta.usage).toContain('primaryColor="#2b2721"');
    expect(meta.codeUrl).toBe(SOURCE_URL);
    expect(meta.codeUrl).toBe('/landing-pages/meng-to-sketchbook.html');
    expect(meta.skill).toBe(SKETCHBOOK_SKILL);
    expect(meta.skill).toContain('Build Sketchbook');
    expect(meta.skill).toContain('SHA-256 e0330548b1ac');
    expect(meta.componentName).toBe('MengToSketchbookLandingPage');

    const docs = resolveTemplateSourceDocs(meta);
    expect(docs.usage).toContain('headingFont="instrument-serif"');
    expect(docs.skill).toContain('add-meng-to-sketchbook-landing-page');
    expect(buildCodeFetchCandidates(meta)).toEqual([
      '/landing-pages/meng-to-sketchbook.html',
    ]);
  });
});
