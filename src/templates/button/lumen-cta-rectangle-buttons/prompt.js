export const LUMEN_CTA_RECTANGLE_BUTTONS_PROMPT = `# Integrate <RectangleButtons /> from ThreeUI using its exact source

You are working in an existing application. Implement this component from the exact source linked or included below. Do not recreate it from the preview, screenshot, description, or filename.

Component: \`RectangleButtons\`
Variant: **Lumen CTA** (\`lumen-cta\`)
Runtime: DOM + CSS
Source revision: \`SHA-256 ff30e28c2781\`

Reference brief:
The authored six-stop violet gradient pill with its inner highlight, cast glow, and trailing open ring.

## Current configured usage

\`\`\`tsx
import { RectangleButtons } from "@designcodeio/threeui";
import "@designcodeio/threeui/style.css";

export function Scene() {
  return (
    <div className="shader-frame">
      <RectangleButtons
        variant="lumen-cta"
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

Complete registered source bundle: [https://threeui.com/source-code/lumen-cta.json](https://threeui.com/source-code/lumen-cta.json)

Required registered files:

- \`src/shaders/lumen-cta/LumenCta.tsx\` — component · SHA-256 \`437b62c7b9b3009f1fc80fc24e81f2014c1bab9567ba1afcff314b72c6b0b519\`
- \`src/shaders/lumen-cta/lumen-cta.css\` — style-source · SHA-256 \`a19f7e01d0a0580afaedfaccd7a1acb1a74a004ded3e5269d59da986e085c151\`
- \`src/shaders/lumen-cta/sources/lumen.html\` — canonical-source · SHA-256 \`8992e7c0ceb4c306502f5c296f1fd3e8c8602372d1a217fa1f3b5e49445ec28d\`
- \`src/shaders/threeui.css\` — shared-style · SHA-256 \`efe4447139f1358dd8e9be68edf6fa46cbefbd1de423a4d6c439ca61d2c8eccf\`

## Implementation requirements

- Preserve the authored structure, styling, shaders, motion, interactions, responsive behavior, dependencies, and asset paths described by the source.
- Use the configured \`<RectangleButtons />\` usage above, including the selected variant and props.
- Build directly in the destination project. Do not embed the ThreeUI documentation page and do not approximate the result from its rendered appearance.
- Fetch and read the complete source before editing. If the source cannot be retrieved, stop and report that instead of recreating it.
- After implementation, verify the rendered result and its interactions in the browser.
`;
