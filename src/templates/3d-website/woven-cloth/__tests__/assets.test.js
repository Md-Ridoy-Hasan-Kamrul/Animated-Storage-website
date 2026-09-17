import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import {
  ASSET_MANIFEST,
  FOCUSED_DOCUMENT_SHA256,
  LUMINA_WEAVERS_CLOTH_SHA256,
  SOURCE_URL,
} from '../constants';

const ROOT = path.resolve(__dirname, '../../../../../');

describe('Woven Cloth packaged assets', () => {
  it.each(ASSET_MANIFEST)('keeps byte-exact $path', ({ path: relativePath, bytes, sha256 }) => {
    const absolute = path.join(ROOT, relativePath);
    expect(fs.existsSync(absolute)).toBe(true);
    const buffer = fs.readFileSync(absolute);
    expect(buffer.length).toBe(bytes);
    expect(crypto.createHash('sha256').update(buffer).digest('hex')).toBe(sha256);
  });

  it('serves the focused Woven Cloth document from the effects URL', () => {
    expect(SOURCE_URL).toBe('/effects/woven-cloth.html');
    const html = fs.readFileSync(
      path.join(ROOT, 'public/effects/woven-cloth.html'),
      'utf8',
    );
    expect(crypto.createHash('sha256').update(html).digest('hex')).toBe(FOCUSED_DOCUMENT_SHA256);
    expect(html).toContain('id="cloth"');
    expect(html).toContain('data-threeui-focus');
    expect(html).toContain("x.fillText('WOVEN'");
    expect(html).toContain("x.fillText('CLOTH'");
    expect(html).toContain('three@0.160.0');
  });

  it('keeps the canonical Neuform export byte-exact and distinct from the focused host', () => {
    const provenance = fs.readFileSync(
      path.join(ROOT, 'src/templates/3d-website/woven-cloth/sources/lumina-weavers-cloth.html'),
      'utf8',
    );
    const focused = fs.readFileSync(
      path.join(ROOT, 'public/effects/woven-cloth.html'),
      'utf8',
    );
    expect(crypto.createHash('sha256').update(provenance, 'utf8').digest('hex')).toBe(
      LUMINA_WEAVERS_CLOTH_SHA256,
    );
    expect(provenance).toContain("x.fillText('LUMINA'");
    expect(provenance).toContain("x.fillText('WEAVERS'");
    expect(provenance).not.toContain('data-threeui-focus');
    expect(focused).not.toBe(provenance);
  });
});
