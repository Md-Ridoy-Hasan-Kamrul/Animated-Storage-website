/* Build CSP-safe focused Gradient Pill Button (NeuformIsolatedEffects) document. */
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const ROOT = path.resolve(__dirname, '..');
const SRC = path.join(ROOT, 'src/templates/button/gradient-pill-button-rectangle-buttons/sources');
const OUT = path.join(ROOT, 'public/effects/gradient-pill-button.html');

const provenance = fs.readFileSync(path.join(SRC, 'gradient-pill-button.html'), 'utf8');

/** Mirrors NeuformIsolatedEffects.transformGradientPillButtonSource for mode=dark. */
function transformGradientPillButtonSource(source, mode) {
  if (mode !== 'dark') return source;
  return source
    .replace('from-black/10 via-black/20 to-black/10', 'from-white/[0.16] via-white/[0.07] to-white/[0.16]')
    .replace('text-black/60', 'text-white/70')
    .replace('text-slate-600', 'text-slate-200')
    .replace('stroke="#666"', 'stroke="#e5e7eb"')
    .replace('hover:bg-slate-50', 'hover:bg-white/10');
}

const mode = 'dark';
const background = '#111318';
const transformed = transformGradientPillButtonSource(provenance, mode);

const targetJson = JSON.stringify([
  { selector: '.component-wrapper button', role: 'button', preserveTransform: true },
]).replace(/</g, '\\u003c');
const hiddenTargetJson = JSON.stringify([]).replace(/</g, '\\u003c');
const introWordmarkJson = JSON.stringify(null).replace(/</g, '\\u003c');
const modeJson = JSON.stringify(mode);

const focusStyle = `<style data-threeui-focus>
html, body { width: 100% !important; height: 100% !important; min-height: 0 !important; margin: 0 !important; padding: 0 !important; overflow: hidden !important; background: ${background} !important; color-scheme: ${mode} !important; }
body { position: relative !important; display: flex !important; align-items: center !important; justify-content: center !important; }
body > * { visibility: hidden !important; }
body[data-threeui-ready] > [data-threeui-role] { visibility: visible !important; }
[data-threeui-residual] { display: none !important; }
[data-threeui-hidden] { display: none !important; }
[data-threeui-role="background"] { position: fixed !important; inset: 0 !important; width: 100% !important; height: 100% !important; max-width: none !important; max-height: none !important; z-index: 0 !important; opacity: 1 !important; pointer-events: none !important; }
[data-threeui-role="button"] { position: relative !important; z-index: 2 !important; opacity: 1 !important; flex: none !important; }
[data-threeui-role="button"]:not([data-threeui-preserve-transform]) { transform: none !important; }
[data-threeui-role="visual"] { position: relative !important; z-index: 1 !important; width: min(100%, 1040px) !important; max-width: 1040px !important; max-height: 100% !important; margin: auto !important; padding: 24px !important; overflow: auto !important; opacity: 1 !important; filter: none !important; }
[data-threeui-role="visual"]:not([data-threeui-preserve-transform]) { transform: none !important; }
</style>`;

const focusScript = `<script data-threeui-focus>
(function () {
  document.documentElement.dataset.sfMode = ${modeJson};
  var isolated = false;
  function isolate() {
    if (isolated) return;
    var specs = ${targetJson};
    var hiddenSelectors = ${hiddenTargetJson};
    var introWordmark = ${introWordmarkJson};
    var roots = [];
    hiddenSelectors.forEach(function (selector) {
      document.querySelectorAll(selector).forEach(function (element) {
        element.setAttribute('data-threeui-hidden', '');
        element.setAttribute('aria-hidden', 'true');
        if ('inert' in element) element.inert = true;
      });
    });
    specs.forEach(function (spec) {
      var element = document.querySelector(spec.selector);
      if (!element) return;
      element.setAttribute('data-threeui-role', spec.role);
      if (spec.fit) element.setAttribute('data-threeui-fit', spec.fit);
      if (spec.preserveTransform) element.setAttribute('data-threeui-preserve-transform', '');
      if (!roots.some(function (root) { return root.contains(element); })) roots.push(element);
    });
    if (introWordmark) {
      return;
    }
    if (!roots.length) return;
    isolated = true;
    roots.forEach(function (root) {
      var placeholderLink = root.matches('a[href="#"]') ? root : root.querySelector('a[href="#"]');
      if (placeholderLink) placeholderLink.addEventListener('click', function (event) { event.preventDefault(); });
      document.body.appendChild(root);
    });
    Array.from(document.body.children).forEach(function (element) {
      if (roots.indexOf(element) !== -1) return;
      element.setAttribute('data-threeui-residual', '');
      element.setAttribute('aria-hidden', 'true');
      if ('inert' in element) element.inert = true;
    });
    document.body.setAttribute('data-threeui-ready', '');
    requestAnimationFrame(function () { window.dispatchEvent(new Event('resize')); });
  }
  function scheduleIsolation() { setTimeout(isolate, 100); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', scheduleIsolation, { once: true });
  else scheduleIsolation();
  window.addEventListener('load', isolate, { once: true });
})();
</script>`;

const focused = transformed
  .replace(/<\/head>/i, `${focusStyle}</head>`)
  .replace(/<\/body>/i, `${focusScript}</body>`);

if (!focused.includes('data-threeui-focus')) throw new Error('focus missing');
if (!focused.includes('Demo Lesson')) throw new Error('gradient pill label missing');
if (!focused.includes('from-white/[0.16]')) throw new Error('dark fill transform missing');
if (!focused.includes('--border-gradient')) throw new Error('border gradient missing');
if (!focused.includes('preserveTransform')) throw new Error('preserveTransform missing');

fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, focused);
const bytes = Buffer.byteLength(focused, 'utf8');
const sha = crypto.createHash('sha256').update(focused, 'utf8').digest('hex');
console.log('gradient-pill-button.html bytes', bytes);
console.log('gradient-pill-button.html sha256', sha);
