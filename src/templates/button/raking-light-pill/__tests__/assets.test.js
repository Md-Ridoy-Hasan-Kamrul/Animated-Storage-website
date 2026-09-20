import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import {
  ASSET_MANIFEST,
  MIN_PREVIEW_BYTES,
  PREVIEW_STILL,
  PREVIEW_STILL_DISK,
  RAKING_LIGHT_PILL_BUTTON_TSX_SHA256,
  SHADER_BUTTONS_TSX_SHA256,
  VARIANT_ID,
} from '../constants';

const ROOT = path.resolve(__dirname, '../../../../../');

describe('Raking Light Pill packaged assets', () => {
  it.each(ASSET_MANIFEST)('keeps byte-exact $path', ({ path: relativePath, bytes, sha256 }) => {
    const absolute = path.join(ROOT, relativePath);
    expect(fs.existsSync(absolute)).toBe(true);
    const buffer = fs.readFileSync(absolute);
    expect(buffer.length).toBe(bytes);
    expect(crypto.createHash('sha256').update(buffer).digest('hex')).toBe(sha256);
  });

  it('keeps verified ShaderButtons + RakingLightPillButton provenance', () => {
    const shaderButtons = fs.readFileSync(
      path.join(ROOT, 'src/templates/button/raking-light-pill/sources/ShaderButtons.tsx.txt'),
      'utf8',
    );
    const raking = fs.readFileSync(
      path.join(ROOT, 'src/templates/button/raking-light-pill/sources/RakingLightPillButton.tsx.txt'),
      'utf8',
    );

    expect(crypto.createHash('sha256').update(shaderButtons).digest('hex')).toBe(
      SHADER_BUTTONS_TSX_SHA256,
    );
    expect(crypto.createHash('sha256').update(raking).digest('hex')).toBe(
      RAKING_LIGHT_PILL_BUTTON_TSX_SHA256,
    );

    expect(shaderButtons).toContain('raking-light-pill');
    expect(shaderButtons).toContain('RakingLightPillButton');
    expect(raking).toContain('export function RakingLightPillButton');
    expect(raking).toContain('FRAGMENT_SHADER');
    expect(raking).toContain('uHover');
    expect(raking).toContain('Field Notes 2026');
    expect(raking).toContain('threeui-raking-light-pill');
    expect(raking).toContain('#160d0c');
  });

  it('hosts the raking-light-pill React WebGL renderer (not an HTML iframe scene)', () => {
    const host = fs.readFileSync(
      path.join(ROOT, 'src/templates/button/raking-light-pill/ShaderButtons.jsx'),
      'utf8',
    );
    const button = fs.readFileSync(
      path.join(ROOT, 'src/templates/button/raking-light-pill/RakingLightPillButton.jsx'),
      'utf8',
    );

    expect(host).toContain('export function ShaderButtons');
    expect(host).toContain('RakingLightPillButton');
    expect(host).not.toContain('<iframe');
    expect(button).toContain('export function RakingLightPillButton');
    expect(button).toContain("getContext('webgl'");
    expect(button).toContain('Field Notes 2026');
    expect(button).toContain('FRAGMENT_SHADER');
    expect(VARIANT_ID).toBe('raking-light-pill');
  });

  it('ships a real gallery still preview on disk (no broken STILL PREVIEW)', () => {
    expect(PREVIEW_STILL).toBe('/images/Assets%20Raking%20Light%20Pill/RakingLightPill.png');
    const absolute = path.join(ROOT, PREVIEW_STILL_DISK);
    expect(fs.existsSync(absolute)).toBe(true);
    expect(fs.statSync(absolute).size).toBeGreaterThan(MIN_PREVIEW_BYTES);
  });
});
