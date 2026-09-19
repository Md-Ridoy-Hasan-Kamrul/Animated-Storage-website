export const RECTANGLE_BUTTONS_PROMPT = `# Integrate <RectangleButtons /> from ThreeUI using its exact source

You are working in an existing application. Implement this component from the exact source linked or included below. Do not recreate it from the preview, screenshot, description, or filename.

Component: \`RectangleButtons\`
Variant: **Dark Glass** (\`dark-pill\`)
Runtime: DOM + CSS
Source revision: \`SHA-256 ff30e28c2781\`

Reference brief:
A deep charcoal glass rectangle with a softly revolving inner highlight and restrained metallic type.

## Current configured usage

\`\`\`tsx
import { RectangleButtons } from "@designcodeio/threeui";
import "@designcodeio/threeui/style.css";

export function Scene() {
  return (
    <div className="shader-frame">
      <RectangleButtons
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

Complete registered source bundle: [https://threeui.com/source-code/rectangle-buttons.json](https://threeui.com/source-code/rectangle-buttons.json)

Required registered files:

- \`src/shaders/rectangle-buttons/RectangleButtons.tsx\` — component · SHA-256 \`ff30e28c278193a90f63c93aba77bc6c5c6a8a8f01ec8882392957851146f083\`
- \`src/shaders/section-elements/SectionElements.tsx\` — variant-component · SHA-256 \`c3602974a5be61abdbb040e7416504e2682f42616d60b6a73437dc3b04637b78\`
- \`src/shaders/section-elements/section-elements.css\` — component-style · SHA-256 \`91abd6ed53f463673d0eb2c3c91040c3574287663ca1313e6d92b8448f0b6d11\`
- \`src/shaders/neuform-isolated/NeuformIsolatedEffects.tsx\` — variant-component · SHA-256 \`fe9856234253bc3c1a13b3afb84f3d84644dfa6d578e7203bb3e1dd5eced1b75\`
- \`src/shaders/neuform-isolated/sources/launch-button.html\` — variant-source · SHA-256 \`db8303b70c0322d0c7877b32e8230ce906111ee746fa5460f8aeedf59915a900\`
- \`src/shaders/neuform-isolated/sources/dot-border-button.html\` — variant-source · SHA-256 \`eb3ef1de8c8af80bf3f532630c60ed4ee90f10cd645d136f284417e75bda6584\`
- \`src/shaders/neuform-isolated/sources/floating-dots-cta.html\` — variant-source · SHA-256 \`28f53a8d14920bbfede14b0cf096ebddef5dfbee87d46cfc70bdfb612c5796da\`
- \`src/shaders/neuform-isolated/sources/sliding-text-cta.html\` — variant-source · SHA-256 \`e24ce6a519cfbafe082deb6eedb801b97b36ba6b8ccea9a81166c9b6edb6e770\`
- \`src/shaders/neuform-isolated/sources/gradient-beam-cta.html\` — variant-source · SHA-256 \`90a5961c1e7374ecf1d4efa1e3ef051048a08567933491a91c67280d4eac9a42\`
- \`src/shaders/neuform-isolated/sources/gradient-pill-button.html\` — variant-source · SHA-256 \`8fcb0596004786b6a72ca7bf1b2c379ef28ccf78f9de606a83d1572567a8986b\`
- \`src/shaders/neuform-isolated/sources/generate-button.html\` — variant-source · SHA-256 \`e99ab802a1e1f1a7b1444727e26197c43f8cfe328ca6e2cd45b6fbb3bce694c6\`
- \`src/shaders/neuform-isolated/sources/glassmorphism-cta.html\` — variant-source · SHA-256 \`b535a5f6e778924906fa1625cf610841b847d52c17487dad83215dd5921a3863\`
- \`src/shaders/neuform-isolated/sources/spinning-border-button.html\` — variant-source · SHA-256 \`d7150ca6ca4ad7975ba183c368b25a5de266e6a018c801b89720b8e8e3fab8a7\`
- \`src/shaders/neuform-isolated/sources/gradient-cta.html\` — variant-source · SHA-256 \`05e611c9ec16848e00ce81e4c8e186167da592c49755408cbc563c2ea611458d\`
- \`src/shaders/lumen-cta/LumenCta.tsx\` — variant-component · SHA-256 \`437b62c7b9b3009f1fc80fc24e81f2014c1bab9567ba1afcff314b72c6b0b519\`
- \`src/shaders/lumen-cta/lumen-cta.css\` — variant-style · SHA-256 \`a19f7e01d0a0580afaedfaccd7a1acb1a74a004ded3e5269d59da986e085c151\`
- \`src/shaders/lumen-cta/sources/lumen.html\` — variant-source · SHA-256 \`8992e7c0ceb4c306502f5c296f1fd3e8c8602372d1a217fa1f3b5e49445ec28d\`
- \`src/shaders/threeui.css\` — shared-style · SHA-256 \`efe4447139f1358dd8e9be68edf6fa46cbefbd1de423a4d6c439ca61d2c8eccf\`

Required binary assets:

Binary assets cannot be represented as executable text. Copy each asset byte-for-byte from the ThreeUI package and verify its hash:

| Path | MIME type | Bytes | SHA-256 |
| --- | --- | ---: | --- |
| \`src/shaders/section-elements/assets/sf-light.woff2\` | font/woff2 | 42420 | \`839aeb08fa40d65bb15375f966694ba84ea734a86307e6894005a85597e8ff98\` |
| \`src/shaders/section-elements/assets/sf-regular.woff2\` | font/woff2 | 36296 | \`14a89688aab531bfbf3ace6d2e80f3bab95e9bbd8d6a96c6a5a8fcdcd3dba0f2\` |
| \`src/shaders/section-elements/assets/sf-medium.woff2\` | font/woff2 | 41808 | \`ef8ab5de42a601c6258d5a196ca95b41153c30050fc8dcae01ac2124d7883cf6\` |
| \`src/shaders/section-elements/assets/sf-semibold.woff2\` | font/woff2 | 42084 | \`4a2bbcd0a3f5772503ad26bf9d3d1147c8a03841f8613a71005948a55058faa3\` |
| \`src/shaders/section-elements/assets/sf-bold.woff2\` | font/woff2 | 40116 | \`bf987268f3fe5aa2497ba50e446a24d27c2983ef14e708251b89b2bc695e52c9\` |

## Implementation requirements

- Preserve the authored structure, styling, shaders, motion, interactions, responsive behavior, dependencies, and asset paths described by the source.
- Use the configured \`<RectangleButtons />\` usage above, including the selected variant and props.
- Build directly in the destination project. Do not embed the ThreeUI documentation page and do not approximate the result from its rendered appearance.
- Fetch and read the complete source before editing. If the source cannot be retrieved, stop and report that instead of recreating it.
- After implementation, verify the rendered result and its interactions in the browser.
`;
