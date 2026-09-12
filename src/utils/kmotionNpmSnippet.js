export const KMOTION_PACKAGE = '@kmotion/animation';

export const KMOTION_STACKS = [
  { id: 'react', label: 'React' },
  { id: 'vue', label: 'Vue' },
  { id: 'svelte', label: 'Svelte' },
  { id: 'solid', label: 'Solid' },
  { id: 'js', label: 'JS' },
];

const SNIPPETS = {
  react: (pkg, id) => [
    `npm install ${pkg}`,
    '',
    `import { Preview } from "${pkg}/react";`,
    '',
    `<Preview id="${id}" />`,
  ],
  vue: (pkg, id) => [
    `npm install ${pkg}`,
    '',
    '<script setup>',
    `import { Preview } from "${pkg}/vue";`,
    '</script>',
    '',
    '<template>',
    `  <Preview id="${id}" />`,
    '</template>',
  ],
  svelte: (pkg, id) => [
    `npm install ${pkg}`,
    '',
    '<script>',
    `  import { preview } from "${pkg}/svelte";`,
    '</script>',
    '',
    `<div use:preview={{ id: "${id}" }}></div>`,
  ],
  solid: (pkg, id) => [
    `npm install ${pkg}`,
    '',
    `import { Preview } from "${pkg}/solid";`,
    '',
    `Preview({ id: "${id}" })`,
  ],
  js: (pkg, id) => [
    `npm install ${pkg}`,
    '',
    `import { Preview } from "${pkg}";`,
    '',
    `Preview(document.querySelector("#app"), { id: "${id}" });`,
  ],
};

/** Install + Preview snippet for a template id and stack. */
export function getKmotionNpmSnippet(id, stack = 'react') {
  if (!id) return '';
  const build = SNIPPETS[stack] || SNIPPETS.react;
  return build(KMOTION_PACKAGE, id).join('\n');
}
