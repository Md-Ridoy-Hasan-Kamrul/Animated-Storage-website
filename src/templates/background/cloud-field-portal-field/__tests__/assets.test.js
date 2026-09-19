import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import {
  ASSET_MANIFEST,
  MIN_PREVIEW_BYTES,
  NEUFORM_ISOLATED_EFFECTS_SHA256,
  PREVIEW_STILL,
  PREVIEW_STILL_DISK,
  PUBLIC_CLOUD_FIELD_HTML_SHA256,
  STRATA_CLOUD_HTML_SHA256,
} from '../constants';

const ROOT = path.resolve(__dirname, '../../../../../');

describe('Cloud Field Portal Field packaged assets', () => {
  it.each(ASSET_MANIFEST)('keeps byte-exact $path', ({ path: relativePath, bytes, sha256 }) => {
    const absolute = path.join(ROOT, relativePath);
    expect(fs.existsSync(absolute)).toBe(true);
    const buffer = fs.readFileSync(absolute);
    expect(buffer.length).toBe(bytes);
    expect(crypto.createHash('sha256').update(buffer).digest('hex')).toBe(sha256);
  });

  it('keeps verified NeuformIsolatedEffects and strata-cloud HTML provenance', () => {
    const component = fs.readFileSync(
      path.join(
        ROOT,
        'src/templates/background/cloud-field-portal-field/sources/NeuformIsolatedEffects.tsx.txt',
      ),
      'utf8',
    );
    const html = fs.readFileSync(
      path.join(
        ROOT,
        'src/templates/background/cloud-field-portal-field/sources/strata-cloud.html',
      ),
      'utf8',
    );

    expect(crypto.createHash('sha256').update(component).digest('hex')).toBe(
      NEUFORM_ISOLATED_EFFECTS_SHA256,
    );
    expect(crypto.createHash('sha256').update(html).digest('hex')).toBe(
      STRATA_CLOUD_HTML_SHA256,
    );

    expect(component).toContain('export const CloudField');
    expect(component).toContain('buildFocusedDocument');
    expect(component).toContain('strata-cloud.html');
    expect(component).toContain('#c');
    expect(component).toContain('sandbox="allow-scripts"');
    expect(html).toContain('id="c"');
    expect(html).toContain('u_mouse');
    expect(html).toContain('u_time');
    expect(html).toContain('precision highp float');
    expect(html).toContain('getContext(\'webgl\'');
  });

  it('publishes focused public document with threeui focus isolation', () => {
    const focused = fs.readFileSync(path.join(ROOT, 'public/effects/cloud-field.html'), 'utf8');
    expect(crypto.createHash('sha256').update(focused).digest('hex')).toBe(
      PUBLIC_CLOUD_FIELD_HTML_SHA256,
    );
    expect(focused).toContain('data-threeui-focus');
    expect(focused).toContain('#c');
    expect(focused).toContain('data-threeui-role');
    expect(focused).toContain('u_mouse');
    expect(focused).toContain('requestAnimationFrame(frame)');
    expect(focused).not.toContain('cloudflareinsights');
  });

  it('ships a real gallery still preview on disk (no broken STILL PREVIEW)', () => {
    expect(PREVIEW_STILL).toBe(
      '/images/Assets%20Cloud%20Field%20Portal%20Field/CloudFieldPortalField.png',
    );
    const absolute = path.join(ROOT, PREVIEW_STILL_DISK);
    expect(fs.existsSync(absolute)).toBe(true);
    expect(fs.statSync(absolute).size).toBeGreaterThan(MIN_PREVIEW_BYTES);
  });
});
