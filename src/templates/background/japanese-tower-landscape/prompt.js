/** Exact pasted design body for Copy full prompt (trim outer whitespace only). */
export const JAPANESE_TOWER_LANDSCAPE_PROMPT = `# Integrate <JapaneseTowerLandscape /> from ThreeUI using its exact source

You are working in an existing application. Implement this component from the exact source linked or included below. Do not recreate it from the preview, screenshot, description, or filename.

Component: \`JapaneseTowerLandscape\`
Variant: **Japan** (\`japan\`)
Runtime: Three.js r149 + Canvas 2D
Source revision: \`SHA-256 7810e7163c02\`

Reference brief:
A Japanese tenshu with an ishigaki stone base, plastered storeys, and flying tiled eaves.

## Current configured usage

\`\`\`tsx
import { JapaneseTowerLandscape } from "@designcodeio/threeui";
import "@designcodeio/threeui/style.css";

export function Scene() {
  return (
    <div className="shader-frame">
      <JapaneseTowerLandscape
        country="japan"
      />
    </div>
  );
}
\`\`\`

## Exact implementation source

Complete registered source bundle: [https://threeui.com/source-code/japanese-tower.json](https://threeui.com/source-code/japanese-tower.json)

Required registered files:

- \`src/shaders/japanese-tower/JapaneseTowerLandscape.tsx\` — component · SHA-256 \`3ad3de77dabdcf9f2e0d3e7bb1347089249eef68e2b8db9ce98c3acc0920e411\`
- \`src/shaders/japanese-tower/Towers.html\` — canonical-source · SHA-256 \`7810e7163c027f654235032fb1eed48846b68bf80f5b1c1c4292e01694b71f3d\`
- \`src/shaders/threeui.css\` — shared-style · SHA-256 \`efe4447139f1358dd8e9be68edf6fa46cbefbd1de423a4d6c439ca61d2c8eccf\`

## Implementation requirements

- Preserve the authored structure, styling, shaders, motion, interactions, responsive behavior, dependencies, and asset paths described by the source.
- Use the configured \`<JapaneseTowerLandscape />\` usage above, including the selected variant and props.
- Build directly in the destination project. Do not embed the ThreeUI documentation page and do not approximate the result from its rendered appearance.
- Fetch and read the complete source before editing. If the source cannot be retrieved, stop and report that instead of recreating it.
- After implementation, verify the rendered result and its interactions in the browser.
`;
