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

describe('Tideform Outline Rectangle Buttons packaged assets', () => {
  it.each(ASSET_MANIFEST)('keeps byte-exact $path', ({ path: relativePath, bytes, sha256 }) => {
    const absolute = path.join(ROOT, relativePath);
    expect(fs.existsSync(absolute)).toBe(true);
    const buffer = fs.readFileSync(absolute);
    expect(buffer.length).toBe(bytes);
    expect(crypto.createHash('sha256').update(buffer).digest('hex')).toBe(sha256);
  });

  it('keeps verified RectangleButtons.tsx provenance for tideform-outline', () => {
    const component = fs.readFileSync(
      path.join(
        ROOT,
        'src/templates/button/tideform-outline-rectangle-buttons/sources/RectangleButtons.tsx.txt',
      ),
      'utf8',
    );

    expect(crypto.createHash('sha256').update(component).digest('hex')).toBe(
      RECTANGLE_BUTTONS_SHA256,
    );
    expect(component).toContain('export function RectangleButtons');
    expect(component).toContain('tideform-outline');
    expect(component).toContain('threeui-page-button--tideform');
    expect(component).toContain('See the work');
    expect(component).toContain('SELECTED_PAGE_BUTTON_STYLES');
  });

  it('ships runtime SelectedPageButton + Tideform CSS matching the authored treatment', () => {
    const runtimeCss = fs.readFileSync(
      path.join(ROOT, 'src/templates/button/tideform-outline-rectangle-buttons/tideform-outline.css'),
      'utf8',
    );
    const runtimeJsx = fs.readFileSync(
      path.join(
        ROOT,
        'src/templates/button/tideform-outline-rectangle-buttons/SelectedPageButton.jsx',
      ),
      'utf8',
    );

    expect(runtimeCss).toContain('.threeui-page-button-stage--tideform');
    expect(runtimeCss).toContain('.threeui-page-button--tideform');
    expect(runtimeCss).toContain('#16181a');
    expect(runtimeCss).toContain('#ff7a18');
    expect(runtimeCss).toContain('Roboto Mono');
    expect(runtimeJsx).toContain('export function SelectedPageButton');
    expect(runtimeJsx).toContain('BUTTON_LABEL');
    expect(runtimeJsx).toContain('threeui-page-button--tideform');
    expect(runtimeJsx).toContain('ArrowIcon');
    expect(runtimeJsx).toContain(THEME_ID);
    expect(VARIANT_ID).toBe('tideform-outline');
    expect(BUTTON_LABEL).toBe('See the work');
  });

  it('ships a real gallery still preview on disk (no broken STILL PREVIEW)', () => {
    expect(PREVIEW_STILL).toBe(
      '/images/Assets%20Tideform%20Outline%20Rectangle%20Buttons/TideformOutlineRectangleButtons.png',
    );
    const absolute = path.join(ROOT, PREVIEW_STILL_DISK);
    expect(fs.existsSync(absolute)).toBe(true);
    expect(fs.statSync(absolute).size).toBeGreaterThan(MIN_PREVIEW_BYTES);
  });
});
