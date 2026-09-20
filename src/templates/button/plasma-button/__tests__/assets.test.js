import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import {
  ASSET_MANIFEST,
  AETHERIS_LABS_HTML_SHA256,
  MIN_PREVIEW_BYTES,
  NEUFORM_ISOLATED_EFFECTS_SHA256,
  PREVIEW_STILL,
  PREVIEW_STILL_DISK,
  PUBLIC_PLASMA_HTML_SHA256,
  VARIANT_ID,
} from '../constants';

const ROOT = path.resolve(__dirname, '../../../../../');

describe('Plasma packaged assets', () => {
  it.each(ASSET_MANIFEST)('keeps byte-exact $path', ({ path: relativePath, bytes, sha256 }) => {
    const absolute = path.join(ROOT, relativePath);
    expect(fs.existsSync(absolute)).toBe(true);
    const buffer = fs.readFileSync(absolute);
    expect(buffer.length).toBe(bytes);
    expect(crypto.createHash('sha256').update(buffer).digest('hex')).toBe(sha256);
  });

  it('keeps verified Neuform + aetheris-labs provenance', () => {
    const neuform = fs.readFileSync(
      path.join(ROOT, 'src/templates/button/plasma-button/sources/NeuformIsolatedEffects.tsx.txt'),
      'utf8',
    );
    const html = fs.readFileSync(
      path.join(ROOT, 'src/templates/button/plasma-button/sources/aetheris-labs.html'),
      'utf8',
    );

    expect(crypto.createHash('sha256').update(neuform).digest('hex')).toBe(
      NEUFORM_ISOLATED_EFFECTS_SHA256,
    );
    expect(crypto.createHash('sha256').update(html).digest('hex')).toBe(AETHERIS_LABS_HTML_SHA256);

    expect(neuform).toContain('export const PlasmaButton');
    expect(neuform).toContain('buildFocusedDocument');
    expect(neuform).toContain('#bg-gl');
    expect(neuform).toContain('#btn');
    expect(neuform).toContain('aetherisLabs');
    expect(html).toContain('id="bg-gl"');
    expect(html).toContain('id="btn"');
    expect(html).toContain('AETHER DRIVE');
    expect(html).toContain('u_heat');
    expect(html).toContain('webgl');
  });

  it('publishes focused public document with threeui focus isolation', () => {
    const focused = fs.readFileSync(path.join(ROOT, 'public/effects/plasma-button.html'), 'utf8');
    const host = fs.readFileSync(
      path.join(ROOT, 'src/templates/button/plasma-button/ShaderButtons.jsx'),
      'utf8',
    );

    expect(crypto.createHash('sha256').update(focused).digest('hex')).toBe(
      PUBLIC_PLASMA_HTML_SHA256,
    );
    expect(focused).toContain('data-threeui-focus');
    expect(focused).toContain('data-threeui-role');
    expect(focused).toContain('#bg-gl');
    expect(focused).toContain('#btn');
    expect(focused).toContain('#020614');
    expect(focused).toContain('AETHER DRIVE');
    expect(focused).not.toContain('invert(1)');
    expect(host).toContain('export function ShaderButtons');
    expect(host).toContain('SOURCE_URL');
    expect(VARIANT_ID).toBe('plasma-button');
  });

  it('ships a real gallery still preview on disk (no broken STILL PREVIEW)', () => {
    expect(PREVIEW_STILL).toBe('/images/Assets%20Plasma/Plasma.png');
    const absolute = path.join(ROOT, PREVIEW_STILL_DISK);
    expect(fs.existsSync(absolute)).toBe(true);
    expect(fs.statSync(absolute).size).toBeGreaterThan(MIN_PREVIEW_BYTES);
  });
});
