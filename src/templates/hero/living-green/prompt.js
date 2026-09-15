/** Exact pasted design body for Copy full prompt (trim outer whitespace only). */
export const SYLVA_PROMPT = `# Integrate <SylvaHero /> from ThreeUI using its exact source

You are working in an existing application. Implement this component from the exact source linked or included below. Do not recreate it from the preview, screenshot, description, or filename.

Component: \`SylvaHero\`
Variant: **Living Green** (\`living-green\`)
Runtime: Full HTML + DOM/CSS + local Three.js
Source revision: \`SHA-256 05f359ce157a\`

Reference brief:
The moss-root world with pale flowers, ferns, drifting pollen, the landing butterfly, and native liquid-metal controls behind the full hero layout.

## Current configured usage

\`\`\`tsx
import { SylvaHero } from "@designcodeio/threeui";
import "@designcodeio/threeui/style.css";

export function Scene() {
  return (
    <div className="shader-frame">
      <SylvaHero
        variant="living-green"
        headingFont="lexend"
        bodyFont="lexend"
        headingWeight="300"
        bodyWeight="300"
        primaryColor="#ffffff"
        headingSize={63}
        bodySize={16.5}
        headingLetterSpacing={-0.006}
      />
    </div>
  );
}
\`\`\`

## Exact implementation source

Canonical HTML: [inner-green-3d.html](https://threeui.com/landing-pages/inner-green-3d.html)
Complete registered source bundle: [https://threeui.com/source-code/sylva-hero.json](https://threeui.com/source-code/sylva-hero.json)

Required registered files:

- \`src/shaders/landing-pages/LandingPages.tsx\` — component · SHA-256 \`4d379461ad00eb4de7900df312878035383de7e1ed4e13283b8143a2eea9d30a\`
- \`src/shaders/landing-pages/pageTypography.ts\` — controls-source · SHA-256 \`809cc65797d531cd3b3ca5a56815d55d24b3ee8d293e4e4bad6fdfe6c83244cc\`
- \`src/shaders/landing-pages/pageRecipes.ts\` — controls-source · SHA-256 \`c9d9849cc255bac2d1d938d088c50917f84916f1c516d2bbb27fcfd803523233\`
- \`src/shaders/landing-pages/LandingPageFrame.tsx\` — frame-component · SHA-256 \`61de2cc50888aac4ac5557420b07fa47ed3543bb57c1e0055fafdefa53dbaa78\`
- \`public/landing-pages/inner-green-3d.html\` — canonical-source · SHA-256 \`69c3694bd63f44ef9f007ebe4dac57a83e4402e0cdf6b54dd10b96dd4f05e197\`
- \`public/landing-pages/inner-green-assets/three.min.js\` — three-runtime · SHA-256 \`8a5f7249903b54d30f79f708699d2fed2d6a1d0741a4cd41377d1f01bb5a2271\`
- \`src/shaders/threeui.css\` — shared-style · SHA-256 \`efe4447139f1358dd8e9be68edf6fa46cbefbd1de423a4d6c439ca61d2c8eccf\`

Required binary assets:

Binary assets cannot be represented as executable text. Copy each asset byte-for-byte from the ThreeUI package and verify its hash:

| Path | MIME type | Bytes | SHA-256 |
| --- | --- | ---: | --- |
| \`public/landing-pages/inner-green-assets/card-ecostove.jpg\` | image/jpeg | 290988 | \`70ce084084902bc502f00c366405b661ecdff90dee95d363b36a6e146829e433\` |
| \`public/landing-pages/inner-green-assets/card-ethos.jpg\` | image/jpeg | 316720 | \`337627390f499b3ae272cec9e2f83c817694a82f42e1aa10a7b26a2c7d679dff\` |
| \`public/landing-pages/inner-green-assets/lexend-latin.woff2\` | font/woff2 | 39692 | \`1ec8f6ee2750554b4bc59ff0b507d316a82a7ba37e0e5bebc41d3bd9b9faad46\` |

## Implementation requirements

- Preserve the authored structure, styling, shaders, motion, interactions, responsive behavior, dependencies, and asset paths described by the source.
- Use the configured \`<SylvaHero />\` usage above, including the selected variant and props.
- Build directly in the destination project. Do not embed the ThreeUI documentation page and do not approximate the result from its rendered appearance.
- Fetch and read the complete source before editing. If the source cannot be retrieved, stop and report that instead of recreating it.
- After implementation, verify the rendered result and its interactions in the browser.
`;
