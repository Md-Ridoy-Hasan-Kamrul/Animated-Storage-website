import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import {
  ASSET_MANIFEST,
  MIN_PREVIEW_BYTES,
  NEUFORM_ISOLATED_EFFECTS_SHA256,
  PREVIEW_STILL,
  PREVIEW_STILL_DISK,
  PUBLIC_SPINNING_BORDER_BUTTON_HTML_SHA256,
  SPINNING_BORDER_BUTTON_HTML_SHA256,
} from '../constants';

const ROOT = path.resolve(__dirname, '../../../../../');

describe('Spinning Border Button Rectangle Buttons packaged assets', () => {
  it.each(ASSET_MANIFEST)('keeps byte-exact $path', ({ path: relativePath, bytes, sha256 }) => {
    const absolute = path.join(ROOT, relativePath);
    expect(fs.existsSync(absolute)).toBe(true);
    const buffer = fs.readFileSync(absolute);
    expect(buffer.length).toBe(bytes);
    expect(crypto.createHash('sha256').update(buffer).digest('hex')).toBe(sha256);
  });

  it('keeps verified NeuformIsolatedEffects and spinning-border-button HTML provenance', () => {
    const component = fs.readFileSync(
      path.join(
        ROOT,
        'src/templates/button/spinning-border-button-rectangle-buttons/sources/NeuformIsolatedEffects.tsx.txt',
      ),
      'utf8',
    );
    const html = fs.readFileSync(
      path.join(
        ROOT,
        'src/templates/button/spinning-border-button-rectangle-buttons/sources/spinning-border-button.html',
      ),
      'utf8',
    );

    expect(crypto.createHash('sha256').update(component).digest('hex')).toBe(
      NEUFORM_ISOLATED_EFFECTS_SHA256,
    );
    expect(crypto.createHash('sha256').update(html).digest('hex')).toBe(
      SPINNING_BORDER_BUTTON_HTML_SHA256,
    );

    expect(component).toContain('export const SpinningBorderButton');
    expect(component).toContain('buildFocusedDocument');
    expect(component).toContain('spinning-border-button.html');
    expect(component).toContain('.component-wrapper button');
    expect(component).toContain('sandbox="allow-scripts"');
    expect(html).toContain('Request Demo');
    expect(html).toContain('conic-gradient');
    expect(html).toContain('group-hover:opacity-100');
    expect(html).toContain('animate-[spin_3s_linear_infinite]');
  });

  it('publishes focused public document with threeui focus isolation', () => {
    const focused = fs.readFileSync(
      path.join(ROOT, 'public/effects/spinning-border-button.html'),
      'utf8',
    );
    expect(crypto.createHash('sha256').update(focused).digest('hex')).toBe(
      PUBLIC_SPINNING_BORDER_BUTTON_HTML_SHA256,
    );
    expect(focused).toContain('data-threeui-focus');
    expect(focused).toContain('Request Demo');
    expect(focused).toContain('data-threeui-role');
    expect(focused).toContain('data-threeui-preserve-transform');
    expect(focused).toContain('.component-wrapper button');
    expect(focused).toContain('conic-gradient');
  });

  it('ships a real gallery still preview on disk (no broken STILL PREVIEW)', () => {
    expect(PREVIEW_STILL).toBe(
      '/images/Assets%20Spinning%20Border%20Button%20Rectangle%20Buttons/SpinningBorderButtonRectangleButtons.png',
    );
    const absolute = path.join(ROOT, PREVIEW_STILL_DISK);
    expect(fs.existsSync(absolute)).toBe(true);
    expect(fs.statSync(absolute).size).toBeGreaterThan(MIN_PREVIEW_BYTES);
  });
});
