const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const root = path.resolve(__dirname, '..');
const expectedSha =
  '5fe2554e578acac5d55cb466a9564440e7767e38797981f8e829dfd2de0bc90f';
const srcHtml = path.join(
  root,
  'src/templates/hero/ashen-press/sources/ashen-press.html',
);

const buf = fs.readFileSync(srcHtml);
const sha = crypto.createHash('sha256').update(buf).digest('hex');
if (sha !== expectedSha) {
  throw new Error(`Ashen Press HTML hash mismatch: ${sha}`);
}

const focused = path.join(root, 'public/effects/ashen-press.html');
fs.mkdirSync(path.dirname(focused), { recursive: true });
fs.copyFileSync(srcHtml, focused);

const focusedBuf = fs.readFileSync(focused);
console.log(
  JSON.stringify(
    {
      bytes: focusedBuf.length,
      sha256: crypto.createHash('sha256').update(focusedBuf).digest('hex'),
      title: focusedBuf.toString('utf8').includes('<title>Ashen Press — The Art Book Shelf</title>'),
    },
    null,
    2,
  ),
);
