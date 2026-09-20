export const STAR_PORTAL_PROMPT = `# Integrate <ShaderButtons /> from ThreeUI using its exact source

You are working in an existing application. Implement this component from the exact source linked or included below. Do not recreate it from the preview, screenshot, description, or filename.

Component: \`ShaderButtons\`
Variant: **Star Portal** (\`star-portal\`)
Runtime: Raw WebGL + Canvas 2D + CSS
Source revision: \`SHA-256 6f56c4f91814\`

Reference brief:
Two drifting Canvas 2D star fields with an authored holographic pill button.

## Current configured usage

\`\`\`tsx
import { ShaderButtons } from "@designcodeio/threeui";
import "@designcodeio/threeui/style.css";

export function Scene() {
  return (
    <div className="shader-frame">
      <ShaderButtons
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

Complete registered source bundle: [https://threeui.com/source-code/star-portal.json](https://threeui.com/source-code/star-portal.json)

Required registered files:

- \`src/shaders/shader-buttons/ShaderButtons.tsx\` — component · SHA-256 \`6f56c4f9181492f60d642edc5317a635f0b462e509b34713d532e32d660638b0\`
- \`src/shaders/shader-buttons/RakingLightPillButton.tsx\` — variant-component · SHA-256 \`1069b29edc532f9bffcdfce7ca072387096fae3b99368ccab04deb6190b1ad94\`
- \`src/shaders/neuform-isolated/NeuformIsolatedEffects.tsx\` — variant-component · SHA-256 \`fe9856234253bc3c1a13b3afb84f3d84644dfa6d578e7203bb3e1dd5eced1b75\`
- \`src/shaders/neuform-isolated/sources/imaginie-starfield.html\` — canonical-source · SHA-256 \`002199215e124a85177585fc5cb84333f471562176f94c8d8e4456c79d721295\`
- \`src/shaders/neuform-isolated/sources/ignition-terminal.html\` — variant-source · SHA-256 \`05313d191cc11ca0c7600452e72ad14b4fc6581627689c209a5f22a1bfa6a8ea\`
- \`src/shaders/neuform-isolated/sources/valence-core.html\` — variant-source · SHA-256 \`26b21d4972805733a2441355edb56576fa911f135ccf746ebcc927a0b1e3b975\`
- \`src/shaders/neuform-isolated/sources/aetheris-labs.html\` — variant-source · SHA-256 \`eea617fe0e37a79be7aee44f00a53ec3ae41e006e771a8aad53acce3648147e0\`
- \`src/shaders/neuform-isolated/sources/nexus-tactile.html\` — variant-source · SHA-256 \`1811a6408fb09421665d772eca4106162e10bfc038ec948324d0250f5dec9cb4\`
- \`src/shaders/neuform-isolated/sources/thinking-button.html\` — variant-source · SHA-256 \`194da3529f2f80993db555de0387fc1e628bf8c216371803603750959a4fb11a\`
- \`src/shaders/threeui.css\` — shared-style · SHA-256 \`efe4447139f1358dd8e9be68edf6fa46cbefbd1de423a4d6c439ca61d2c8eccf\`

## Implementation requirements

- Preserve the authored structure, styling, shaders, motion, interactions, responsive behavior, dependencies, and asset paths described by the source.
- Use the configured \`<ShaderButtons />\` usage above, including the selected variant and props.
- Build directly in the destination project. Do not embed the ThreeUI documentation page and do not approximate the result from its rendered appearance.
- Fetch and read the complete source before editing. If the source cannot be retrieved, stop and report that instead of recreating it.
- After implementation, verify the rendered result and its interactions in the browser.
`;
