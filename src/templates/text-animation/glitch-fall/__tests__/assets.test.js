import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import {
  ASSET_MANIFEST,
  MIN_PREVIEW_BYTES,
  NEUFORM_ISOLATED_EFFECTS_SHA256,
  PREVIEW_STILL,
  PREVIEW_STILL_DISK,
  PUBLIC_GLITCH_FALL_HTML_SHA256,
  PUBLIC_GLITCH_FALL_JS_SHA256,
  GALLERY_HEADING_HTML_SHA256,
  VARIANT_ID,
} from '../constants';

const ROOT = path.resolve(__dirname, '../../../../../');

describe('Glitch Fall packaged assets', () => {
  it.each(ASSET_MANIFEST)('keeps byte-exact $path', ({ path: relativePath, bytes, sha256 }) => {
    const absolute = path.join(ROOT, relativePath);
    expect(fs.existsSync(absolute)).toBe(true);
    const buffer = fs.readFileSync(absolute);
    expect(buffer.length).toBe(bytes);
    expect(crypto.createHash('sha256').update(buffer).digest('hex')).toBe(sha256);
  });

  it('keeps verified Neuform + gallery-heading provenance', () => {
    const neuform = fs.readFileSync(
      path.join(ROOT, 'src/templates/text-animation/glitch-fall/sources/NeuformIsolatedEffects.tsx.txt'),
      'utf8',
    );
    const html = fs.readFileSync(
      path.join(ROOT, 'src/templates/text-animation/glitch-fall/sources/gallery-heading.html'),
      'utf8',
    );

    expect(crypto.createHash('sha256').update(neuform).digest('hex')).toBe(
      NEUFORM_ISOLATED_EFFECTS_SHA256,
    );
    expect(crypto.createHash('sha256').update(html).digest('hex')).toBe(GALLERY_HEADING_HTML_SHA256);

    expect(neuform).toContain('export function GalleryHeading');
    expect(neuform).toContain('transformGalleryHeadingSource');
    expect(neuform).toContain('buildFocusedDocument');
    expect(neuform).toContain('falling-diagonal');
    expect(html).toContain('id="stage"');
    expect(html).toContain('NEW GRAINIENT');
    expect(html).toContain('RING');
  });

  it('publishes focused public document with Glitch Fall transform + threeui isolation', () => {
    const focused = fs.readFileSync(path.join(ROOT, 'public/effects/glitch-fall.html'), 'utf8');
    const runtime = fs.readFileSync(path.join(ROOT, 'public/effects/glitch-fall.js'), 'utf8');
    const host = fs.readFileSync(
      path.join(ROOT, 'src/templates/text-animation/glitch-fall/GalleryHeading.jsx'),
      'utf8',
    );

    expect(crypto.createHash('sha256').update(focused).digest('hex')).toBe(
      PUBLIC_GLITCH_FALL_HTML_SHA256,
    );
    expect(crypto.createHash('sha256').update(runtime).digest('hex')).toBe(
      PUBLIC_GLITCH_FALL_JS_SHA256,
    );
    expect(focused).toContain('data-threeui-focus');
    expect(focused).toContain('#stage');
    expect(focused).toContain('/effects/glitch-fall.js');
    expect(runtime).toContain("s:'SIGNAL LOST'");
    expect(runtime).toContain("s:'IMAGE HOLDING'");
    expect(runtime).toContain("FIELD = 'glitch'");
    expect(runtime).toContain('SPRING = 0');
    expect(runtime).toContain('axis: -25.5');
    expect(runtime).toContain('Math.PI*2*-1');
    expect(runtime).toContain('headGlitch');
    expect(runtime).not.toContain('NEW GRAINIENT');
    expect(host).toContain('export function GalleryHeading');
    expect(host).toContain('SOURCE_URL');
    expect(VARIANT_ID).toBe('falling-diagonal');
  });

  it('ships a real gallery still preview on disk (no broken STILL PREVIEW)', () => {
    expect(PREVIEW_STILL).toBe('/images/Assets%20Glitch%20Fall/GlitchFall.png');
    const absolute = path.join(ROOT, PREVIEW_STILL_DISK);
    expect(fs.existsSync(absolute)).toBe(true);
    expect(fs.statSync(absolute).size).toBeGreaterThan(MIN_PREVIEW_BYTES);
  });
});
