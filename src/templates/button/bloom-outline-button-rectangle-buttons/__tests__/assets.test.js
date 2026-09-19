import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import {
  ASSET_MANIFEST,
  BUTTON_LABEL,
  MIN_PREVIEW_BYTES,
  PREVIEW_STILL,
  PREVIEW_STILL_DISK,
  RECTANGLE_BUTTONS_SHA256,
  THEME_ID,
  VARIANT_ID,
} from '../constants';

const ROOT = path.resolve(__dirname, '../../../../../');

describe('Bloom Outline Button Rectangle Buttons packaged assets', () => {
  it.each(ASSET_MANIFEST)('keeps byte-exact $path', ({ path: relativePath, bytes, sha256 }) => {
    const absolute = path.join(ROOT, relativePath);
    expect(fs.existsSync(absolute)).toBe(true);
    const buffer = fs.readFileSync(absolute);
    expect(buffer.length).toBe(bytes);
    expect(crypto.createHash('sha256').update(buffer).digest('hex')).toBe(sha256);
  });

  it('keeps verified RectangleButtons.tsx provenance for bloom-outline-button', () => {
    const component = fs.readFileSync(
      path.join(
        ROOT,
        'src/templates/button/bloom-outline-button-rectangle-buttons/sources/RectangleButtons.tsx.txt',
      ),
      'utf8',
    );

    expect(crypto.createHash('sha256').update(component).digest('hex')).toBe(
      RECTANGLE_BUTTONS_SHA256,
    );
    expect(component).toContain('export function RectangleButtons');
    expect(component).toContain('bloom-outline-button');
    expect(component).toContain('threeui-page-button--bloom-outline');
    expect(component).toContain('threeui-page-button__bloom-label');
    expect(component).toContain('threeui-page-button__bloom-dot');
    expect(component).toContain('See the season');
    expect(component).toContain('--bloom-outline-x');
    expect(component).toContain('onPointerMove');
    expect(component).toContain('SELECTED_PAGE_BUTTON_STYLES');
  });

  it('ships runtime SelectedPageButton + Bloom CSS matching the authored treatment', () => {
    const runtimeCss = fs.readFileSync(
      path.join(
        ROOT,
        'src/templates/button/bloom-outline-button-rectangle-buttons/bloom-outline-button.css',
      ),
      'utf8',
    );
    const runtimeJsx = fs.readFileSync(
      path.join(
        ROOT,
        'src/templates/button/bloom-outline-button-rectangle-buttons/SelectedPageButton.jsx',
      ),
      'utf8',
    );
    const pointerHook = fs.readFileSync(
      path.join(
        ROOT,
        'src/templates/button/bloom-outline-button-rectangle-buttons/hooks/useBloomOutlinePointer.js',
      ),
      'utf8',
    );

    expect(runtimeCss).toContain('.threeui-page-button-stage--bloom-outline');
    expect(runtimeCss).toContain('.threeui-page-button--bloom-outline');
    expect(runtimeCss).toContain('#b5808e');
    expect(runtimeCss).toContain('#f5ece6');
    expect(runtimeCss).toContain('#3f2c33');
    expect(runtimeCss).toContain('threeui-page-button__bloom-dot');
    expect(runtimeJsx).toContain('export function SelectedPageButton');
    expect(runtimeJsx).toContain('BUTTON_LABEL');
    expect(runtimeJsx).toContain('threeui-page-button--bloom-outline');
    expect(runtimeJsx).toContain('useBloomOutlinePointer');
    expect(pointerHook).toContain('BLOOM_DRIFT_X_PX');
    expect(pointerHook).toContain('--bloom-outline-diameter');
    expect(runtimeJsx).toContain(THEME_ID);
    expect(VARIANT_ID).toBe('bloom-outline-button');
    expect(BUTTON_LABEL).toBe('See the season');
  });

  it('ships a real gallery still preview on disk (no broken STILL PREVIEW)', () => {
    expect(PREVIEW_STILL).toBe(
      '/images/Assets%20Bloom%20Outline%20Button%20Rectangle%20Buttons/BloomOutlineButtonRectangleButtons.png',
    );
    const absolute = path.join(ROOT, PREVIEW_STILL_DISK);
    expect(fs.existsSync(absolute)).toBe(true);
    expect(fs.statSync(absolute).size).toBeGreaterThan(MIN_PREVIEW_BYTES);
  });
});
