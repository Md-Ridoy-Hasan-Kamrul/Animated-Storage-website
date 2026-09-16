const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const root = path.resolve(__dirname, '..');
const data = JSON.parse(
  fs.readFileSync(path.join(root, 'scripts/japanese-tower-source.json'), 'utf8'),
);

const outDir = path.join(
  root,
  'src/templates/background/japanese-tower-landscape/sources',
);
fs.mkdirSync(outDir, { recursive: true });

const expected = {
  'src/shaders/japanese-tower/JapaneseTowerLandscape.tsx':
    '3ad3de77dabdcf9f2e0d3e7bb1347089249eef68e2b8db9ce98c3acc0920e411',
  'src/shaders/japanese-tower/Towers.html':
    '7810e7163c027f654235032fb1eed48846b68bf80f5b1c1c4292e01694b71f3d',
  'src/shaders/threeui.css':
    'efe4447139f1358dd8e9be68edf6fa46cbefbd1de423a4d6c439ca61d2c8eccf',
};

for (const file of data.files) {
  const hash = crypto.createHash('sha256').update(file.code).digest('hex');
  const ok = hash === file.sha256 && Buffer.byteLength(file.code, 'utf8') === file.bytes;
  console.log(file.path, 'bytes', Buffer.byteLength(file.code, 'utf8'), 'match', ok);
  if (!ok) throw new Error('SHA/bytes mismatch for ' + file.path);
  if (expected[file.path] && hash !== expected[file.path]) {
    throw new Error('Unexpected hash for ' + file.path);
  }
}

const htmlFile = data.files.find((f) => f.path.endsWith('Towers.html'));
const cssFile = data.files.find((f) => f.path.endsWith('threeui.css'));
const tsxFile = data.files.find((f) => f.path.endsWith('JapaneseTowerLandscape.tsx'));

if (!htmlFile.code.toLowerCase().includes('<!doctype html>')) {
  throw new Error('Canonical HTML appears stripped of tags — aborting');
}

fs.writeFileSync(path.join(outDir, 'Towers.html'), htmlFile.code);
fs.writeFileSync(path.join(outDir, 'threeui.css'), cssFile.code);
fs.writeFileSync(path.join(outDir, 'JapaneseTowerLandscape.tsx.txt'), tsxFile.code);

const countryBoot = [
  '<script data-threeui-country>',
  '(function () {',
  "  var order = ['japan', 'china', 'vietnam', 'thailand', 'cambodia', 'turkey'];",
  '  function applyCountry() {',
  "    if (typeof window.__style !== 'function') return false;",
  "    var raw = new URLSearchParams(window.location.search).get('country');",
  '    if (!raw) return true;',
  '    var index = order.indexOf(String(raw).toLowerCase());',
  '    if (index >= 0) window.__style(index);',
  '    return true;',
  '  }',
  '  function retry() {',
  '    if (applyCountry()) return;',
  '    setTimeout(retry, 40);',
  '  }',
  "  if (document.readyState === 'loading') {",
  "    document.addEventListener('DOMContentLoaded', retry, { once: true });",
  '  } else {',
  '    retry();',
  '  }',
  "  window.addEventListener('load', applyCountry, { once: true });",
  '})();',
  '</script>',
].join('\n');

if (!/<\/body>/i.test(htmlFile.code)) {
  throw new Error('Towers.html missing </body>');
}

const focused = htmlFile.code.replace(/<\/body>/i, countryBoot + '</body>');
const focusedPath = path.join(root, 'public/effects/japanese-tower-landscape.html');
fs.mkdirSync(path.dirname(focusedPath), { recursive: true });
fs.writeFileSync(focusedPath, focused);

const htmlBuf = fs.readFileSync(path.join(outDir, 'Towers.html'));
const cssBuf = fs.readFileSync(path.join(outDir, 'threeui.css'));
const focusedBuf = fs.readFileSync(focusedPath);

console.log(
  JSON.stringify(
    {
      towersBytes: htmlBuf.length,
      towersSha: crypto.createHash('sha256').update(htmlBuf).digest('hex'),
      cssBytes: cssBuf.length,
      cssSha: crypto.createHash('sha256').update(cssBuf).digest('hex'),
      focusedBytes: focusedBuf.length,
      focusedSha: crypto.createHash('sha256').update(focusedBuf).digest('hex'),
      hasCountryBoot: focused.includes('data-threeui-country'),
      hasStage: focused.includes('id="stage"'),
      hasWindowStyle: focused.includes('window.__style'),
    },
    null,
    2,
  ),
);
