export const SIGN_UP_PILL_LIQUID_METAL_BUTTON_PROMPT = `# Integrate <LiquidMetalButton /> from ThreeUI using its exact source

You are working in an existing application. Implement this component from the exact source linked or included below. Do not recreate it from the preview, screenshot, description, or filename.

Component: \`LiquidMetalButton\`
Variant: **Sign up Pill** (\`pill\`)
Runtime: Raw WebGL 2 + DOM/CSS
Source revision: \`SHA-256 76624e881a3a\`

Reference brief:
The original authored liquid-metal Sign up pill with its complete spectral field, bloom, pointer well, and faceted press ripple.

## Current configured usage

\`\`\`tsx
import { LiquidMetalButton } from "@designcodeio/threeui";
import "@designcodeio/threeui/style.css";

export function Scene() {
  return (
    <div className="shader-frame">
      <LiquidMetalButton
        variant="pill"
      />
    </div>
  );
}
\`\`\`

## Exact implementation source

Complete registered source bundle: [https://threeui.com/source-code/liquid-metal-button.json](https://threeui.com/source-code/liquid-metal-button.json)

Required registered files:

- \`src/shaders/liquid-metal-button/LiquidMetalButton.tsx\` — component · SHA-256 \`89b940bab445f17fafb444a7833b3c785d24c86a28156d8ad231e18de9503e11\`
- \`src/shaders/liquid-metal-button/liquid-metal-button.html\` — canonical-source · SHA-256 \`76624e881a3aecbd79b473d9c51f53c7157d47052abd0f9dc28fefd223b0a819\`
- \`src/shaders/threeui.css\` — shared-style · SHA-256 \`efe4447139f1358dd8e9be68edf6fa46cbefbd1de423a4d6c439ca61d2c8eccf\`

## Implementation requirements

- Preserve the authored structure, styling, shaders, motion, interactions, responsive behavior, dependencies, and asset paths described by the source.
- Use the configured \`<LiquidMetalButton />\` usage above, including the selected variant and props.
- Build directly in the destination project. Do not embed the ThreeUI documentation page and do not approximate the result from its rendered appearance.
- Fetch and read the complete source before editing. If the source cannot be retrieved, stop and report that instead of recreating it.
- After implementation, verify the rendered result and its interactions in the browser.
`;
