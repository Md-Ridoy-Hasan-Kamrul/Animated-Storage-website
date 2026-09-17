/** Exact pasted design body for Copy full prompt (trim outer whitespace only). */
export const ORIGINAL_3D_PAPER_PROMPT = `# Integrate <ThreeDPaper /> from ThreeUI using its exact source

You are working in an existing application. Implement this component from the exact source linked or included below. Do not recreate it from the preview, screenshot, description, or filename.

Component: \`ThreeDPaper\`
Variant: **Original** (\`original\`)
Runtime: Bundled Three.js r149 + custom GLSL + CanvasTexture
Source revision: \`SHA-256 8ec1b71c0dbc\`

Reference brief:
The original translucent Nocturne certificate with monochrome editorial typography, procedural glass texture, and a giant wordmark suspended behind the paper.

## Current configured usage

\`\`\`tsx
import { ThreeDPaper } from "@designcodeio/threeui";
import "@designcodeio/threeui/style.css";

export function Scene() {
  return (
    <div className="shader-frame">
      <ThreeDPaper
        variant="original"
      />
    </div>
  );
}
\`\`\`

## Exact implementation source

Complete registered source bundle: [https://threeui.com/source-code/3d-paper.json](https://threeui.com/source-code/3d-paper.json)

Required registered files:

- \`src/shaders/3d-paper/sources/3d-paper.html\` — canonical-source · SHA-256 \`8ec1b71c0dbcafbadf908100ae2a08045d0a1087c00a09d28245ef19366c7353\`
- \`src/shaders/3d-paper/sources/3d-paper-site-of-the-year.html\` — variant-source · SHA-256 \`fdef93fa96a3927430ef35411af70568c56b9488921aead8f36be36800689b7d\`
- \`src/shaders/3d-paper/sources/3d-paper-japanese.html\` — variant-source · SHA-256 \`4e929b9c3feaa635c6bc45e5c556243395318d4d7feb4d6a85190768b3b9f738\`
- \`src/shaders/3d-paper/sources/3d-paper-certificate.html\` — variant-source · SHA-256 \`0cb83da723e1a54f1a2e1124bc26a27d608afc3ba42ec0b116807e2e2ae5fb32\`
- \`src/shaders/3d-paper/ThreeDPaper.tsx\` — component · SHA-256 \`c2c8d1e9a0baf69c9e477e270ccde0254d6270918c106b62dffb5c7931223b20\`
- \`src/shaders/threeui.css\` — shared-style · SHA-256 \`efe4447139f1358dd8e9be68edf6fa46cbefbd1de423a4d6c439ca61d2c8eccf\`

## Implementation requirements

- Preserve the authored structure, styling, shaders, motion, interactions, responsive behavior, dependencies, and asset paths described by the source.
- Use the configured \`<ThreeDPaper />\` usage above, including the selected variant and props.
- Build directly in the destination project. Do not embed the ThreeUI documentation page and do not approximate the result from its rendered appearance.
- Fetch and read the complete source before editing. If the source cannot be retrieved, stop and report that instead of recreating it.
- After implementation, verify the rendered result and its interactions in the browser.
`;
