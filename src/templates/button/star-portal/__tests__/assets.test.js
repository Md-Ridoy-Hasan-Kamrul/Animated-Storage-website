import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import {
  ASSET_MANIFEST,
  IMAGINIE_STARFIELD_HTML_SHA256,
  MIN_PREVIEW_BYTES,
  NEUFORM_ISOLATED_EFFECTS_SHA256,
  PREVIEW_STILL,
  PREVIEW_STILL_DISK,
  PUBLIC_STAR_PORTAL_HTML_SHA256,
  SHADER_BUTTONS_TSX_SHA256,
  VARIANT_ID,
} from '../constants';

const ROOT = path.resolve(__dirname, '../../../../../');

describe('Star Portal packaged assets', () => {
  it.each(ASSET_MANIFEST)('keeps byte-exact $path', ({ path: relativePath, bytes, sha256 }) => {
    const absolute = path.join(ROOT, relativePath);
    expect(fs.existsSync(absolute)).toBe(true);
    const buffer = fs.readFileSync(absolute);
    expect(buffer.length).toBe(bytes);
    expect(crypto.createHash('sha256').update(buffer).digest('hex')).toBe(sha256);
  });

  it('keeps verified ShaderButtons + starfield provenance', () => {
    const shaderButtons = fs.readFileSync(
      path.join(ROOT, 'src/templates/button/star-portal/sources/ShaderButtons.tsx.txt'),
      'utf8',
    );
    const neuform = fs.readFileSync(
      path.join(ROOT, 'src/templates/button/star-portal/sources/NeuformIsolatedEffects.tsx.txt'),
      'utf8',
    );
    const html = fs.readFileSync(
      path.join(ROOT, 'src/templates/button/star-portal/sources/imaginie-starfield.html'),
      'utf8',
    );

    expect(crypto.createHash('sha256').update(shaderButtons).digest('hex')).toBe(
      SHADER_BUTTONS_TSX_SHA256,
    );
    expect(crypto.createHash('sha256').update(neuform).digest('hex')).toBe(
      NEUFORM_ISOLATED_EFFECTS_SHA256,
    );
    expect(crypto.createHash('sha256').update(html).digest('hex')).toBe(
      IMAGINIE_STARFIELD_HTML_SHA256,
    );

    expect(shaderButtons).toContain('export function ShaderButtons');
    expect(shaderButtons).toContain('"star-portal"');
    expect(neuform).toContain('export const StarPortal');
    expect(neuform).toContain('buildFocusedDocument');
    expect(neuform).toContain('#ambient-starfield');
    expect(neuform).toContain('#portal-stars');
    expect(neuform).toContain('.holo-btn');
    expect(html).toContain('holo-btn');
    expect(html).toContain('Begin the journey');
    expect(html).toContain('ambient-starfield');
    expect(html).toContain('portal-stars');
  });

  it('publishes focused public document with threeui focus isolation', () => {
    const focused = fs.readFileSync(path.join(ROOT, 'public/effects/star-portal.html'), 'utf8');
    const host = fs.readFileSync(
      path.join(ROOT, 'src/templates/button/star-portal/ShaderButtons.jsx'),
      'utf8',
    );

    expect(crypto.createHash('sha256').update(focused).digest('hex')).toBe(
      PUBLIC_STAR_PORTAL_HTML_SHA256,
    );
    expect(focused).toContain('data-threeui-focus');
    expect(focused).toContain('Begin the journey');
    expect(focused).toContain('data-threeui-role');
    expect(focused).toContain('#ambient-starfield');
    expect(focused).toContain('#portal-stars');
    expect(focused).toContain('.holo-btn');
    expect(host).toContain('export function ShaderButtons');
    expect(host).toContain('SOURCE_URL');
    expect(VARIANT_ID).toBe('star-portal');
  });

  it('ships a real gallery still preview on disk (no broken STILL PREVIEW)', () => {
    expect(PREVIEW_STILL).toBe('/images/Assets%20Star%20Portal/StarPortal.png');
    const absolute = path.join(ROOT, PREVIEW_STILL_DISK);
    expect(fs.existsSync(absolute)).toBe(true);
    expect(fs.statSync(absolute).size).toBeGreaterThan(MIN_PREVIEW_BYTES);
  });
});
