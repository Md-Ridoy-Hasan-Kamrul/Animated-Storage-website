import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import {
  ASSET_MANIFEST,
  SPARK_BADGE_COMPONENT_SHA256,
  SPARK_BADGE_HTML_SHA256,
} from '../constants';

const ROOT = path.resolve(__dirname, '../../../../../');

describe('Spark Badge packaged assets', () => {
  it.each(ASSET_MANIFEST)('keeps byte-exact $path', ({ path: relativePath, bytes, sha256 }) => {
    const absolute = path.join(ROOT, relativePath);
    expect(fs.existsSync(absolute)).toBe(true);
    const buffer = fs.readFileSync(absolute);
    expect(buffer.length).toBe(bytes);
    expect(crypto.createHash('sha256').update(buffer).digest('hex')).toBe(sha256);
  });

  it('keeps the verified SparkBadge component and scene provenance', () => {
    const component = fs.readFileSync(
      path.join(ROOT, 'src/templates/background/spark-badge/sources/SparkBadge.tsx.txt'),
      'utf8',
    );
    const html = fs.readFileSync(
      path.join(ROOT, 'src/templates/background/spark-badge/sources/spark-badge.html'),
      'utf8',
    );

    expect(crypto.createHash('sha256').update(component).digest('hex')).toBe(
      SPARK_BADGE_COMPONENT_SHA256,
    );
    expect(crypto.createHash('sha256').update(html).digest('hex')).toBe(SPARK_BADGE_HTML_SHA256);

    expect(component).toContain('export function SparkBadge');
    expect(component).toContain('spark-badge-controls');
    expect(component).toContain('sandbox="allow-scripts"');
    expect(html).toContain('Spark Badge — credential in rain');
    expect(html).toContain('makeCurlField');
    expect(html).toContain("sceneVariant === 'browser'");
    expect(html).toContain('__sparkBadgeControls');
    expect(html).toContain('requestedVariant === \'browser\'');
  });

  it('keeps the public scene document identical to provenance', () => {
    const provenance = fs.readFileSync(
      path.join(ROOT, 'src/templates/background/spark-badge/sources/spark-badge.html'),
      'utf8',
    );
    const published = fs.readFileSync(
      path.join(ROOT, 'public/effects/spark-badge.html'),
      'utf8',
    );
    expect(published).toBe(provenance);
  });
});
