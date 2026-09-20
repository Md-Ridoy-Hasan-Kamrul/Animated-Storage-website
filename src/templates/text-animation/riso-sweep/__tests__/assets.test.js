import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import {
  ASSET_MANIFEST,
  MIN_PREVIEW_BYTES,
  NEUFORM_ISOLATED_EFFECTS_SHA256,
  PREVIEW_STILL,
  PREVIEW_STILL_DISK,
  PUBLIC_RISO_SWEEP_HTML_SHA256,
  PUBLIC_RISO_SWEEP_JS_SHA256,
  GALLERY_HEADING_HTML_SHA256,
  VARIANT_ID,
} from '../constants';

const ROOT = path.resolve(__dirname, '../../../../../');

describe('Riso Sweep packaged assets', () => {
  it.each(ASSET_MANIFEST)('keeps byte-exact $path', ({ path: relativePath, bytes, sha256 }) => {
    const absolute = path.join(ROOT, relativePath);
    expect(fs.existsSync(absolute)).toBe(true);
    const buffer = fs.readFileSync(absolute);
    expect(buffer.length).toBe(bytes);
    expect(crypto.createHash('sha256').update(buffer).digest('hex')).toBe(sha256);
  });

  it('keeps verified Neuform + gallery-heading provenance', () => {
    const neuform = fs.readFileSync(
      path.join(ROOT, 'src/templates/text-animation/riso-sweep/sources/NeuformIsolatedEffects.tsx.txt'),
      'utf8',
    );
    const html = fs.readFileSync(
      path.join(ROOT, 'src/templates/text-animation/riso-sweep/sources/gallery-heading.html'),
      'utf8',
    );

    expect(crypto.createHash('sha256').update(neuform).digest('hex')).toBe(
      NEUFORM_ISOLATED_EFFECTS_SHA256,
    );
    expect(crypto.createHash('sha256').update(html).digest('hex')).toBe(GALLERY_HEADING_HTML_SHA256);

    expect(neuform).toContain('export function GalleryHeading');
    expect(neuform).toContain('transformGalleryHeadingSource');
    expect(neuform).toContain('buildFocusedDocument');
    expect(neuform).toContain('horizontal-sweep');
    expect(html).toContain('id="stage"');
    expect(html).toContain('NEW GRAINIENT');
    expect(html).toContain('RING');
  });

  it('publishes focused public document with Riso Sweep transform + threeui isolation', () => {
    const focused = fs.readFileSync(path.join(ROOT, 'public/effects/riso-sweep.html'), 'utf8');
    const runtime = fs.readFileSync(path.join(ROOT, 'public/effects/riso-sweep.js'), 'utf8');
    const host = fs.readFileSync(
      path.join(ROOT, 'src/templates/text-animation/riso-sweep/GalleryHeading.jsx'),
      'utf8',
    );

    expect(crypto.createHash('sha256').update(focused).digest('hex')).toBe(
      PUBLIC_RISO_SWEEP_HTML_SHA256,
    );
    expect(crypto.createHash('sha256').update(runtime).digest('hex')).toBe(
      PUBLIC_RISO_SWEEP_JS_SHA256,
    );
    expect(focused).toContain('data-threeui-focus');
    expect(focused).toContain('#stage');
    expect(focused).toContain('/effects/riso-sweep.js');
    expect(runtime).toContain("s:'PRINTS FROM'");
    expect(runtime).toContain("s:'THE FLAT FILES'");
    expect(runtime).toContain("FIELD = 'riso'");
    expect(runtime).toContain('axis: 0,');
    expect(runtime).toContain('Iowan Old Style');
    expect(runtime).toContain("HEAD_STYLE = 'riso'");
    expect(runtime).not.toContain('NEW GRAINIENT');
    expect(host).toContain('export function GalleryHeading');
    expect(host).toContain('SOURCE_URL');
    expect(VARIANT_ID).toBe('horizontal-sweep');
  });

  it('ships a real gallery still preview on disk (no broken STILL PREVIEW)', () => {
    expect(PREVIEW_STILL).toBe('/images/Assets%20Riso%20Sweep/RisoSweep.png');
    const absolute = path.join(ROOT, PREVIEW_STILL_DISK);
    expect(fs.existsSync(absolute)).toBe(true);
    expect(fs.statSync(absolute).size).toBeGreaterThan(MIN_PREVIEW_BYTES);
  });
});
