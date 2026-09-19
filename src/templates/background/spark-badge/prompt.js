export const SPARK_BADGE_PROMPT = `# Integrate <SparkBadge /> from ThreeUI using its exact source

You are working in an existing application. Implement this component from the exact source linked or included below. Do not recreate it from the preview, screenshot, description, or filename.

Component: \`SparkBadge\`
Variant: **Badge** (\`badge\`)
Runtime: Canvas 2D
Source revision: \`SHA-256 a8eefdee0d87\`

Reference brief:
The original Codex credential assembled from luminous rain and curl-noise embers.

## Current configured usage

\`\`\`tsx
import { SparkBadge } from "@designcodeio/threeui";
import "@designcodeio/threeui/style.css";

export function Scene() {
  return (
    <div className="shader-frame">
      <SparkBadge
        speed={1.00}
        particleAmount={1.00}
        rainAmount={1.00}
        turbulence={1.00}
        spread={1.00}
      />
    </div>
  );
}
\`\`\`

## Exact implementation source

Complete registered source bundle: [https://threeui.com/source-code/spark-badge.json](https://threeui.com/source-code/spark-badge.json)

Required registered files:

- \`src/shaders/spark-badge/SparkBadge.tsx\` — component · SHA-256 \`2968baef448957765473ccd031f4337d376dbace5e8ec5434d0a57299ffecdda\`
- \`src/shaders/spark-badge/spark-badge.html\` — scene-source · SHA-256 \`a8eefdee0d87deefae9b8b8dac4d79c0ee41447578a78090cad9c956e33ccf90\`
- \`src/shaders/threeui.css\` — shared-style · SHA-256 \`efe4447139f1358dd8e9be68edf6fa46cbefbd1de423a4d6c439ca61d2c8eccf\`

## Implementation requirements

- Preserve the authored structure, styling, shaders, motion, interactions, responsive behavior, dependencies, and asset paths described by the source.
- Use the configured \`<SparkBadge />\` usage above, including the selected variant and props.
- Build directly in the destination project. Do not embed the ThreeUI documentation page and do not approximate the result from its rendered appearance.
- Fetch and read the complete source before editing. If the source cannot be retrieved, stop and report that instead of recreating it.
- After implementation, verify the rendered result and its interactions in the browser.`;
