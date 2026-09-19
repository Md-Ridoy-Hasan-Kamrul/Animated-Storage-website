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

describe('Trochil Signal Rectangle Buttons packaged assets', () => {
  it.each(ASSET_MANIFEST)('keeps byte-exact $path', ({ path: relativePath, bytes, sha256 }) => {
    const absolute = path.join(ROOT, relativePath);
    expect(fs.existsSync(absolute)).toBe(true);
    const buffer = fs.readFileSync(absolute);
    expect(buffer.length).toBe(bytes);
    expect(crypto.createHash('sha256').update(buffer).digest('hex')).toBe(sha256);
  });

  it('keeps verified RectangleButtons.tsx provenance for trochil-signal', () => {
    const component = fs.readFileSync(
      path.join(
        ROOT,
        'src/templates/button/trochil-signal-rectangle-buttons/sources/RectangleButtons.tsx.txt',
      ),
      'utf8',
    );

    expect(crypto.createHash('sha256').update(component).digest('hex')).toBe(
      RECTANGLE_BUTTONS_SHA256,
    );
    expect(component).toContain('export function RectangleButtons');
    expect(component).toContain('trochil-signal');
    expect(component).toContain('threeui-page-button--trochil');
    expect(component).toContain('Request access');
    expect(component).toContain('SELECTED_PAGE_BUTTON_STYLES');
  });

  it('ships runtime SelectedPageButton + Trochil CSS matching the authored treatment', () => {
    const runtimeCss = fs.readFileSync(
      path.join(ROOT, 'src/templates/button/trochil-signal-rectangle-buttons/trochil-signal.css'),
      'utf8',
    );
    const runtimeJsx = fs.readFileSync(
      path.join(
        ROOT,
        'src/templates/button/trochil-signal-rectangle-buttons/SelectedPageButton.jsx',
      ),
      'utf8',
    );

    expect(runtimeCss).toContain('.threeui-page-button-stage--trochil');
    expect(runtimeCss).toContain('.threeui-page-button--trochil');
    expect(runtimeCss).toContain('rgba(251, 215, 54');
    expect(runtimeCss).toContain('#030303');
    expect(runtimeCss).toContain('translateX(-125%)');
    expect(runtimeJsx).toContain('export function SelectedPageButton');
    expect(runtimeJsx).toContain('BUTTON_LABEL');
    expect(runtimeJsx).toContain('threeui-page-button--trochil');
    expect(runtimeJsx).toContain(THEME_ID);
    expect(VARIANT_ID).toBe('trochil-signal');
    expect(BUTTON_LABEL).toBe('Request access');
  });

  it('ships a real gallery still preview on disk (no broken STILL PREVIEW)', () => {
    expect(PREVIEW_STILL).toBe(
      '/images/Assets%20Trochil%20Signal%20Rectangle%20Buttons/TrochilSignalRectangleButtons.png',
    );
    const absolute = path.join(ROOT, PREVIEW_STILL_DISK);
    expect(fs.existsSync(absolute)).toBe(true);
    expect(fs.statSync(absolute).size).toBeGreaterThan(MIN_PREVIEW_BYTES);
  });
});
