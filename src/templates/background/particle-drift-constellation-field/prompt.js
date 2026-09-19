export const PARTICLE_DRIFT_CONSTELLATION_FIELD_PROMPT = `# Integrate <ConstellationField /> from ThreeUI using its exact source

You are working in an existing application. Implement this component from the exact source linked or included below. Do not recreate it from the preview, screenshot, description, or filename.

Component: \`ConstellationField\`
Variant: **Particle Drift** (\`particle-drift\`)
Runtime: Canvas 2D + Raw WebGL
Source revision: \`SHA-256 1920ad4fe34f\`

Reference brief:
A soft particle drift field lifted from a compute-network hero stage.

## Current configured usage

\`\`\`tsx
import { ConstellationField } from "@designcodeio/threeui";
import "@designcodeio/threeui/style.css";

export function Scene() {
  return (
    <div className="shader-frame">
      <ConstellationField
        variant="particle-drift"
        mode="dark"
        speed={1.00}
        size={1.00}
        length={1.00}
        density={1.00}
        opacity={1.00}
        hue={0}
        saturation={1.00}
        brightness={1.00}
      />
    </div>
  );
}
\`\`\`

## Exact implementation source

Complete registered source bundle: [https://threeui.com/source-code/particle-drift.json](https://threeui.com/source-code/particle-drift.json)

Required registered files:

- \`src/shaders/neuform-isolated/NeuformBatchEffects.tsx\` — component · SHA-256 \`dc68c51bea26b922965de44b4fb8d6c432607508fb2b61e16ed60d245da1a69f\`
- \`src/shaders/neuform-isolated/sources/particle-drift.html\` — canonical-source · SHA-256 \`7fad6cc8c54c0385c472c2879762b3fd2bfb061820bf925034d7a58a0048eb27\`
- \`src/shaders/threeui.css\` — shared-style · SHA-256 \`efe4447139f1358dd8e9be68edf6fa46cbefbd1de423a4d6c439ca61d2c8eccf\`

## Implementation requirements

- Preserve the authored structure, styling, shaders, motion, interactions, responsive behavior, dependencies, and asset paths described by the source.
- Use the configured \`<ConstellationField />\` usage above, including the selected variant and props.
- Build directly in the destination project. Do not embed the ThreeUI documentation page and do not approximate the result from its rendered appearance.
- Fetch and read the complete source before editing. If the source cannot be retrieved, stop and report that instead of recreating it.
- After implementation, verify the rendered result and its interactions in the browser.
`;
