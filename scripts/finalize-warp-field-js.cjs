const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const dir = path.join(root, 'src/templates/sections/warp-field-default');

let renderer = fs.readFileSync(path.join(root, '_tmp_warp_renderer.js'), 'utf8');
renderer = renderer
  .replace(/: number(\[\])?/g, '')
  .replace(/: string(\[\])?/g, '')
  .replace(/: boolean(\[\])?/g, '')
  .replace(/ as unknown as \{[^}]+\}/g, '');

fs.writeFileSync(path.join(dir, 'warpFieldRenderer.js'), renderer);

let bg = fs.readFileSync(path.join(root, '_tmp_warp_bg.js'), 'utf8');
bg = bg.replace(
  'from "./warpFieldRenderer"',
  "from './warpFieldRenderer'",
);

fs.writeFileSync(path.join(dir, 'WarpFieldBackground.jsx'), bg);

const leftover = renderer.match(/: (number|string|boolean)| as unknown|<[A-Za-z]/g);
console.log(
  JSON.stringify({
    rendererBytes: renderer.length,
    leftover: leftover || [],
    hasThree128: renderer.includes('from "three128"'),
    exportCreate: renderer.includes('export function createWarpFieldRenderer'),
  }),
);
