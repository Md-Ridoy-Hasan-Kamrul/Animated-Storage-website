import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import {
  ASSET_MANIFEST,
  GATEWAY_FLOW_HTML_SHA256,
  MIN_PREVIEW_BYTES,
  NEUFORM_BATCH_COMPONENT_SHA256,
  PREVIEW_STILL,
  PREVIEW_STILL_DISK,
  PUBLIC_GATEWAY_FLOW_HTML_SHA256,
} from '../constants';

const ROOT = path.resolve(__dirname, '../../../../../');

describe('Gateway Flow Constellation Field packaged assets', () => {
  it.each(ASSET_MANIFEST)('keeps byte-exact $path', ({ path: relativePath, bytes, sha256 }) => {
    const absolute = path.join(ROOT, relativePath);
    expect(fs.existsSync(absolute)).toBe(true);
    const buffer = fs.readFileSync(absolute);
    expect(buffer.length).toBe(bytes);
    expect(crypto.createHash('sha256').update(buffer).digest('hex')).toBe(sha256);
  });

  it('keeps verified NeuformBatchEffects and gateway-flow HTML provenance', () => {
    const neuform = fs.readFileSync(
      path.join(
        ROOT,
        'src/templates/background/gateway-flow-constellation-field/sources/NeuformBatchEffects.tsx.txt',
      ),
      'utf8',
    );
    const html = fs.readFileSync(
      path.join(
        ROOT,
        'src/templates/background/gateway-flow-constellation-field/sources/gateway-flow.html',
      ),
      'utf8',
    );

    expect(crypto.createHash('sha256').update(neuform).digest('hex')).toBe(
      NEUFORM_BATCH_COMPONENT_SHA256,
    );
    expect(crypto.createHash('sha256').update(html).digest('hex')).toBe(
      GATEWAY_FLOW_HTML_SHA256,
    );

    expect(neuform).toContain('gatewayFlow');
    expect(neuform).toContain('buildFocusedDocument');
    expect(neuform).toContain('#flow-canvas');
    expect(neuform).toContain('sandbox="allow-scripts"');
    expect(neuform).toContain('threeui-controls');
    expect(html).toContain('flow-canvas');
    expect(html).toContain('const numPaths = 80');
    expect(html).toContain('getBezierPoint');
    expect(html).toContain('explosions');
    expect(html).toContain('bezierCurveTo');
  });

  it('publishes focused public document with threeui controls and SF bridge', () => {
    const focused = fs.readFileSync(
      path.join(ROOT, 'public/effects/gateway-flow.html'),
      'utf8',
    );
    expect(crypto.createHash('sha256').update(focused).digest('hex')).toBe(
      PUBLIC_GATEWAY_FLOW_HTML_SHA256,
    );
    expect(focused).toContain('data-threeui-focus');
    expect(focused).toContain('data-threeui-controls');
    expect(focused).toContain('threeui-controls');
    expect(focused).toContain('__SF_CONTROLS');
    expect(focused).toContain('flow-canvas');
    expect(focused).toContain('#flow-canvas');
    expect(focused).toContain('__SF_CONTROLS&&window.__SF_CONTROLS.speed');
    expect(focused).toContain('const numPaths = 80');
    expect(focused).not.toContain('cloudflareinsights');
  });

  it('ships a real gallery still preview on disk (no broken STILL PREVIEW)', () => {
    expect(PREVIEW_STILL).toBe(
      '/images/Assets%20Gateway%20Flow%20Constellation%20Field/GatewayFlowConstellationField.png',
    );
    const absolute = path.join(ROOT, PREVIEW_STILL_DISK);
    expect(fs.existsSync(absolute)).toBe(true);
    expect(fs.statSync(absolute).size).toBeGreaterThan(MIN_PREVIEW_BYTES);
  });
});
