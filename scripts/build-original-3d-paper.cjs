const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const root = path.resolve(__dirname, '..');
const data = JSON.parse(
  fs.readFileSync(path.join(root, 'scripts/3d-paper-source.json'), 'utf8'),
);

const outDir = path.join(
  root,
  'src/templates/3d-paper/original-3d-paper/sources',
);
fs.mkdirSync(outDir, { recursive: true });

const expected = {
  'src/shaders/3d-paper/sources/3d-paper.html':
    '8ec1b71c0dbcafbadf908100ae2a08045d0a1087c00a09d28245ef19366c7353',
  'src/shaders/3d-paper/sources/3d-paper-site-of-the-year.html':
    'fdef93fa96a3927430ef35411af70568c56b9488921aead8f36be36800689b7d',
  'src/shaders/3d-paper/sources/3d-paper-japanese.html':
    '4e929b9c3feaa635c6bc45e5c556243395318d4d7feb4d6a85190768b3b9f738',
  'src/shaders/3d-paper/sources/3d-paper-certificate.html':
    '0cb83da723e1a54f1a2e1124bc26a27d608afc3ba42ec0b116807e2e2ae5fb32',
  'src/shaders/3d-paper/ThreeDPaper.tsx':
    'c2c8d1e9a0baf69c9e477e270ccde0254d6270918c106b62dffb5c7931223b20',
  'src/shaders/threeui.css':
    'efe4447139f1358dd8e9be68edf6fa46cbefbd1de423a4d6c439ca61d2c8eccf',
};

const writeMap = {
  'src/shaders/3d-paper/sources/3d-paper.html': '3d-paper.html',
  'src/shaders/3d-paper/sources/3d-paper-site-of-the-year.html':
    '3d-paper-site-of-the-year.html',
  'src/shaders/3d-paper/sources/3d-paper-japanese.html': '3d-paper-japanese.html',
  'src/shaders/3d-paper/sources/3d-paper-certificate.html':
    '3d-paper-certificate.html',
  'src/shaders/3d-paper/ThreeDPaper.tsx': 'ThreeDPaper.tsx.txt',
  'src/shaders/threeui.css': 'threeui.css',
};

for (const file of data.files) {
  const hash = crypto.createHash('sha256').update(file.code).digest('hex');
  const ok =
    hash === file.sha256 && Buffer.byteLength(file.code, 'utf8') === file.bytes;
  console.log(file.path, 'bytes', Buffer.byteLength(file.code, 'utf8'), 'match', ok);
  if (!ok) throw new Error('SHA/bytes mismatch for ' + file.path);
  if (expected[file.path] && hash !== expected[file.path]) {
    throw new Error('Unexpected hash for ' + file.path);
  }
  const name = writeMap[file.path];
  if (!name) throw new Error('No write mapping for ' + file.path);
  fs.writeFileSync(path.join(outDir, name), file.code);
}

const htmlFile = data.files.find((f) =>
  f.path.endsWith('sources/3d-paper.html'),
);
if (!htmlFile) throw new Error('Missing original 3d-paper.html');

const focusedPath = path.join(root, 'public/effects/original-3d-paper.html');
fs.mkdirSync(path.dirname(focusedPath), { recursive: true });
fs.writeFileSync(focusedPath, htmlFile.code);

const focusedBuf = fs.readFileSync(focusedPath);
console.log(
  JSON.stringify(
    {
      focusedBytes: focusedBuf.length,
      focusedSha: crypto.createHash('sha256').update(focusedBuf).digest('hex'),
      hasTitle: focusedBuf.toString('utf8').includes('<title>3D Paper</title>'),
      hasGl: focusedBuf.toString('utf8').includes('id="gl"'),
    },
    null,
    2,
  ),
);
