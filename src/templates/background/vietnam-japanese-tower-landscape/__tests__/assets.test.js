import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import {
  ASSET_MANIFEST,
  FOCUSED_DOCUMENT_SHA256,
  SOURCE_URL,
} from '../constants';

const ROOT = path.resolve(__dirname, '../../../../../');

describe('Vietnamese Tower Landscape packaged assets', () => {
  it.each(ASSET_MANIFEST)('keeps byte-exact $path', ({ path: relativePath, bytes, sha256 }) => {
    const absolute = path.join(ROOT, relativePath);
    expect(fs.existsSync(absolute)).toBe(true);
    const buffer = fs.readFileSync(absolute);
    expect(buffer.length).toBe(bytes);
    expect(crypto.createHash('sha256').update(buffer).digest('hex')).toBe(sha256);
  });

  it('serves the shared Towers document with Vietnam style + country boot', () => {
    expect(SOURCE_URL).toBe('/effects/japanese-tower-landscape.html');
    const html = fs.readFileSync(
      path.join(ROOT, 'public/effects/japanese-tower-landscape.html'),
      'utf8',
    );
    expect(crypto.createHash('sha256').update(html).digest('hex')).toBe(FOCUSED_DOCUMENT_SHA256);
    expect(html).toContain('id="stage"');
    expect(html).toContain("id:'VIETNAM'");
    expect(html).toContain('buildThap');
    expect(html).toContain('window.__style');
    expect(html).toContain('data-threeui-country');
    expect(html).toContain("'vietnam'");
  });

  it('keeps provenance Towers.html identical to the registered source', () => {
    const provenance = fs.readFileSync(
      path.join(ROOT, 'src/templates/background/japanese-tower-landscape/sources/Towers.html'),
      'utf8',
    );
    expect(provenance).toContain('id="stage"');
    expect(provenance).toContain("id:'VIETNAM'");
    expect(provenance).toContain('buildThap');
    expect(provenance).not.toContain('data-threeui-country');
  });
});
