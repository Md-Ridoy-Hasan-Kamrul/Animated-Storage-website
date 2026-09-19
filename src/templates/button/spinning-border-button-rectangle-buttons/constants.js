/** Spinning Border Button Rectangle Buttons — host + provenance constants. */

export const CARD_ID = 'spinning-border-button-rectangle-buttons';
export const CARD_TITLE = 'Spinning Border Button Rectangle Buttons';
export const PAGE_TITLE = 'Spinning Border Button Rectangle Buttons — Kmotion';
export const DETAIL_FALLBACK = '/templates/spinning-border-button-rectangle-buttons';

export const PAGE_CLASS = 'spinning-border-button-rectangle-buttons-page';
export const PAGE_HTML_CLASS = 'spinning-border-button-rectangle-buttons-html';
export const FRAMED_HTML_CLASS = 'spinning-border-button-rectangle-buttons-framed';
export const SHADER_FRAME_CLASS = 'shader-frame';
export const HOST_CLASS = 'threeui-background rectangle-buttons-collection';

export const PAGE_BG = '#111318';
export const PAGE_INK = 'rgba(255, 255, 255, 0.7)';

export const SOURCE_REVISION = 'ff30e28c2781';
export const VARIANT_ID = 'spinning-border-button';
export const DEFAULT_MODE = 'dark';
export const SOURCE_URL = '/effects/spinning-border-button.html';
export const FRAME_TITLE = 'Spinning Border button';
export const FRAME_SANDBOX = 'allow-scripts';
export const BUTTON_LABEL = 'Request Demo';

export const NEUFORM_ISOLATED_EFFECTS_SHA256 =
  'fe9856234253bc3c1a13b3afb84f3d84644dfa6d578e7203bb3e1dd5eced1b75';
export const SPINNING_BORDER_BUTTON_HTML_SHA256 =
  'd7150ca6ca4ad7975ba183c368b25a5de266e6a018c801b89720b8e8e3fab8a7';
export const THREEUI_CSS_SHA256 =
  'efe4447139f1358dd8e9be68edf6fa46cbefbd1de423a4d6c439ca61d2c8eccf';

export const NEUFORM_ISOLATED_EFFECTS_BYTES = 93888;
export const SPINNING_BORDER_BUTTON_HTML_BYTES = 5607;
export const THREEUI_CSS_BYTES = 40715;
export const PUBLIC_SPINNING_BORDER_BUTTON_HTML_SHA256 =
  'fb3128519a5e4b85e3ad3cd1d4af21d736c0446a1fd45106356f2fd4e86b3d5b';
export const PUBLIC_SPINNING_BORDER_BUTTON_HTML_BYTES = 9372;

export const SPINNING_BORDER_BUTTON_DEFAULT_PROPS = {
  variant: 'spinning-border-button',
  mode: 'dark',
  hue: 0,
  saturation: 1,
  brightness: 1,
};

const SRC = 'src/templates/button/spinning-border-button-rectangle-buttons/sources';

export const ASSET_MANIFEST = [
  {
    path: `${SRC}/NeuformIsolatedEffects.tsx.txt`,
    bytes: NEUFORM_ISOLATED_EFFECTS_BYTES,
    sha256: NEUFORM_ISOLATED_EFFECTS_SHA256,
  },
  {
    path: `${SRC}/spinning-border-button.html`,
    bytes: SPINNING_BORDER_BUTTON_HTML_BYTES,
    sha256: SPINNING_BORDER_BUTTON_HTML_SHA256,
  },
  {
    path: `${SRC}/threeui.css`,
    bytes: THREEUI_CSS_BYTES,
    sha256: THREEUI_CSS_SHA256,
  },
  {
    path: 'public/effects/spinning-border-button.html',
    bytes: PUBLIC_SPINNING_BORDER_BUTTON_HTML_BYTES,
    sha256: PUBLIC_SPINNING_BORDER_BUTTON_HTML_SHA256,
  },
];

export const PREVIEW_STILL =
  '/images/Assets%20Spinning%20Border%20Button%20Rectangle%20Buttons/SpinningBorderButtonRectangleButtons.png';
export const PREVIEW_STILL_DISK =
  'public/images/Assets Spinning Border Button Rectangle Buttons/SpinningBorderButtonRectangleButtons.png';
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
