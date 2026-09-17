/* Convert verified CRT TypeScript sources into runtime JS modules via Babel. */
const fs = require('fs');
const path = require('path');
const babel = require('@babel/core');

const ROOT = path.resolve(__dirname, '..');
const DIR = path.join(ROOT, 'src/templates/background/terminal-crt');
const SRC = path.join(DIR, 'sources');

function transpile(inputPath, outputPath) {
  const code = fs.readFileSync(inputPath, 'utf8');
  const result = babel.transformSync(code, {
    filename: inputPath,
    babelrc: false,
    configFile: false,
    presets: [
      [
        require.resolve('@babel/preset-typescript'),
        { isTSX: inputPath.endsWith('.tsx') || inputPath.endsWith('.tsx.txt'), allExtensions: true },
      ],
    ],
    plugins: [],
  });
  if (!result || !result.code) throw new Error(`Failed to transpile ${inputPath}`);
  fs.writeFileSync(outputPath, `${result.code}\n`);
  console.log(path.basename(outputPath), 'bytes', Buffer.byteLength(result.code, 'utf8'));
}

try {
  require.resolve('@babel/preset-typescript');
} catch {
  console.error('Missing @babel/preset-typescript — install it or use another stripper.');
  process.exit(1);
}

fs.copyFileSync(path.join(SRC, 'crtShaders.ts.txt'), path.join(DIR, 'crtShaders.js'));
console.log('crtShaders.js copied byte-identical');

transpile(path.join(SRC, 'crtScreens.ts.txt'), path.join(DIR, 'crtScreens.js'));
transpile(path.join(SRC, 'crtRenderer.ts.txt'), path.join(DIR, 'crtRenderer.js'));
