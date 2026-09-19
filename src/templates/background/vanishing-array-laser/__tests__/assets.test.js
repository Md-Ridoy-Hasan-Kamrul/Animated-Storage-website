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

describe('Vanishing Array Laser packaged assets', () => {
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
        'src/templates/background/vanishing-array-laser/sources/LaserVariants.tsx.txt',
      ),
      'utf8',
    );
    const shaders = fs.readFileSync(
      path.join(ROOT, 'src/templates/background/vanishing-array-laser/sources/laserShaders.ts.txt'),
      'utf8',
    );

    expect(crypto.createHash('sha256').update(variants).digest('hex')).toBe(LASER_VARIANTS_SHA256);
    expect(crypto.createHash('sha256').update(shaders).digest('hex')).toBe(LASER_SHADERS_SHA256);

    expect(variants).toContain('vanishing-array');
    expect(variants).toContain('LASER_FRAGMENT_SHADER');
    expect(variants).toContain('u_pointer');
    expect(shaders).toContain('vanishingArray');
    expect(shaders).toContain('u_variant');
  });

  it('ships runtime shaders identical to registered laserShaders source', () => {
    const provenance = fs.readFileSync(
      path.join(ROOT, 'src/templates/background/vanishing-array-laser/sources/laserShaders.ts.txt'),
      'utf8',
    );
    expect(LASER_VERTEX_SHADER).toContain('a_position');
    expect(LASER_FRAGMENT_SHADER).toContain('vanishingArray');
    expect(provenance).toContain(LASER_VERTEX_SHADER.trim());
    expect(provenance).toContain('vec3 vanishingArray(vec2 p)');
  });

  it('ships a real gallery still preview on disk (no broken STILL PREVIEW)', () => {
    expect(PREVIEW_STILL).toBe(
      '/images/Assets%20Vanishing%20Array%20Laser/VanishingArrayLaser.png',
    );
    const absolute = path.join(ROOT, PREVIEW_STILL_DISK);
    expect(fs.existsSync(absolute)).toBe(true);
    expect(fs.statSync(absolute).size).toBeGreaterThan(MIN_PREVIEW_BYTES);
  });
});
