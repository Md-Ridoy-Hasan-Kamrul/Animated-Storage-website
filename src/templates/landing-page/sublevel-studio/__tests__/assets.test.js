import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { ASSET_MANIFEST, SOURCE_URL } from '../constants';

const ROOT = path.resolve(__dirname, '../../../../../');

describe('Sublevel Studio packaged assets', () => {
  it.each(ASSET_MANIFEST)('keeps byte-exact $path', ({ path: relativePath, bytes, sha256 }) => {
    const absolute = path.join(ROOT, relativePath);
    expect(fs.existsSync(absolute)).toBe(true);
    const buffer = fs.readFileSync(absolute);
    expect(buffer.length).toBe(bytes);
    expect(crypto.createHash('sha256').update(buffer).digest('hex')).toBe(sha256);
  });

  it('serves the canonical document from the public source URL', () => {
    expect(SOURCE_URL).toBe('/landing-pages/sublevel-studio.html');
    const html = fs.readFileSync(
      path.join(ROOT, 'public/landing-pages/sublevel-studio.html'),
      'utf8',
    );
    expect(html).toContain('id="canvas-container"');
    expect(html).toContain('id="gl"');
    expect(html).toContain('id="topnav"');
    expect(html).toContain('loading sublevel');
    expect(html).toContain('Sublevel — studio index');
    expect(html).toContain('agent@sublevel');
  });
});
