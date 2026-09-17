const fs = require('fs');
const path = require('path');
const babel = require('@babel/core');

const file = path.resolve(
  __dirname,
  '../src/templates/sections/warp-field-default/warpFieldRenderer.js',
);
const provenance = path.resolve(
  __dirname,
  '../src/templates/sections/warp-field-default/sources/warpFieldRenderer.ts.txt',
);

let source = fs.readFileSync(provenance, 'utf8');

const stripParamTypes = (params) =>
  params.replace(/: [^,)=]+/g, '');

source = source
  .replace(/^export type .*$/gm, '')
  .replace(/^type [^=\n]+=[^\n]+$/gm, '')
  .replace(/ as const/g, '')
  .replace(/, type WarpFieldOptions /g, ' ')
  .replace(/ type WarpFieldOptions,/g, '')
  .replace(/ as unknown as \{[^}]+\}/g, '')
  .replace(/ as THREE\.[A-Za-z0-9_]+/g, '')
  .replace(/(const|let|var) ([A-Za-z0-9_]+): [^=\n]+ =/g, '$1 $2 =')
  .replace(/function ([A-Za-z0-9_]+)\(([^)]*)\)(?:: [^{]+)? \{/g, (_, name, params) => {
    return `function ${name}(${stripParamTypes(params)}) {`;
  })
  .replace(/export function ([A-Za-z0-9_]+)\(([^)]*)\)(?:: [^{]+)? \{/g, (_, name, params) => {
    return `export function ${name}(${stripParamTypes(params)}) {`;
  })
  .replace(
    /(update|setOpacity|resize|dispose|render)\(([^)]*)\)(?:: [^{]+)? \{/g,
    (_, name, params) => `${name}(${stripParamTypes(params)}) {`,
  )
  .replace(/: Record<[^>]+>/g, '')
  .replace(/: \(\) => [A-Za-z0-9_]+/g, '')
  .replace(/: WarpFieldOptions/g, '')
  .replace(/: WarpFieldVariant/g, '')
  .replace(/: StreakSettings/g, '')
  .replace(/: GlyphAtlas/g, '')
  .replace(/: Layer(\[\])?/g, '')
  .replace(/: Tumbler(\[\])?/g, '')
  .replace(/: HTMLCanvasElement/g, '')
  .replace(/: CanvasRenderingContext2D/g, '')
  .replace(/: number(\[\])?/g, '')
  .replace(/: string(\[\])?/g, '')
  .replace(/: boolean(\[\])?/g, '')
  .replace(/\n{3,}/g, '\n\n');

fs.writeFileSync(file, source);

try {
  babel.parseSync(source, {
    sourceType: 'module',
    babelrc: false,
    configFile: false,
    presets: [['@babel/preset-env', { targets: { node: 'current' } }]],
  });
  const broken = source.match(/\b(blending|side)\s*([,}])/g);
  console.log(
    JSON.stringify({
      parse: 'ok',
      bytes: source.length,
      blendingOk: source.includes('blending: THREE.AdditiveBlending'),
      sideOk: source.includes('side: THREE.DoubleSide'),
      broken,
    }),
  );
} catch (error) {
  console.log(error.message);
  const match = error.message.match(/\((\d+):/);
  if (match) {
    const lines = source.split('\n');
    const line = Number(match[1]) - 1;
    console.log(lines.slice(Math.max(0, line - 1), line + 2).join('\n'));
  }
}
