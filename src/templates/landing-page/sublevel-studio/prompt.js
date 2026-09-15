/** Exact pasted design body for Copy full prompt (trim outer whitespace only). */
export const SUBLEVEL_STUDIO_PROMPT = `# Integrate <SublevelStudioLandingPage /> from ThreeUI using its exact source

You are working in an existing application. Implement this component from the exact source linked or included below. Do not recreate it from the preview, screenshot, description, or filename.

Component: \`SublevelStudioLandingPage\`
Runtime: Full HTML + DOM/CSS + Three.js 0.160 + inlined media
Source revision: \`SHA-256 91db5c1bb779\`

Reference brief:
A digital studio and brand workshop presented as a tactile black-and-white operating system: modular project cells, a floating utility dock, service diagnostics, team profiles, lab experiments, and a terminal-like contact close.

## Current configured usage

\`\`\`tsx
import { SublevelStudioLandingPage } from "@designcodeio/threeui";
import "@designcodeio/threeui/style.css";

export function Scene() {
  return (
    <div className="shader-frame">
      <SublevelStudioLandingPage />
    </div>
  );
}
\`\`\`

## Exact implementation source

Canonical HTML: [sublevel-studio.html](https://threeui.com/landing-pages/sublevel-studio.html)
Complete registered source bundle: [https://threeui.com/source-code/sublevel-studio-landing-page.json](https://threeui.com/source-code/sublevel-studio-landing-page.json)

Required registered files:

- \`src/shaders/landing-pages/LandingPages.tsx\` — component · SHA-256 \`4d379461ad00eb4de7900df312878035383de7e1ed4e13283b8143a2eea9d30a\`
- \`src/shaders/landing-pages/LandingPageFrame.tsx\` — frame-component · SHA-256 \`61de2cc50888aac4ac5557420b07fa47ed3543bb57c1e0055fafdefa53dbaa78\`
- \`public/landing-pages/sublevel-studio.html\` — canonical-source · SHA-256 \`91db5c1bb779687990b01f226a02d7fe7cf7954a40ba8053c4d6b7abf82232e3\`
- \`src/shaders/threeui.css\` — shared-style · SHA-256 \`efe4447139f1358dd8e9be68edf6fa46cbefbd1de423a4d6c439ca61d2c8eccf\`

## Implementation requirements

- Preserve the authored structure, styling, shaders, motion, interactions, responsive behavior, dependencies, and asset paths described by the source.
- Use the configured \`<SublevelStudioLandingPage />\` usage above, including the selected variant and props.
- Build directly in the destination project. Do not embed the ThreeUI documentation page and do not approximate the result from its rendered appearance.
- Fetch and read the complete source before editing. If the source cannot be retrieved, stop and report that instead of recreating it.
- After implementation, verify the rendered result and its interactions in the browser.
`;
