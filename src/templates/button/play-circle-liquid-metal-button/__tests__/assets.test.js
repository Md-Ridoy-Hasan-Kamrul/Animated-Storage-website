import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import {
  ASSET_MANIFEST,
  LIQUID_METAL_BUTTON_HTML_SHA256,
  MIN_PREVIEW_BYTES,
  PREVIEW_STILL,
  PREVIEW_STILL_DISK,
  VARIANT_ID,
} from '../constants';

const ROOT = path.resolve(__dirname, '../../../../../');

describe('Play Circle Liquid Metal Button packaged assets', () => {
  it.each(ASSET_MANIFEST)('keeps byte-exact $path', ({ path: relativePath, bytes, sha256 }) => {
    const absolute = path.join(ROOT, relativePath);
    expect(fs.existsSync(absolute)).toBe(true);
    const buffer = fs.readFileSync(absolute);
    expect(buffer.length).toBe(bytes);
    expect(crypto.createHash('sha256').update(buffer).digest('hex')).toBe(sha256);
  });

  it('keeps verified liquid-metal-button.html provenance for play circle', () => {
    const html = fs.readFileSync(
      path.join(
        ROOT,
        'src/templates/button/play-circle-liquid-metal-button/sources/liquid-metal-button.html',
      ),
      'utf8',
    );

    expect(crypto.createHash('sha256').update(html).digest('hex')).toBe(
      LIQUID_METAL_BUTTON_HTML_SHA256,
    );
    expect(html).toContain('Liquid metal');
    expect(html).toContain('FRAG_SCENE');
    expect(html).toContain('webgl2');
    expect(html).toContain('prefers-reduced-motion');
  });

  it('ships play-adapted public effect with play icon and message adapter', () => {
    const publicHtml = fs.readFileSync(
      path.join(ROOT, 'public/effects/play-circle-liquid-metal-button.html'),
      'utf8',
    );
    const host = fs.readFileSync(
      path.join(
        ROOT,
        'src/templates/button/play-circle-liquid-metal-button/LiquidMetalButton.jsx',
      ),
      'utf8',
    );

    expect(publicHtml).toContain('aria-label="Play"');
    expect(publicHtml).toContain('liquidMetalPlayButton');
    expect(publicHtml).toContain('--bw: var(--h);');
    expect(publicHtml).toContain('playStrokeWidth');
    expect(publicHtml).toContain('M15.5 10.75');
    expect(host).toContain('export function LiquidMetalButton');
    expect(host).toContain('liquidMetalPlayButton');
    expect(host).toContain('SOURCE_URL');
    expect(VARIANT_ID).toBe('play');
  });

  it('ships a real gallery still preview on disk (no broken STILL PREVIEW)', () => {
    expect(PREVIEW_STILL).toBe(
      '/images/Assets%20Play%20Circle%20Liquid%20Metal%20Button/PlayCircleLiquidMetalButton.png',
    );
    const absolute = path.join(ROOT, PREVIEW_STILL_DISK);
    expect(fs.existsSync(absolute)).toBe(true);
    expect(fs.statSync(absolute).size).toBeGreaterThan(MIN_PREVIEW_BYTES);
  });
});
