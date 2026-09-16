/** Exact pasted design body for Copy full prompt (trim outer whitespace only). */
export const TOPOLOGY_FIELD_STRUCTURE_FLOW_PROMPT = `# Integrate <StructureFlowCollection /> from ThreeUI using its exact source

You are working in an existing application. Implement this component from the exact source linked or included below. Do not recreate it from the preview, screenshot, description, or filename.

Component: \`StructureFlowCollection\`
Variant: **Topology Field** (\`topology-field\`)
Runtime: Three.js r128–r160
Source revision: \`SHA-256 40eb5bac81e3\`

Reference brief:
A rotating topology graph with connected nodes and rhythmic point pulses.

## Current configured usage

\`\`\`tsx
import { StructureFlowCollection } from "@designcodeio/threeui";
import "@designcodeio/threeui/style.css";

export function Scene() {
  return (
    <div className="shader-frame">
      <StructureFlowCollection
        variant="topology-field"
        hue={0}
        saturation={1.00}
        brightness={1.00}
      />
    </div>
  );
}
\`\`\`

## Exact implementation source

Complete registered source bundle: [https://threeui.com/source-code/topology-field.json](https://threeui.com/source-code/topology-field.json)

Required registered files:

- \`src/shaders/neuform-isolated/NeuformIsolatedEffects.tsx\` — component · SHA-256 \`fe9856234253bc3c1a13b3afb84f3d84644dfa6d578e7203bb3e1dd5eced1b75\`
- \`src/shaders/neuform-isolated/sources/nexus-topology.html\` — canonical-source · SHA-256 \`2cf632d75ed5a88b32df82839cf9608d8542f7e08b5a0e3072fce94825d1c98d\`
- \`src/shaders/threeui.css\` — shared-style · SHA-256 \`efe4447139f1358dd8e9be68edf6fa46cbefbd1de423a4d6c439ca61d2c8eccf\`

## Implementation requirements

- Preserve the authored structure, styling, shaders, motion, interactions, responsive behavior, dependencies, and asset paths described by the source.
- Use the configured \`<StructureFlowCollection />\` usage above, including the selected variant and props.
- Build directly in the destination project. Do not embed the ThreeUI documentation page and do not approximate the result from its rendered appearance.
- Fetch and read the complete source before editing. If the source cannot be retrieved, stop and report that instead of recreating it.
- After implementation, verify the rendered result and its interactions in the browser.
`;
