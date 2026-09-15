import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { ASSET_MANIFEST, SOURCE_URL } from '../constants';

const ROOT = path.resolve(__dirname, '../../../../../');

describe('Sylva Living Green packaged assets', () => {
  it.each(ASSET_MANIFEST)('keeps byte-exact $path', ({ path: relativePath, bytes, sha256 }) => {
    const absolute = path.join(ROOT, relativePath);
    expect(fs.existsSync(absolute)).toBe(true);
    const buffer = fs.readFileSync(absolute);
    expect(buffer.length).toBe(bytes);
    expect(crypto.createHash('sha256').update(buffer).digest('hex')).toBe(sha256);
  });

  it('serves the canonical document from the public source URL', () => {
    expect(SOURCE_URL).toBe('/landing-pages/inner-green-3d.html');
    const html = fs.readFileSync(
      path.join(ROOT, 'public/landing-pages/inner-green-3d.html'),
      'utf8',
    );
    expect(html).toContain('id="scene"');
    expect(html).toContain('id="hero"');
    expect(html).toContain('inner-green-assets/three.min.js');
    expect(html).toContain('inner-green-assets/lexend-latin.woff2');
    expect(html).toContain('inner-green-assets/card-ethos.jpg');
    expect(html).toContain('Step into');
    expect(html).toContain('data-liquid-metal');
  });
});
