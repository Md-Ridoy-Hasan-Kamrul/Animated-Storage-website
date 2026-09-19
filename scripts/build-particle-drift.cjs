/* Build CSP-safe focused Particle Drift document (dark defaults). */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const SRC = path.join(
  ROOT,
  'src/templates/background/particle-drift-constellation-field/sources',
);
const OUT = path.join(ROOT, 'public/effects/particle-drift.html');

const provenance = fs.readFileSync(path.join(SRC, 'particle-drift.html'), 'utf8');

function scaleCount(base, density, minimum = 1) {
  return Math.max(minimum, Math.round(base * density));
}

const size = 1;
const length = 1;
const density = 1;
const mode = 'dark';
const speed = 1;
const opacity = 1;
const background = '#030509';
const link = Math.round(120 * length);
const proximityAlpha = mode === 'light' ? 0.22 : 0.15;

let patched = provenance
  .replace('Array.from({ length: 90 })', `Array.from({ length: ${scaleCount(90, density, 12)} })`)
  .replace('Array.from({ length: 25 })', `Array.from({ length: ${scaleCount(25, density, 4)} })`)
  .replace(
    'length: Math.random() * 100 + 50,',
    `length: (Math.random() * 100 + 50) * ${length},`,
  )
  .replace(
    'n.y += n.vy; // Slow drift',
    'n.y += n.vy * ((window.__SF_CONTROLS&&window.__SF_CONTROLS.speed)||1); // Slow drift',
  )
  .replace(
    'b.y -= b.speed;',
    'b.y -= b.speed * ((window.__SF_CONTROLS&&window.__SF_CONTROLS.speed)||1);',
  )
  .replace('if(d < 120) {', `if(d < ${link}) {`)
  .replace('0.15 * (1 - d/120)', `${proximityAlpha} * (1 - d/${link})`)
  .replace('ctx.lineWidth = 1.5;', `ctx.lineWidth = ${Number((1.5 * size).toFixed(2))};`);

if (mode === 'light') {
  patched = patched
    .replaceAll('rgba(96, 165, 250,', 'rgba(37, 99, 235,')
    .replaceAll('rgba(156, 163, 175,', 'rgba(36, 48, 68,')
    .replace(
      "ctx.fillStyle = dist < 180 ? '#60A5FA' : 'rgba(36, 48, 68, 0.4)';",
      "ctx.fillStyle = dist < 180 ? '#2563EB' : 'rgba(36, 48, 68, 0.55)';",
    );
}

const controlsJson = JSON.stringify({
  mode,
  speed,
  size,
  gap: 2,
  length,
  density,
  strokeWidth: 1,
  opacity,
}).replace(/</g, '\\u003c');

const targetJson = JSON.stringify([
  { selector: '#particle-canvas', role: 'background' },
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
if (!focused.includes('particle-canvas')) throw new Error('canvas missing');
if (!focused.includes('__SF_CONTROLS')) throw new Error('SF controls missing');

fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, focused);
const bytes = Buffer.byteLength(focused, 'utf8');
const sha = require('crypto').createHash('sha256').update(focused, 'utf8').digest('hex');
console.log('particle-drift.html bytes', bytes);
console.log('particle-drift.html sha256', sha);
