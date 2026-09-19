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

describe('Halvorsen Arrow Pill Rectangle Buttons packaged assets', () => {
  it.each(ASSET_MANIFEST)('keeps byte-exact $path', ({ path: relativePath, bytes, sha256 }) => {
    const absolute = path.join(ROOT, relativePath);
    expect(fs.existsSync(absolute)).toBe(true);
    const buffer = fs.readFileSync(absolute);
    expect(buffer.length).toBe(bytes);
    expect(crypto.createHash('sha256').update(buffer).digest('hex')).toBe(sha256);
  });

  it('keeps verified RectangleButtons.tsx provenance for halvorsen-arrow-pill', () => {
    const component = fs.readFileSync(
      path.join(
        ROOT,
        'src/templates/button/halvorsen-arrow-pill-rectangle-buttons/sources/RectangleButtons.tsx.txt',
      ),
      'utf8',
    );

    expect(crypto.createHash('sha256').update(component).digest('hex')).toBe(
      RECTANGLE_BUTTONS_SHA256,
    );
    expect(component).toContain('export function RectangleButtons');
    expect(component).toContain('halvorsen-arrow-pill');
    expect(component).toContain('threeui-page-button--halvorsen');
    expect(component).toContain('threeui-page-button--arrow-pill');
    expect(component).toContain('threeui-page-button__disc');
    expect(component).toContain('See the work');
    expect(component).toContain('SELECTED_PAGE_BUTTON_STYLES');
  });

  it('ships runtime SelectedPageButton + Halvorsen CSS matching the authored treatment', () => {
    const runtimeCss = fs.readFileSync(
      path.join(
        ROOT,
        'src/templates/button/halvorsen-arrow-pill-rectangle-buttons/halvorsen-arrow-pill.css',
      ),
      'utf8',
    );
    const runtimeJsx = fs.readFileSync(
      path.join(
        ROOT,
        'src/templates/button/halvorsen-arrow-pill-rectangle-buttons/SelectedPageButton.jsx',
      ),
      'utf8',
    );

    expect(runtimeCss).toContain('.threeui-page-button-stage--halvorsen');
    expect(runtimeCss).toContain('.threeui-page-button--halvorsen');
    expect(runtimeCss).toContain('.threeui-page-button--arrow-pill');
    expect(runtimeCss).toContain('#111113');
    expect(runtimeCss).toContain('#f0eee7');
    expect(runtimeCss).toContain('threeui-page-button__disc');
    expect(runtimeJsx).toContain('export function SelectedPageButton');
    expect(runtimeJsx).toContain('BUTTON_LABEL');
    expect(runtimeJsx).toContain('threeui-page-button--halvorsen');
    expect(runtimeJsx).toContain('threeui-page-button--arrow-pill');
    expect(runtimeJsx).toContain('ArrowIcon');
    expect(runtimeJsx).toContain(THEME_ID);
    expect(VARIANT_ID).toBe('halvorsen-arrow-pill');
    expect(BUTTON_LABEL).toBe('See the work');
  });

  it('ships a real gallery still preview on disk (no broken STILL PREVIEW)', () => {
    expect(PREVIEW_STILL).toBe(
      '/images/Assets%20Halvorsen%20Arrow%20Pill%20Rectangle%20Buttons/HalvorsenArrowPillRectangleButtons.png',
    );
    const absolute = path.join(ROOT, PREVIEW_STILL_DISK);
    expect(fs.existsSync(absolute)).toBe(true);
    expect(fs.statSync(absolute).size).toBeGreaterThan(MIN_PREVIEW_BYTES);
  });
});
