/** Exact pasted design body for Copy full prompt (trim outer whitespace only). */
export const SYLVA_LIVING_WORLD_PROMPT = `# Integrate <SylvaLivingWorldScene /> from ThreeUI using its exact source

You are working in an existing application. Implement this component from the exact source linked or included below. Do not recreate it from the preview, screenshot, description, or filename.

Component: \`SylvaLivingWorldScene\`
Variant: **Living Green** (\`living-green\`)
Runtime: Three.js r149
Source revision: \`SHA-256 fd922291297d\`

Reference brief:
The original procedural moss-root world with pale flowers, ferns, drifting pollen, scan light, and a landing butterfly.

## Current configured usage

\`\`\`tsx
import { SylvaLivingWorldScene } from "@designcodeio/threeui";
import "@designcodeio/threeui/style.css";

export function Scene() {
  return (
    <div className="shader-frame">
      <SylvaLivingWorldScene
        variant="living-green"
      />
    </div>
  );
}
\`\`\`

## Exact implementation source

Complete registered source bundle: [https://threeui.com/source-code/sylva-living-world.json](https://threeui.com/source-code/sylva-living-world.json)

Required registered files:

- \`src/shaders/sylva-living-world/SylvaLivingWorldScene.tsx\` — component · SHA-256 \`e29b92a16596bc9383e1dbd4630e83b70ec2a59dbae48de1d3b7ddc48c0b2082\`
- \`src/shaders/sylva-living-world/sources/inner-green-3d.html\` — canonical-source · SHA-256 \`69c3694bd63f44ef9f007ebe4dac57a83e4402e0cdf6b54dd10b96dd4f05e197\`
- \`src/shaders/sylva-living-world/sources/inner-green-assets/three.min.js\` — three-runtime · SHA-256 \`8a5f7249903b54d30f79f708699d2fed2d6a1d0741a4cd41377d1f01bb5a2271\`
- \`src/shaders/threeui.css\` — shared-style · SHA-256 \`efe4447139f1358dd8e9be68edf6fa46cbefbd1de423a4d6c439ca61d2c8eccf\`

## Implementation requirements

- Preserve the authored structure, styling, shaders, motion, interactions, responsive behavior, dependencies, and asset paths described by the source.
- Use the configured \`<SylvaLivingWorldScene />\` usage above, including the selected variant and props.
- Build directly in the destination project. Do not embed the ThreeUI documentation page and do not approximate the result from its rendered appearance.
- Fetch and read the complete source before editing. If the source cannot be retrieved, stop and report that instead of recreating it.
- After implementation, verify the rendered result and its interactions in the browser.
`;
