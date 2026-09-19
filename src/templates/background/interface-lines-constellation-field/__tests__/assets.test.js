import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import {
  ASSET_MANIFEST,
  INTERFACE_LINES_HTML_SHA256,
  MIN_PREVIEW_BYTES,
  NEUFORM_BATCH_COMPONENT_SHA256,
  PREVIEW_STILL,
  PREVIEW_STILL_DISK,
  PUBLIC_INTERFACE_LINES_HTML_SHA256,
} from '../constants';

const ROOT = path.resolve(__dirname, '../../../../../');

describe('Interface Lines Constellation Field packaged assets', () => {
  it.each(ASSET_MANIFEST)('keeps byte-exact $path', ({ path: relativePath, bytes, sha256 }) => {
    const absolute = path.join(ROOT, relativePath);
    expect(fs.existsSync(absolute)).toBe(true);
    const buffer = fs.readFileSync(absolute);
    expect(buffer.length).toBe(bytes);
    expect(crypto.createHash('sha256').update(buffer).digest('hex')).toBe(sha256);
  });

  it('keeps verified NeuformBatchEffects and interface-lines HTML provenance', () => {
    const neuform = fs.readFileSync(
      path.join(
        ROOT,
        'src/templates/background/interface-lines-constellation-field/sources/NeuformBatchEffects.tsx.txt',
      ),
      'utf8',
    );
    const html = fs.readFileSync(
      path.join(
        ROOT,
        'src/templates/background/interface-lines-constellation-field/sources/interface-lines.html',
      ),
      'utf8',
    );

    expect(crypto.createHash('sha256').update(neuform).digest('hex')).toBe(
      NEUFORM_BATCH_COMPONENT_SHA256,
    );
    expect(crypto.createHash('sha256').update(html).digest('hex')).toBe(
      INTERFACE_LINES_HTML_SHA256,
    );

    expect(neuform).toContain('interfaceLines');
    expect(neuform).toContain('buildFocusedDocument');
    expect(neuform).toContain('#bg-canvas');
    expect(neuform).toContain('sandbox="allow-scripts"');
    expect(neuform).toContain('threeui-controls');
    expect(html).toContain('bg-canvas');
    expect(html).toContain('numParticles');
    expect(html).toContain('drawLines');
    expect(html).toContain('dist < 120');
  });

  it('publishes focused public document with threeui controls and SF bridge', () => {
    const focused = fs.readFileSync(
      path.join(ROOT, 'public/effects/interface-lines.html'),
      'utf8',
    );
    expect(crypto.createHash('sha256').update(focused).digest('hex')).toBe(
      PUBLIC_INTERFACE_LINES_HTML_SHA256,
    );
    expect(focused).toContain('data-threeui-focus');
    expect(focused).toContain('data-threeui-controls');
    expect(focused).toContain('threeui-controls');
    expect(focused).toContain('__SF_CONTROLS');
    expect(focused).toContain('bg-canvas');
    expect(focused).toContain('#bg-canvas');
    expect(focused).toContain('__SF_CONTROLS&&window.__SF_CONTROLS.speed');
    expect(focused).toContain('numParticles');
    expect(focused).not.toContain('cloudflareinsights');
  });

  it('ships a real gallery still preview on disk (no broken STILL PREVIEW)', () => {
    expect(PREVIEW_STILL).toBe(
      '/images/Assets%20Interface%20Lines%20Constellation%20Field/InterfaceLinesConstellationField.png',
    );
    const absolute = path.join(ROOT, PREVIEW_STILL_DISK);
    expect(fs.existsSync(absolute)).toBe(true);
    expect(fs.statSync(absolute).size).toBeGreaterThan(MIN_PREVIEW_BYTES);
  });
});
