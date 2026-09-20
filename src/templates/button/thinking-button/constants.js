/** Thinking — host + provenance constants. */

export const CARD_ID = 'thinking-button';
export const CARD_TITLE = 'Thinking';
export const PAGE_TITLE = 'Thinking — Kmotion';
export const DETAIL_FALLBACK = '/templates/thinking-button';

export const PAGE_CLASS = 'thinking-button-page';
export const PAGE_HTML_CLASS = 'thinking-button-html';
export const FRAMED_HTML_CLASS = 'thinking-button-framed';
export const SHADER_FRAME_CLASS = 'shader-frame';
export const HOST_CLASS = 'threeui-background shader-buttons';

/** Matches ThreeUI thinking darkBackground. */
export const PAGE_BG = '#111318';
export const PAGE_INK = 'rgba(219, 234, 254, 0.7)';

export const SOURCE_REVISION = '6f56c4f91814';
export const VARIANT_ID = 'thinking-button';
export const DEFAULT_MODE = 'dark';
export const SOURCE_URL = '/effects/thinking-button.html';
export const FRAME_TITLE = 'Thinking Button luminous control';
export const FRAME_SANDBOX = 'allow-scripts';

export const NEUFORM_ISOLATED_EFFECTS_SHA256 =
  'fe9856234253bc3c1a13b3afb84f3d84644dfa6d578e7203bb3e1dd5eced1b75';
export const THINKING_BUTTON_HTML_SHA256 =
  '194da3529f2f80993db555de0387fc1e628bf8c216371803603750959a4fb11a';
export const THREEUI_CSS_SHA256 =
  'efe4447139f1358dd8e9be68edf6fa46cbefbd1de423a4d6c439ca61d2c8eccf';
export const PUBLIC_THINKING_HTML_SHA256 =
  '7d5919b1d66ce0944ec7fc7067d22d88550bc8ea0e32b818bc42530ef9bbe0cb';

export const NEUFORM_ISOLATED_EFFECTS_BYTES = 93888;
export const THINKING_BUTTON_HTML_BYTES = 11664;
export const THREEUI_CSS_BYTES = 40715;
export const PUBLIC_THINKING_HTML_BYTES = 19333;

export const THINKING_DEFAULT_PROPS = {
  variant: 'thinking-button',
  mode: 'dark',
  hue: 0,
  saturation: 1,
  brightness: 1,
};

const SRC = 'src/templates/button/thinking-button/sources';

export const ASSET_MANIFEST = [
  {
    path: `${SRC}/NeuformIsolatedEffects.tsx.txt`,
    bytes: NEUFORM_ISOLATED_EFFECTS_BYTES,
    sha256: NEUFORM_ISOLATED_EFFECTS_SHA256,
  },
  {
    path: `${SRC}/thinking-button.html`,
    bytes: THINKING_BUTTON_HTML_BYTES,
    sha256: THINKING_BUTTON_HTML_SHA256,
  },
  {
    path: `${SRC}/threeui.css`,
    bytes: THREEUI_CSS_BYTES,
    sha256: THREEUI_CSS_SHA256,
  },
  {
    path: 'public/effects/thinking-button.html',
    bytes: PUBLIC_THINKING_HTML_BYTES,
    sha256: PUBLIC_THINKING_HTML_SHA256,
  },
];

export const PREVIEW_STILL = '/images/Assets%20Thinking/Thinking.png';
export const PREVIEW_STILL_DISK = 'public/images/Assets Thinking/Thinking.png';
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
