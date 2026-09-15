import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import galleryHeadingSource from '../src/effects/gallery-heading/galleryHeadingSource.js';
import {
  transformGalleryHeadingSource,
  GALLERY_HEADING_VARIANTS,
} from '../src/effects/gallery-heading/transformGalleryHeadingSource.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const outDir = path.join(root, 'public', 'effects');
fs.mkdirSync(outDir, { recursive: true });

const config = {
  ...GALLERY_HEADING_VARIANTS['rising-diagonal'],
  title: 'Coming Soon',
  headline: ['COMING', 'SOON'],
  headlineWidths: [1370, 1100],
};

const html = transformGalleryHeadingSource(galleryHeadingSource, 'dark', config);
const match = html.match(/<script>([\s\S]*)<\/script>/);
if (!match) throw new Error('No script block in transformed gallery-heading HTML');

const js = match[1];
const jsName = 'gallery-heading-coming-soon.js';
const htmlOut = html.replace(
  /<script>[\s\S]*<\/script>/,
  `<script src="/effects/${jsName}"></script>`,
);

fs.writeFileSync(path.join(outDir, jsName), js, 'utf8');
fs.writeFileSync(path.join(outDir, 'gallery-heading-coming-soon.html'), htmlOut, 'utf8');
console.log('wrote html+js', htmlOut.length, js.length);
