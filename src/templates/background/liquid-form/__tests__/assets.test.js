import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import {
  ASSET_MANIFEST,
  LIQUID_FORM_COMPONENT_SHA256,
  LIQUID_FORM_SHADERS_SHA256,
} from '../constants';

const ROOT = path.resolve(__dirname, '../../../../../');

describe('Liquid Form packaged assets', () => {
  it.each(ASSET_MANIFEST)('keeps byte-exact $path', ({ path: relativePath, bytes, sha256 }) => {
    const absolute = path.join(ROOT, relativePath);
    expect(fs.existsSync(absolute)).toBe(true);
    const buffer = fs.readFileSync(absolute);
    expect(buffer.length).toBe(bytes);
    expect(crypto.createHash('sha256').update(buffer).digest('hex')).toBe(sha256);
  });

  it('keeps the verified Liquid Form component and shader provenance', () => {
    const component = fs.readFileSync(
      path.join(
        ROOT,
        'src/templates/background/liquid-form/sources/LiquidFormBackground.tsx.txt',
      ),
      'utf8',
    );
    const shaders = fs.readFileSync(
      path.join(ROOT, 'src/templates/background/liquid-form/sources/liquidFormShaders.ts.txt'),
      'utf8',
    );
    expect(crypto.createHash('sha256').update(component).digest('hex')).toBe(
      LIQUID_FORM_COMPONENT_SHA256,
    );
    expect(crypto.createHash('sha256').update(shaders).digest('hex')).toBe(
      LIQUID_FORM_SHADERS_SHA256,
    );
    expect(component).toContain('export function LiquidFormBackground');
    expect(component).toContain('LIQUID_FORM_DEFAULTS');
    expect(shaders).toContain('VELOX_FRAGMENT_SHADER');
    expect(shaders).toContain('#define MAX_STEPS 70');
    expect(shaders).toContain('u_metal');
  });

  it('keeps the runtime shader module identical to provenance', () => {
    const provenance = fs.readFileSync(
      path.join(ROOT, 'src/templates/background/liquid-form/sources/liquidFormShaders.ts.txt'),
      'utf8',
    );
    const runtime = fs.readFileSync(
      path.join(ROOT, 'src/templates/background/liquid-form/liquidFormShaders.js'),
      'utf8',
    );
    expect(runtime).toBe(provenance);
  });
});
