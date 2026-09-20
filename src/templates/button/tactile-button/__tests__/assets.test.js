import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import {
  ASSET_MANIFEST,
  MIN_PREVIEW_BYTES,
  NEUFORM_ISOLATED_EFFECTS_SHA256,
  NEXUS_TACTILE_HTML_SHA256,
  PREVIEW_STILL,
  PREVIEW_STILL_DISK,
  PUBLIC_TACTILE_HTML_SHA256,
  VARIANT_ID,
} from '../constants';

const ROOT = path.resolve(__dirname, '../../../../../');

describe('Tactile packaged assets', () => {
  it.each(ASSET_MANIFEST)('keeps byte-exact $path', ({ path: relativePath, bytes, sha256 }) => {
    const absolute = path.join(ROOT, relativePath);
    expect(fs.existsSync(absolute)).toBe(true);
    const buffer = fs.readFileSync(absolute);
    expect(buffer.length).toBe(bytes);
    expect(crypto.createHash('sha256').update(buffer).digest('hex')).toBe(sha256);
  });

  it('keeps verified Neuform + nexus-tactile provenance', () => {
    const neuform = fs.readFileSync(
      path.join(ROOT, 'src/templates/button/tactile-button/sources/NeuformIsolatedEffects.tsx.txt'),
      'utf8',
    );
    const html = fs.readFileSync(
      path.join(ROOT, 'src/templates/button/tactile-button/sources/nexus-tactile.html'),
      'utf8',
    );

    expect(crypto.createHash('sha256').update(neuform).digest('hex')).toBe(
      NEUFORM_ISOLATED_EFFECTS_SHA256,
    );
    expect(crypto.createHash('sha256').update(html).digest('hex')).toBe(NEXUS_TACTILE_HTML_SHA256);

    expect(neuform).toContain('export const TactileButton');
    expect(neuform).toContain('buildFocusedDocument');
    expect(neuform).toContain('#bg-canvas');
    expect(neuform).toContain('#btn');
    expect(neuform).toContain('tactile');
    expect(html).toContain('id="bg-canvas"');
    expect(html).toContain('id="btn"');
    expect(html).toContain('SURGE');
    expect(html).toContain('u_slosh');
    expect(html).toContain('webgl');
  });

  it('publishes focused public document with threeui focus isolation', () => {
    const focused = fs.readFileSync(path.join(ROOT, 'public/effects/tactile-button.html'), 'utf8');
    const host = fs.readFileSync(
      path.join(ROOT, 'src/templates/button/tactile-button/ShaderButtons.jsx'),
      'utf8',
    );

    expect(crypto.createHash('sha256').update(focused).digest('hex')).toBe(
      PUBLIC_TACTILE_HTML_SHA256,
    );
    expect(focused).toContain('data-threeui-focus');
    expect(focused).toContain('data-threeui-role');
    expect(focused).toContain('#bg-canvas');
    expect(focused).toContain('#btn');
    expect(focused).toContain('#03090d');
    expect(focused).toContain('SURGE');
    expect(focused).not.toContain('invert(1)');
    expect(host).toContain('export function ShaderButtons');
    expect(host).toContain('SOURCE_URL');
    expect(VARIANT_ID).toBe('tactile-button');
  });

  it('ships a real gallery still preview on disk (no broken STILL PREVIEW)', () => {
    expect(PREVIEW_STILL).toBe('/images/Assets%20Tactile/Tactile.png');
    const absolute = path.join(ROOT, PREVIEW_STILL_DISK);
    expect(fs.existsSync(absolute)).toBe(true);
    expect(fs.statSync(absolute).size).toBeGreaterThan(MIN_PREVIEW_BYTES);
  });
});
