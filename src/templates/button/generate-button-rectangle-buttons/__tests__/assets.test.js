import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import {
  ASSET_MANIFEST,
  GENERATE_BUTTON_HTML_SHA256,
  MIN_PREVIEW_BYTES,
  NEUFORM_ISOLATED_EFFECTS_SHA256,
  PREVIEW_STILL,
  PREVIEW_STILL_DISK,
  PUBLIC_GENERATE_BUTTON_HTML_SHA256,
} from '../constants';

const ROOT = path.resolve(__dirname, '../../../../../');

describe('Generate Button Rectangle Buttons packaged assets', () => {
  it.each(ASSET_MANIFEST)('keeps byte-exact $path', ({ path: relativePath, bytes, sha256 }) => {
    const absolute = path.join(ROOT, relativePath);
    expect(fs.existsSync(absolute)).toBe(true);
    const buffer = fs.readFileSync(absolute);
    expect(buffer.length).toBe(bytes);
    expect(crypto.createHash('sha256').update(buffer).digest('hex')).toBe(sha256);
  });

  it('keeps verified NeuformIsolatedEffects and generate-button HTML provenance', () => {
    const component = fs.readFileSync(
      path.join(
        ROOT,
        'src/templates/button/generate-button-rectangle-buttons/sources/NeuformIsolatedEffects.tsx.txt',
      ),
      'utf8',
    );
    const html = fs.readFileSync(
      path.join(
        ROOT,
        'src/templates/button/generate-button-rectangle-buttons/sources/generate-button.html',
      ),
      'utf8',
    );

    expect(crypto.createHash('sha256').update(component).digest('hex')).toBe(
      NEUFORM_ISOLATED_EFFECTS_SHA256,
    );
    expect(crypto.createHash('sha256').update(html).digest('hex')).toBe(GENERATE_BUTTON_HTML_SHA256);

    expect(component).toContain('export const GenerateButton');
    expect(component).toContain('buildFocusedDocument');
    expect(component).toContain('generate-button.html');
    expect(component).toContain('.component-wrapper .btn-wrapper');
    expect(component).toContain('sandbox="allow-scripts"');
    expect(html).toContain('Generate');
    expect(html).toContain('letter-anim');
    expect(html).toContain('flicker');
    expect(html).toContain('btn-wrapper');
    expect(html).toContain('txt-2');
    expect(html).toContain('focused-letter-anim');
  });

  it('publishes focused public document with threeui focus isolation', () => {
    const focused = fs.readFileSync(
      path.join(ROOT, 'public/effects/generate-button.html'),
      'utf8',
    );
    expect(crypto.createHash('sha256').update(focused).digest('hex')).toBe(
      PUBLIC_GENERATE_BUTTON_HTML_SHA256,
    );
    expect(focused).toContain('data-threeui-focus');
    expect(focused).toContain('Generate');
    expect(focused).toContain('data-threeui-role');
    expect(focused).toContain('data-threeui-preserve-transform');
    expect(focused).toContain('.component-wrapper .btn-wrapper');
    expect(focused).toContain('letter-anim');
    expect(focused).toContain('flicker');
  });

  it('ships a real gallery still preview on disk (no broken STILL PREVIEW)', () => {
    expect(PREVIEW_STILL).toBe(
      '/images/Assets%20Generate%20Button%20Rectangle%20Buttons/GenerateButtonRectangleButtons.png',
    );
    const absolute = path.join(ROOT, PREVIEW_STILL_DISK);
    expect(fs.existsSync(absolute)).toBe(true);
    expect(fs.statSync(absolute).size).toBeGreaterThan(MIN_PREVIEW_BYTES);
  });
});
