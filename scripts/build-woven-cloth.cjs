const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const root = path.resolve(__dirname, '..');
const canonicalPath = path.join(
  root,
  'src/templates/3d-website/woven-cloth/sources/lumina-weavers-cloth.html',
);
const expectedCanonical =
  '9bfd56ef7579a92cb6385b3e93866bc3ff54fa4489a0febb9809b720e2946fb6';

const canonical = fs.readFileSync(canonicalPath, 'utf8');
const canonicalSha = crypto.createHash('sha256').update(canonical, 'utf8').digest('hex');
if (canonicalSha !== expectedCanonical) {
  throw new Error(`Canonical Woven Cloth hash mismatch: ${canonicalSha}`);
}

function replaceRequired(source, authored, focused) {
  if (!source.includes(authored)) {
    throw new Error(`Woven Cloth adapter could not find: ${authored}`);
  }
  return source.replace(authored, focused);
}

function wovenClothLabelSource(source) {
  return [
    ["x.fillText('L W', W/2, 190);", "x.fillText('W C', W/2, 190);"],
    ["x.fillText('· KYOTO ·', W/2, 246);", "x.fillText('· WOVEN CLOTH ·', W/2, 246);"],
    ["x.fillText('LUMINA', W/2, 400);", "x.fillText('WOVEN', W/2, 400);"],
    ["x.fillText('WEAVERS', W/2, 520);", "x.fillText('CLOTH', W/2, 520);"],
    [
      "x.fillText('K I N E T I C   T E X T I L E S   ·   2 0 2 4', W/2, 626);",
      "x.fillText('T E X T I L E   S I M U L A T I O N', W/2, 626);",
    ],
  ].reduce(
    (adapted, [authored, focused]) => replaceRequired(adapted, authored, focused),
    source,
  );
}

const background = '#16090b';
const targetJson = JSON.stringify([
  {
    selector: 'body > div.fixed.inset-0.overflow-hidden.z-0',
    role: 'background',
  },
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
    requestAnimationFrame(function () { window.dispatchEvent(new Event('resize')); });
  }
  function scheduleIsolation() { setTimeout(isolate, 100); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', scheduleIsolation, { once: true });
  else scheduleIsolation();
  window.addEventListener('load', isolate, { once: true });
})();
</script>`;

const labeled = wovenClothLabelSource(canonical);
const focused = labeled
  .replace(/<\/head>/i, `${focusStyle}</head>`)
  .replace(/<\/body>/i, `${focusScript}</body>`);

const outPath = path.join(root, 'public/effects/woven-cloth.html');
fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, focused, 'utf8');

const focusedBuf = fs.readFileSync(outPath);
console.log(
  JSON.stringify(
    {
      canonicalSha,
      focusedBytes: focusedBuf.length,
      focusedSha: crypto.createHash('sha256').update(focusedBuf).digest('hex'),
      hasWoven: focused.includes("x.fillText('WOVEN'"),
      hasCloth: focused.includes("x.fillText('CLOTH'"),
      hasFocus: focused.includes('data-threeui-focus'),
    },
    null,
    2,
  ),
);
