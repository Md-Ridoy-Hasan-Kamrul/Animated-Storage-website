export const WARP_FIELD_HYPERSPACE_PROMPT = `# Integrate <WarpFieldBackground /> from ThreeUI using its exact source

You are working in an existing application. Implement this component from the exact source linked or included below. Do not recreate it from the preview, screenshot, description, or filename.

Component: \`WarpFieldBackground\`
Variant: **Hyperspace** (\`hyperspace\`)
Runtime: Three.js r128
Source revision: \`SHA-256 bd7c486164d8\`

Reference brief:
1,200 ice-blue streaks stretched down a scrolling tunnel toward a pulsing jump core.

## Current configured usage

\`\`\`tsx
import { WarpFieldBackground } from "@designcodeio/threeui";
import "@designcodeio/threeui/style.css";

export function Scene() {
  return (
    <div className="shader-frame">
      <WarpFieldBackground
        variant="hyperspace"
        speed={15.0}
        streakOpacity={0.60}
        tileOpacity={0.90}
        fov={75}
        hue={0}
        saturation={1.00}
        brightness={1.00}
      />
    </div>
  );
}
\`\`\`

## Exact implementation source

Complete registered source bundle: [https://threeui.com/source-code/warp-field.json](https://threeui.com/source-code/warp-field.json)

Required registered files:

- \`src/shaders/warp-field/WarpFieldBackground.tsx\` — component · SHA-256 \`c78637ee3419deed6c364f4252ed77adfda3a215eb1b82510450a9b7fadefcbe\`
- \`src/shaders/warp-field/warpFieldRenderer.ts\` — renderer-source · SHA-256 \`c9872c53dd505dea2d87c79e34b9eedd358b5dc32b385d48280fe252f595a44e\`
- \`src/shaders/threeui.css\` — shared-style · SHA-256 \`efe4447139f1358dd8e9be68edf6fa46cbefbd1de423a4d6c439ca61d2c8eccf\`

## Implementation requirements

- Preserve the authored structure, styling, shaders, motion, interactions, responsive behavior, dependencies, and asset paths described by the source.
- Use the configured \`<WarpFieldBackground />\` usage above, including the selected variant and props.
- Build directly in the destination project. Do not embed the ThreeUI documentation page and do not approximate the result from its rendered appearance.
- Fetch and read the complete source before editing. If the source cannot be retrieved, stop and report that instead of recreating it.
- After implementation, verify the rendered result and its interactions in the browser.`;
