import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { ASSET_MANIFEST, WARP_FIELD_COMPONENT_SHA256, WARP_FIELD_RENDERER_SHA256 } from '../constants';

const ROOT = path.resolve(__dirname, '../../../../../');

describe('Keycap Drift Warp Field packaged assets', () => {
  it.each(ASSET_MANIFEST)('keeps byte-exact $path', ({ path: relativePath, bytes, sha256 }) => {
    const absolute = path.join(ROOT, relativePath);
    expect(fs.existsSync(absolute)).toBe(true);
    const buffer = fs.readFileSync(absolute);
    expect(buffer.length).toBe(bytes);
    expect(crypto.createHash('sha256').update(buffer).digest('hex')).toBe(sha256);
  });

  it('keeps the verified component and renderer provenance', () => {
    const component = fs.readFileSync(
      path.join(
        ROOT,
        'src/templates/sections/warp-field-keycap-drift/sources/WarpFieldBackground.tsx.txt',
      ),
      'utf8',
    );
    const renderer = fs.readFileSync(
      path.join(
        ROOT,
        'src/templates/sections/warp-field-keycap-drift/sources/warpFieldRenderer.ts.txt',
      ),
      'utf8',
    );
    expect(crypto.createHash('sha256').update(component).digest('hex')).toBe(
      WARP_FIELD_COMPONENT_SHA256,
    );
    expect(crypto.createHash('sha256').update(renderer).digest('hex')).toBe(
      WARP_FIELD_RENDERER_SHA256,
    );
    expect(component).toContain('export function WarpFieldBackground');
    expect(renderer).toContain('export function createWarpFieldRenderer');
    expect(renderer).toContain('"keycaps"');
  });
});
