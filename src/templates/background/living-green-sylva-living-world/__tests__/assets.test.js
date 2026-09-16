import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import {
  ASSET_MANIFEST,
  SOURCE_URL,
  SCENE_DOCUMENT_SHA256,
} from '../constants';

const ROOT = path.resolve(__dirname, '../../../../../');

describe('Sylva Living World packaged assets', () => {
  it.each(ASSET_MANIFEST)('keeps byte-exact $path', ({ path: relativePath, bytes, sha256 }) => {
    const absolute = path.join(ROOT, relativePath);
    expect(fs.existsSync(absolute)).toBe(true);
    const buffer = fs.readFileSync(absolute);
    expect(buffer.length).toBe(bytes);
    expect(crypto.createHash('sha256').update(buffer).digest('hex')).toBe(sha256);
  });

  it('serves a scene-only document from the public effects URL', () => {
    expect(SOURCE_URL).toBe('/effects/sylva-living-world-living-green.html');
    const html = fs.readFileSync(
      path.join(ROOT, 'public/effects/sylva-living-world-living-green.html'),
      'utf8',
    );
    expect(crypto.createHash('sha256').update(html).digest('hex')).toBe(SCENE_DOCUMENT_SHA256);
    expect(html).toContain('id="scene"');
    expect(html).toContain('id="hero"');
    expect(html).toContain('id="stage"');
    expect(html).toContain('data-threeui-sylva-scene');
    expect(html).toContain('/landing-pages/inner-green-assets/three.min.js');
    expect(html).toContain('Interactive procedural moss root world');
    expect(html).not.toContain('class="dock"');
    expect(html).not.toContain('Step into');
    expect(html).not.toContain('data-liquid-metal="explore"');
    expect(html).toContain('if (!REDUCED) requestAnimationFrame(loop)');
  });
});
