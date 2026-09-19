/* Build CSP-safe focused Constellation Field document (dark defaults). */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const SRC = path.join(ROOT, 'src/templates/background/constellation-field/sources');
const OUT = path.join(ROOT, 'public/effects/constellation-field.html');

const provenance = fs.readFileSync(path.join(SRC, 'constellation-field.html'), 'utf8');

function clamp(value, minimum, maximum) {
  return Math.min(maximum, Math.max(minimum, value));
}

function scaleCount(base, density, minimum = 1) {
  return Math.max(minimum, Math.round(base * density));
}

const size = 1;
const length = 1;
const density = 1;
const strokeWidth = 1;
const mode = 'dark';
const speed = 1;
const opacity = 1;
const background = '#070914';

let patched = provenance
  .replace('const LINK = 160;', `const LINK = ${Math.round(160 * length)};`)
  .replace(
    'const MAX_NODES = window.innerWidth < 768 ? 40 : 85;',
    `const MAX_NODES = window.innerWidth < 768 ? ${scaleCount(40, density, 8)} : ${scaleCount(85, density, 12)};`,
  )
  .replace(
    'radius: Math.random() * 2.4 + 1.8',
    `radius: (Math.random() * 2.4 + 1.8) * ${size}`,
  )
  .replace('ctx.lineWidth = 1;', `ctx.lineWidth = ${Number(Math.max(0.25, strokeWidth).toFixed(2))};`)
  .replace(
    'node.x += node.vx;',
    'node.x += node.vx * ((window.__SF_CONTROLS&&window.__SF_CONTROLS.speed)||1);',
  )
  .replace(
    'node.y += node.vy;',
    'node.y += node.vy * ((window.__SF_CONTROLS&&window.__SF_CONTROLS.speed)||1);',
  );

const controlsJson = JSON.stringify({
  mode,
  speed,
  size,
  gap: 2,
  length,
  density,
  strokeWidth,
  opacity,
}).replace(/</g, '\\u003c');

const targetJson = JSON.stringify([
  { selector: '#constellationCanvas', role: 'background' },
]).replace(/</g, '\\u003c');

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

const focused = patched
  .replace(/<head([^>]*)>/i, `<head$1>${controlScript}${focusStyle}`)
  .replace(/<\/body>/i, `${focusScript}</body>`);

if (!focused.includes('data-threeui-focus')) throw new Error('focus missing');
if (!focused.includes('threeui-controls')) throw new Error('controls missing');
if (!focused.includes('constellationCanvas')) throw new Error('canvas missing');
if (!focused.includes('__SF_CONTROLS')) throw new Error('SF controls missing');

fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, focused);
console.log('constellation-field.html bytes', Buffer.byteLength(focused, 'utf8'));
