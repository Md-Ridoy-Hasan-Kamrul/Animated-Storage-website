import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import {
  ASSET_MANIFEST,
  GRADIENT_PILL_BUTTON_HTML_SHA256,
  MIN_PREVIEW_BYTES,
  NEUFORM_ISOLATED_EFFECTS_SHA256,
  PREVIEW_STILL,
  PREVIEW_STILL_DISK,
  PUBLIC_GRADIENT_PILL_BUTTON_HTML_SHA256,
} from '../constants';

const ROOT = path.resolve(__dirname, '../../../../../');

describe('Gradient Pill Button Rectangle Buttons packaged assets', () => {
  it.each(ASSET_MANIFEST)('keeps byte-exact $path', ({ path: relativePath, bytes, sha256 }) => {
    const absolute = path.join(ROOT, relativePath);
    expect(fs.existsSync(absolute)).toBe(true);
    const buffer = fs.readFileSync(absolute);
    expect(buffer.length).toBe(bytes);
    expect(crypto.createHash('sha256').update(buffer).digest('hex')).toBe(sha256);
  });

  it('keeps verified NeuformIsolatedEffects and gradient-pill-button HTML provenance', () => {
    const component = fs.readFileSync(
      path.join(
        ROOT,
        'src/templates/button/gradient-pill-button-rectangle-buttons/sources/NeuformIsolatedEffects.tsx.txt',
      ),
      'utf8',
    );
    const html = fs.readFileSync(
      path.join(
        ROOT,
        'src/templates/button/gradient-pill-button-rectangle-buttons/sources/gradient-pill-button.html',
      ),
      'utf8',
    );

    expect(crypto.createHash('sha256').update(component).digest('hex')).toBe(
      NEUFORM_ISOLATED_EFFECTS_SHA256,
    );
    expect(crypto.createHash('sha256').update(html).digest('hex')).toBe(
      GRADIENT_PILL_BUTTON_HTML_SHA256,
    );

    expect(component).toContain('export const GradientPillButton');
    expect(component).toContain('buildFocusedDocument');
    expect(component).toContain('gradient-pill-button.html');
    expect(component).toContain('transformGradientPillButtonSource');
    expect(component).toContain('.component-wrapper button');
    expect(component).toContain('sandbox="allow-scripts"');
    expect(html).toContain('Demo Lesson');
    expect(html).toContain('--border-gradient');
    expect(html).toContain('border-gradient-shared-style');
    expect(html).toContain('rounded-full');
  });

  it('publishes focused public document with dark-mode Neuform transform', () => {
    const focused = fs.readFileSync(
      path.join(ROOT, 'public/effects/gradient-pill-button.html'),
      'utf8',
    );
    expect(crypto.createHash('sha256').update(focused).digest('hex')).toBe(
      PUBLIC_GRADIENT_PILL_BUTTON_HTML_SHA256,
    );
    expect(focused).toContain('data-threeui-focus');
    expect(focused).toContain('Demo Lesson');
    expect(focused).toContain('data-threeui-role');
    expect(focused).toContain('data-threeui-preserve-transform');
    expect(focused).toContain('.component-wrapper button');
    expect(focused).toContain('from-white/[0.16]');
    expect(focused).toContain('text-white/70');
    expect(focused).toContain('hover:bg-white/10');
    expect(focused).toContain('--border-gradient');
  });

  it('ships a real gallery still preview on disk (no broken STILL PREVIEW)', () => {
    expect(PREVIEW_STILL).toBe(
      '/images/Assets%20Gradient%20Pill%20Button%20Rectangle%20Buttons/GradientPillButtonRectangleButtons.png',
    );
    const absolute = path.join(ROOT, PREVIEW_STILL_DISK);
    expect(fs.existsSync(absolute)).toBe(true);
    expect(fs.statSync(absolute).size).toBeGreaterThan(MIN_PREVIEW_BYTES);
  });
});
