/* Convert verified Energy Orb / GlobeCollection sources into runtime JS. */
const fs = require('fs');
const path = require('path');
const babel = require('@babel/core');

const ROOT = path.resolve(__dirname, '..');
const DIR = path.join(ROOT, 'src/templates/background/globe');
const SRC = path.join(DIR, 'sources');

function transpile(inputPath, outputPath, rewrite) {
  let code = fs.readFileSync(inputPath, 'utf8');
  if (rewrite) code = rewrite(code);
  const result = babel.transformSync(code, {
    filename: inputPath,
    babelrc: false,
    configFile: false,
    presets: [
      [
        require.resolve('@babel/preset-typescript'),
        {
          isTSX: /\.tsx(\.txt)?$/.test(inputPath),
          allExtensions: true,
        },
      ],
    ],
  });
  if (!result || !result.code) throw new Error(`Failed to transpile ${inputPath}`);
  fs.writeFileSync(outputPath, `${result.code}\n`);
  console.log(path.basename(outputPath), 'bytes', Buffer.byteLength(result.code, 'utf8'));
}

fs.copyFileSync(path.join(SRC, 'energyOrbShaders.ts.txt'), path.join(DIR, 'energyOrbShaders.js'));
console.log('energyOrbShaders.js copied byte-identical');

transpile(path.join(SRC, 'EnergyOrb.tsx.txt'), path.join(DIR, 'EnergyOrb.jsx'), (code) =>
  code.replace('./energyOrbShaders', './energyOrbShaders'),
);

transpile(path.join(SRC, 'GlobeCollection.tsx.txt'), path.join(DIR, 'GlobeCollection.jsx'), (code) =>
  code
    .replace(/import type \{ EnergyOrbProps \} from "\.\.\/energy-orb\/EnergyOrb";\r?\n/, '')
    .replace(
      'import networkGlobeSource from "./sources/network-globe.html?raw";\nimport tangledConstellationsSource from "./sources/tangled-constellations.html?raw";',
      'import { networkGlobeSource, tangledConstellationsSource } from "./globeHtmlSources";',
    )
    .replace(
      'import("../energy-orb/EnergyOrb").then((module) => ({ default: module.EnergyOrb }))',
      'import("./EnergyOrb").then((module) => ({ default: module.EnergyOrb }))',
    ),
);

const network = fs.readFileSync(path.join(SRC, 'network-globe.html'), 'utf8');
const tangled = fs.readFileSync(path.join(SRC, 'tangled-constellations.html'), 'utf8');
const htmlModule = `/* Generated from verified globe HTML sources — do not hand-edit. */
export const tangledConstellationsSource = ${JSON.stringify(tangled)};
export const networkGlobeSource = ${JSON.stringify(network)};
`;
fs.writeFileSync(path.join(DIR, 'globeHtmlSources.js'), htmlModule);
console.log('globeHtmlSources.js bytes', Buffer.byteLength(htmlModule, 'utf8'));
