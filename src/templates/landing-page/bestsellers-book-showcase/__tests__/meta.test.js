import { ROUTES } from '../../../../config';
import { TEMPLATES as KMOTION_TEMPLATE_IDS, embedUrl } from '../../../../../packages/kmotion/src/core';
import { getKmotionNpmSnippet, KMOTION_PACKAGE } from '../../../../utils/kmotionNpmSnippet';
import { CATEGORIES, CATEGORY_SLUGS } from '../../../../templates';
import {
  ASSET_MANIFEST,
  BESTSELLERS_BOOK_SHOWCASE_DEFAULT_PROPS,
  BESTSELLERS_BOOK_SHOWCASE_HTML_SHA256,
  CARD_ID,
  CARD_TITLE,
  SOURCE_REVISION,
  SOURCE_URL,
} from '../constants';
import { meta } from '../meta';
import { BESTSELLERS_BOOK_SHOWCASE_PROMPT } from '../prompt';

describe('Field Manuals — Bestsellers Book Showcase meta', () => {
  it('registers the Hero card Field Manuals', () => {
    expect(meta.id).toBe(CARD_ID);
    expect(meta.title).toBe(CARD_TITLE);
    expect(meta.title).toBe('Field Manuals');
    expect(meta.category).toBe('Hero');
    expect(meta.categorySlug).toBe('hero');
    expect(meta.height).toBe('h-[272px]');
  });

  it('keeps Hero on the gallery navbar tabs', () => {
    expect(CATEGORIES).toContain('Hero');
    expect(CATEGORY_SLUGS.Hero).toBe('hero');
  });

  it('binds copy prompt to the exact pasted body', () => {
    expect(meta.fullPrompt).toBe(BESTSELLERS_BOOK_SHOWCASE_PROMPT);
    expect(
      BESTSELLERS_BOOK_SHOWCASE_PROMPT.startsWith('# Integrate <BestsellersBookShowcase />'),
    ).toBe(true);
    expect(BESTSELLERS_BOOK_SHOWCASE_PROMPT).toContain('SHA-256 7c1ed1ca4a4c');
    expect(BESTSELLERS_BOOK_SHOWCASE_PROMPT).toContain('@designcodeio/threeui');
    expect(BESTSELLERS_BOOK_SHOWCASE_PROMPT).toContain('headingFont="iowan-old-style"');
    expect(BESTSELLERS_BOOK_SHOWCASE_PROMPT).toContain('bodyFont="iowan-old-style"');
    expect(BESTSELLERS_BOOK_SHOWCASE_PROMPT).toContain('primaryColor="#c3a47b"');
    expect(BESTSELLERS_BOOK_SHOWCASE_PROMPT).toContain(
      'https://threeui.com/landing-pages/bestsellers-book-showcase.html',
    );
    expect(BESTSELLERS_BOOK_SHOWCASE_PROMPT).not.toContain('Role & Prerequisites');
    expect(BESTSELLERS_BOOK_SHOWCASE_PROMPT).not.toContain('Test-Driven Development');
    expect(meta.fullPrompt.length).toBe(BESTSELLERS_BOOK_SHOWCASE_PROMPT.length);
  });

  it('uses bestsellers-book-showcase routes', () => {
    expect(meta.detailPath).toBe('/templates/bestsellers-book-showcase');
    expect(meta.livePath).toBe(ROUTES.BESTSELLERS_BOOK_SHOWCASE);
    expect(ROUTES.BESTSELLERS_BOOK_SHOWCASE).toBe('/p/bestsellers-book-showcase');
  });

  it('copies the npm preview snippet for this card id', () => {
    const snippet = getKmotionNpmSnippet(meta.id, 'react');
    expect(snippet).toContain(`npm install ${KMOTION_PACKAGE}`);
    expect(snippet).toContain(`<Preview id="${meta.id}" />`);
    expect(KMOTION_TEMPLATE_IDS).toContain(meta.id);
    expect(embedUrl(meta.id)).toBe(`http://localhost:5173/p/${meta.id}`);
  });
});

describe('Bestsellers Book Showcase source contract', () => {
  it('keeps the configured host defaults', () => {
    expect(SOURCE_URL).toBe('/landing-pages/bestsellers-book-showcase.html');
    expect(SOURCE_REVISION).toBe('7c1ed1ca4a4c');
    expect(BESTSELLERS_BOOK_SHOWCASE_HTML_SHA256).toBe(
      '7c1ed1ca4a4c58f1c33956c84edd8f7ba450ea0312df718701e634a207568138',
    );
    expect(BESTSELLERS_BOOK_SHOWCASE_DEFAULT_PROPS).toEqual({
      headingFont: 'iowan-old-style',
      bodyFont: 'iowan-old-style',
      headingWeight: '500',
      bodyWeight: '400',
      primaryColor: '#c3a47b',
      headingSize: 325,
      bodySize: 17,
      headingLetterSpacing: -0.085,
    });
  });

  it('lists every required packaged asset for hash checks', () => {
    expect(ASSET_MANIFEST).toHaveLength(1);
    expect(ASSET_MANIFEST.every((entry) => entry.path && entry.bytes && entry.sha256)).toBe(
      true,
    );
  });
});
