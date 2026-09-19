export const GLOBE_PROMPT = `# Integrate <GlobeCollection /> from ThreeUI using its exact source

You are working in an existing application. Implement this component from the exact source linked or included below. Do not recreate it from the preview, screenshot, description, or filename.

Component: \`GlobeCollection\`
Variant: **Energy Orb** (\`energy-orb\`)
Runtime: Raw WebGL + Canvas 2D
Source revision: \`SHA-256 03b1b8e2c440 / 3de7fdcb6239 / 7a88f26e4d8\`

Reference brief:
The original layered FBM energy sphere with translucent rim glow and depth-aware star field.

## Current configured usage

\`\`\`tsx
import { GlobeCollection } from "@designcodeio/threeui";
import "@designcodeio/threeui/style.css";

export function Scene() {
  return (
    <div className="shader-frame">
      <GlobeCollection
        variant="energy-orb"
        speed={1.00}
        scale={1.00}
        smokeScale={1.00}
        smokeStrength={1.00}
        smokeSpeed={1.00}
        hue={0}
        saturation={1.00}
        glow={1.00}
        starDensity={1.00}
        starSpeed={1.00}
        starSize={1.00}
        brightness={1.00}
        opacity={1.00}
      />
    </div>
  );
}
\`\`\`

## Exact implementation source

Complete registered source bundle: [https://threeui.com/source-code/energy-orb.json](https://threeui.com/source-code/energy-orb.json)

Required registered files:

- \`src/shaders/globe/GlobeCollection.tsx\` — component · SHA-256 \`e8db691277c236d1fe2adb53ba3e4a5f51aa697aa625e1bdf9b09adbf03af3b9\`
- \`src/shaders/energy-orb/EnergyOrb.tsx\` — variant-component · SHA-256 \`be9ca83c7d158dd1366bd942aa4cc4c084b901d59156d047a601ebd9cca4a903\`
- \`src/shaders/energy-orb/energyOrbShaders.ts\` — variant-shader-source · SHA-256 \`03b1b8e2c44042ac1e880003e55016a641329028205c62dcd17e535b99496aec\`
- \`src/shaders/globe/sources/tangled-constellations.html\` — variant-source · SHA-256 \`3de7fdcb62399863ca942c6a502edeeb68b80bcfb8b9f60cd580b56bba94d009\`
- \`src/shaders/globe/sources/network-globe.html\` — variant-source · SHA-256 \`7a88f26e4d8dfdc66c75eedb61d8e7136b747b5145c07edf1db9633dcd096405\`
- \`src/shaders/threeui.css\` — shared-style · SHA-256 \`efe4447139f1358dd8e9be68edf6fa46cbefbd1de423a4d6c439ca61d2c8eccf\`

## Implementation requirements

- Preserve the authored structure, styling, shaders, motion, interactions, responsive behavior, dependencies, and asset paths described by the source.
- Use the configured \`<GlobeCollection />\` usage above, including the selected variant and props.
- Build directly in the destination project. Do not embed the ThreeUI documentation page and do not approximate the result from its rendered appearance.
- Fetch and read the complete source before editing. If the source cannot be retrieved, stop and report that instead of recreating it.
- After implementation, verify the rendered result and its interactions in the browser.`;
