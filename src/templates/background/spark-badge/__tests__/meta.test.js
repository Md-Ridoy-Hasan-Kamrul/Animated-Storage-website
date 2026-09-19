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
  SOURCE_REVISION,
  SOURCE_URL,
  SPARK_BADGE_DEFAULT_PROPS,
  SPARK_BADGE_HTML_SHA256,
  VARIANT_ID,
} from '../constants';
import { meta } from '../meta';
import { SPARK_BADGE_PROMPT } from '../prompt';
import { SPARK_BADGE_DEFAULTS } from '../SparkBadge';

describe('Spark Badge — meta', () => {
  it('registers the Background card Spark Badge', () => {
    expect(meta.id).toBe(CARD_ID);
    expect(meta.title).toBe(CARD_TITLE);
    expect(meta.title).toBe('Spark Badge');
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
    expect(meta.fullPrompt).toBe(SPARK_BADGE_PROMPT);
    expect(SPARK_BADGE_PROMPT.startsWith('# Integrate <SparkBadge />')).toBe(true);
    expect(SPARK_BADGE_PROMPT).toContain('SHA-256 a8eefdee0d87');
    expect(SPARK_BADGE_PROMPT).toContain('@designcodeio/threeui');
    expect(SPARK_BADGE_PROMPT).toContain('particleAmount={1.00}');
    expect(SPARK_BADGE_PROMPT).toContain('turbulence={1.00}');
    expect(SPARK_BADGE_PROMPT).toContain('https://threeui.com/source-code/spark-badge.json');
    expect(SPARK_BADGE_PROMPT).not.toContain('Role & Prerequisites');
    expect(SPARK_BADGE_PROMPT).not.toContain('Test-Driven Development');
    expect(meta.fullPrompt.length).toBe(SPARK_BADGE_PROMPT.length);
  });

  it('uses spark-badge routes', () => {
    expect(meta.detailPath).toBe('/templates/spark-badge');
    expect(meta.livePath).toBe(ROUTES.SPARK_BADGE);
    expect(ROUTES.SPARK_BADGE).toBe('/p/spark-badge');
  });

  it('copies the npm preview snippet for this card id', () => {
    const snippet = getKmotionNpmSnippet(meta.id, 'react');
    expect(snippet).toContain(`npm install ${KMOTION_PACKAGE}`);
    expect(snippet).toContain(`<Preview id="${meta.id}" />`);
    expect(KMOTION_TEMPLATE_IDS).toContain(meta.id);
    expect(embedUrl(meta.id)).toBe(`http://localhost:5173/p/${meta.id}`);
  });
});

describe('Spark Badge source contract', () => {
  it('keeps the configured badge host defaults', () => {
    expect(SOURCE_REVISION).toBe('a8eefdee0d87');
    expect(VARIANT_ID).toBe('badge');
    expect(SOURCE_URL).toBe('/effects/spark-badge.html');
    expect(SPARK_BADGE_DEFAULT_PROPS).toEqual(SPARK_BADGE_DEFAULTS);
    expect(SPARK_BADGE_HTML_SHA256).toBe(
      'a8eefdee0d87deefae9b8b8dac4d79c0ee41447578a78090cad9c956e33ccf90',
    );
  });

  it('lists every required packaged asset for hash checks', () => {
    expect(ASSET_MANIFEST).toHaveLength(4);
    expect(ASSET_MANIFEST.every((entry) => entry.path && entry.bytes && entry.sha256)).toBe(true);
  });
});
