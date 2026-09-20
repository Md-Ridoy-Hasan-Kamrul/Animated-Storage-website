import { ROUTES } from '../../../../config';
import { TEMPLATES as KMOTION_TEMPLATE_IDS, embedUrl } from '../../../../../packages/kmotion/src/core';
import { getKmotionNpmSnippet, KMOTION_PACKAGE } from '../../../../utils/kmotionNpmSnippet';
import { CATEGORIES, CATEGORY_SLUGS } from '../../../../templates';
import {
  ASSET_MANIFEST,
  CARD_ID,
  CARD_TITLE,
  COMPLETE_SHELF_DEFAULT_PROPS,
  COMPLETE_SHELF_HTML_SHA256,
  SOURCE_REVISION,
  SOURCE_URL,
} from '../constants';
import { meta } from '../meta';
import { COMPLETE_SHELF_PROMPT } from '../prompt';
import { COMPLETE_SHELF_SKILL, COMPLETE_SHELF_USAGE } from '../sourceDocs';
import {
  buildCodeFetchCandidates,
  resolveTemplateSourceDocs,
} from '../../../../utils/resolveTemplateSourceDocs';

describe('Working Volumes — Complete Shelf meta', () => {
  it('registers the Hero card Working Volumes', () => {
    expect(meta.id).toBe(CARD_ID);
    expect(meta.title).toBe(CARD_TITLE);
    expect(meta.title).toBe('Working Volumes');
    expect(meta.category).toBe('Hero');
    expect(meta.categorySlug).toBe('hero');
    expect(meta.height).toBe('h-[272px]');
  });

  it('keeps Hero on the gallery navbar tabs', () => {
    expect(CATEGORIES).toContain('Hero');
    expect(CATEGORY_SLUGS.Hero).toBe('hero');
  });

  it('binds copy prompt to the exact pasted body', () => {
    expect(meta.fullPrompt).toBe(COMPLETE_SHELF_PROMPT);
    expect(COMPLETE_SHELF_PROMPT.startsWith('# Integrate <CompleteShelfLandingPage />')).toBe(
      true,
    );
    expect(COMPLETE_SHELF_PROMPT).toContain('SHA-256 606f200fed86');
    expect(COMPLETE_SHELF_PROMPT).toContain('@designcodeio/threeui');
    expect(COMPLETE_SHELF_PROMPT).toContain('headingFont="iowan-old-style"');
    expect(COMPLETE_SHELF_PROMPT).toContain('bodyFont="inter"');
    expect(COMPLETE_SHELF_PROMPT).toContain('primaryColor="#c87046"');
    expect(COMPLETE_SHELF_PROMPT).toContain(
      'https://threeui.com/landing-pages/complete-shelf-v2.html',
    );
    expect(COMPLETE_SHELF_PROMPT).not.toContain('Role & Prerequisites');
    expect(COMPLETE_SHELF_PROMPT).not.toContain('Test-Driven Development');
    expect(meta.fullPrompt.length).toBe(COMPLETE_SHELF_PROMPT.length);
  });

  it('uses complete-shelf routes', () => {
    expect(meta.detailPath).toBe('/templates/complete-shelf');
    expect(meta.livePath).toBe(ROUTES.COMPLETE_SHELF);
    expect(ROUTES.COMPLETE_SHELF).toBe('/p/complete-shelf');
  });

  it('copies the npm preview snippet for this card id', () => {
    const snippet = getKmotionNpmSnippet(meta.id, 'react');
    expect(snippet).toContain(`npm install ${KMOTION_PACKAGE}`);
    expect(snippet).toContain(`<Preview id="${meta.id}" />`);
    expect(KMOTION_TEMPLATE_IDS).toContain(meta.id);
    expect(embedUrl(meta.id)).toBe(`http://localhost:5173/p/${meta.id}`);
  });
});

describe('Complete Shelf source contract', () => {
  it('keeps the configured host defaults', () => {
    expect(SOURCE_URL).toBe('/landing-pages/complete-shelf-v2.html');
    expect(SOURCE_REVISION).toBe('606f200fed86');
    expect(COMPLETE_SHELF_HTML_SHA256).toBe(
      '606f200fed8602c243f40a11c8c364f0e625c57f80e7c97dc76419da207f198e',
    );
    expect(COMPLETE_SHELF_DEFAULT_PROPS).toEqual({
      headingFont: 'iowan-old-style',
      bodyFont: 'inter',
      headingWeight: '400',
      bodyWeight: '400',
      primaryColor: '#c87046',
      headingSize: 60,
      bodySize: 12,
      headingLetterSpacing: -0.055,
    });
  });

  it('lists every required packaged asset for hash checks', () => {
    expect(ASSET_MANIFEST).toHaveLength(1);
    expect(ASSET_MANIFEST.every((entry) => entry.path && entry.bytes && entry.sha256)).toBe(
      true,
    );
  });

  it('exposes Usage / Code / Skill.md for the details source panel', () => {
    expect(meta.usage).toBe(COMPLETE_SHELF_USAGE);
    expect(meta.usage).toContain('CompleteShelfLandingPage');
    expect(meta.codeUrl).toBe(SOURCE_URL);
    expect(meta.codeUrl).toBe('/landing-pages/complete-shelf-v2.html');
    expect(meta.skill).toBe(COMPLETE_SHELF_SKILL);
    expect(meta.skill).toContain('Build Complete Shelf');
    expect(meta.skill).toContain('SHA-256 606f200fed86');
    expect(meta.componentName).toBe('CompleteShelfLandingPage');

    const docs = resolveTemplateSourceDocs(meta);
    expect(docs.usage).toContain('CompleteShelfLandingPage');
    expect(docs.skill).toContain('add-complete-shelf-landing-page');
    expect(buildCodeFetchCandidates(meta)).toEqual([
      '/landing-pages/complete-shelf-v2.html',
    ]);
  });
});
