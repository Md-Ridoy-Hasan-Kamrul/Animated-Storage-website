import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import {
  ASSET_MANIFEST,
  LASER_SHADERS_SHA256,
  LASER_VARIANTS_SHA256,
  MIN_PREVIEW_BYTES,
  PREVIEW_STILL,
  PREVIEW_STILL_DISK,
} from '../constants';
import { LASER_FRAGMENT_SHADER, LASER_VERTEX_SHADER } from '../laserShaders';

const ROOT = path.resolve(__dirname, '../../../../../');

describe('Atmospheric Blade Laser packaged assets', () => {
  it.each(ASSET_MANIFEST)('keeps byte-exact $path', ({ path: relativePath, bytes, sha256 }) => {
    const absolute = path.join(ROOT, relativePath);
    expect(fs.existsSync(absolute)).toBe(true);
    const buffer = fs.readFileSync(absolute);
    expect(buffer.length).toBe(bytes);
    expect(crypto.createHash('sha256').update(buffer).digest('hex')).toBe(sha256);
  });

  it('keeps verified LaserVariants and laserShaders provenance', () => {
    const variants = fs.readFileSync(
      path.join(
        ROOT,
        'src/templates/background/atmospheric-blade-laser/sources/LaserVariants.tsx.txt',
      ),
      'utf8',
    );
    const shaders = fs.readFileSync(
      path.join(ROOT, 'src/templates/background/atmospheric-blade-laser/sources/laserShaders.ts.txt'),
      'utf8',
    );

    expect(crypto.createHash('sha256').update(variants).digest('hex')).toBe(LASER_VARIANTS_SHA256);
    expect(crypto.createHash('sha256').update(shaders).digest('hex')).toBe(LASER_SHADERS_SHA256);

    expect(variants).toContain('atmospheric-blade');
    expect(variants).toContain('LASER_FRAGMENT_SHADER');
    expect(variants).toContain('u_pointer');
    expect(variants).toContain('prefers-reduced-motion');
    expect(shaders).toContain('atmosphericBlade');
    expect(shaders).toContain('u_variant');
  });

  it('ships runtime shaders identical to registered laserShaders source', () => {
    const provenance = fs.readFileSync(
      path.join(ROOT, 'src/templates/background/atmospheric-blade-laser/sources/laserShaders.ts.txt'),
      'utf8',
    );
    expect(LASER_VERTEX_SHADER).toContain('a_position');
    expect(LASER_FRAGMENT_SHADER).toContain('atmosphericBlade');
    expect(provenance).toContain(LASER_VERTEX_SHADER.trim());
    expect(provenance).toContain('vec3 atmosphericBlade(vec2 p)');
  });

  it('ships a real gallery still preview on disk (no broken STILL PREVIEW)', () => {
    expect(PREVIEW_STILL).toBe(
      '/images/Assets%20Atmospheric%20Blade%20Laser/AtmosphericBladeLaser.png',
    );
    const absolute = path.join(ROOT, PREVIEW_STILL_DISK);
    expect(fs.existsSync(absolute)).toBe(true);
    expect(fs.statSync(absolute).size).toBeGreaterThan(MIN_PREVIEW_BYTES);
  });
});
