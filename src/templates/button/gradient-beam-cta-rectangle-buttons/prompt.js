export const GRADIENT_BEAM_CTA_RECTANGLE_BUTTONS_PROMPT = `# Integrate <RectangleButtons /> from ThreeUI using its exact source

You are working in an existing application. Implement this component from the exact source linked or included below. Do not recreate it from the preview, screenshot, description, or filename.

Component: \`RectangleButtons\`
Variant: **Gradient Beam CTA** (\`gradient-beam-cta\`)
Runtime: DOM + CSS
Source revision: \`SHA-256 ff30e28c2781\`

Reference brief:
A dark builder CTA with a rotating orange edge beam, drifting dot texture, and responsive glow.

## Current configured usage

\`\`\`tsx
import { RectangleButtons } from "@designcodeio/threeui";
import "@designcodeio/threeui/style.css";

export function Scene() {
  return (
    <div className="shader-frame">
      <RectangleButtons
        variant="gradient-beam-cta"
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

Complete registered source bundle: [https://threeui.com/source-code/gradient-beam-cta.json](https://threeui.com/source-code/gradient-beam-cta.json)

Required registered files:

- \`src/shaders/neuform-isolated/NeuformIsolatedEffects.tsx\` — component · SHA-256 \`fe9856234253bc3c1a13b3afb84f3d84644dfa6d578e7203bb3e1dd5eced1b75\`
- \`src/shaders/neuform-isolated/sources/gradient-beam-cta.html\` — canonical-source · SHA-256 \`90a5961c1e7374ecf1d4efa1e3ef051048a08567933491a91c67280d4eac9a42\`
- \`src/shaders/threeui.css\` — shared-style · SHA-256 \`efe4447139f1358dd8e9be68edf6fa46cbefbd1de423a4d6c439ca61d2c8eccf\`

## Implementation requirements

- Preserve the authored structure, styling, shaders, motion, interactions, responsive behavior, dependencies, and asset paths described by the source.
- Use the configured \`<RectangleButtons />\` usage above, including the selected variant and props.
- Build directly in the destination project. Do not embed the ThreeUI documentation page and do not approximate the result from its rendered appearance.
- Fetch and read the complete source before editing. If the source cannot be retrieved, stop and report that instead of recreating it.
- After implementation, verify the rendered result and its interactions in the browser.
`;
