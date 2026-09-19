export const ATMOSPHERIC_BLADE_LASER_PROMPT = `# Integrate <LaserCollection /> from ThreeUI using its exact source

You are working in an existing application. Implement this component from the exact source linked or included below. Do not recreate it from the preview, screenshot, description, or filename.

Component: \`LaserCollection\`
Variant: **Atmospheric Blade** (\`atmospheric-blade\`)
Runtime: Raw WebGL
Source revision: \`SHA-256 70cc015d5175\`

Reference brief:
A white-hot emerald blade cutting through layered procedural vapor and faint mirage rails.

## Current configured usage

\`\`\`tsx
import { LaserCollection } from "@designcodeio/threeui";
import "@designcodeio/threeui/style.css";

export function Scene() {
  return (
    <div className="shader-frame">
      <LaserCollection
        variant="atmospheric-blade"
        speed={1.00}
        size={1.00}
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

Complete registered source bundle: [https://threeui.com/source-code/matrix-field.json](https://threeui.com/source-code/matrix-field.json)

Required registered files:

- \`src/shaders/laser/LaserCollection.tsx\` — component · SHA-256 \`e81830f73d86cbaa71e4f32568ec596c461500370ef971315b1dff682c9d1639\`
- \`src/shaders/laser/LaserVariants.tsx\` — variant-component · SHA-256 \`4fdc907769b67369de011ee96594aed6dd0f54974c1db831ac9ac5c5f371ba4a\`
- \`src/shaders/laser/laserShaders.ts\` — shader-source · SHA-256 \`91248e937612f2d11b8dde4716d3546e47cd192ad36ebc76e1860f728285f967\`
- \`src/shaders/neuform-isolated/NeuformBatchEffects.tsx\` — variant-component · SHA-256 \`dc68c51bea26b922965de44b4fb8d6c432607508fb2b61e16ed60d245da1a69f\`
- \`src/shaders/neuform-isolated/sources/matrix-field.html\` — canonical-source · SHA-256 \`7ee84b44ccad91f131563f34c633596a4c105512e8f0aa4303736f77681db835\`
- \`src/shaders/threeui.css\` — shared-style · SHA-256 \`efe4447139f1358dd8e9be68edf6fa46cbefbd1de423a4d6c439ca61d2c8eccf\`

## Implementation requirements

- Preserve the authored structure, styling, shaders, motion, interactions, responsive behavior, dependencies, and asset paths described by the source.
- Use the configured \`<LaserCollection />\` usage above, including the selected variant and props.
- Build directly in the destination project. Do not embed the ThreeUI documentation page and do not approximate the result from its rendered appearance.
- Fetch and read the complete source before editing. If the source cannot be retrieved, stop and report that instead of recreating it.
- After implementation, verify the rendered result and its interactions in the browser.
`;
