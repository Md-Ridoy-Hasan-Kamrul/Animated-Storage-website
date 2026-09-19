import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import {
  ASSET_MANIFEST,
  BUTTON_LABEL,
  BUTTON_PRICE,
  MIN_PREVIEW_BYTES,
  PREVIEW_STILL,
  PREVIEW_STILL_DISK,
  RECTANGLE_BUTTONS_SHA256,
  THEME_ID,
  VARIANT_ID,
} from '../constants';

const ROOT = path.resolve(__dirname, '../../../../../');

describe('Ember Keycap Rectangle Buttons packaged assets', () => {
  it.each(ASSET_MANIFEST)('keeps byte-exact $path', ({ path: relativePath, bytes, sha256 }) => {
    const absolute = path.join(ROOT, relativePath);
    expect(fs.existsSync(absolute)).toBe(true);
    const buffer = fs.readFileSync(absolute);
    expect(buffer.length).toBe(bytes);
    expect(crypto.createHash('sha256').update(buffer).digest('hex')).toBe(sha256);
  });

  it('keeps verified RectangleButtons.tsx provenance for ember-keycap', () => {
    const component = fs.readFileSync(
      path.join(
        ROOT,
        'src/templates/button/ember-keycap-rectangle-buttons/sources/RectangleButtons.tsx.txt',
      ),
      'utf8',
    );

    expect(crypto.createHash('sha256').update(component).digest('hex')).toBe(
      RECTANGLE_BUTTONS_SHA256,
    );
    expect(component).toContain('export function RectangleButtons');
    expect(component).toContain('ember-keycap');
    expect(component).toContain('threeui-page-button--ember-keycap');
    expect(component).toContain('threeui-page-button-ember-wrap');
    expect(component).toContain('threeui-page-button-ember-glow');
    expect(component).toContain('threeui-page-button-ember-bloom');
    expect(component).toContain('threeui-page-button__spark');
    expect(component).toContain('Pre-order');
    expect(component).toContain('$249');
    expect(component).toContain('SELECTED_PAGE_BUTTON_STYLES');
  });

  it('ships runtime SelectedPageButton + Ember CSS matching the authored treatment', () => {
    const runtimeCss = fs.readFileSync(
      path.join(ROOT, 'src/templates/button/ember-keycap-rectangle-buttons/ember-keycap.css'),
      'utf8',
    );
    const runtimeJsx = fs.readFileSync(
      path.join(
        ROOT,
        'src/templates/button/ember-keycap-rectangle-buttons/SelectedPageButton.jsx',
      ),
      'utf8',
    );

    expect(runtimeCss).toContain('.threeui-page-button-stage--ember-keycap');
    expect(runtimeCss).toContain('.threeui-page-button--ember-keycap');
    expect(runtimeCss).toContain('.threeui-page-button-ember-glow');
    expect(runtimeCss).toContain('.threeui-page-button-ember-bloom');
    expect(runtimeCss).toContain('#080604');
    expect(runtimeCss).toContain('#ff8a3d');
    expect(runtimeCss).toContain('JetBrains Mono');
    expect(runtimeJsx).toContain('export function SelectedPageButton');
    expect(runtimeJsx).toContain('BUTTON_LABEL');
    expect(runtimeJsx).toContain('BUTTON_PRICE');
    expect(runtimeJsx).toContain('threeui-page-button--ember-keycap');
    expect(runtimeJsx).toContain('threeui-page-button__spark');
    expect(runtimeJsx).toContain(THEME_ID);
    expect(VARIANT_ID).toBe('ember-keycap');
    expect(BUTTON_LABEL).toBe('Pre-order');
    expect(BUTTON_PRICE).toBe('$249');
  });

  it('ships a real gallery still preview on disk (no broken STILL PREVIEW)', () => {
    expect(PREVIEW_STILL).toBe(
      '/images/Assets%20Ember%20Keycap%20Rectangle%20Buttons/EmberKeycapRectangleButtons.png',
    );
    const absolute = path.join(ROOT, PREVIEW_STILL_DISK);
    expect(fs.existsSync(absolute)).toBe(true);
    expect(fs.statSync(absolute).size).toBeGreaterThan(MIN_PREVIEW_BYTES);
  });
});
