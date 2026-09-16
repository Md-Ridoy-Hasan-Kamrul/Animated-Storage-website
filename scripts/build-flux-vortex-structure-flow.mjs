import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const srcPath = path.join(root, 'scripts/flux-vortex-source.json');
const data = JSON.parse(fs.readFileSync(srcPath, 'utf8'));
const outDir = path.join(root, 'src/templates/background/flux-vortex-structure-flow/sources');
fs.mkdirSync(outDir, { recursive: true });

for (const file of data.files) {
  const hash = crypto.createHash('sha256').update(file.code).digest('hex');
  const ok = hash === file.sha256 && Buffer.byteLength(file.code, 'utf8') === file.bytes;
  console.log(file.path, 'bytes', Buffer.byteLength(file.code, 'utf8'), 'match', ok);
  if (!ok) throw new Error(`SHA/bytes mismatch for ${file.path}`);
}

const htmlFile = data.files.find((f) => f.path.endsWith('flux-vortex.html'));
const cssFile = data.files.find((f) => f.path.endsWith('threeui.css'));

if (!htmlFile?.code.includes('<html')) {
  throw new Error('Canonical HTML appears stripped of tags — aborting');
}

fs.writeFileSync(path.join(outDir, 'flux-vortex.html'), htmlFile.code);
fs.writeFileSync(path.join(outDir, 'threeui.css'), cssFile.code);

function scaleCount(base, density, minimum = 1) {
  return Math.max(minimum, Math.round(base * density));
}

const background = '#050505';
const size = 1;
const density = 1;
const speed = 1;
const opacity = 1;
const length = 1;
const gap = 2;
const strokeWidth = 1;
const mode = 'dark';

let patched = htmlFile.code
  .replace('const vortexCount = 9500;', `const vortexCount = ${scaleCount(9500, density, 1200)};`)
  .replace(
    'const particlesCount = 300;',
    `const particlesCount = ${scaleCount(300, density, 40)};`,
  )
  .replace(
    'size: 0.006, // Smaller dots requested',
    `size: ${Number((0.006 * size).toFixed(4))}, // Smaller dots requested`,
  )
  .replace('size: 0.008,', `size: ${Number((0.008 * size).toFixed(4))},`);

const targets = [{ selector: '#webgl-canvas', role: 'background' }];
const targetJson = JSON.stringify(targets).replace(/</g, '\\u003c');
const controlsJson = JSON.stringify({
  mode,
  speed,
  size,
  gap,
  length,
  density,
  strokeWidth,
  opacity,
}).replace(/</g, '\\u003c');

const focusStyle = `<style data-threeui-focus>
html, body { width: 100% !important; height: 100% !important; min-height: 0 !important; margin: 0 !important; padding: 0 !important; overflow: hidden !important; background: ${background} !important; }
body { position: relative !important; display: flex !important; align-items: center !important; justify-content: center !important; }
body > * { visibility: hidden !important; }
body[data-threeui-ready] > [data-threeui-role] { visibility: visible !important; }
[data-threeui-residual] { display: none !important; }
[data-threeui-role="background"] { position: fixed !important; inset: 0 !important; width: 100% !important; height: 100% !important; max-width: none !important; max-height: none !important; z-index: 0 !important; opacity: 1 !important; pointer-events: none !important; }
[data-threeui-role="ui"] { position: relative !important; z-index: 1 !important; width: min(calc(100% - 32px), var(--threeui-target-width, 1040px)) !important; max-width: none !important; max-height: calc(100% - 32px) !important; margin: auto !important; overflow: auto !important; opacity: 1 !important; transform: none !important; filter: none !important; flex: none !important; box-sizing: border-box !important; }
</style>`;

const controlScript = `<script data-threeui-controls>
(function () {
  var controls = ${controlsJson};
  window.__SF_CONTROLS = controls;
  var origin = performance.now();
  var virtual = 0;
  var last = origin;
  var performanceNow = performance.now.bind(performance);
  var dateNow = Date.now.bind(Date);
  var dateOrigin = dateNow();
  performance.now = function () {
    var real = performanceNow();
    virtual += (real - last) * (controls.speed || 1);
    last = real;
    return origin + virtual;
  };
  Date.now = function () {
    return dateOrigin + (performance.now() - origin);
  };
  var raf = window.requestAnimationFrame.bind(window);
  window.requestAnimationFrame = function (callback) {
    return raf(function () {
      callback(performance.now());
    });
  };
  function applyVisual() {
    var opacity = controls.opacity == null ? 1 : controls.opacity;
    var size = controls.size == null ? 1 : controls.size;
    Array.prototype.forEach.call(document.querySelectorAll('[data-threeui-role]'), function (element) {
      element.style.opacity = String(opacity);
      if (element.getAttribute('data-threeui-role') === 'ui') {
        element.style.transform = 'scale(' + size + ')';
        element.style.transformOrigin = 'center center';
      }
    });
  }
  window.addEventListener('message', function (event) {
    if (!event.data || event.data.type !== 'threeui-controls') return;
    var next = event.data.controls || {};
    Object.keys(next).forEach(function (key) { controls[key] = next[key]; });
    applyVisual();
  });
  window.__SF_APPLY_CONTROLS = applyVisual;
})();
</script>`;

const focusScript = `<script data-threeui-focus>
(function () {
  var isolated = false;
  function isolate() {
    if (isolated) return;
    var specs = ${targetJson};
    var roots = [];
    specs.forEach(function (spec) {
      var element = document.querySelector(spec.selector);
      if (!element) return;
      element.setAttribute('data-threeui-role', spec.role);
      if (spec.width) element.style.setProperty('--threeui-target-width', spec.width);
      if (!roots.some(function (root) { return root.contains(element); })) roots.push(element);
    });
    if (!roots.length) return;
    isolated = true;
    roots.forEach(function (root) { document.body.appendChild(root); });
    Array.from(document.body.children).forEach(function (element) {
      if (roots.indexOf(element) !== -1) return;
      element.setAttribute('data-threeui-residual', '');
      element.setAttribute('aria-hidden', 'true');
      if ('inert' in element) element.inert = true;
    });
    document.body.setAttribute('data-threeui-ready', '');
    if (window.__SF_APPLY_CONTROLS) window.__SF_APPLY_CONTROLS();
    requestAnimationFrame(function () { window.dispatchEvent(new Event('resize')); });
  }
  function scheduleIsolation() { setTimeout(isolate, 100); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', scheduleIsolation, { once: true });
  else scheduleIsolation();
  window.addEventListener('load', isolate, { once: true });
})();
</script>`;

let focused = patched.replace(/<\/head>/i, `${focusStyle}</head>`);
focused = focused.replace(/<\/body>/i, `${controlScript}${focusScript}</body>`);

const focusedPath = path.join(root, 'public/effects/flux-vortex-structure-flow.html');
fs.mkdirSync(path.dirname(focusedPath), { recursive: true });
fs.writeFileSync(focusedPath, focused);

const htmlBuf = fs.readFileSync(path.join(outDir, 'flux-vortex.html'));
const cssBuf = fs.readFileSync(path.join(outDir, 'threeui.css'));
const focusedBuf = fs.readFileSync(focusedPath);

console.log(
  JSON.stringify(
    {
      fluxBytes: htmlBuf.length,
      fluxSha: crypto.createHash('sha256').update(htmlBuf).digest('hex'),
      cssBytes: cssBuf.length,
      cssSha: crypto.createHash('sha256').update(cssBuf).digest('hex'),
      focusedBytes: focusedBuf.length,
      focusedSha: crypto.createHash('sha256').update(focusedBuf).digest('hex'),
      hasControls: focused.includes('data-threeui-controls'),
      vortex9500: focused.includes('const vortexCount = 9500;'),
    },
    null,
    2,
  ),
);
