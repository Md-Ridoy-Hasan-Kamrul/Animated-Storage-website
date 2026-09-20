import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import {
  ASSET_MANIFEST,
  MIN_PREVIEW_BYTES,
  NEUFORM_ISOLATED_EFFECTS_SHA256,
  PREVIEW_STILL,
  PREVIEW_STILL_DISK,
  PUBLIC_THINKING_HTML_SHA256,
  THINKING_BUTTON_HTML_SHA256,
  VARIANT_ID,
} from '../constants';

const ROOT = path.resolve(__dirname, '../../../../../');

describe('Thinking packaged assets', () => {
  it.each(ASSET_MANIFEST)('keeps byte-exact $path', ({ path: relativePath, bytes, sha256 }) => {
    const absolute = path.join(ROOT, relativePath);
    expect(fs.existsSync(absolute)).toBe(true);
    const buffer = fs.readFileSync(absolute);
    expect(buffer.length).toBe(bytes);
    expect(crypto.createHash('sha256').update(buffer).digest('hex')).toBe(sha256);
  });

  it('keeps verified Neuform + thinking-button provenance', () => {
    const neuform = fs.readFileSync(
      path.join(ROOT, 'src/templates/button/thinking-button/sources/NeuformIsolatedEffects.tsx.txt'),
      'utf8',
    );
    const html = fs.readFileSync(
      path.join(ROOT, 'src/templates/button/thinking-button/sources/thinking-button.html'),
      'utf8',
    );

    expect(crypto.createHash('sha256').update(neuform).digest('hex')).toBe(
      NEUFORM_ISOLATED_EFFECTS_SHA256,
    );
    expect(crypto.createHash('sha256').update(html).digest('hex')).toBe(THINKING_BUTTON_HTML_SHA256);

    expect(neuform).toContain('export const ThinkingButton');
    expect(neuform).toContain('transformThinkingButtonSource');
    expect(neuform).toContain('buildFocusedDocument');
    expect(neuform).toContain('#stage');
    expect(html).toContain('id="stage"');
    expect(html).toContain("var word = 'Uploading'");
    expect(html).toContain('PERIM');
    expect(html).toContain('paintComet');
  });

  it('publishes focused public document with Thinking transform + threeui isolation', () => {
    const focused = fs.readFileSync(path.join(ROOT, 'public/effects/thinking-button.html'), 'utf8');
    const host = fs.readFileSync(
      path.join(ROOT, 'src/templates/button/thinking-button/ShaderButtons.jsx'),
      'utf8',
    );

    expect(crypto.createHash('sha256').update(focused).digest('hex')).toBe(
      PUBLIC_THINKING_HTML_SHA256,
    );
    expect(focused).toContain('data-threeui-focus');
    expect(focused).toContain('data-threeui-role');
    expect(focused).toContain('#stage');
    expect(focused).toContain('#111318');
    expect(focused).toContain("var word = 'Thinking'");
    expect(focused).toContain('function braille');
    expect(focused).toContain('#2563eb');
    expect(focused).not.toContain("var word = 'Uploading'");
    expect(focused).not.toContain('invert(1)');
    expect(host).toContain('export function ShaderButtons');
    expect(host).toContain('SOURCE_URL');
    expect(VARIANT_ID).toBe('thinking-button');
  });

  it('ships a real gallery still preview on disk (no broken STILL PREVIEW)', () => {
    expect(PREVIEW_STILL).toBe('/images/Assets%20Thinking/Thinking.png');
    const absolute = path.join(ROOT, PREVIEW_STILL_DISK);
    expect(fs.existsSync(absolute)).toBe(true);
    expect(fs.statSync(absolute).size).toBeGreaterThan(MIN_PREVIEW_BYTES);
  });
});
