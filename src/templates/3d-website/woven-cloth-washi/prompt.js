export const WOVEN_CLOTH_WASHI_PROMPT = `# Integrate <WovenCloth /> from ThreeUI using its exact source

You are working in an existing application. Implement this component from the exact source linked or included below. Do not recreate it from the preview, screenshot, description, or filename.

Component: \`WovenCloth\`
Variant: **Washi Noren** (\`washi\`)
Runtime: Three.js r160
Source revision: \`SHA-256 9bfd56ef7579\`

Reference brief:
An indigo-dyed kozo noren on a wooden rod, backlit through a shoji: laid and chain lines from the papermaking screen, a torn deckle edge cut by an alpha mask, and slits that free three panels to sway on their own.

## Current configured usage

\`\`\`tsx
import { WovenCloth } from "@designcodeio/threeui";
import "@designcodeio/threeui/style.css";

export function Scene() {
  return (
    <div className="shader-frame">
      <WovenCloth
        variant="washi"
        hue={0}
        saturation={1.00}
        brightness={1.00}
      />
    </div>
  );
}
\`\`\`

## Exact implementation source

Complete registered source bundle: [https://threeui.com/source-code/woven-cloth.json](https://threeui.com/source-code/woven-cloth.json)

Required registered files:

- \`src/shaders/woven-cloth/WovenCloth.tsx\` — component · SHA-256 \`5a89ff035bdf33dbc642d2916b56dbe94e89cb0af184474c139ffbfe5a720550\`
- \`src/shaders/neuform-isolated/NeuformCraftEffects.tsx\` — variant-component · SHA-256 \`0a1680c3c119dba8c61d946322afa0b64d36dfd80956fb5e7c3fd017d7bfa450\`
- \`src/shaders/neuform-isolated/sources/lumina-weavers-cloth.html\` — canonical-source · SHA-256 \`9bfd56ef7579a92cb6385b3e93866bc3ff54fa4489a0febb9809b720e2946fb6\`
- \`src/shaders/woven-cloth/woven-cloth-iridescent.html\` — variant-source · SHA-256 \`e3b14adac39dfef04ed0bb0df99e86a1aa0aaf7cea4f8ecc4d5e0931b48bee7b\`
- \`src/shaders/woven-cloth/woven-cloth-atelier.html\` — variant-source · SHA-256 \`f9be15756ff385db9cd3b7082b139d10b84a4eba0b3c4f19749b305570a7191f\`
- \`src/shaders/woven-cloth/woven-cloth-washi.html\` — variant-source · SHA-256 \`00e5971f139e5427e56a062c12d7e8e3590938b9a400753693b360d1e4d1a5c1\`
- \`src/shaders/threeui.css\` — shared-style · SHA-256 \`efe4447139f1358dd8e9be68edf6fa46cbefbd1de423a4d6c439ca61d2c8eccf\`

## Implementation requirements

- Preserve the authored structure, styling, shaders, motion, interactions, responsive behavior, dependencies, and asset paths described by the source.
- Use the configured \`<WovenCloth />\` usage above, including the selected variant and props.
- Build directly in the destination project. Do not embed the ThreeUI documentation page and do not approximate the result from its rendered appearance.
- Fetch and read the complete source before editing. If the source cannot be retrieved, stop and report that instead of recreating it.
- After implementation, verify the rendered result and its interactions in the browser.`;
