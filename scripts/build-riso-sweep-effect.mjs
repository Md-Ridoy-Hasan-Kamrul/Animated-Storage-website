import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { fileURLToPath } from 'url';
import {
  transformGalleryHeadingSource,
  GALLERY_HEADING_VARIANTS,
} from '../src/effects/gallery-heading/transformGalleryHeadingSource.js';

const VARIANT_KEY = 'horizontal-sweep';
const EFFECT_ID = 'riso-sweep';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const canonical = fs.readFileSync(
  path.join(root, 'src/effects/gallery-heading/sources/gallery-heading.html'),
  'utf8',
);
const variant = GALLERY_HEADING_VARIANTS[VARIANT_KEY];
const transformed = transformGalleryHeadingSource(canonical, 'dark', variant);

const scriptMatch = transformed.match(/<script>([\s\S]*)<\/script>/);
if (!scriptMatch) throw new Error('Transformed source missing <script> block');
const scriptBody = scriptMatch[1];

const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${variant.title} — motion</title>
<style>
  html,body{margin:0;height:100%;background:#000000;overflow:hidden}
  body{-webkit-font-smoothing:antialiased}
  canvas{display:block;width:100vw;height:100vh}
</style>
<style data-threeui-focus>
html, body { width: 100% !important; height: 100% !important; min-height: 0 !important; margin: 0 !important; padding: 0 !important; overflow: hidden !important; background: #000000 !important; color-scheme: dark !important; }
body { position: relative !important; display: flex !important; align-items: center !important; justify-content: center !important; }
body > * { visibility: hidden !important; }
body[data-threeui-ready] > [data-threeui-role] { visibility: visible !important; }
[data-threeui-residual] { display: none !important; }
[data-threeui-hidden] { display: none !important; }
[data-threeui-role="background"] { position: fixed !important; inset: 0 !important; width: 100% !important; height: 100% !important; max-width: none !important; max-height: none !important; z-index: 0 !important; opacity: 1 !important; pointer-events: auto !important; }
</style>
</head>
<body>
<canvas id="stage"></canvas>
<script data-threeui-focus>
(function () {
  document.documentElement.dataset.sfMode = "dark";
  var isolated = false;
  function isolate() {
    if (isolated) return;
    var element = document.querySelector('#stage');
    if (!element) return;
    element.setAttribute('data-threeui-role', 'background');
    document.body.setAttribute('data-threeui-ready', '');
    isolated = true;
    window.dispatchEvent(new Event('resize'));
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', isolate);
  else isolate();
})();
</script>
<script src="/effects/${EFFECT_ID}.js"></script>
</body>
</html>
`;

const outDir = path.join(root, 'public/effects');
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, `${EFFECT_ID}.js`), scriptBody);
fs.writeFileSync(path.join(outDir, `${EFFECT_ID}.html`), html);

const sha = (rel) =>
  crypto.createHash('sha256').update(fs.readFileSync(path.join(root, rel))).digest('hex');
const size = (rel) => fs.statSync(path.join(root, rel)).size;

console.log(
  JSON.stringify(
    {
      js: {
        bytes: size(`public/effects/${EFFECT_ID}.js`),
        sha256: sha(`public/effects/${EFFECT_ID}.js`),
      },
      html: {
        bytes: size(`public/effects/${EFFECT_ID}.html`),
        sha256: sha(`public/effects/${EFFECT_ID}.html`),
      },
      checks: {
        printsFrom: scriptBody.includes('PRINTS FROM'),
        riso: scriptBody.includes("FIELD = 'riso'"),
        axis0: scriptBody.includes('axis: 0,'),
        oldstyle: scriptBody.includes('Iowan Old Style'),
        noGrainient: !scriptBody.includes('NEW GRAINIENT'),
      },
    },
    null,
    2,
  ),
);
