export const CONSTELLATION_FIELD_PROMPT = `# Integrate <ConstellationField /> from ThreeUI using its exact source

You are working in an existing application. Implement this component from the exact source linked or included below. Do not recreate it from the preview, screenshot, description, or filename.

Component: \`ConstellationField\`
Variant: **Constellation Field** (\`constellation-field\`)
Runtime: Canvas 2D + Raw WebGL
Source revision: \`SHA-256 1920ad4fe34f\`

Reference brief:
A drifting particle constellation network with tunable link stroke width over a deep night field.

## Current configured usage

\`\`\`tsx
import { ConstellationField } from "@designcodeio/threeui";
import "@designcodeio/threeui/style.css";

export function Scene() {
  return (
    <div className="shader-frame">
      <ConstellationField
        mode="dark"
        speed={1.00}
        size={1.00}
        strokeWidth={1.00}
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

Complete registered source bundle: [https://threeui.com/source-code/constellation-field.json](https://threeui.com/source-code/constellation-field.json)

Required registered files:

- \`src/shaders/constellation-field/ConstellationField.tsx\` — component · SHA-256 \`5bbf6f84fc8cb343ba01eb418ca8d969284c8f7b6abfd8a27bad42a626de487d\`
- \`src/shaders/neuform-isolated/NeuformBatchEffects.tsx\` — variant-component · SHA-256 \`dc68c51bea26b922965de44b4fb8d6c432607508fb2b61e16ed60d245da1a69f\`
- \`src/shaders/neuform-isolated/sources/constellation-field.html\` — canonical-source · SHA-256 \`1920ad4fe34f2ed2348e3a52110c37b4969bc45d71ff29f2738cb4542ad9f610\`
- \`src/shaders/neuform-isolated/sources/particle-drift.html\` — variant-source · SHA-256 \`7fad6cc8c54c0385c472c2879762b3fd2bfb061820bf925034d7a58a0048eb27\`
- \`src/shaders/neuform-isolated/sources/particle-network.html\` — variant-source · SHA-256 \`bc7bffdc48a9019cbba937dab9d335b85f20ac8a472f10dfa3d553da439cfdb7\`
- \`src/shaders/neuform-isolated/sources/gateway-flow.html\` — variant-source · SHA-256 \`c5a1de43138ffba96b9f0ecdcf3c054ae251ec94344e88c6ad502bae362b17d0\`
- \`src/shaders/neuform-isolated/sources/connectivity-graph.html\` — variant-source · SHA-256 \`98592824dd1109702cd72e9deca1cae7239169396c8245e8bbd786997d9bdf13\`
- \`src/shaders/neuform-isolated/sources/interface-lines.html\` — variant-source · SHA-256 \`608cbc6976996b8a5b6c4aaba4bee4d6f2dd44579b819df45914f35bc310d2cc\`
- \`src/shaders/neuform-isolated/sources/defense-lines.html\` — variant-source · SHA-256 \`1cd230f6a060023f99cbbe9ebc63e37409bf7ed70507e1ef44edc2342a0b9f91\`
- \`src/shaders/neuform-isolated/sources/topo-field.html\` — variant-source · SHA-256 \`70dbdaaec6398be9fcf05843f6c5af65e761d29187e60064673bbeb55888379f\`
- \`src/shaders/threeui.css\` — shared-style · SHA-256 \`efe4447139f1358dd8e9be68edf6fa46cbefbd1de423a4d6c439ca61d2c8eccf\`

## Implementation requirements

- Preserve the authored structure, styling, shaders, motion, interactions, responsive behavior, dependencies, and asset paths described by the source.
- Use the configured \`<ConstellationField />\` usage above, including the selected variant and props.
- Build directly in the destination project. Do not embed the ThreeUI documentation page and do not approximate the result from its rendered appearance.
- Fetch and read the complete source before editing. If the source cannot be retrieved, stop and report that instead of recreating it.
- After implementation, verify the rendered result and its interactions in the browser.
`;
