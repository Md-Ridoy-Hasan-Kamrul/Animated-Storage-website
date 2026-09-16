import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import {
  ASSET_MANIFEST,
  FOCUSED_DOCUMENT_SHA256,
  SOURCE_URL,
} from '../constants';

const ROOT = path.resolve(__dirname, '../../../../../');

describe('Topology Field Structure Flow packaged assets', () => {
  it.each(ASSET_MANIFEST)('keeps byte-exact $path', ({ path: relativePath, bytes, sha256 }) => {
    const absolute = path.join(ROOT, relativePath);
    expect(fs.existsSync(absolute)).toBe(true);
    const buffer = fs.readFileSync(absolute);
    expect(buffer.length).toBe(bytes);
    expect(crypto.createHash('sha256').update(buffer).digest('hex')).toBe(sha256);
  });

  it('serves a focus-isolated Topology Field document from the effects URL', () => {
    expect(SOURCE_URL).toBe('/effects/topology-field-structure-flow.html');
    const html = fs.readFileSync(
      path.join(ROOT, 'public/effects/topology-field-structure-flow.html'),
      'utf8',
    );
    expect(crypto.createHash('sha256').update(html).digest('hex')).toBe(FOCUSED_DOCUMENT_SHA256);
    expect(html).toContain('id="animationCanvas"');
    expect(html).toContain('data-threeui-focus');
    expect(html).toContain('three.js/r128/three.min.js');
    expect(html).toContain('#animationCanvas');
    expect(html).toContain('data-threeui-role');
  });

  it('keeps provenance nexus-topology identical to the registered source', () => {
    const provenance = fs.readFileSync(
      path.join(
        ROOT,
        'src/templates/background/topology-field-structure-flow/sources/nexus-topology.html',
      ),
      'utf8',
    );
    expect(provenance).toContain('animationCanvas');
    expect(provenance).toContain('Expand vs');
    expect(provenance).toContain('Nexus Architecture');
  });
});
