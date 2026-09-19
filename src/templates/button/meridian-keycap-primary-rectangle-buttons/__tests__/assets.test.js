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

describe('Meridian Keycap Primary Rectangle Buttons packaged assets', () => {
  it.each(ASSET_MANIFEST)('keeps byte-exact $path', ({ path: relativePath, bytes, sha256 }) => {
    const absolute = path.join(ROOT, relativePath);
    expect(fs.existsSync(absolute)).toBe(true);
    const buffer = fs.readFileSync(absolute);
    expect(buffer.length).toBe(bytes);
    expect(crypto.createHash('sha256').update(buffer).digest('hex')).toBe(sha256);
  });

  it('keeps verified RectangleButtons.tsx provenance for meridian-keycap-primary', () => {
    const component = fs.readFileSync(
      path.join(
        ROOT,
        'src/templates/button/meridian-keycap-primary-rectangle-buttons/sources/RectangleButtons.tsx.txt',
      ),
      'utf8',
    );

    expect(crypto.createHash('sha256').update(component).digest('hex')).toBe(
      RECTANGLE_BUTTONS_SHA256,
    );
    expect(component).toContain('export function RectangleButtons');
    expect(component).toContain('meridian-keycap-primary');
    expect(component).toContain('threeui-page-button--meridian-primary');
    expect(component).toContain('threeui-page-button__led');
    expect(component).toContain('Start free');
    expect(component).toContain('SELECTED_PAGE_BUTTON_STYLES');
  });

  it('ships runtime SelectedPageButton + Meridian CSS matching the authored treatment', () => {
    const runtimeCss = fs.readFileSync(
      path.join(
        ROOT,
        'src/templates/button/meridian-keycap-primary-rectangle-buttons/meridian-keycap-primary.css',
      ),
      'utf8',
    );
    const runtimeJsx = fs.readFileSync(
      path.join(
        ROOT,
        'src/templates/button/meridian-keycap-primary-rectangle-buttons/SelectedPageButton.jsx',
      ),
      'utf8',
    );

    expect(runtimeCss).toContain('.threeui-page-button-stage--meridian');
    expect(runtimeCss).toContain('.threeui-page-button--meridian-primary');
    expect(runtimeCss).toContain('#04070d');
    expect(runtimeCss).toContain('#6db6ff');
    expect(runtimeCss).toContain('#2e85e8');
    expect(runtimeCss).toContain('threeui-page-button__led');
    expect(runtimeJsx).toContain('export function SelectedPageButton');
    expect(runtimeJsx).toContain('BUTTON_LABEL');
    expect(runtimeJsx).toContain('threeui-page-button--meridian-primary');
    expect(runtimeJsx).toContain('threeui-page-button__led');
    expect(runtimeJsx).toContain(THEME_ID);
    expect(VARIANT_ID).toBe('meridian-keycap-primary');
    expect(BUTTON_LABEL).toBe('Start free');
  });

  it('ships a real gallery still preview on disk (no broken STILL PREVIEW)', () => {
    expect(PREVIEW_STILL).toBe(
      '/images/Assets%20Meridian%20Keycap%20Primary%20Rectangle%20Buttons/MeridianKeycapPrimaryRectangleButtons.png',
    );
    const absolute = path.join(ROOT, PREVIEW_STILL_DISK);
    expect(fs.existsSync(absolute)).toBe(true);
    expect(fs.statSync(absolute).size).toBeGreaterThan(MIN_PREVIEW_BYTES);
  });
});
