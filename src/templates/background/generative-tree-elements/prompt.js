export const GENERATIVE_TREE_ELEMENTS_PROMPT = `# Integrate <ElementsCollection /> from ThreeUI using its exact source

You are working in an existing application. Implement this component from the exact source linked or included below. Do not recreate it from the preview, screenshot, description, or filename.

Component: \`ElementsCollection\`
Variant: **Generative Tree** (\`generative-tree\`)
Runtime: Raw WebGL2 + Canvas 2D
Source revision: \`SHA-256 7a6871fe99fa\`

Reference brief:
A painterly branching tree grows from warm sienna to golden tips, sways with pointer wind, and sheds soft ambient motes.

## Current configured usage

\`\`\`tsx
import { ElementsCollection } from "@designcodeio/threeui";
import "@designcodeio/threeui/style.css";

export function Scene() {
  return (
    <div className="shader-frame">
      <ElementsCollection
        variant="generative-tree"
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

Complete registered source bundle: [https://threeui.com/source-code/generative-tree.json](https://threeui.com/source-code/generative-tree.json)

Required registered files:

- \`src/shaders/elements/GenerativeTree.tsx\` — component · SHA-256 \`bb6bf95154f38e7a9772eef6fe2aa89ff72284a13345d56e66fba234894c2127\`
- \`src/shaders/elements/sources/generative-tree.html\` — canonical-source · SHA-256 \`8ea51733bddf5cc44df338ef9af3a21633d62daa92c17fde5faa2fcab90fa0ef\`
- \`src/shaders/threeui.css\` — shared-style · SHA-256 \`efe4447139f1358dd8e9be68edf6fa46cbefbd1de423a4d6c439ca61d2c8eccf\`

## Implementation requirements

- Preserve the authored structure, styling, shaders, motion, interactions, responsive behavior, dependencies, and asset paths described by the source.
- Use the configured \`<ElementsCollection />\` usage above, including the selected variant and props.
- Build directly in the destination project. Do not embed the ThreeUI documentation page and do not approximate the result from its rendered appearance.
- Fetch and read the complete source before editing. If the source cannot be retrieved, stop and report that instead of recreating it.
- After implementation, verify the rendered result and its interactions in the browser.
`;
