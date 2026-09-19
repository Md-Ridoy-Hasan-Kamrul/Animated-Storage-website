import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import {
  ASSET_MANIFEST,
  GENERATIVE_TREE_COMPONENT_SHA256,
  GENERATIVE_TREE_HTML_SHA256,
  MIN_PREVIEW_BYTES,
  PREVIEW_STILL,
  PREVIEW_STILL_DISK,
} from '../constants';

const ROOT = path.resolve(__dirname, '../../../../../');

describe('Generative Tree Elements packaged assets', () => {
  it.each(ASSET_MANIFEST)('keeps byte-exact $path', ({ path: relativePath, bytes, sha256 }) => {
    const absolute = path.join(ROOT, relativePath);
    expect(fs.existsSync(absolute)).toBe(true);
    const buffer = fs.readFileSync(absolute);
    expect(buffer.length).toBe(bytes);
    expect(crypto.createHash('sha256').update(buffer).digest('hex')).toBe(sha256);
  });

  it('keeps verified GenerativeTree host and canonical tree HTML provenance', () => {
    const component = fs.readFileSync(
      path.join(ROOT, 'src/templates/background/generative-tree-elements/sources/GenerativeTree.tsx.txt'),
      'utf8',
    );
    const html = fs.readFileSync(
      path.join(ROOT, 'src/templates/background/generative-tree-elements/sources/generative-tree.html'),
      'utf8',
    );

    expect(crypto.createHash('sha256').update(component).digest('hex')).toBe(
      GENERATIVE_TREE_COMPONENT_SHA256,
    );
    expect(crypto.createHash('sha256').update(html).digest('hex')).toBe(
      GENERATIVE_TREE_HTML_SHA256,
    );

    expect(component).toContain('export function GenerativeTree');
    expect(component).toContain('buildFocusedDocument');
    expect(component).toContain('generative-tree-controls');
    expect(component).toContain('sandbox="allow-scripts"');
    expect(html).toContain('Generative Branching Tree');
    expect(html).toContain('GROWTH_SPEED_BASE');
    expect(html).toContain('windForce');
    expect(html).toContain('createTree');
  });

  it('publishes focused public document with controls and cursor-wind birds', () => {
    const focused = fs.readFileSync(
      path.join(ROOT, 'public/effects/generative-tree.html'),
      'utf8',
    );
    expect(focused).toContain('data-generative-tree-focus');
    expect(focused).toContain('data-generative-tree-controls');
    expect(focused).toContain('generative-tree-controls');
    expect(focused).toContain('__GENERATIVE_TREE_CONTROLS');
    expect(focused).toContain('updateBirds');
    expect(focused).toContain('drawBirds');
    expect(focused).toContain('seatBirdsOnTree');
    expect(focused).toContain('flushPerchedBirdsToSky');
    expect(focused).toContain('triggerTreeShake');
    expect(focused).toContain('drawNightSky');
    expect(focused).toContain('nightClouds');
    expect(focused).toContain('var stars = []');
    expect(focused).toContain("state: 'perched'");
    expect(focused).toContain('startTreeWhenSized');
    expect(focused).not.toContain('cloudflareinsights');
  });

  it('ships a real gallery still preview on disk (no broken STILL PREVIEW)', () => {
    expect(PREVIEW_STILL).toBe(
      '/images/Assets%20Generative%20Tree%20Elements/GenerativeTreeElements.png',
    );
    const absolute = path.join(ROOT, PREVIEW_STILL_DISK);
    expect(fs.existsSync(absolute)).toBe(true);
    expect(fs.statSync(absolute).size).toBeGreaterThan(MIN_PREVIEW_BYTES);
  });
});
