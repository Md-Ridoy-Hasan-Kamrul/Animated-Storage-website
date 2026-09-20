/**
 * Shared Skill.md bodies keyed by ThreeUI / local component name.
 * One skill per component family — not per framework and not per card variant.
 */

import { KAGE_SKILL } from '../templates/landing-page/kage/sourceDocs';
import { SKETCHBOOK_SKILL } from '../templates/landing-page/sketchbook/sourceDocs';
import { SUBLEVEL_STUDIO_SKILL } from '../templates/landing-page/sublevel-studio/sourceDocs';

export const SOURCE_SKILLS = {
  GalleryHeading: `---
name: add-gallery-heading
description: "Build Gallery Heading from its verified authored source using Canvas 2D, including the complete renderer, interactions, and required assets. Use when Codex needs to implement, port, or adapt this effect without requiring the ThreeUI package or reconstructing the visual from an approximation."
---

# Build Gallery Heading

## Description

An oversized headline ringed by twelve 4:3 plates — one flat colour each, shaded by a procedural noise field rather than a gradient — that hold still until the pointer arrives, then orbit. Four galleries, each with its own field, typography, and direction.

Recreate the authored behavior from the verified source, not from screenshots or the abbreviated orchestration sample in this skill. The implementation may live directly in the target project and does not require \`@designcodeio/threeui\`.

## Technologies

- React component with a sandboxed effect boundary
- Canvas 2D copied from the byte-exact Neuform export
- A post-load focus adapter that keeps only the authored canvas / visual targets visible
- Optional outer-frame hue, saturation, and brightness grading with source-exact defaults

## Verified source material

- \`src/shaders/neuform-isolated/sources/gallery-heading.html\`
- \`src/shaders/neuform-isolated/NeuformIsolatedEffects.tsx\`

Source revision: \`SHA-256 8e42d2d5b497\`

## Implementation steps

1. Open every verified source file and identify the renderer, host lifecycle, styles, and assets before editing.
2. Copy the complete canonical HTML source so shader strings, materials, DOM, timing, and initialization order remain auditable.
3. After the source load event, retain only the \`#stage\` twelve-tile ring and its hover-driven headline; do not rewrite the renderer or approximate the composition.
4. Dispatch one resize event after focus so the exact source renderer recalculates its backing resolution.
5. Apply optional hue, saturation, and brightness only to the outer iframe; omit the filter at 0/1/1 so source color remains exact.
6. Keep the sandbox isolated with \`allow-scripts\` only; removing the iframe must release its document, listeners, frames, and graphics contexts together.
7. Give the local component a sized, overflow-controlled parent and verify desktop, mobile, and reduced-motion behavior.

Asset handling: This effect has no required external assets.

## Behavior contract

- Runtime: Canvas 2D
- Interaction: The ring rests until a pointer is over it, then orbits (~15s loop) and settles on leave
- **source** (fixed): Exact owner-selected HTML
- **focus** (host): Effect-only sandbox
- **mode** (optional): dark | light
- **font** / **weight** / **headlineSize** (optional): typography controls
- **field** (variant): matte | glitch | riso | halftone

## Guardrails

- Do not substitute a visually similar package, demo, or runtime.
- Do not approximate or simplify the authored renderer, interaction state, or assets.
- Adapt only the surrounding host boundary needed by the target project; keep renderer behavior intact.
`,

  ThinkingButton: `---
name: add-thinking-button
description: "Build Thinking Button from its verified authored Neuform source. Port the exact Canvas/DOM effect without approximating from screenshots."
---

# Build Thinking Button

Recreate the authored Thinking Button from the verified Neuform / ThreeUI source bundle. Prefer the registered HTML + host focus adapter over a visual reconstruction.

## Guardrails

- Preserve authored motion, focus isolation, and sandbox teardown.
- Do not substitute a different button demo or library.
`,

  KageLandingPage: KAGE_SKILL,

  MengToSketchbookLandingPage: SKETCHBOOK_SKILL,

  SublevelStudioLandingPage: SUBLEVEL_STUDIO_SKILL,
};

/**
 * @param {string} componentName
 * @returns {string}
 */
function toKebabCase(componentName) {
  return componentName
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/\s+/g, '-')
    .toLowerCase();
}

/**
 * Minimal professional Skill.md when a named ThreeUI component has no curated skill yet.
 * @param {string} componentName
 * @returns {string}
 */
export function buildGenericSourceSkill(componentName) {
  const kebab = toKebabCase(componentName);
  return `---
name: add-${kebab}
description: "Build ${componentName} from its verified authored ThreeUI / Neuform source. Port the exact renderer without approximating from screenshots."
---

# Build ${componentName}

Recreate \`${componentName}\` from the verified registered source bundle linked in the card prompt. Prefer the exact HTML / shader / host focus adapter over a visual reconstruction.

## Implementation steps

1. Fetch and read the complete registered source before editing.
2. Preserve authored structure, styling, motion, interactions, and asset paths.
3. Adapt only the surrounding host boundary needed by the destination project.
4. Verify the rendered result and interactions in the browser.

## Guardrails

- Do not substitute a visually similar package, demo, or runtime.
- Do not approximate or simplify the authored source.
- Keep sandbox teardown clean when an iframe host is used.
`;
}

/**
 * @param {string} componentName
 * @returns {string}
 */
export function getSourceSkillForComponent(componentName) {
  if (!componentName) return '';
  return SOURCE_SKILLS[componentName] || buildGenericSourceSkill(componentName);
}
