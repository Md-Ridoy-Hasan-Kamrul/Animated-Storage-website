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

describe('Meridian Keycap Secondary Rectangle Buttons packaged assets', () => {
  it.each(ASSET_MANIFEST)('keeps byte-exact $path', ({ path: relativePath, bytes, sha256 }) => {
    const absolute = path.join(ROOT, relativePath);
    expect(fs.existsSync(absolute)).toBe(true);
    const buffer = fs.readFileSync(absolute);
    expect(buffer.length).toBe(bytes);
    expect(crypto.createHash('sha256').update(buffer).digest('hex')).toBe(sha256);
  });

  it('keeps verified RectangleButtons.tsx provenance for meridian-keycap-secondary', () => {
    const component = fs.readFileSync(
      path.join(
        ROOT,
        'src/templates/button/meridian-keycap-secondary-rectangle-buttons/sources/RectangleButtons.tsx.txt',
      ),
      'utf8',
    );

    expect(crypto.createHash('sha256').update(component).digest('hex')).toBe(
      RECTANGLE_BUTTONS_SHA256,
    );
    expect(component).toContain('export function RectangleButtons');
    expect(component).toContain('meridian-keycap-secondary');
    expect(component).toContain('threeui-page-button--meridian');
    expect(component).toContain('threeui-page-button__led');
    expect(component).toContain('Book a walkthrough');
    expect(component).toContain('SELECTED_PAGE_BUTTON_STYLES');
  });

  it('ships runtime SelectedPageButton + Meridian secondary CSS matching the authored treatment', () => {
    const runtimeCss = fs.readFileSync(
      path.join(
        ROOT,
        'src/templates/button/meridian-keycap-secondary-rectangle-buttons/meridian-keycap-secondary.css',
      ),
      'utf8',
    );
    const runtimeJsx = fs.readFileSync(
      path.join(
        ROOT,
        'src/templates/button/meridian-keycap-secondary-rectangle-buttons/SelectedPageButton.jsx',
      ),
      'utf8',
    );

    expect(runtimeCss).toContain('.threeui-page-button-stage--meridian');
    expect(runtimeCss).toContain('.threeui-page-button--meridian');
    expect(runtimeCss).toContain('#04070d');
    expect(runtimeCss).toContain('#2a3142');
    expect(runtimeCss).toContain('#1c2230');
    expect(runtimeCss).toContain('threeui-page-button__led');
    expect(runtimeCss).not.toContain('meridian-primary');
    expect(runtimeJsx).toContain('export function SelectedPageButton');
    expect(runtimeJsx).toContain('BUTTON_LABEL');
    expect(runtimeJsx).toContain('threeui-page-button--meridian');
    expect(runtimeJsx).not.toContain('meridian-primary');
    expect(runtimeJsx).toContain('threeui-page-button__led');
    expect(runtimeJsx).toContain(THEME_ID);
    expect(VARIANT_ID).toBe('meridian-keycap-secondary');
    expect(BUTTON_LABEL).toBe('Book a walkthrough');
  });

  it('ships a real gallery still preview on disk (no broken STILL PREVIEW)', () => {
    expect(PREVIEW_STILL).toBe(
      '/images/Assets%20Meridian%20Keycap%20Secondary%20Rectangle%20Buttons/MeridianKeycapSecondaryRectangleButtons.png',
    );
    const absolute = path.join(ROOT, PREVIEW_STILL_DISK);
    expect(fs.existsSync(absolute)).toBe(true);
    expect(fs.statSync(absolute).size).toBeGreaterThan(MIN_PREVIEW_BYTES);
  });
});
