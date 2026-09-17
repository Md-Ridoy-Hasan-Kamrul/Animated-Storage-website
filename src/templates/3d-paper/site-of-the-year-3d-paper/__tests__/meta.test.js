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
  FOCUSED_DOCUMENT_SHA256,
  PAPER_HTML_SHA256,
  SOURCE_REVISION,
  SOURCE_URL,
  THREE_D_PAPER_DEFAULT_PROPS,
  THREEUI_CSS_SHA256,
} from '../constants';
import { meta } from '../meta';
import { SITE_OF_THE_YEAR_3D_PAPER_PROMPT } from '../prompt';

describe('Site of the Year 3D Paper — meta', () => {
  it('registers the 3D Paper card Site of the Year 3D Paper', () => {
    expect(meta.id).toBe(CARD_ID);
    expect(meta.title).toBe(CARD_TITLE);
    expect(meta.title).toBe('Site of the Year 3D Paper');
    expect(meta.category).toBe('3D Paper');
    expect(meta.categorySlug).toBe('3d-paper');
    expect(meta.height).toBe('h-[272px]');
  });

  it('keeps 3D Paper on the gallery navbar tabs', () => {
    expect(CATEGORIES).toContain('3D Paper');
    expect(CATEGORY_SLUGS['3D Paper']).toBe('3d-paper');
    expect(ACTIVE_TEMPLATE_CATEGORIES).toContain('3D Paper');
  });

  it('binds copy prompt to the exact pasted body', () => {
    expect(meta.fullPrompt).toBe(SITE_OF_THE_YEAR_3D_PAPER_PROMPT);
    expect(SITE_OF_THE_YEAR_3D_PAPER_PROMPT.startsWith('# Integrate <ThreeDPaper />')).toBe(
      true,
    );
    expect(SITE_OF_THE_YEAR_3D_PAPER_PROMPT).toContain('SHA-256 8ec1b71c0dbc');
    expect(SITE_OF_THE_YEAR_3D_PAPER_PROMPT).toContain('@designcodeio/threeui');
    expect(SITE_OF_THE_YEAR_3D_PAPER_PROMPT).toContain('variant="site-of-the-year"');
    expect(SITE_OF_THE_YEAR_3D_PAPER_PROMPT).toContain(
      'https://threeui.com/source-code/3d-paper.json',
    );
    expect(SITE_OF_THE_YEAR_3D_PAPER_PROMPT).not.toContain('Role & Prerequisites');
    expect(SITE_OF_THE_YEAR_3D_PAPER_PROMPT).not.toContain('Test-Driven Development');
    expect(meta.fullPrompt.length).toBe(SITE_OF_THE_YEAR_3D_PAPER_PROMPT.length);
  });

  it('uses site-of-the-year-3d-paper routes', () => {
    expect(meta.detailPath).toBe('/templates/site-of-the-year-3d-paper');
    expect(meta.livePath).toBe(ROUTES.SITE_OF_THE_YEAR_3D_PAPER);
    expect(ROUTES.SITE_OF_THE_YEAR_3D_PAPER).toBe('/p/site-of-the-year-3d-paper');
  });

  it('copies the npm preview snippet for this card id', () => {
    const snippet = getKmotionNpmSnippet(meta.id, 'react');
    expect(snippet).toContain(`npm install ${KMOTION_PACKAGE}`);
    expect(snippet).toContain(`<Preview id="${meta.id}" />`);
    expect(KMOTION_TEMPLATE_IDS).toContain(meta.id);
    expect(embedUrl(meta.id)).toBe(`http://localhost:5173/p/${meta.id}`);
  });
});

describe('Site of the Year 3D Paper source contract', () => {
  it('keeps the configured host defaults', () => {
    expect(SOURCE_URL).toBe('/effects/site-of-the-year-3d-paper.html');
    expect(SOURCE_REVISION).toBe('8ec1b71c0dbc');
    expect(PAPER_HTML_SHA256).toBe(
      'fdef93fa96a3927430ef35411af70568c56b9488921aead8f36be36800689b7d',
    );
    expect(THREEUI_CSS_SHA256).toBe(
      'efe4447139f1358dd8e9be68edf6fa46cbefbd1de423a4d6c439ca61d2c8eccf',
    );
    expect(FOCUSED_DOCUMENT_SHA256).toBe(PAPER_HTML_SHA256);
    expect(THREE_D_PAPER_DEFAULT_PROPS).toEqual({
      variant: 'site-of-the-year',
    });
  });

  it('lists every required packaged asset for hash checks', () => {
    expect(ASSET_MANIFEST).toHaveLength(3);
    expect(ASSET_MANIFEST.every((entry) => entry.path && entry.bytes && entry.sha256)).toBe(
      true,
    );
  });
});
