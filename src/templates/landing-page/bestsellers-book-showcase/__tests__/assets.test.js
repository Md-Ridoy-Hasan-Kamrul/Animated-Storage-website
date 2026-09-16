import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { ASSET_MANIFEST, SOURCE_URL } from '../constants';

const ROOT = path.resolve(__dirname, '../../../../../');

describe('Bestsellers Book Showcase packaged assets', () => {
  it.each(ASSET_MANIFEST)('keeps byte-exact $path', ({ path: relativePath, bytes, sha256 }) => {
    const absolute = path.join(ROOT, relativePath);
    expect(fs.existsSync(absolute)).toBe(true);
    const buffer = fs.readFileSync(absolute);
    expect(buffer.length).toBe(bytes);
    expect(crypto.createHash('sha256').update(buffer).digest('hex')).toBe(sha256);
  });

  it('serves the canonical document from the public source URL', () => {
    expect(SOURCE_URL).toBe('/landing-pages/bestsellers-book-showcase.html');
    const html = fs.readFileSync(
      path.join(ROOT, 'public/landing-pages/bestsellers-book-showcase.html'),
      'utf8',
    );
    expect(html).toContain('Field Manuals');
    expect(html).toContain('class="stage"');
    expect(html).toContain('class="hero-word"');
    expect(html).toContain('book-card');
    expect(html).toContain('--pink: #c3a47b');
    expect(html).toContain('--ink: #29251d');
  });
});
