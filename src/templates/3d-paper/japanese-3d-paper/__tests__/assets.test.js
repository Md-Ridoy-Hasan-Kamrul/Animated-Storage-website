import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import {
  ASSET_MANIFEST,
  FOCUSED_DOCUMENT_SHA256,
  SOURCE_URL,
} from '../constants';

const ROOT = path.resolve(__dirname, '../../../../../');

describe('Japanese 3D Paper packaged assets', () => {
  it.each(ASSET_MANIFEST)('keeps byte-exact $path', ({ path: relativePath, bytes, sha256 }) => {
    const absolute = path.join(ROOT, relativePath);
    expect(fs.existsSync(absolute)).toBe(true);
    const buffer = fs.readFileSync(absolute);
    expect(buffer.length).toBe(bytes);
    expect(crypto.createHash('sha256').update(buffer).digest('hex')).toBe(sha256);
  });

  it('serves the Japanese document from the effects URL', () => {
    expect(SOURCE_URL).toBe('/effects/japanese-3d-paper.html');
    const html = fs.readFileSync(
      path.join(ROOT, 'public/effects/japanese-3d-paper.html'),
      'utf8',
    );
    expect(crypto.createHash('sha256').update(html).digest('hex')).toBe(FOCUSED_DOCUMENT_SHA256);
    expect(html).toContain('<title>3D Paper — 認定証</title>');
    expect(html).toContain('id="gl"');
    expect(html).toContain('--bg:#08080a');
    expect(html).toContain('drawJapanese');
    expect(html).toContain('BEST OF THE YEAR');
  });

  it('keeps provenance 3d-paper-japanese.html identical to the registered source', () => {
    const provenance = fs.readFileSync(
      path.join(
        ROOT,
        'src/templates/3d-paper/japanese-3d-paper/sources/3d-paper-japanese.html',
      ),
      'utf8',
    );
    const focused = fs.readFileSync(
      path.join(ROOT, 'public/effects/japanese-3d-paper.html'),
      'utf8',
    );
    expect(provenance).toBe(focused);
    expect(provenance).toContain('<title>3D Paper — 認定証</title>');
    expect(provenance).toContain('drawJapanese');
  });
});
