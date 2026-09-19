import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import {
  ASSET_MANIFEST,
  MIN_PREVIEW_BYTES,
  PREVIEW_STILL,
  PREVIEW_STILL_DISK,
  RECTANGLE_BUTTONS_SHA256,
  SECTION_ELEMENTS_SHA256,
  SF_REGULAR_SHA256,
} from '../constants';

const ROOT = path.resolve(__dirname, '../../../../../');

describe('Rectangle Buttons packaged assets', () => {
  it.each(ASSET_MANIFEST)('keeps byte-exact $path', ({ path: relativePath, bytes, sha256 }) => {
    const absolute = path.join(ROOT, relativePath);
    expect(fs.existsSync(absolute)).toBe(true);
    const buffer = fs.readFileSync(absolute);
    expect(buffer.length).toBe(bytes);
    expect(crypto.createHash('sha256').update(buffer).digest('hex')).toBe(sha256);
  });

  it('keeps verified RectangleButtons and DarkGlass SectionElements provenance', () => {
    const collection = fs.readFileSync(
      path.join(ROOT, 'src/templates/button/rectangle-buttons/sources/RectangleButtons.tsx.txt'),
      'utf8',
    );
    const section = fs.readFileSync(
      path.join(ROOT, 'src/templates/button/rectangle-buttons/sources/SectionElements.tsx.txt'),
      'utf8',
    );

    expect(crypto.createHash('sha256').update(collection).digest('hex')).toBe(
      RECTANGLE_BUTTONS_SHA256,
    );
    expect(crypto.createHash('sha256').update(section).digest('hex')).toBe(SECTION_ELEMENTS_SHA256);

    expect(collection).toContain('dark-pill');
    expect(collection).toContain('DarkGlassRectangle');
    expect(section).toContain('export function DarkGlassButton');
    expect(section).toContain('section-element--glass-button');
    expect(section).toContain('Sign up');
  });

  it('ships SF Pro font subsets with registered hashes', () => {
    const regular = fs.readFileSync(
      path.join(ROOT, 'src/templates/button/rectangle-buttons/sources/assets/sf-regular.woff2'),
    );
    expect(crypto.createHash('sha256').update(regular).digest('hex')).toBe(SF_REGULAR_SHA256);
    expect(regular.slice(0, 4).toString('hex')).toBe('774f4632');
  });

  it('ships a real gallery still preview on disk (no broken STILL PREVIEW)', () => {
    expect(PREVIEW_STILL).toBe('/images/Assets%20Rectangle%20Buttons/RectangleButtons.png');
    const absolute = path.join(ROOT, PREVIEW_STILL_DISK);
    expect(fs.existsSync(absolute)).toBe(true);
    expect(fs.statSync(absolute).size).toBeGreaterThan(MIN_PREVIEW_BYTES);
  });
});
