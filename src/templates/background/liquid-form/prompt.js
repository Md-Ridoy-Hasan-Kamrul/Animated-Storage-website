export const LIQUID_FORM_PROMPT = `# Integrate <LiquidFormBackground /> from ThreeUI using its exact source

You are working in an existing application. Implement this component from the exact source linked or included below. Do not recreate it from the preview, screenshot, description, or filename.

Component: \`LiquidFormBackground\`
Runtime: Raw WebGL
Source revision: \`SHA-256 acc0cbacb914\`

Reference brief:
A centered silver ray-marched liquid form with authored studio reflections and pointer-responsive camera drift.

## Current configured usage

\`\`\`tsx
import { LiquidFormBackground } from "@designcodeio/threeui";
import "@designcodeio/threeui/style.css";

export function Scene() {
  return (
    <div className="shader-frame">
      <LiquidFormBackground
        speed={1.00}
        morph={1.00}
        noiseScale={1.00}
        mouseAmount={0.15}
        metal={1.00}
        camera={5.5}
        tintHue={220}
        tintAmount={0.00}
      />
    </div>
  );
}
\`\`\`

## Exact implementation source

Complete registered source bundle: [https://threeui.com/source-code/liquid-form.json](https://threeui.com/source-code/liquid-form.json)

Required registered files:

- \`src/shaders/liquid-form/LiquidFormBackground.tsx\` — component · SHA-256 \`95e43ab2c5312ff94e0aa4cd63902f2b994a7ed881661e279a04c30c1c36234a\`
- \`src/shaders/liquid-form/liquidFormShaders.ts\` — shader-source · SHA-256 \`5ec6722aa75a4b3e5815ae811105201668e8d88a060d4bab46b38e87f136c7ea\`
- \`src/shaders/threeui.css\` — shared-style · SHA-256 \`efe4447139f1358dd8e9be68edf6fa46cbefbd1de423a4d6c439ca61d2c8eccf\`

## Implementation requirements

- Preserve the authored structure, styling, shaders, motion, interactions, responsive behavior, dependencies, and asset paths described by the source.
- Use the configured \`<LiquidFormBackground />\` usage above, including the selected variant and props.
- Build directly in the destination project. Do not embed the ThreeUI documentation page and do not approximate the result from its rendered appearance.
- Fetch and read the complete source before editing. If the source cannot be retrieved, stop and report that instead of recreating it.
- After implementation, verify the rendered result and its interactions in the browser.`;
