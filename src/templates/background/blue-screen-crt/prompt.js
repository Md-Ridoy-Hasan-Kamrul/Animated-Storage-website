export const BLUE_SCREEN_CRT_PROMPT = `# Integrate <CrtBackground /> from ThreeUI using its exact source

You are working in an existing application. Implement this component from the exact source linked or included below. Do not recreate it from the preview, screenshot, description, or filename.

Component: \`CrtBackground\`
Variant: **Blue Screen** (\`blue-screen\`)
Runtime: Raw WebGL + Canvas 2D
Source revision: \`SHA-256 860a1eb1d4c9\`

Reference brief:
A retro signal-fault panel on saturated broadcast blue, torn by shader-side transport noise: per-row jitter, a rolling dropout band, head-switching scramble, and heavy static.

## Current configured usage

\`\`\`tsx
import { CrtBackground } from "@designcodeio/threeui";
import "@designcodeio/threeui/style.css";

export function Scene() {
  return (
    <div className="shader-frame">
      <CrtBackground
        variant="blue-screen"
        speed={1.00}
        motion={1.00}
        hue={0}
        saturation={1.00}
        brightness={1.00}
        opacity={1.00}
      />
    </div>
  );
}
\`\`\`

## Exact implementation source

Complete registered source bundle: [https://threeui.com/source-code/crt.json](https://threeui.com/source-code/crt.json)

Required registered files:

- \`src/shaders/crt/CrtBackground.tsx\` — component · SHA-256 \`20932f2655319c5fc6c6b3c29c890149beec7e4850edc414f909ab24a0c95031\`
- \`src/shaders/crt/crtRenderer.ts\` — renderer-source · SHA-256 \`a3eb536e9c50eeb31832e7d6d25021c1535137e8ead5eb1b864e5a27c340af03\`
- \`src/shaders/crt/crtShaders.ts\` — shader-source · SHA-256 \`cf3a7c747d1cac495c705529954e2491ad885489ddd5110724f8f4b3553f1592\`
- \`src/shaders/crt/crtScreens.ts\` — variant-renderer-source · SHA-256 \`e545922e0d3afa19b9d01840d0ea684c56d0799714f9cf77a4712921bfec7adb\`
- \`src/shaders/threeui.css\` — shared-style · SHA-256 \`efe4447139f1358dd8e9be68edf6fa46cbefbd1de423a4d6c439ca61d2c8eccf\`

## Implementation requirements

- Preserve the authored structure, styling, shaders, motion, interactions, responsive behavior, dependencies, and asset paths described by the source.
- Use the configured \`<CrtBackground />\` usage above, including the selected variant and props.
- Build directly in the destination project. Do not embed the ThreeUI documentation page and do not approximate the result from its rendered appearance.
- Fetch and read the complete source before editing. If the source cannot be retrieved, stop and report that instead of recreating it.
- After implementation, verify the rendered result and its interactions in the browser.`;
