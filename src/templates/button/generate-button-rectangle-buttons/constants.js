/** Generate Button Rectangle Buttons — host + provenance constants. */

export const CARD_ID = 'generate-button-rectangle-buttons';
export const CARD_TITLE = 'Generate Button Rectangle Buttons';
export const PAGE_TITLE = 'Generate Button Rectangle Buttons — Kmotion';
export const DETAIL_FALLBACK = '/templates/generate-button-rectangle-buttons';

export const PAGE_CLASS = 'generate-button-rectangle-buttons-page';
export const PAGE_HTML_CLASS = 'generate-button-rectangle-buttons-html';
export const FRAMED_HTML_CLASS = 'generate-button-rectangle-buttons-framed';
export const SHADER_FRAME_CLASS = 'shader-frame';
export const HOST_CLASS = 'threeui-background rectangle-buttons-collection';

export const PAGE_BG = '#111318';
export const PAGE_INK = 'rgba(255, 255, 255, 0.7)';

export const SOURCE_REVISION = 'ff30e28c2781';
export const VARIANT_ID = 'generate-button';
export const DEFAULT_MODE = 'dark';
export const SOURCE_URL = '/effects/generate-button.html';
export const FRAME_TITLE = 'Generate button';
export const FRAME_SANDBOX = 'allow-scripts';
export const BUTTON_LABEL = 'Generate';

export const NEUFORM_ISOLATED_EFFECTS_SHA256 =
  'fe9856234253bc3c1a13b3afb84f3d84644dfa6d578e7203bb3e1dd5eced1b75';
export const GENERATE_BUTTON_HTML_SHA256 =
  'e99ab802a1e1f1a7b1444727e26197c43f8cfe328ca6e2cd45b6fbb3bce694c6';
export const THREEUI_CSS_SHA256 =
  'efe4447139f1358dd8e9be68edf6fa46cbefbd1de423a4d6c439ca61d2c8eccf';

export const NEUFORM_ISOLATED_EFFECTS_BYTES = 93888;
export const GENERATE_BUTTON_HTML_BYTES = 15542;
export const THREEUI_CSS_BYTES = 40715;
export const PUBLIC_GENERATE_BUTTON_HTML_SHA256 =
  '5b27e31854adb90451ac42bd36fa1e4d0ed72c9fd4ef2b93f6458db6f6566207';
export const PUBLIC_GENERATE_BUTTON_HTML_BYTES = 19313;

export const GENERATE_BUTTON_DEFAULT_PROPS = {
  variant: 'generate-button',
  mode: 'dark',
  hue: 0,
  saturation: 1,
  brightness: 1,
};

const SRC = 'src/templates/button/generate-button-rectangle-buttons/sources';

export const ASSET_MANIFEST = [
  {
    path: `${SRC}/NeuformIsolatedEffects.tsx.txt`,
    bytes: NEUFORM_ISOLATED_EFFECTS_BYTES,
    sha256: NEUFORM_ISOLATED_EFFECTS_SHA256,
  },
  {
    path: `${SRC}/generate-button.html`,
    bytes: GENERATE_BUTTON_HTML_BYTES,
    sha256: GENERATE_BUTTON_HTML_SHA256,
  },
  {
    path: `${SRC}/threeui.css`,
    bytes: THREEUI_CSS_BYTES,
    sha256: THREEUI_CSS_SHA256,
  },
  {
    path: 'public/effects/generate-button.html',
    bytes: PUBLIC_GENERATE_BUTTON_HTML_BYTES,
    sha256: PUBLIC_GENERATE_BUTTON_HTML_SHA256,
  },
];

export const PREVIEW_STILL =
  '/images/Assets%20Generate%20Button%20Rectangle%20Buttons/GenerateButtonRectangleButtons.png';
export const PREVIEW_STILL_DISK =
  'public/images/Assets Generate Button Rectangle Buttons/GenerateButtonRectangleButtons.png';
export const MIN_PREVIEW_BYTES = 10_000;

export const HUE_MIN = -180;
export const HUE_MAX = 180;
export const SATURATION_MIN = 0;
export const SATURATION_MAX = 2;
export const BRIGHTNESS_MIN = 0.35;
export const BRIGHTNESS_MAX = 1.65;

export const BACK_BUTTON_CLASS =
  'absolute top-4 left-4 z-50 flex items-center gap-2 rounded-full bg-white/10 px-3 py-2 text-sm text-white backdrop-blur-md transition hover:bg-white/20';
export const BACK_ICON_SIZE = 16;
export const BACK_ICON_STROKE = 2;
export const BACK_LABEL = 'Back';
export const HISTORY_CAN_GO_BACK_MIN = 0;
