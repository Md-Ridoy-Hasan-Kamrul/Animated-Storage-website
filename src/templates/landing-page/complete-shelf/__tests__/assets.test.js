import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { ASSET_MANIFEST, SOURCE_URL } from '../constants';

const ROOT = path.resolve(__dirname, '../../../../../');

describe('Complete Shelf packaged assets', () => {
  it.each(ASSET_MANIFEST)('keeps byte-exact $path', ({ path: relativePath, bytes, sha256 }) => {
    const absolute = path.join(ROOT, relativePath);
    expect(fs.existsSync(absolute)).toBe(true);
    const buffer = fs.readFileSync(absolute);
    expect(buffer.length).toBe(bytes);
    expect(crypto.createHash('sha256').update(buffer).digest('hex')).toBe(sha256);
  });

  it('serves the canonical document from the public source URL', () => {
    expect(SOURCE_URL).toBe('/landing-pages/complete-shelf-v2.html');
    const html = fs.readFileSync(
      path.join(ROOT, 'public/landing-pages/complete-shelf-v2.html'),
      'utf8',
    );
    expect(html).toContain('id="experience"');
    expect(html).toContain('id="scene"');
    expect(html).toContain('id="detail-panel"');
    expect(html).toContain('Working Volumes');
    expect(html).toContain('three@0.165.0');
    expect(html).toContain('--paper: #171a24');
    expect(html).toContain('--accent: #c87046');
  });
});
