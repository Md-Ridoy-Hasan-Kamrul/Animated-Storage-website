import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import {
  ASSET_MANIFEST,
  CRT_COMPONENT_SHA256,
  CRT_RENDERER_SHA256,
  CRT_SCREENS_SHA256,
  CRT_SHADERS_SHA256,
} from '../constants';

const ROOT = path.resolve(__dirname, '../../../../../');

describe('Cinematic CRT packaged assets', () => {
  it.each(ASSET_MANIFEST)('keeps byte-exact $path', ({ path: relativePath, bytes, sha256 }) => {
    const absolute = path.join(ROOT, relativePath);
    expect(fs.existsSync(absolute)).toBe(true);
    const buffer = fs.readFileSync(absolute);
    expect(buffer.length).toBe(bytes);
    expect(crypto.createHash('sha256').update(buffer).digest('hex')).toBe(sha256);
  });

  it('keeps the verified CRT component, renderer, shaders, and screens provenance', () => {
    const component = fs.readFileSync(
      path.join(ROOT, 'src/templates/background/cinematic-crt/sources/CrtBackground.tsx.txt'),
      'utf8',
    );
    const renderer = fs.readFileSync(
      path.join(ROOT, 'src/templates/background/cinematic-crt/sources/crtRenderer.ts.txt'),
      'utf8',
    );
    const shaders = fs.readFileSync(
      path.join(ROOT, 'src/templates/background/cinematic-crt/sources/crtShaders.ts.txt'),
      'utf8',
    );
    const screens = fs.readFileSync(
      path.join(ROOT, 'src/templates/background/cinematic-crt/sources/crtScreens.ts.txt'),
      'utf8',
    );

    expect(crypto.createHash('sha256').update(component).digest('hex')).toBe(CRT_COMPONENT_SHA256);
    expect(crypto.createHash('sha256').update(renderer).digest('hex')).toBe(CRT_RENDERER_SHA256);
    expect(crypto.createHash('sha256').update(shaders).digest('hex')).toBe(CRT_SHADERS_SHA256);
    expect(crypto.createHash('sha256').update(screens).digest('hex')).toBe(CRT_SCREENS_SHA256);

    expect(component).toContain('export function CrtBackground');
    expect(renderer).toContain('createCrtRenderer');
    expect(shaders).toContain('CRT_FRAGMENT_SHADER');
    expect(screens).toContain('cinematic:');
    expect(screens).toContain('paintCinematic');
    expect(screens).toContain('PICTURE START');
  });

  it('keeps the runtime shader module identical to provenance', () => {
    const provenance = fs.readFileSync(
      path.join(ROOT, 'src/templates/background/cinematic-crt/sources/crtShaders.ts.txt'),
      'utf8',
    );
    const runtime = fs.readFileSync(
      path.join(ROOT, 'src/templates/background/cinematic-crt/crtShaders.js'),
      'utf8',
    );
    expect(runtime).toBe(provenance);
  });

  it('exports the cinematic variant contract from runtime screens', () => {
    const screens = fs.readFileSync(
      path.join(ROOT, 'src/templates/background/cinematic-crt/crtScreens.js'),
      'utf8',
    );
    expect(screens).toContain('cinematic:');
    expect(screens).toContain('background: "#07070a"');
    expect(screens).toContain('mono: 1');
    expect(screens).toContain('paintCinematic');
  });
});
