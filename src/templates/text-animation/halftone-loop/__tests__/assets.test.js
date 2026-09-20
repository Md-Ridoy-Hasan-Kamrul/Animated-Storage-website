import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import {
  ASSET_MANIFEST,
  MIN_PREVIEW_BYTES,
  NEUFORM_ISOLATED_EFFECTS_SHA256,
  PREVIEW_STILL,
  PREVIEW_STILL_DISK,
  PUBLIC_HALFTONE_LOOP_HTML_SHA256,
  PUBLIC_HALFTONE_LOOP_JS_SHA256,
  GALLERY_HEADING_HTML_SHA256,
  VARIANT_ID,
} from '../constants';

const ROOT = path.resolve(__dirname, '../../../../../');

describe('Halftone Loop packaged assets', () => {
  it.each(ASSET_MANIFEST)('keeps byte-exact $path', ({ path: relativePath, bytes, sha256 }) => {
    const absolute = path.join(ROOT, relativePath);
    expect(fs.existsSync(absolute)).toBe(true);
    const buffer = fs.readFileSync(absolute);
    expect(buffer.length).toBe(bytes);
    expect(crypto.createHash('sha256').update(buffer).digest('hex')).toBe(sha256);
  });

  it('keeps verified Neuform + gallery-heading provenance', () => {
    const neuform = fs.readFileSync(
      path.join(ROOT, 'src/templates/text-animation/halftone-loop/sources/NeuformIsolatedEffects.tsx.txt'),
      'utf8',
    );
    const html = fs.readFileSync(
      path.join(ROOT, 'src/templates/text-animation/halftone-loop/sources/gallery-heading.html'),
      'utf8',
    );

    expect(crypto.createHash('sha256').update(neuform).digest('hex')).toBe(
      NEUFORM_ISOLATED_EFFECTS_SHA256,
    );
    expect(crypto.createHash('sha256').update(html).digest('hex')).toBe(GALLERY_HEADING_HTML_SHA256);

    expect(neuform).toContain('export function GalleryHeading');
    expect(neuform).toContain('transformGalleryHeadingSource');
    expect(neuform).toContain('buildFocusedDocument');
    expect(neuform).toContain('vertical-loop');
    expect(html).toContain('id="stage"');
    expect(html).toContain('NEW GRAINIENT');
    expect(html).toContain('RING');
  });

  it('publishes focused public document with Halftone Loop transform + threeui isolation', () => {
    const focused = fs.readFileSync(path.join(ROOT, 'public/effects/halftone-loop.html'), 'utf8');
    const runtime = fs.readFileSync(path.join(ROOT, 'public/effects/halftone-loop.js'), 'utf8');
    const host = fs.readFileSync(
      path.join(ROOT, 'src/templates/text-animation/halftone-loop/GalleryHeading.jsx'),
      'utf8',
    );

    expect(crypto.createHash('sha256').update(focused).digest('hex')).toBe(
      PUBLIC_HALFTONE_LOOP_HTML_SHA256,
    );
    expect(crypto.createHash('sha256').update(runtime).digest('hex')).toBe(
      PUBLIC_HALFTONE_LOOP_JS_SHA256,
    );
    expect(focused).toContain('data-threeui-focus');
    expect(focused).toContain('#stage');
    expect(focused).toContain('/effects/halftone-loop.js');
    expect(runtime).toContain("s:'ONE WALL'");
    expect(runtime).toContain("s:'TWELVE PLATES'");
    expect(runtime).toContain("FIELD = 'halftone'");
    expect(runtime).toContain('axis: 90,');
    expect(runtime).toContain('Didot');
    expect(runtime).toContain("HEAD_STYLE = 'halftone'");
    expect(runtime).not.toContain('NEW GRAINIENT');
    expect(host).toContain('export function GalleryHeading');
    expect(host).toContain('SOURCE_URL');
    expect(VARIANT_ID).toBe('vertical-loop');
  });

  it('ships a real gallery still preview on disk (no broken STILL PREVIEW)', () => {
    expect(PREVIEW_STILL).toBe('/images/Assets%20Halftone%20Loop/HalftoneLoop.png');
    const absolute = path.join(ROOT, PREVIEW_STILL_DISK);
    expect(fs.existsSync(absolute)).toBe(true);
    expect(fs.statSync(absolute).size).toBeGreaterThan(MIN_PREVIEW_BYTES);
  });
});
