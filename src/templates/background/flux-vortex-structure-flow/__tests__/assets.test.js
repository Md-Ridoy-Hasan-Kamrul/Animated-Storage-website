import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import {
  ASSET_MANIFEST,
  FOCUSED_DOCUMENT_SHA256,
  SOURCE_URL,
} from '../constants';

const ROOT = path.resolve(__dirname, '../../../../../');

describe('Flux Vortex Structure Flow packaged assets', () => {
  it.each(ASSET_MANIFEST)('keeps byte-exact $path', ({ path: relativePath, bytes, sha256 }) => {
    const absolute = path.join(ROOT, relativePath);
    expect(fs.existsSync(absolute)).toBe(true);
    const buffer = fs.readFileSync(absolute);
    expect(buffer.length).toBe(bytes);
    expect(crypto.createHash('sha256').update(buffer).digest('hex')).toBe(sha256);
  });

  it('serves a focus-isolated Flux Vortex document from the effects URL', () => {
    expect(SOURCE_URL).toBe('/effects/flux-vortex-structure-flow.html');
    const html = fs.readFileSync(
      path.join(ROOT, 'public/effects/flux-vortex-structure-flow.html'),
      'utf8',
    );
    expect(crypto.createHash('sha256').update(html).digest('hex')).toBe(FOCUSED_DOCUMENT_SHA256);
    expect(html).toContain('id="webgl-canvas"');
    expect(html).toContain('data-threeui-focus');
    expect(html).toContain('data-threeui-controls');
    expect(html).toContain('__SF_CONTROLS');
    expect(html).toContain('UnrealBloomPass');
    expect(html).toContain('const vortexCount = 9500;');
    expect(html).toContain('#webgl-canvas');
  });

  it('keeps provenance flux-vortex identical to the registered source', () => {
    const provenance = fs.readFileSync(
      path.join(ROOT, 'src/templates/background/flux-vortex-structure-flow/sources/flux-vortex.html'),
      'utf8',
    );
    expect(provenance).toContain('webgl-canvas');
    expect(provenance).toContain('Quantum Flux');
    expect(provenance).toContain('UnrealBloomPass');
  });
});
