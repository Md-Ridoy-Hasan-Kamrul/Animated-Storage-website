/** Exact pasted design body for Copy full prompt (trim outer whitespace only). */
export const NEBULA_STRUCTURE_FLOW_PROMPT = `# Integrate <StructureFlowCollection /> from ThreeUI using its exact source

You are working in an existing application. Implement this component from the exact source linked or included below. Do not recreate it from the preview, screenshot, description, or filename.

Component: \`StructureFlowCollection\`
Variant: **Nebula** (\`nebula\`)
Runtime: Three.js r128–r160
Source revision: \`SHA-256 40eb5bac81e3\`

Reference brief:
An indigo FBM nebula with pointer drift, breathing light, and vignette.

## Current configured usage

\`\`\`tsx
import { StructureFlowCollection } from "@designcodeio/threeui";
import "@designcodeio/threeui/style.css";

export function Scene() {
  return (
    <div className="shader-frame">
      <StructureFlowCollection
        variant="nebula"
        hue={0}
        saturation={1.00}
        brightness={1.00}
      />
    </div>
  );
}
\`\`\`

## Exact implementation source

Complete registered source bundle: [https://threeui.com/source-code/nebula.json](https://threeui.com/source-code/nebula.json)

Required registered files:

- \`src/shaders/neuform-isolated/NeuformCraftEffects.tsx\` — component · SHA-256 \`0a1680c3c119dba8c61d946322afa0b64d36dfd80956fb5e7c3fd017d7bfa450\`
- \`src/shaders/neuform-isolated/sources/julian-vance-nebula.html\` — canonical-source · SHA-256 \`e4f3bda31a5c260356790add556a2ae59bb97ad6015a1f84cc6c9801b37e5a4d\`
- \`src/shaders/threeui.css\` — shared-style · SHA-256 \`efe4447139f1358dd8e9be68edf6fa46cbefbd1de423a4d6c439ca61d2c8eccf\`

## Implementation requirements

- Preserve the authored structure, styling, shaders, motion, interactions, responsive behavior, dependencies, and asset paths described by the source.
- Use the configured \`<StructureFlowCollection />\` usage above, including the selected variant and props.
- Build directly in the destination project. Do not embed the ThreeUI documentation page and do not approximate the result from its rendered appearance.
- Fetch and read the complete source before editing. If the source cannot be retrieved, stop and report that instead of recreating it.
- After implementation, verify the rendered result and its interactions in the browser.
`;
