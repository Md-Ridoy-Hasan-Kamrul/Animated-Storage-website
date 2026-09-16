import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const srcPath = path.join(root, 'scripts/ember-storm-source.json');
const data = JSON.parse(fs.readFileSync(srcPath, 'utf8'));
const outDir = path.join(root, 'src/templates/background/ember-storm-structure-flow/sources');
fs.mkdirSync(outDir, { recursive: true });

for (const file of data.files) {
  const hash = crypto.createHash('sha256').update(file.code).digest('hex');
  const ok = hash === file.sha256 && Buffer.byteLength(file.code, 'utf8') === file.bytes;
  console.log(file.path, 'bytes', Buffer.byteLength(file.code, 'utf8'), 'match', ok);
  if (!ok) {
    throw new Error(`SHA/bytes mismatch for ${file.path}`);
  }
}

const htmlFile = data.files.find((f) => f.path.endsWith('aeonix-ember-storm.html'));
const cssFile = data.files.find((f) => f.path.endsWith('threeui.css'));

if (!htmlFile?.code.includes('<!DOCTYPE html>') && !htmlFile?.code.includes('<html')) {
  throw new Error('Canonical HTML appears stripped of tags — aborting');
}

fs.writeFileSync(path.join(outDir, 'aeonix-ember-storm.html'), htmlFile.code);
fs.writeFileSync(path.join(outDir, 'threeui.css'), cssFile.code);

const background = '#080503';
const targets = [{ selector: '#gl', role: 'background' }];
const targetJson = JSON.stringify(targets).replace(/</g, '\\u003c');

const focusStyle = `
<style data-threeui-focus>
html, body { width: 100% !important; height: 100% !important; min-height: 0 !important; margin: 0 !important; padding: 0 !important; overflow: hidden !important; background: ${background} !important; }
body { position: relative !important; display: flex !important; align-items: center !important; justify-content: center !important; }
body > * { visibility: hidden !important; }
body[data-threeui-ready] > [data-threeui-role] { visibility: visible !important; }
[data-threeui-residual] { display: none !important; }
[data-threeui-role="background"] { position: fixed !important; inset: 0 !important; width: 100% !important; height: 100% !important; max-width: none !important; max-height: none !important; z-index: 0 !important; opacity: 1 !important; pointer-events: none !important; }
[data-threeui-role="ui"] { position: relative !important; z-index: 1 !important; width: min(calc(100% - 32px), var(--threeui-target-width, 1040px)) !important; max-width: none !important; max-height: calc(100% - 32px) !important; margin: auto !important; overflow: auto !important; opacity: 1 !important; transform: none !important; filter: none !important; flex: none !important; box-sizing: border-box !important; }
</style>
`;

const focusScript = `
<script data-threeui-focus>
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
    requestAnimationFrame(function () { window.dispatchEvent(new Event('resize')); });
  }
  function scheduleIsolation() { setTimeout(isolate, 100); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', scheduleIsolation, { once: true });
  else scheduleIsolation();
  window.addEventListener('load', isolate, { once: true });
})();
</script>
`;

let focused = htmlFile.code;
if (!/<\/head>/i.test(focused)) {
  throw new Error('Canonical HTML missing </head>');
}
if (!/<\/body>/i.test(focused)) {
  throw new Error('Canonical HTML missing </body>');
}
focused = focused.replace(/<\/head>/i, `${focusStyle}</head>`);
focused = focused.replace(/<\/body>/i, `${focusScript}</body>`);

const effectsDir = path.join(root, 'public/effects');
fs.mkdirSync(effectsDir, { recursive: true });
const focusedPath = path.join(effectsDir, 'ember-storm-structure-flow.html');
fs.writeFileSync(focusedPath, focused);

const htmlBuf = fs.readFileSync(path.join(outDir, 'aeonix-ember-storm.html'));
const cssBuf = fs.readFileSync(path.join(outDir, 'threeui.css'));
const focusedBuf = fs.readFileSync(focusedPath);

console.log(
  JSON.stringify(
    {
      emberBytes: htmlBuf.length,
      emberSha: crypto.createHash('sha256').update(htmlBuf).digest('hex'),
      cssBytes: cssBuf.length,
      cssSha: crypto.createHash('sha256').update(cssBuf).digest('hex'),
      focusedBytes: focusedBuf.length,
      focusedSha: crypto.createHash('sha256').update(focusedBuf).digest('hex'),
      hasGl: focused.includes('id="gl"'),
      hasThree: focused.includes('three.js'),
      hasFocus: focused.includes('data-threeui-focus'),
      hasCount: focused.includes('12000'),
    },
    null,
    2,
  ),
);
