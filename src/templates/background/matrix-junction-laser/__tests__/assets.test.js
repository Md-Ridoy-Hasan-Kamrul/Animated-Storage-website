import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import {
  ASSET_MANIFEST,
  MATRIX_FIELD_HTML_SHA256,
  MIN_PREVIEW_BYTES,
  NEUFORM_BATCH_COMPONENT_SHA256,
  PREVIEW_STILL,
  PREVIEW_STILL_DISK,
  PUBLIC_MATRIX_FIELD_HTML_SHA256,
  LASER_COLLECTION_SHA256,
} from '../constants';

const ROOT = path.resolve(__dirname, '../../../../../');

describe('Matrix Junction Laser packaged assets', () => {
  it.each(ASSET_MANIFEST)('keeps byte-exact $path', ({ path: relativePath, bytes, sha256 }) => {
    const absolute = path.join(ROOT, relativePath);
    expect(fs.existsSync(absolute)).toBe(true);
    const buffer = fs.readFileSync(absolute);
    expect(buffer.length).toBe(bytes);
    expect(crypto.createHash('sha256').update(buffer).digest('hex')).toBe(sha256);
  });

  it('keeps verified LaserCollection and matrix-field HTML provenance', () => {
    const laser = fs.readFileSync(
      path.join(
        ROOT,
        'src/templates/background/matrix-junction-laser/sources/LaserCollection.tsx.txt',
      ),
      'utf8',
    );
    const neuform = fs.readFileSync(
      path.join(
        ROOT,
        'src/templates/background/matrix-junction-laser/sources/NeuformBatchEffects.tsx.txt',
      ),
      'utf8',
    );
    const html = fs.readFileSync(
      path.join(ROOT, 'src/templates/background/matrix-junction-laser/sources/matrix-field.html'),
      'utf8',
    );

    expect(crypto.createHash('sha256').update(laser).digest('hex')).toBe(LASER_COLLECTION_SHA256);
    expect(crypto.createHash('sha256').update(neuform).digest('hex')).toBe(
      NEUFORM_BATCH_COMPONENT_SHA256,
    );
    expect(crypto.createHash('sha256').update(html).digest('hex')).toBe(MATRIX_FIELD_HTML_SHA256);

    expect(laser).toContain('matrix-field');
    expect(laser).toContain('MatrixField');
    expect(neuform).toContain('matrixField');
    expect(neuform).toContain('#glcanvas');
    expect(neuform).toContain('float intensity = 0.006');
    expect(html).toContain('id="glcanvas"');
    expect(html).toContain('float intensity = 0.006;');
    expect(html).toContain('u_mouseActive');
  });

  it('publishes focused public document with threeui controls and SF bridge', () => {
    const focused = fs.readFileSync(path.join(ROOT, 'public/effects/matrix-field.html'), 'utf8');
    expect(crypto.createHash('sha256').update(focused).digest('hex')).toBe(
      PUBLIC_MATRIX_FIELD_HTML_SHA256,
    );
    expect(focused).toContain('data-threeui-focus');
    expect(focused).toContain('data-threeui-controls');
    expect(focused).toContain('threeui-controls');
    expect(focused).toContain('__SF_CONTROLS');
    expect(focused).toContain('#glcanvas');
    expect(focused).toContain('float intensity = 0.00600;');
    expect(focused).not.toContain('cloudflareinsights');
  });

  it('ships a real gallery still preview on disk (no broken STILL PREVIEW)', () => {
    expect(PREVIEW_STILL).toBe(
      '/images/Assets%20Matrix%20Junction%20Laser/MatrixJunctionLaser.png',
    );
    const absolute = path.join(ROOT, PREVIEW_STILL_DISK);
    expect(fs.existsSync(absolute)).toBe(true);
    expect(fs.statSync(absolute).size).toBeGreaterThan(MIN_PREVIEW_BYTES);
  });
});
