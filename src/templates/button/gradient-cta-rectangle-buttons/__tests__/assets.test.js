import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import {
  ASSET_MANIFEST,
  GRADIENT_CTA_HTML_SHA256,
  MIN_PREVIEW_BYTES,
  NEUFORM_ISOLATED_EFFECTS_SHA256,
  PREVIEW_STILL,
  PREVIEW_STILL_DISK,
  PUBLIC_GRADIENT_CTA_HTML_SHA256,
} from '../constants';

const ROOT = path.resolve(__dirname, '../../../../../');

describe('Gradient CTA Rectangle Buttons packaged assets', () => {
  it.each(ASSET_MANIFEST)('keeps byte-exact $path', ({ path: relativePath, bytes, sha256 }) => {
    const absolute = path.join(ROOT, relativePath);
    expect(fs.existsSync(absolute)).toBe(true);
    const buffer = fs.readFileSync(absolute);
    expect(buffer.length).toBe(bytes);
    expect(crypto.createHash('sha256').update(buffer).digest('hex')).toBe(sha256);
  });

  it('keeps verified NeuformIsolatedEffects and gradient-cta HTML provenance', () => {
    const component = fs.readFileSync(
      path.join(
        ROOT,
        'src/templates/button/gradient-cta-rectangle-buttons/sources/NeuformIsolatedEffects.tsx.txt',
      ),
      'utf8',
    );
    const html = fs.readFileSync(
      path.join(
        ROOT,
        'src/templates/button/gradient-cta-rectangle-buttons/sources/gradient-cta.html',
      ),
      'utf8',
    );

    expect(crypto.createHash('sha256').update(component).digest('hex')).toBe(
      NEUFORM_ISOLATED_EFFECTS_SHA256,
    );
    expect(crypto.createHash('sha256').update(html).digest('hex')).toBe(GRADIENT_CTA_HTML_SHA256);

    expect(component).toContain('export const GradientCta');
    expect(component).toContain('buildFocusedDocument');
    expect(component).toContain('gradient-cta.html');
    expect(component).toContain('.component-wrapper button');
    expect(component).toContain('sandbox="allow-scripts"');
    expect(html).toContain('Start Free Pilot');
    expect(html).toContain('#FFEBB1');
    expect(html).toContain('#FFC438');
    expect(html).toContain('translate-y-full');
  });

  it('publishes focused public document with threeui focus isolation', () => {
    const focused = fs.readFileSync(path.join(ROOT, 'public/effects/gradient-cta.html'), 'utf8');
    expect(crypto.createHash('sha256').update(focused).digest('hex')).toBe(
      PUBLIC_GRADIENT_CTA_HTML_SHA256,
    );
    expect(focused).toContain('data-threeui-focus');
    expect(focused).toContain('Start Free Pilot');
    expect(focused).toContain('data-threeui-role');
    expect(focused).toContain('data-threeui-preserve-transform');
    expect(focused).toContain('.component-wrapper button');
    expect(focused).toContain('#FFEBB1');
  });

  it('ships a real gallery still preview on disk (no broken STILL PREVIEW)', () => {
    expect(PREVIEW_STILL).toBe(
      '/images/Assets%20Gradient%20CTA%20Rectangle%20Buttons/GradientCTARectangleButtons.png',
    );
    const absolute = path.join(ROOT, PREVIEW_STILL_DISK);
    expect(fs.existsSync(absolute)).toBe(true);
    expect(fs.statSync(absolute).size).toBeGreaterThan(MIN_PREVIEW_BYTES);
  });
});
