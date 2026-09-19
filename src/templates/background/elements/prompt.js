export const ELEMENTS_PROMPT = `# Integrate <ElementsCollection /> from ThreeUI using its exact source

You are working in an existing application. Implement this component from the exact source linked or included below. Do not recreate it from the preview, screenshot, description, or filename.

Component: \`ElementsCollection\`
Variant: **Water** (\`elemental-water\`)
Runtime: Raw WebGL2 + Canvas 2D
Source revision: \`SHA-256 7a6871fe99fa\`

Reference brief:
A refracted OpenAI mark beneath pointer-driven circular ripples, cyan depth, and soft suspended particles.

## Current configured usage

\`\`\`tsx
import { ElementsCollection } from "@designcodeio/threeui";
import "@designcodeio/threeui/style.css";

export function Scene() {
  return (
    <div className="shader-frame">
      <ElementsCollection
        variant="water"
        speed={1.00}
        size={1.00}
        particleAmount={1.00}
        hue={0}
        saturation={1.00}
        brightness={1.00}
        opacity={1.00}
      />
    </div>
  );
}
\`\`\`

## Exact implementation source

Complete registered source bundle: [https://threeui.com/source-code/elemental-water.json](https://threeui.com/source-code/elemental-water.json)

Required registered files:

- \`src/shaders/elements/ElementsBackground.tsx\` — component · SHA-256 \`04dfbb5d8e91e71772a34b4f963e2335458c4ffdace33071fa28b731a053ba95\`
- \`src/shaders/elements/sources/elemental-marks.html\` — canonical-source · SHA-256 \`7a6871fe99fa5e1551b27b2601f2a22dd23320ea2c90b5432c9c8e071f0b1d1d\`
- \`src/shaders/threeui.css\` — shared-style · SHA-256 \`efe4447139f1358dd8e9be68edf6fa46cbefbd1de423a4d6c439ca61d2c8eccf\`

## Implementation requirements

- Preserve the authored structure, styling, shaders, motion, interactions, responsive behavior, dependencies, and asset paths described by the source.
- Use the configured \`<ElementsCollection />\` usage above, including the selected variant and props.
- Build directly in the destination project. Do not embed the ThreeUI documentation page and do not approximate the result from its rendered appearance.
- Fetch and read the complete source before editing. If the source cannot be retrieved, stop and report that instead of recreating it.
- After implementation, verify the rendered result and its interactions in the browser.
`;
