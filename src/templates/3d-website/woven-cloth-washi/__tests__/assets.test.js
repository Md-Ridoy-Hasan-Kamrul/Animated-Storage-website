import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import {
  ASSET_MANIFEST,
  FOCUSED_DOCUMENT_SHA256,
  SOURCE_URL,
  WOVEN_CLOTH_WASHI_SHA256,
} from '../constants';

const ROOT = path.resolve(__dirname, '../../../../../');

describe('Washi Noren Woven Cloth packaged assets', () => {
  it.each(ASSET_MANIFEST)('keeps byte-exact $path', ({ path: relativePath, bytes, sha256 }) => {
    const absolute = path.join(ROOT, relativePath);
    expect(fs.existsSync(absolute)).toBe(true);
    const buffer = fs.readFileSync(absolute);
    expect(buffer.length).toBe(bytes);
    expect(crypto.createHash('sha256').update(buffer).digest('hex')).toBe(sha256);
  });

  it('serves the washi companion document from the effects URL', () => {
    expect(SOURCE_URL).toBe('/effects/woven-cloth-washi.html');
    const html = fs.readFileSync(
      path.join(ROOT, 'public/effects/woven-cloth-washi.html'),
      'utf8',
    );
    expect(crypto.createHash('sha256').update(html).digest('hex')).toBe(FOCUSED_DOCUMENT_SHA256);
    expect(html).toContain('<title>Woven Cloth · Washi Noren</title>');
    expect(html).toContain('id="cloth"');
    expect(html).toContain('background: #0d0a07');
    expect(html).toContain('three@0.160.0');
  });

  it('keeps provenance identical to the served companion document', () => {
    const provenance = fs.readFileSync(
      path.join(
        ROOT,
        'src/templates/3d-website/woven-cloth-washi/sources/woven-cloth-washi.html',
      ),
      'utf8',
    );
    const served = fs.readFileSync(
      path.join(ROOT, 'public/effects/woven-cloth-washi.html'),
      'utf8',
    );
    expect(provenance).toBe(served);
    expect(crypto.createHash('sha256').update(provenance, 'utf8').digest('hex')).toBe(
      WOVEN_CLOTH_WASHI_SHA256,
    );
  });
});
