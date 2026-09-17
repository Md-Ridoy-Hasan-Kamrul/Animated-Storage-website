import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import {
  ASSET_MANIFEST,
  FOCUSED_DOCUMENT_SHA256,
  OVERRIDE_GRID_HTML_SHA256,
  SOURCE_URL,
} from '../constants';

const ROOT = path.resolve(__dirname, '../../../../../');

describe('Override Grid Predictive Arc packaged assets', () => {
  it.each(ASSET_MANIFEST)('keeps byte-exact $path', ({ path: relativePath, bytes, sha256 }) => {
    const absolute = path.join(ROOT, relativePath);
    expect(fs.existsSync(absolute)).toBe(true);
    const buffer = fs.readFileSync(absolute);
    expect(buffer.length).toBe(bytes);
    expect(crypto.createHash('sha256').update(buffer).digest('hex')).toBe(sha256);
  });

  it('serves the focused Override Grid document from the effects URL', () => {
    expect(SOURCE_URL).toBe('/effects/override-grid-predictive-arc.html');
    const html = fs.readFileSync(
      path.join(ROOT, 'public/effects/override-grid-predictive-arc.html'),
      'utf8',
    );
    expect(crypto.createHash('sha256').update(html).digest('hex')).toBe(FOCUSED_DOCUMENT_SHA256);
    expect(html).toContain('id="grid-canvas"');
    expect(html).toContain('data-threeui-focus');
    expect(html).toContain('const blockSize = 48;');
    expect(html).toContain('const blockGap = 2;');
    expect(html).toContain('rgba(249, 115, 22');
  });

  it('keeps the canonical Override Grid source byte-exact and distinct from focused host', () => {
    const provenance = fs.readFileSync(
      path.join(
        ROOT,
        'src/templates/background/override-grid-predictive-arc/sources/override-grid.html',
      ),
      'utf8',
    );
    const focused = fs.readFileSync(
      path.join(ROOT, 'public/effects/override-grid-predictive-arc.html'),
      'utf8',
    );
    expect(crypto.createHash('sha256').update(provenance, 'utf8').digest('hex')).toBe(
      OVERRIDE_GRID_HTML_SHA256,
    );
    expect(provenance).not.toContain('data-threeui-focus');
    expect(focused).not.toBe(provenance);
  });
});
