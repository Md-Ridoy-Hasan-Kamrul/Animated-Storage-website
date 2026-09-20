/** Source-docs bodies for the Sublevel Studio details panel (Usage / Code / Skill.md). */

export const SUBLEVEL_STUDIO_USAGE = `import { SublevelStudioLandingPage } from "@designcodeio/threeui";
import "@designcodeio/threeui/style.css";

export function Scene() {
  return (
    <div className="shader-frame">
      <SublevelStudioLandingPage />
    </div>
  );
}`;

export const SUBLEVEL_STUDIO_SKILL = `---
name: add-sublevel-studio-landing-page
description: "Build Sublevel Studio from its verified authored source using Full HTML + DOM/CSS + JavaScript, including the complete renderer, interactions, and required assets. Use when Codex needs to implement, port, or adapt this effect without requiring the ThreeUI package or reconstructing the visual from an approximation."
---

# Build Sublevel Studio

## Description

An interactive, full-page experience of an agency site with a Three.js-powered background, a flying glass top navigation, an interactive full-page menu, an experimental particle scroll, a VHS-overlaid footer, and a machine-mode terminal.

Recreate the authored behavior from the verified source, not from screenshots or the abbreviated orchestration sample in this skill. The implementation may live directly in the target project and does not require \`@designcodeio/threeui\`.

## Technologies

- React iframe host
- Byte-exact complete authored HTML document
- Same-project local source URL
- Five local font files, a noise texture, and two SVG icons

## Verified source material

- \`src/shaders/landing-pages/LandingPages.tsx\`
- \`public/landing-pages/sublevel.html — byte-exact complete page\`
- \`public/landing-pages/sublevel-studio-assets/ — 9 local font and icon assets\`

Source revision: \`SHA-256 c04c64d8524a\`

## Implementation steps

1. Open every verified source file listed above and identify the renderer, host lifecycle, styles, and assets before editing.
2. Copy the complete Sublevel Studio HTML file byte-for-byte to /landing-pages/sublevel.html; do not extract, rewrite, shorten, or rebrand any section.
3. Preserve every embedded style, script, media payload, text string, interaction, responsive rule, and document-level lifecycle.
4. Keep every relative local asset at the exact path expected by the original document.
5. Load the local document in a full-size iframe whose permissions retain the authored forms, modals, downloads, popups, scripts, and same-origin resources.
6. Lazy-load only the React host bundle; do not import the complete HTML into the application JavaScript graph.
7. Give the local component a sized, overflow-controlled parent and verify desktop, mobile, reduced-motion, and context-loss behavior.

Asset handling: Copy sublevel.html byte-for-byte and keep all 9 files under sublevel-studio-assets/ at exactly that relative path. The page needs no network access.

## Local component example

Import the copied local component rather than a package entrypoint:

\`\`\`tsx
import { SublevelStudioLandingPage } from "./effects/sublevel-studio-landing-page/SublevelStudioLandingPage";
import "./effects/sublevel-studio-landing-page/styles.css";

export function Scene() {
  return <div className="effect-frame"><SublevelStudioLandingPage /></div>;
}
\`\`\`

## Core renderer pattern

This excerpt documents orchestration only. Copy the exact shader, geometry, pass, and interaction code from the verified source files.

\`\`\`tsx
<LandingPageFrame title="Sublevel Studio" sourceUrl="/landing-pages/sublevel.html" />
\`\`\`

## Behavior contract

- Runtime: Full HTML + DOM/CSS + JavaScript
- Passes: 1 sandboxed full-document renderer
- Interaction: Original pointer, keyboard, scroll, and navigation interactions
- Assets: Two local SVG icons, five local variable fonts, and a background noise texture
- **document** (fixed): Complete original sublevel.html, byte-for-byte
- **sourceUrl** (fixed): /landing-pages/sublevel.html
- **headingFont** (optional): Geist | Inter | Inter Tight | Onest
- **bodyFont** (optional): Geist | Inter | Inter Tight | Onest
- **headingWeight** (optional): 400 | 500 | 600 | 700
- **bodyWeight** (optional): 300 | 400 | 500 | 600
- **primaryColor** (optional): Hex color — the vermilion accent and the ember tint it drives
- **typography** (optional): Heading size 30–72px ceiling + body size + heading tracking
- **layout** (responsive): Original full landing page inside the preview frame
- **interaction** (original): Scroll + pointer + keyboard + nav
- **assets** (local): 9 packaged files in public/landing-pages/sublevel-studio-assets/; no network request

## Verification

1. Compare the rendered composition, animation timing, pointer behavior, and state transitions with the source implementation.
2. Exercise resize, high-DPI, mobile/coarse-pointer, reduced-motion, tab visibility, and WebGL context-loss paths where applicable.
3. Confirm every animation frame, observer, listener, geometry, buffer, texture, framebuffer, material, and renderer is released on teardown.
4. Check the browser console and confirm the effect renders at native-or-better backing resolution.

## Guardrails

- Do not substitute a visually similar package, demo, shader, or runtime.
- Do not approximate, reconstruct, or simplify the authored GLSL, render passes, geometry, interaction state, or assets.
- Keep exact source and asset hashes under regression tests when the source project provides them.
- Adapt only the surrounding host boundary needed by the target project; keep renderer behavior intact.
`;
