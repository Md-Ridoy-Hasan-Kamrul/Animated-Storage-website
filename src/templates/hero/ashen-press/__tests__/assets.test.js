import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import {
  ASSET_MANIFEST,
  FOCUSED_DOCUMENT_SHA256,
  SOURCE_URL,
} from '../constants';

const ROOT = path.resolve(__dirname, '../../../../../');

describe('Book shelf packaged assets', () => {
  it.each(ASSET_MANIFEST)('keeps byte-exact $path', ({ path: relativePath, bytes, sha256 }) => {
    const absolute = path.join(ROOT, relativePath);
    expect(fs.existsSync(absolute)).toBe(true);
    const buffer = fs.readFileSync(absolute);
    expect(buffer.length).toBe(bytes);
    expect(crypto.createHash('sha256').update(buffer).digest('hex')).toBe(sha256);
  });

  it('serves the Ashen Press document from the effects URL', () => {
    expect(SOURCE_URL).toBe('/effects/ashen-press.html');
    const html = fs.readFileSync(
      path.join(ROOT, 'public/effects/ashen-press.html'),
      'utf8',
    );
    expect(crypto.createHash('sha256').update(html).digest('hex')).toBe(FOCUSED_DOCUMENT_SHA256);
    expect(html).toContain('<title>Ashen Press — The Art Book Shelf</title>');
    expect(html).toContain('id="gl"');
    expect(html).toContain('--bg:#c6ae8e');
    expect(html).toContain('Ashen');
  });

  it('keeps provenance ashen-press.html identical to the registered source', () => {
    const provenance = fs.readFileSync(
      path.join(ROOT, 'src/templates/hero/ashen-press/sources/ashen-press.html'),
      'utf8',
    );
    const focused = fs.readFileSync(
      path.join(ROOT, 'public/effects/ashen-press.html'),
      'utf8',
    );
    expect(provenance).toBe(focused);
    expect(provenance).toContain('<title>Ashen Press — The Art Book Shelf</title>');
  });
});
