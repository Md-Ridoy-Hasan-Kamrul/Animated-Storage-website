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
import { ORIGINAL_3D_PAPER_PROMPT } from '../prompt';

describe('Original 3D Paper — meta', () => {
  it('registers the 3D Paper card Original 3D Paper', () => {
    expect(meta.id).toBe(CARD_ID);
    expect(meta.title).toBe(CARD_TITLE);
    expect(meta.title).toBe('Original 3D Paper');
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
    expect(meta.fullPrompt).toBe(ORIGINAL_3D_PAPER_PROMPT);
    expect(ORIGINAL_3D_PAPER_PROMPT.startsWith('# Integrate <ThreeDPaper />')).toBe(true);
    expect(ORIGINAL_3D_PAPER_PROMPT).toContain('SHA-256 8ec1b71c0dbc');
    expect(ORIGINAL_3D_PAPER_PROMPT).toContain('@designcodeio/threeui');
    expect(ORIGINAL_3D_PAPER_PROMPT).toContain('variant="original"');
    expect(ORIGINAL_3D_PAPER_PROMPT).toContain(
      'https://threeui.com/source-code/3d-paper.json',
    );
    expect(ORIGINAL_3D_PAPER_PROMPT).not.toContain('Role & Prerequisites');
    expect(ORIGINAL_3D_PAPER_PROMPT).not.toContain('Test-Driven Development');
    expect(meta.fullPrompt.length).toBe(ORIGINAL_3D_PAPER_PROMPT.length);
  });

  it('uses original-3d-paper routes', () => {
    expect(meta.detailPath).toBe('/templates/original-3d-paper');
    expect(meta.livePath).toBe(ROUTES.ORIGINAL_3D_PAPER);
    expect(ROUTES.ORIGINAL_3D_PAPER).toBe('/p/original-3d-paper');
  });

  it('copies the npm preview snippet for this card id', () => {
    const snippet = getKmotionNpmSnippet(meta.id, 'react');
    expect(snippet).toContain(`npm install ${KMOTION_PACKAGE}`);
    expect(snippet).toContain(`<Preview id="${meta.id}" />`);
    expect(KMOTION_TEMPLATE_IDS).toContain(meta.id);
    expect(embedUrl(meta.id)).toBe(`http://localhost:5173/p/${meta.id}`);
  });
});

describe('Original 3D Paper source contract', () => {
  it('keeps the configured host defaults', () => {
    expect(SOURCE_URL).toBe('/effects/original-3d-paper.html');
    expect(SOURCE_REVISION).toBe('8ec1b71c0dbc');
    expect(PAPER_HTML_SHA256).toBe(
      '8ec1b71c0dbcafbadf908100ae2a08045d0a1087c00a09d28245ef19366c7353',
    );
    expect(THREEUI_CSS_SHA256).toBe(
      'efe4447139f1358dd8e9be68edf6fa46cbefbd1de423a4d6c439ca61d2c8eccf',
    );
    expect(FOCUSED_DOCUMENT_SHA256).toBe(PAPER_HTML_SHA256);
    expect(THREE_D_PAPER_DEFAULT_PROPS).toEqual({
      variant: 'original',
    });
  });

  it('lists every required packaged asset for hash checks', () => {
    expect(ASSET_MANIFEST).toHaveLength(3);
    expect(ASSET_MANIFEST.every((entry) => entry.path && entry.bytes && entry.sha256)).toBe(
      true,
    );
  });
});
