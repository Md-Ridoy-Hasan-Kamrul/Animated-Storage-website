export const ASHEN_PRESS_PROMPT = `# Integrate <AshenPress /> from ThreeUI using its exact source

You are working in an existing application. Implement this component from the exact source linked or included below. Do not recreate it from the preview, screenshot, description, or filename.

Component: \`AshenPress\`
Runtime: Three.js r181 + custom GLSL + CanvasTexture
Source revision: \`SHA-256 5fe2554e578a\`

Reference brief:
A tactile 3D art-book shelf with ten clothbound volumes, embedded illustrated plates, reflective oak furniture, a torn-paper detail reveal, and direct hover, select, flip, and drag interactions.

## Current configured usage

\`\`\`tsx
import { AshenPress } from "@designcodeio/threeui";
import "@designcodeio/threeui/style.css";

export function Scene() {
  return (
    <div className="shader-frame">
      <AshenPress />
    </div>
  );
}
\`\`\`

## Exact implementation source

Complete registered source bundle: [https://threeui.com/source-code/ashen-press.json](https://threeui.com/source-code/ashen-press.json)

Required registered files:

- \`src/shaders/ashen-press/sources/ashen-press.html\` — canonical-source · SHA-256 \`5fe2554e578acac5d55cb466a9564440e7767e38797981f8e829dfd2de0bc90f\`
- \`src/shaders/ashen-press/AshenPress.tsx\` — component · SHA-256 \`36b365f7a69223f1c3347bfcb3f2d1aa1ab20d30f2c31e5efb248e62ab4ddc90\`
- \`src/shaders/threeui.css\` — shared-style · SHA-256 \`efe4447139f1358dd8e9be68edf6fa46cbefbd1de423a4d6c439ca61d2c8eccf\`

## Implementation requirements

- Preserve the authored structure, styling, shaders, motion, interactions, responsive behavior, dependencies, and asset paths described by the source.
- Use the configured \`<AshenPress />\` usage above, including the selected variant and props.
- Build directly in the destination project. Do not embed the ThreeUI documentation page and do not approximate the result from its rendered appearance.
- Fetch and read the complete source before editing. If the source cannot be retrieved, stop and report that instead of recreating it.
- After implementation, verify the rendered result and its interactions in the browser.`;
