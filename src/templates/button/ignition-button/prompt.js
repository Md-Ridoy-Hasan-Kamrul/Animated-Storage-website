export const IGNITION_BUTTON_PROMPT = `# Integrate <ShaderButtons /> from ThreeUI using its exact source

You are working in an existing application. Implement this component from the exact source linked or included below. Do not recreate it from the preview, screenshot, description, or filename.

Component: \`ShaderButtons\`
Variant: **Ignition** (\`ignition-button\`)
Runtime: Raw WebGL + Canvas 2D + CSS
Source revision: \`SHA-256 6f56c4f91814\`

Reference brief:
A raw-WebGL ambient field with a tactile ignition control.

## Current configured usage

\`\`\`tsx
import { ShaderButtons } from "@designcodeio/threeui";
import "@designcodeio/threeui/style.css";

export function Scene() {
  return (
    <div className="shader-frame">
      <ShaderButtons
        variant="ignition-button"
        mode="dark"
        hue={0}
        saturation={1.00}
        brightness={1.00}
      />
    </div>
  );
}
\`\`\`

## Exact implementation source

Complete registered source bundle: [https://threeui.com/source-code/ignition-button.json](https://threeui.com/source-code/ignition-button.json)

Required registered files:

- \`src/shaders/neuform-isolated/NeuformIsolatedEffects.tsx\` — component · SHA-256 \`fe9856234253bc3c1a13b3afb84f3d84644dfa6d578e7203bb3e1dd5eced1b75\`
- \`src/shaders/neuform-isolated/sources/ignition-terminal.html\` — canonical-source · SHA-256 \`05313d191cc11ca0c7600452e72ad14b4fc6581627689c209a5f22a1bfa6a8ea\`
- \`src/shaders/threeui.css\` — shared-style · SHA-256 \`efe4447139f1358dd8e9be68edf6fa46cbefbd1de423a4d6c439ca61d2c8eccf\`

## Implementation requirements

- Preserve the authored structure, styling, shaders, motion, interactions, responsive behavior, dependencies, and asset paths described by the source.
- Use the configured \`<ShaderButtons />\` usage above, including the selected variant and props.
- Build directly in the destination project. Do not embed the ThreeUI documentation page and do not approximate the result from its rendered appearance.
- Fetch and read the complete source before editing. If the source cannot be retrieved, stop and report that instead of recreating it.
- After implementation, verify the rendered result and its interactions in the browser.
`;
