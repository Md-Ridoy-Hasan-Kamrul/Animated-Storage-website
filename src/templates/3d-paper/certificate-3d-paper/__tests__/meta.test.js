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
import { CERTIFICATE_3D_PAPER_PROMPT } from '../prompt';

describe('Certificate 3D Paper — meta', () => {
  it('registers the 3D Paper card Certificate 3D Paper', () => {
    expect(meta.id).toBe(CARD_ID);
    expect(meta.title).toBe(CARD_TITLE);
    expect(meta.title).toBe('Certificate 3D Paper');
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
    expect(meta.fullPrompt).toBe(CERTIFICATE_3D_PAPER_PROMPT);
    expect(CERTIFICATE_3D_PAPER_PROMPT.startsWith('# Integrate <ThreeDPaper />')).toBe(true);
    expect(CERTIFICATE_3D_PAPER_PROMPT).toContain('SHA-256 8ec1b71c0dbc');
    expect(CERTIFICATE_3D_PAPER_PROMPT).toContain('@designcodeio/threeui');
    expect(CERTIFICATE_3D_PAPER_PROMPT).toContain('variant="certificate"');
    expect(CERTIFICATE_3D_PAPER_PROMPT).toContain(
      'https://threeui.com/source-code/3d-paper.json',
    );
    expect(CERTIFICATE_3D_PAPER_PROMPT).not.toContain('Role & Prerequisites');
    expect(CERTIFICATE_3D_PAPER_PROMPT).not.toContain('Test-Driven Development');
    expect(meta.fullPrompt.length).toBe(CERTIFICATE_3D_PAPER_PROMPT.length);
  });

  it('uses certificate-3d-paper routes', () => {
    expect(meta.detailPath).toBe('/templates/certificate-3d-paper');
    expect(meta.livePath).toBe(ROUTES.CERTIFICATE_3D_PAPER);
    expect(ROUTES.CERTIFICATE_3D_PAPER).toBe('/p/certificate-3d-paper');
  });

  it('copies the npm preview snippet for this card id', () => {
    const snippet = getKmotionNpmSnippet(meta.id, 'react');
    expect(snippet).toContain(`npm install ${KMOTION_PACKAGE}`);
    expect(snippet).toContain(`<Preview id="${meta.id}" />`);
    expect(KMOTION_TEMPLATE_IDS).toContain(meta.id);
    expect(embedUrl(meta.id)).toBe(`http://localhost:5173/p/${meta.id}`);
  });
});

describe('Certificate 3D Paper source contract', () => {
  it('keeps the configured host defaults', () => {
    expect(SOURCE_URL).toBe('/effects/certificate-3d-paper.html');
    expect(SOURCE_REVISION).toBe('8ec1b71c0dbc');
    expect(PAPER_HTML_SHA256).toBe(
      '0cb83da723e1a54f1a2e1124bc26a27d608afc3ba42ec0b116807e2e2ae5fb32',
    );
    expect(THREEUI_CSS_SHA256).toBe(
      'efe4447139f1358dd8e9be68edf6fa46cbefbd1de423a4d6c439ca61d2c8eccf',
    );
    expect(FOCUSED_DOCUMENT_SHA256).toBe(PAPER_HTML_SHA256);
    expect(THREE_D_PAPER_DEFAULT_PROPS).toEqual({
      variant: 'certificate',
    });
  });

  it('lists every required packaged asset for hash checks', () => {
    expect(ASSET_MANIFEST).toHaveLength(3);
    expect(ASSET_MANIFEST.every((entry) => entry.path && entry.bytes && entry.sha256)).toBe(
      true,
    );
  });
});
