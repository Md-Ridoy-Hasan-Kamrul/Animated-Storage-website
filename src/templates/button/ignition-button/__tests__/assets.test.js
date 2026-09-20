import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import {
  ASSET_MANIFEST,
  IGNITION_TERMINAL_HTML_SHA256,
  MIN_PREVIEW_BYTES,
  NEUFORM_ISOLATED_EFFECTS_SHA256,
  PREVIEW_STILL,
  PREVIEW_STILL_DISK,
  PUBLIC_IGNITION_HTML_SHA256,
  VARIANT_ID,
} from '../constants';

const ROOT = path.resolve(__dirname, '../../../../../');

describe('Ignition packaged assets', () => {
  it.each(ASSET_MANIFEST)('keeps byte-exact $path', ({ path: relativePath, bytes, sha256 }) => {
    const absolute = path.join(ROOT, relativePath);
    expect(fs.existsSync(absolute)).toBe(true);
    const buffer = fs.readFileSync(absolute);
    expect(buffer.length).toBe(bytes);
    expect(crypto.createHash('sha256').update(buffer).digest('hex')).toBe(sha256);
  });

  it('keeps verified Neuform + ignition-terminal provenance', () => {
    const neuform = fs.readFileSync(
      path.join(ROOT, 'src/templates/button/ignition-button/sources/NeuformIsolatedEffects.tsx.txt'),
      'utf8',
    );
    const html = fs.readFileSync(
      path.join(ROOT, 'src/templates/button/ignition-button/sources/ignition-terminal.html'),
      'utf8',
    );

    expect(crypto.createHash('sha256').update(neuform).digest('hex')).toBe(
      NEUFORM_ISOLATED_EFFECTS_SHA256,
    );
    expect(crypto.createHash('sha256').update(html).digest('hex')).toBe(
      IGNITION_TERMINAL_HTML_SHA256,
    );

    expect(neuform).toContain('export const IgnitionButton');
    expect(neuform).toContain('buildFocusedDocument');
    expect(neuform).toContain('#bg-gl');
    expect(neuform).toContain('#btn');
    expect(neuform).toContain('ignition-terminal');
    expect(html).toContain('id="bg-gl"');
    expect(html).toContain('id="btn"');
    expect(html).toContain('LAUNCH');
    expect(html).toContain('u_warp');
    expect(html).toContain('webgl');
  });

  it('publishes focused public document with threeui focus isolation', () => {
    const focused = fs.readFileSync(path.join(ROOT, 'public/effects/ignition-button.html'), 'utf8');
    const host = fs.readFileSync(
      path.join(ROOT, 'src/templates/button/ignition-button/ShaderButtons.jsx'),
      'utf8',
    );

    expect(crypto.createHash('sha256').update(focused).digest('hex')).toBe(
      PUBLIC_IGNITION_HTML_SHA256,
    );
    expect(focused).toContain('data-threeui-focus');
    expect(focused).toContain('data-threeui-role');
    expect(focused).toContain('#bg-gl');
    expect(focused).toContain('#btn');
    expect(focused).toContain('invert(1)');
    expect(focused).toContain('#121316');
    expect(focused).toContain('LAUNCH');
    expect(host).toContain('export function ShaderButtons');
    expect(host).toContain('SOURCE_URL');
    expect(VARIANT_ID).toBe('ignition-button');
  });

  it('ships a real gallery still preview on disk (no broken STILL PREVIEW)', () => {
    expect(PREVIEW_STILL).toBe('/images/Assets%20Ignition/Ignition.png');
    const absolute = path.join(ROOT, PREVIEW_STILL_DISK);
    expect(fs.existsSync(absolute)).toBe(true);
    expect(fs.statSync(absolute).size).toBeGreaterThan(MIN_PREVIEW_BYTES);
  });
});
