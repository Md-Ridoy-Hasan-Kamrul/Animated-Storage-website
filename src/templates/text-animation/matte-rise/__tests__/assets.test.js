import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import {
  ASSET_MANIFEST,
  MIN_PREVIEW_BYTES,
  NEUFORM_ISOLATED_EFFECTS_SHA256,
  PREVIEW_STILL,
  PREVIEW_STILL_DISK,
  PUBLIC_MATTE_RISE_HTML_SHA256,
  PUBLIC_MATTE_RISE_JS_SHA256,
  GALLERY_HEADING_HTML_SHA256,
  VARIANT_ID,
} from '../constants';

const ROOT = path.resolve(__dirname, '../../../../../');

describe('Matte Rise packaged assets', () => {
  it.each(ASSET_MANIFEST)('keeps byte-exact $path', ({ path: relativePath, bytes, sha256 }) => {
    const absolute = path.join(ROOT, relativePath);
    expect(fs.existsSync(absolute)).toBe(true);
    const buffer = fs.readFileSync(absolute);
    expect(buffer.length).toBe(bytes);
    expect(crypto.createHash('sha256').update(buffer).digest('hex')).toBe(sha256);
  });

  it('keeps verified Neuform + gallery-heading provenance', () => {
    const neuform = fs.readFileSync(
      path.join(ROOT, 'src/templates/text-animation/matte-rise/sources/NeuformIsolatedEffects.tsx.txt'),
      'utf8',
    );
    const html = fs.readFileSync(
      path.join(ROOT, 'src/templates/text-animation/matte-rise/sources/gallery-heading.html'),
      'utf8',
    );

    expect(crypto.createHash('sha256').update(neuform).digest('hex')).toBe(
      NEUFORM_ISOLATED_EFFECTS_SHA256,
    );
    expect(crypto.createHash('sha256').update(html).digest('hex')).toBe(GALLERY_HEADING_HTML_SHA256);

    expect(neuform).toContain('export function GalleryHeading');
    expect(neuform).toContain('transformGalleryHeadingSource');
    expect(neuform).toContain('buildFocusedDocument');
    expect(neuform).toContain('rising-diagonal');
    expect(html).toContain('id="stage"');
    expect(html).toContain('NEW GRAINIENT');
    expect(html).toContain('RING');
  });

  it('publishes focused public document with Matte Rise transform + threeui isolation', () => {
    const focused = fs.readFileSync(path.join(ROOT, 'public/effects/matte-rise.html'), 'utf8');
    const runtime = fs.readFileSync(path.join(ROOT, 'public/effects/matte-rise.js'), 'utf8');
    const host = fs.readFileSync(
      path.join(ROOT, 'src/templates/text-animation/matte-rise/GalleryHeading.jsx'),
      'utf8',
    );

    expect(crypto.createHash('sha256').update(focused).digest('hex')).toBe(
      PUBLIC_MATTE_RISE_HTML_SHA256,
    );
    expect(crypto.createHash('sha256').update(runtime).digest('hex')).toBe(
      PUBLIC_MATTE_RISE_JS_SHA256,
    );
    expect(focused).toContain('data-threeui-focus');
    expect(focused).toContain('#stage');
    expect(focused).toContain('/effects/matte-rise.js');
    expect(runtime).toContain("s:'TWELVE WORKS'");
    expect(runtime).toContain("s:'IN SLOW ORBIT'");
    expect(runtime).toContain("FIELD = 'matte'");
    expect(runtime).toContain('SPRING = 1');
    expect(runtime).not.toContain('NEW GRAINIENT');
    expect(host).toContain('export function GalleryHeading');
    expect(host).toContain('SOURCE_URL');
    expect(VARIANT_ID).toBe('rising-diagonal');
  });

  it('ships a real gallery still preview on disk (no broken STILL PREVIEW)', () => {
    expect(PREVIEW_STILL).toBe('/images/Assets%20Matte%20Rise/MatteRise.png');
    const absolute = path.join(ROOT, PREVIEW_STILL_DISK);
    expect(fs.existsSync(absolute)).toBe(true);
    expect(fs.statSync(absolute).size).toBeGreaterThan(MIN_PREVIEW_BYTES);
  });
});
