const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const root = path.resolve(__dirname, '..');
const srcHtml = path.join(
  root,
  'src/templates/3d-paper/original-3d-paper/sources/3d-paper-certificate.html',
);
const expectedSha =
  '0cb83da723e1a54f1a2e1124bc26a27d608afc3ba42ec0b116807e2e2ae5fb32';

const buf = fs.readFileSync(srcHtml);
const sha = crypto.createHash('sha256').update(buf).digest('hex');
if (sha !== expectedSha) {
  throw new Error(`Certificate HTML hash mismatch: ${sha}`);
}

const outSources = path.join(
  root,
  'src/templates/3d-paper/certificate-3d-paper/sources',
);
fs.mkdirSync(outSources, { recursive: true });

fs.copyFileSync(srcHtml, path.join(outSources, '3d-paper-certificate.html'));
fs.copyFileSync(
  path.join(root, 'src/templates/3d-paper/japanese-3d-paper/sources/threeui.css'),
  path.join(outSources, 'threeui.css'),
);
fs.copyFileSync(
  path.join(
    root,
    'src/templates/3d-paper/japanese-3d-paper/sources/ThreeDPaper.tsx.txt',
  ),
  path.join(outSources, 'ThreeDPaper.tsx.txt'),
);

const focused = path.join(root, 'public/effects/certificate-3d-paper.html');
fs.mkdirSync(path.dirname(focused), { recursive: true });
fs.copyFileSync(srcHtml, focused);

const focusedBuf = fs.readFileSync(focused);
console.log(
  JSON.stringify(
    {
      bytes: focusedBuf.length,
      sha256: crypto.createHash('sha256').update(focusedBuf).digest('hex'),
      title: focusedBuf.toString('utf8').includes('<title>3D Paper — Certificate</title>'),
    },
    null,
    2,
  ),
);
