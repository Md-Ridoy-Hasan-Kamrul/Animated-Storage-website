import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import {
  ASSET_MANIFEST,
  LUMEN_CTA_CSS_SHA256,
  LUMEN_CTA_SHA256,
  LUMEN_HTML_SHA256,
  MIN_PREVIEW_BYTES,
  PREVIEW_STILL,
  PREVIEW_STILL_DISK,
} from '../constants';

const ROOT = path.resolve(__dirname, '../../../../../');

describe('Lumen CTA Rectangle Buttons packaged assets', () => {
  it.each(ASSET_MANIFEST)('keeps byte-exact $path', ({ path: relativePath, bytes, sha256 }) => {
    const absolute = path.join(ROOT, relativePath);
    expect(fs.existsSync(absolute)).toBe(true);
    const buffer = fs.readFileSync(absolute);
    expect(buffer.length).toBe(bytes);
    expect(crypto.createHash('sha256').update(buffer).digest('hex')).toBe(sha256);
  });

  it('keeps verified LumenCta, CSS, and lumen.html provenance', () => {
    const component = fs.readFileSync(
      path.join(ROOT, 'src/templates/button/lumen-cta-rectangle-buttons/sources/LumenCta.tsx.txt'),
      'utf8',
    );
    const css = fs.readFileSync(
      path.join(ROOT, 'src/templates/button/lumen-cta-rectangle-buttons/sources/lumen-cta.css'),
      'utf8',
    );
    const html = fs.readFileSync(
      path.join(ROOT, 'src/templates/button/lumen-cta-rectangle-buttons/sources/lumen.html'),
      'utf8',
    );

    expect(crypto.createHash('sha256').update(component).digest('hex')).toBe(LUMEN_CTA_SHA256);
    expect(crypto.createHash('sha256').update(css).digest('hex')).toBe(LUMEN_CTA_CSS_SHA256);
    expect(crypto.createHash('sha256').update(html).digest('hex')).toBe(LUMEN_HTML_SHA256);

    expect(component).toContain('export function LumenCta');
    expect(component).toContain('Get your card');
    expect(component).toContain('lumen-cta__ring');
    expect(css).toContain('#050014');
    expect(css).toContain('#9470d9');
    expect(css).toContain('lumen-cta__button');
    expect(html).toContain('.btn-primary');
    expect(html).toContain('#050014');
    expect(html).toContain('Open an account');
  });

  it('ships runtime LumenCta + CSS that match the six-stop violet pill', () => {
    const runtimeCss = fs.readFileSync(
      path.join(ROOT, 'src/templates/button/lumen-cta-rectangle-buttons/lumen-cta.css'),
      'utf8',
    );
    const runtimeJsx = fs.readFileSync(
      path.join(ROOT, 'src/templates/button/lumen-cta-rectangle-buttons/LumenCta.jsx'),
      'utf8',
    );
    expect(runtimeCss).toContain('linear-gradient');
    expect(runtimeCss).toContain('#050014');
    expect(runtimeCss).toContain('#9470d9');
    expect(runtimeCss).toContain('.lumen-cta__ring');
    expect(runtimeJsx).toContain('export function LumenCta');
    expect(runtimeJsx).toContain('BUTTON_LABEL');
    expect(runtimeJsx).toContain('lumen-cta__ring');
  });

  it('ships a real gallery still preview on disk (no broken STILL PREVIEW)', () => {
    expect(PREVIEW_STILL).toBe(
      '/images/Assets%20Lumen%20CTA%20Rectangle%20Buttons/LumenCTARectangleButtons.png',
    );
    const absolute = path.join(ROOT, PREVIEW_STILL_DISK);
    expect(fs.existsSync(absolute)).toBe(true);
    expect(fs.statSync(absolute).size).toBeGreaterThan(MIN_PREVIEW_BYTES);
  });
});
