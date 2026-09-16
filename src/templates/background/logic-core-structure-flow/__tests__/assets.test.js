import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import {
  ASSET_MANIFEST,
  FOCUSED_DOCUMENT_SHA256,
  SOURCE_URL,
} from '../constants';

const ROOT = path.resolve(__dirname, '../../../../../');

describe('Logic Core Structure Flow packaged assets', () => {
  it.each(ASSET_MANIFEST)('keeps byte-exact $path', ({ path: relativePath, bytes, sha256 }) => {
    const absolute = path.join(ROOT, relativePath);
    expect(fs.existsSync(absolute)).toBe(true);
    const buffer = fs.readFileSync(absolute);
    expect(buffer.length).toBe(bytes);
    expect(crypto.createHash('sha256').update(buffer).digest('hex')).toBe(sha256);
  });

  it('serves a focus-isolated Logic Core document from the effects URL', () => {
    expect(SOURCE_URL).toBe('/effects/logic-core-structure-flow.html');
    const html = fs.readFileSync(
      path.join(ROOT, 'public/effects/logic-core-structure-flow.html'),
      'utf8',
    );
    expect(crypto.createHash('sha256').update(html).digest('hex')).toBe(FOCUSED_DOCUMENT_SHA256);
    expect(html).toContain('id="three-canvas-container"');
    expect(html).toContain('data-threeui-focus');
    expect(html).toContain('cdn.skypack.dev/three@0.136.0');
    expect(html).toContain('Logic Core');
    expect(html).toContain('#three-canvas-container');
    expect(html).toContain('data-threeui-role');
  });

  it('keeps provenance platform-core identical to the registered source', () => {
    const provenance = fs.readFileSync(
      path.join(
        ROOT,
        'src/templates/background/logic-core-structure-flow/sources/platform-core.html',
      ),
      'utf8',
    );
    expect(provenance).toContain('three-canvas-container');
    expect(provenance).toContain('Visual Interface');
    expect(provenance).toContain('Core Logic');
  });
});
