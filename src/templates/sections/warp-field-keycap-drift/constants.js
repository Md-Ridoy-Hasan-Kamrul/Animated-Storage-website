/** Keycap Drift Warp Field — host + provenance constants. */

export const CARD_ID = 'warp-field-keycap-drift';
export const CARD_TITLE = 'Keycap Drift Warp Field';
export const PAGE_TITLE = 'Keycap Drift Warp Field — Kmotion';
export const DETAIL_FALLBACK = '/templates/warp-field-keycap-drift';

export const PAGE_CLASS = 'warp-field-keycap-drift-page';
export const PAGE_HTML_CLASS = 'warp-field-keycap-drift-html';
export const FRAMED_HTML_CLASS = 'warp-field-keycap-drift-framed';
export const SHADER_FRAME_CLASS = 'shader-frame';

export const PAGE_BG = '#03070c';
export const PAGE_INK = '#e8f5ef';

export const SOURCE_REVISION = 'bd7c486164d8';
export const WARP_FIELD_VARIANT = 'keycaps';

export const WARP_FIELD_COMPONENT_SHA256 =
  'c78637ee3419deed6c364f4252ed77adfda3a215eb1b82510450a9b7fadefcbe';
export const WARP_FIELD_RENDERER_SHA256 =
  'c9872c53dd505dea2d87c79e34b9eedd358b5dc32b385d48280fe252f595a44e';
export const THREEUI_CSS_SHA256 =
  'efe4447139f1358dd8e9be68edf6fa46cbefbd1de423a4d6c439ca61d2c8eccf';
export const THREE128_MODULE_SHA256 =
  'af527c374b56b8688737a42d7fcea7cb8aaeb57a4e3c6da98b4dffd55bcc3514';

export const WARP_FIELD_COMPONENT_BYTES = 1831;
export const WARP_FIELD_RENDERER_BYTES = 22681;
export const THREEUI_CSS_BYTES = 40715;
export const THREE128_MODULE_BYTES = 1140878;

export const WARP_FIELD_KEYCAP_DRIFT_PROPS = {
  variant: 'keycaps',
  speed: 15,
  streakOpacity: 0.6,
  tileOpacity: 0.9,
  fov: 75,
  hue: 0,
  saturation: 1,
  brightness: 1,
};

export const ASSET_MANIFEST = [
  {
    path: 'src/templates/sections/warp-field-keycap-drift/sources/WarpFieldBackground.tsx.txt',
    bytes: WARP_FIELD_COMPONENT_BYTES,
    sha256: WARP_FIELD_COMPONENT_SHA256,
  },
  {
    path: 'src/templates/sections/warp-field-keycap-drift/sources/warpFieldRenderer.ts.txt',
    bytes: WARP_FIELD_RENDERER_BYTES,
    sha256: WARP_FIELD_RENDERER_SHA256,
  },
  {
    path: 'src/templates/sections/warp-field-keycap-drift/sources/threeui.css',
    bytes: THREEUI_CSS_BYTES,
    sha256: THREEUI_CSS_SHA256,
  },
  {
    path: 'vendor/three128/three.module.js',
    bytes: THREE128_MODULE_BYTES,
    sha256: THREE128_MODULE_SHA256,
  },
];

export const PREVIEW_STILL =
  '/images/Assets Keycap Drift Warp Field/KeycapDriftWarpField.png';
export const DETAIL_CARD_IMAGE_COUNT = 4;

export const BACK_BUTTON_CLASS =
  'absolute top-4 left-4 z-50 flex items-center gap-2 rounded-full bg-white/10 px-3 py-2 text-sm text-white backdrop-blur-md transition hover:bg-white/20';
export const BACK_ICON_SIZE = 16;
export const BACK_ICON_STROKE = 2;
export const BACK_LABEL = 'Back';
export const HISTORY_CAN_GO_BACK_MIN = 0;
