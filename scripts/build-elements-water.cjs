/* Build focused Elemental Water document + transpile ElementsBackground for CSP-safe iframe. */
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const babel = require('@babel/core');

const ROOT = path.resolve(__dirname, '..');
const DIR = path.join(ROOT, 'src/templates/background/elements');
const SRC = path.join(DIR, 'sources');

const elementalMarksSource = fs.readFileSync(path.join(SRC, 'elemental-marks.html'), 'utf8');
fs.writeFileSync(
  path.join(DIR, 'elementalMarksSource.js'),
  `/* Generated from verified elemental-marks.html — do not hand-edit. */\nexport default ${JSON.stringify(elementalMarksSource)};\n`,
);
fs.writeFileSync(path.join(ROOT, 'public/effects/elemental-marks.html'), elementalMarksSource);

const tsx = fs.readFileSync(path.join(SRC, 'ElementsBackground.tsx.txt'), 'utf8');

const helperStart = tsx.indexOf('const ELEMENT_VARIANTS');
const helperEnd = tsx.indexOf('export function ElementsBackground');
if (helperStart < 0 || helperEnd < 0) throw new Error('Unable to locate builder helpers');
const helperTs = `${tsx.slice(helperStart, helperEnd)}
module.exports = { buildFocusedDocument, ELEMENT_VARIANTS, ELEMENTS_DEFAULTS, applyDetailPatches };
`;
const helperJs = babel.transformSync(helperTs, {
  filename: 'elements-helpers.ts',
  babelrc: false,
  configFile: false,
  presets: [
    [require.resolve('@babel/preset-env'), { modules: 'commonjs' }],
    [require.resolve('@babel/preset-typescript'), { allExtensions: true }],
  ],
}).code;

const helperWithSource = `var elementalMarksSource = ${JSON.stringify(elementalMarksSource)};\n${helperJs}`;
const box = { module: { exports: {} }, exports: {}, console };
vm.runInNewContext(helperWithSource, box);
const { buildFocusedDocument } = box.module.exports;
if (typeof buildFocusedDocument !== 'function') {
  throw new Error(`buildFocusedDocument missing: ${Object.keys(box.module.exports)}`);
}

const focused = buildFocusedDocument('water', 1, 1);
const publicFocused = path.join(ROOT, 'public/effects/elemental-water.html');
fs.writeFileSync(publicFocused, focused);
console.log('elemental-water.html bytes', Buffer.byteLength(focused, 'utf8'));
if (!focused.includes('data-fx="water"')) throw new Error('water panel missing');
if (!focused.includes('zoom: 1.5600')) throw new Error(`zoom patch failed: ${focused.match(/zoom: [0-9.]+/)}`);
if (!focused.includes('elements-controls')) throw new Error('controls script missing');
if (!focused.includes('data-elements-focus')) throw new Error('focus styles missing');
console.log('focused water document OK');

// Runtime host (`ElementsBackground.jsx`) is maintained separately for CSP-safe `src=`
console.log('host JSX left intact (lean CSP iframe adapter)');
