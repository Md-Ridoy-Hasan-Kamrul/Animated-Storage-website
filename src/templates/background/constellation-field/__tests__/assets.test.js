import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import {
  ASSET_MANIFEST,
  CONSTELLATION_FIELD_COMPONENT_SHA256,
  CONSTELLATION_FIELD_HTML_SHA256,
  MIN_PREVIEW_BYTES,
  PREVIEW_STILL,
  PREVIEW_STILL_DISK,
  PUBLIC_CONSTELLATION_FIELD_HTML_SHA256,
} from '../constants';

const ROOT = path.resolve(__dirname, '../../../../../');

describe('Constellation Field packaged assets', () => {
  it.each(ASSET_MANIFEST)('keeps byte-exact $path', ({ path: relativePath, bytes, sha256 }) => {
    const absolute = path.join(ROOT, relativePath);
    expect(fs.existsSync(absolute)).toBe(true);
    const buffer = fs.readFileSync(absolute);
    expect(buffer.length).toBe(bytes);
    expect(crypto.createHash('sha256').update(buffer).digest('hex')).toBe(sha256);
  });

  it('keeps verified ConstellationField host and canonical HTML provenance', () => {
    const component = fs.readFileSync(
      path.join(
        ROOT,
        'src/templates/background/constellation-field/sources/ConstellationField.tsx.txt',
      ),
      'utf8',
    );
    const html = fs.readFileSync(
      path.join(
        ROOT,
        'src/templates/background/constellation-field/sources/constellation-field.html',
      ),
      'utf8',
    );

    expect(crypto.createHash('sha256').update(component).digest('hex')).toBe(
      CONSTELLATION_FIELD_COMPONENT_SHA256,
    );
    expect(crypto.createHash('sha256').update(html).digest('hex')).toBe(
      CONSTELLATION_FIELD_HTML_SHA256,
    );

    const neuform = fs.readFileSync(
      path.join(
        ROOT,
        'src/templates/background/constellation-field/sources/NeuformBatchEffects.tsx.txt',
      ),
      'utf8',
    );

    expect(component).toContain('export function ConstellationField');
    expect(component).toContain('NeuformBatchEffects');
    expect(component).toContain('VARIANT_COMPONENTS');
    expect(neuform).toContain('buildFocusedDocument');
    expect(neuform).toContain('sandbox="allow-scripts"');
    expect(neuform).toContain('threeui-controls');
    expect(html).toContain('constellationCanvas');
    expect(html).toContain('const LINK = 160');
    expect(html).toContain('MAX_NODES');
    expect(html).toContain('animateCanvas');
    expect(html).toContain('#E6C879');
  });

  it('publishes focused public document with threeui controls and SF bridge', () => {
    const focused = fs.readFileSync(
      path.join(ROOT, 'public/effects/constellation-field.html'),
      'utf8',
    );
    expect(crypto.createHash('sha256').update(focused).digest('hex')).toBe(
      PUBLIC_CONSTELLATION_FIELD_HTML_SHA256,
    );
    expect(focused).toContain('data-threeui-focus');
    expect(focused).toContain('data-threeui-controls');
    expect(focused).toContain('threeui-controls');
    expect(focused).toContain('__SF_CONTROLS');
    expect(focused).toContain('constellationCanvas');
    expect(focused).toContain('#constellationCanvas');
    expect(focused).toContain('__SF_CONTROLS&&window.__SF_CONTROLS.speed');
    expect(focused).toContain('prefers-reduced-motion');
    expect(focused).not.toContain('cloudflareinsights');
  });

  it('ships a real gallery still preview on disk (no broken STILL PREVIEW)', () => {
    expect(PREVIEW_STILL).toBe(
      '/images/Assets%20Constellation%20Field%20Default%20Variant/ConstellationFieldDefaultVariant.png',
    );
    const absolute = path.join(ROOT, PREVIEW_STILL_DISK);
    expect(fs.existsSync(absolute)).toBe(true);
    expect(fs.statSync(absolute).size).toBeGreaterThan(MIN_PREVIEW_BYTES);
  });
});
