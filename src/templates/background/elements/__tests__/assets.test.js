import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import {
  ASSET_MANIFEST,
  ELEMENTAL_MARKS_HTML_SHA256,
  ELEMENTS_COMPONENT_SHA256,
  PREVIEW_STILL,
} from '../constants';

const ROOT = path.resolve(__dirname, '../../../../../');
const MIN_PREVIEW_BYTES = 10_000;

function previewStillAbsolutePath(urlPath) {
  const decoded = decodeURIComponent(urlPath.replace(/^\//, ''));
  return path.join(ROOT, 'public', decoded.replace(/^images[\\/]/, 'images' + path.sep));
}

describe('Elements packaged assets', () => {
  it.each(ASSET_MANIFEST)('keeps byte-exact $path', ({ path: relativePath, bytes, sha256 }) => {
    const absolute = path.join(ROOT, relativePath);
    expect(fs.existsSync(absolute)).toBe(true);
    const buffer = fs.readFileSync(absolute);
    expect(buffer.length).toBe(bytes);
    expect(crypto.createHash('sha256').update(buffer).digest('hex')).toBe(sha256);
  });

  it('ships a real gallery still preview on disk (no broken STILL PREVIEW)', () => {
    expect(PREVIEW_STILL).toBe('/images/Assets%20Elements/Elements.png');
    const absolute = path.join(ROOT, 'public/images/Assets Elements/Elements.png');
    expect(fs.existsSync(absolute)).toBe(true);
    const size = fs.statSync(absolute).size;
    expect(size).toBeGreaterThan(MIN_PREVIEW_BYTES);
    expect(previewStillAbsolutePath(PREVIEW_STILL)).toBe(absolute);
  });

  it('keeps the verified ElementsBackground component and elemental marks provenance', () => {
    const component = fs.readFileSync(
      path.join(ROOT, 'src/templates/background/elements/sources/ElementsBackground.tsx.txt'),
      'utf8',
    );
    const html = fs.readFileSync(
      path.join(ROOT, 'src/templates/background/elements/sources/elemental-marks.html'),
      'utf8',
    );

    expect(crypto.createHash('sha256').update(component).digest('hex')).toBe(
      ELEMENTS_COMPONENT_SHA256,
    );
    expect(crypto.createHash('sha256').update(html).digest('hex')).toBe(
      ELEMENTAL_MARKS_HTML_SHA256,
    );

    expect(component).toContain('export function ElementsBackground');
    expect(component).toContain('buildFocusedDocument');
    expect(component).toContain('elements-controls');
    expect(component).toContain('sandbox="allow-scripts"');
    expect(html).toContain('Elemental Marks');
    expect(html).toContain('FRAG_WATER');
    expect(html).toContain('FRAG_SIM');
    expect(html).toContain('ping-pong wave equation');
    expect(html).toContain('data-fx="water"');
  });

  it('keeps the public marks document identical to provenance', () => {
    const provenance = fs.readFileSync(
      path.join(ROOT, 'src/templates/background/elements/sources/elemental-marks.html'),
      'utf8',
    );
    const published = fs.readFileSync(
      path.join(ROOT, 'public/effects/elemental-marks.html'),
      'utf8',
    );
    expect(published).toBe(provenance);
  });

  it('publishes a focused water document with controls and detail patches', () => {
    const focused = fs.readFileSync(
      path.join(ROOT, 'public/effects/elemental-water.html'),
      'utf8',
    );
    expect(focused).toContain('data-elements-focus');
    expect(focused).toContain('data-elements-controls');
    expect(focused).toContain('elements-controls');
    expect(focused).toContain('.panel[data-fx="water"]');
    expect(focused).toContain('zoom: 1.5600');
    expect(focused).toContain('const SDF_SIZE = 768');
    expect(focused).toContain('if (!window.__ELEMENTS_PAUSED)');
    expect(focused).not.toContain('fonts.googleapis.com');
  });
});
