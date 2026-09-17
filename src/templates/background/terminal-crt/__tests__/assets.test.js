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

describe('Terminal CRT packaged assets', () => {
  it.each(ASSET_MANIFEST)('keeps byte-exact $path', ({ path: relativePath, bytes, sha256 }) => {
    const absolute = path.join(ROOT, relativePath);
    expect(fs.existsSync(absolute)).toBe(true);
    const buffer = fs.readFileSync(absolute);
    expect(buffer.length).toBe(bytes);
    expect(crypto.createHash('sha256').update(buffer).digest('hex')).toBe(sha256);
  });

  it('keeps the verified CRT component, renderer, shaders, and screens provenance', () => {
    const component = fs.readFileSync(
      path.join(ROOT, 'src/templates/background/terminal-crt/sources/CrtBackground.tsx.txt'),
      'utf8',
    );
    const renderer = fs.readFileSync(
      path.join(ROOT, 'src/templates/background/terminal-crt/sources/crtRenderer.ts.txt'),
      'utf8',
    );
    const shaders = fs.readFileSync(
      path.join(ROOT, 'src/templates/background/terminal-crt/sources/crtShaders.ts.txt'),
      'utf8',
    );
    const screens = fs.readFileSync(
      path.join(ROOT, 'src/templates/background/terminal-crt/sources/crtScreens.ts.txt'),
      'utf8',
    );

    expect(crypto.createHash('sha256').update(component).digest('hex')).toBe(CRT_COMPONENT_SHA256);
    expect(crypto.createHash('sha256').update(renderer).digest('hex')).toBe(CRT_RENDERER_SHA256);
    expect(crypto.createHash('sha256').update(shaders).digest('hex')).toBe(CRT_SHADERS_SHA256);
    expect(crypto.createHash('sha256').update(screens).digest('hex')).toBe(CRT_SCREENS_SHA256);

    expect(component).toContain('export function CrtBackground');
    expect(component).toContain('createCrtRenderer');
    expect(renderer).toContain('export function createCrtRenderer');
    expect(renderer).toContain('ZION MAINFRAME');
    expect(shaders).toContain('CRT_FRAGMENT_SHADER');
    expect(shaders).toContain('uScanDepth');
    expect(screens).toContain('CRT_STYLES');
    expect(screens).toContain('terminal:');
  });

  it('keeps the runtime shader module identical to provenance', () => {
    const provenance = fs.readFileSync(
      path.join(ROOT, 'src/templates/background/terminal-crt/sources/crtShaders.ts.txt'),
      'utf8',
    );
    const runtime = fs.readFileSync(
      path.join(ROOT, 'src/templates/background/terminal-crt/crtShaders.js'),
      'utf8',
    );
    expect(runtime).toBe(provenance);
  });

  it('exports the terminal variant contract from runtime screens/renderer', () => {
    const screens = fs.readFileSync(
      path.join(ROOT, 'src/templates/background/terminal-crt/crtScreens.js'),
      'utf8',
    );
    const renderer = fs.readFileSync(
      path.join(ROOT, 'src/templates/background/terminal-crt/crtRenderer.js'),
      'utf8',
    );
    expect(screens).toContain('terminal:');
    expect(screens).toContain('background: "#03100a"');
    expect(renderer).toContain('createCrtRenderer');
    expect(renderer).toContain('ZION MAINFRAME');
    expect(renderer).toContain('typed += 4.4');
  });
});
