import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { ASSET_MANIFEST, SOURCE_URL } from '../constants';

const ROOT = path.resolve(__dirname, '../../../../../');

describe('Sketchbook packaged assets', () => {
  it.each(ASSET_MANIFEST)('keeps byte-exact $path', ({ path: relativePath, bytes, sha256 }) => {
    const absolute = path.join(ROOT, relativePath);
    expect(fs.existsSync(absolute)).toBe(true);
    const buffer = fs.readFileSync(absolute);
    expect(buffer.length).toBe(bytes);
    expect(crypto.createHash('sha256').update(buffer).digest('hex')).toBe(sha256);
  });

  it('serves the canonical document from the public source URL', () => {
    expect(SOURCE_URL).toBe('/landing-pages/meng-to-sketchbook.html');
    const html = fs.readFileSync(
      path.join(ROOT, 'public/landing-pages/meng-to-sketchbook.html'),
      'utf8',
    );
    expect(html).toContain('id="sbBook"');
    expect(html).toContain('meng-to-sketchbook/');
    expect(html).toContain('id="loupe"');
    expect(html).toContain('Marina Bay Sands');
  });
});
