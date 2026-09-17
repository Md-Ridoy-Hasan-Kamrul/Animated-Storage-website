const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const root = path.resolve(__dirname, '..');
const sources = path.join(root, 'src/templates/sections/warp-field-default/sources');
const vendorDir = path.join(root, 'vendor/three128');
fs.mkdirSync(vendorDir, { recursive: true });

const srcThree = path.join(sources, 'three.module.js');
const destThree = path.join(vendorDir, 'three.module.js');
if (fs.existsSync(srcThree)) {
  fs.renameSync(srcThree, destThree);
}

const threeBuf = fs.readFileSync(destThree);
console.log(
  JSON.stringify({
    threeBytes: threeBuf.length,
    threeSha256: crypto.createHash('sha256').update(threeBuf).digest('hex'),
  }),
);

function stripTs(src) {
  let s = src;
  s = s.replace(/^export type .*$/gm, '');
  s = s.replace(/^type [^=\n]+=[^\n]+$/gm, '');
  s = s.replace(/ as const/g, '');
  s = s.replace(/, type WarpFieldOptions /g, ' ');
  s = s.replace(/ type WarpFieldOptions,/g, '');
  s = s.replace(/: Record<[^>]+>/g, '');
  s = s.replace(/: WarpFieldOptions/g, '');
  s = s.replace(/: WarpFieldVariant/g, '');
  s = s.replace(/: Layer/g, '');
  s = s.replace(/: StreakSettings/g, '');
  s = s.replace(/: THREE\.[A-Za-z0-9_]+(\[\])?/g, '');
  s = s.replace(/: HTMLCanvasElement/g, '');
  s = s.replace(/: HTMLDivElement/g, '');
  s = s.replace(/: \(\) => WarpFieldOptions/g, '');
  s = s.replace(/: WarpFieldBackgroundProps/g, '');
  s = s.replace(
    /: Partial<WarpFieldOptions> & \{ className\?: string \}/g,
    '',
  );
  s = s.replace(/ as unknown as \{ array: Float32Array; needsUpdate: boolean \}/g, '');
  s = s.replace(/\(([^)]*)\): Layer \{/g, (_, params) => {
    const cleaned = params.replace(/: [^,)=]+/g, '');
    return `(${cleaned}) {`;
  });
  s = s.replace(/function ([A-Za-z0-9_]+)\(([^)]*)\): [A-Za-z0-9_<>,\s|]+ \{/g, (_, name, params) => {
    const cleaned = params.replace(/: [^,)=]+/g, '');
    return `function ${name}(${cleaned}) {`;
  });
  s = s.replace(/\(([^)]*)\): void \{/g, (_, params) => {
    const cleaned = params.replace(/: [^,)=]+/g, '');
    return `(${cleaned}) {`;
  });
  s = s.replace(/update\(([^)]*)\) \{/g, (m, params) => {
    const cleaned = params.replace(/: [^,)=]+/g, '');
    return `update(${cleaned}) {`;
  });
  s = s.replace(/setOpacity\(([^)]*)\) \{/g, (m, params) => {
    const cleaned = params.replace(/: [^,)=]+/g, '');
    return `setOpacity(${cleaned}) {`;
  });
  s = s.replace(/export function ([A-Za-z0-9_]+)\(([^)]*)\) \{/g, (_, name, params) => {
    const cleaned = params
      .replace(/: Partial<[^>]+> & \{[^}]*\}/g, '')
      .replace(/: [^,)=]+/g, '');
    return `export function ${name}(${cleaned}) {`;
  });
  s = s.replace(/useRef<[^>]+>/g, 'useRef');
  s = s.replace(/\{ className\?: string \}/g, '');
  s = s.replace(/\n{3,}/g, '\n\n');
  return s;
}

const rendererTs = fs.readFileSync(path.join(sources, 'warpFieldRenderer.ts.txt'), 'utf8');
const bgTs = fs.readFileSync(path.join(sources, 'WarpFieldBackground.tsx.txt'), 'utf8');

const rendererJs = stripTs(rendererTs);
const bgJs = stripTs(bgTs)
  .replace(
    'from "./warpFieldRenderer"',
    'from "./warpFieldRenderer"',
  )
  .replace(/from "react"/, "from 'react'");

fs.writeFileSync(path.join(root, '_tmp_warp_renderer.js'), rendererJs);
fs.writeFileSync(path.join(root, '_tmp_warp_bg.js'), bgJs);
console.log('--- renderer head ---');
console.log(rendererJs.split('\n').slice(0, 35).join('\n'));
console.log('--- bg ---');
console.log(bgJs);
