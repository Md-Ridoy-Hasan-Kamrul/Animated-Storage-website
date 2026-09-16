import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import {
  ASSET_MANIFEST,
  FOCUSED_DOCUMENT_SHA256,
  SOURCE_URL,
} from '../constants';

const ROOT = path.resolve(__dirname, '../../../../../');

describe('Nebula Structure Flow packaged assets', () => {
  it.each(ASSET_MANIFEST)('keeps byte-exact $path', ({ path: relativePath, bytes, sha256 }) => {
    const absolute = path.join(ROOT, relativePath);
    expect(fs.existsSync(absolute)).toBe(true);
    const buffer = fs.readFileSync(absolute);
    expect(buffer.length).toBe(bytes);
    expect(crypto.createHash('sha256').update(buffer).digest('hex')).toBe(sha256);
  });

  it('serves a focus-isolated Nebula document from the effects URL', () => {
    expect(SOURCE_URL).toBe('/effects/nebula-structure-flow.html');
    const html = fs.readFileSync(
      path.join(ROOT, 'public/effects/nebula-structure-flow.html'),
      'utf8',
    );
    expect(crypto.createHash('sha256').update(html).digest('hex')).toBe(FOCUSED_DOCUMENT_SHA256);
    expect(html).toContain('id="bg-canvas"');
    expect(html).toContain('data-threeui-focus');
    expect(html).toContain('three.js/r128/three.min.js');
    expect(html).toContain('#bg-canvas');
    expect(html).toContain('data-threeui-role');
    expect(html).toContain('u_mouse');
    expect(html).toContain('fbm');
  });

  it('keeps provenance julian-vance-nebula identical to the registered source', () => {
    const provenance = fs.readFileSync(
      path.join(
        ROOT,
        'src/templates/background/nebula-structure-flow/sources/julian-vance-nebula.html',
      ),
      'utf8',
    );
    expect(provenance).toContain('bg-canvas');
    expect(provenance).toContain('Julian Vance');
    expect(provenance).toContain('indigo');
  });
});
