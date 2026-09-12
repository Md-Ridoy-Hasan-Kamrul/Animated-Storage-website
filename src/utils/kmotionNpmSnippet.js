export const KMOTION_PACKAGE = '@kmotion/animation';

/** Install + React Preview snippet for a gallery template id. */
export function getKmotionNpmSnippet(id) {
  if (!id) return '';
  return [
    `npm install ${KMOTION_PACKAGE}`,
    '',
    `import { Preview } from "${KMOTION_PACKAGE}/react";`,
    '',
    `<Preview id="${id}" />`,
  ].join('\n');
}
