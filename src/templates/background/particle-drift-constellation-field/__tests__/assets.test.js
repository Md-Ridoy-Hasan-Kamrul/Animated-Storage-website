import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import {
  ASSET_MANIFEST,
  MIN_PREVIEW_BYTES,
  NEUFORM_BATCH_COMPONENT_SHA256,
  PARTICLE_DRIFT_HTML_SHA256,
  PREVIEW_STILL,
  PREVIEW_STILL_DISK,
  PUBLIC_PARTICLE_DRIFT_HTML_SHA256,
} from '../constants';

const ROOT = path.resolve(__dirname, '../../../../../');

describe('Particle Drift Constellation Field packaged assets', () => {
  it.each(ASSET_MANIFEST)('keeps byte-exact $path', ({ path: relativePath, bytes, sha256 }) => {
    const absolute = path.join(ROOT, relativePath);
    expect(fs.existsSync(absolute)).toBe(true);
    const buffer = fs.readFileSync(absolute);
    expect(buffer.length).toBe(bytes);
    expect(crypto.createHash('sha256').update(buffer).digest('hex')).toBe(sha256);
  });

  it('keeps verified NeuformBatchEffects and particle-drift HTML provenance', () => {
    const neuform = fs.readFileSync(
      path.join(
        ROOT,
        'src/templates/background/particle-drift-constellation-field/sources/NeuformBatchEffects.tsx.txt',
      ),
      'utf8',
    );
    const html = fs.readFileSync(
      path.join(
        ROOT,
        'src/templates/background/particle-drift-constellation-field/sources/particle-drift.html',
      ),
      'utf8',
    );

    expect(crypto.createHash('sha256').update(neuform).digest('hex')).toBe(
      NEUFORM_BATCH_COMPONENT_SHA256,
    );
    expect(crypto.createHash('sha256').update(html).digest('hex')).toBe(
      PARTICLE_DRIFT_HTML_SHA256,
    );

    expect(neuform).toContain('particleDrift');
    expect(neuform).toContain('buildFocusedDocument');
    expect(neuform).toContain('#particle-canvas');
    expect(neuform).toContain('sandbox="allow-scripts"');
    expect(neuform).toContain('threeui-controls');
    expect(html).toContain('particle-canvas');
    expect(html).toContain('Array.from({ length: 90 })');
    expect(html).toContain('Array.from({ length: 25 })');
    expect(html).toContain('#60A5FA');
    expect(html).toContain('Slow drift');
  });

  it('publishes focused public document with threeui controls and SF bridge', () => {
    const focused = fs.readFileSync(
      path.join(ROOT, 'public/effects/particle-drift.html'),
      'utf8',
    );
    expect(crypto.createHash('sha256').update(focused).digest('hex')).toBe(
      PUBLIC_PARTICLE_DRIFT_HTML_SHA256,
    );
    expect(focused).toContain('data-threeui-focus');
    expect(focused).toContain('data-threeui-controls');
    expect(focused).toContain('threeui-controls');
    expect(focused).toContain('__SF_CONTROLS');
    expect(focused).toContain('particle-canvas');
    expect(focused).toContain('#particle-canvas');
    expect(focused).toContain('__SF_CONTROLS&&window.__SF_CONTROLS.speed');
    expect(focused).toContain('Array.from({ length: 90 })');
    expect(focused).not.toContain('cloudflareinsights');
  });

  it('ships a real gallery still preview on disk (no broken STILL PREVIEW)', () => {
    expect(PREVIEW_STILL).toBe(
      '/images/Assets%20Particle%20Drift%20Constellation%20Field/ParticleDriftConstellationField.png',
    );
    const absolute = path.join(ROOT, PREVIEW_STILL_DISK);
    expect(fs.existsSync(absolute)).toBe(true);
    expect(fs.statSync(absolute).size).toBeGreaterThan(MIN_PREVIEW_BYTES);
  });
});
