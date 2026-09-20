/** Tactile — host + provenance constants. */

export const CARD_ID = 'tactile-button';
export const CARD_TITLE = 'Tactile';
export const PAGE_TITLE = 'Tactile — Kmotion';
export const DETAIL_FALLBACK = '/templates/tactile-button';

export const PAGE_CLASS = 'tactile-button-page';
export const PAGE_HTML_CLASS = 'tactile-button-html';
export const FRAMED_HTML_CLASS = 'tactile-button-framed';
export const SHADER_FRAME_CLASS = 'shader-frame';
export const HOST_CLASS = 'threeui-background shader-buttons';

/** Matches ThreeUI tactile darkBackground. */
export const PAGE_BG = '#03090d';
export const PAGE_INK = 'rgba(224, 250, 255, 0.7)';

export const SOURCE_REVISION = '6f56c4f91814';
export const VARIANT_ID = 'tactile-button';
export const DEFAULT_MODE = 'dark';
export const SOURCE_URL = '/effects/tactile-button.html';
export const FRAME_TITLE = 'Tactile Button fluid control';
export const FRAME_SANDBOX = 'allow-scripts';

export const NEUFORM_ISOLATED_EFFECTS_SHA256 =
  'fe9856234253bc3c1a13b3afb84f3d84644dfa6d578e7203bb3e1dd5eced1b75';
export const NEXUS_TACTILE_HTML_SHA256 =
  '1811a6408fb09421665d772eca4106162e10bfc038ec948324d0250f5dec9cb4';
export const THREEUI_CSS_SHA256 =
  'efe4447139f1358dd8e9be68edf6fa46cbefbd1de423a4d6c439ca61d2c8eccf';
export const PUBLIC_TACTILE_HTML_SHA256 =
  'f18ebf530f46896631151b83b709c29da878ec68a1320f140642b06330adef0f';

export const NEUFORM_ISOLATED_EFFECTS_BYTES = 93888;
export const NEXUS_TACTILE_HTML_BYTES = 17473;
export const THREEUI_CSS_BYTES = 40715;
export const PUBLIC_TACTILE_HTML_BYTES = 24022;

export const TACTILE_DEFAULT_PROPS = {
  variant: 'tactile-button',
  mode: 'dark',
  hue: 0,
  saturation: 1,
  brightness: 1,
};

const SRC = 'src/templates/button/tactile-button/sources';

export const ASSET_MANIFEST = [
  {
    path: `${SRC}/NeuformIsolatedEffects.tsx.txt`,
    bytes: NEUFORM_ISOLATED_EFFECTS_BYTES,
    sha256: NEUFORM_ISOLATED_EFFECTS_SHA256,
  },
  {
    path: `${SRC}/nexus-tactile.html`,
    bytes: NEXUS_TACTILE_HTML_BYTES,
    sha256: NEXUS_TACTILE_HTML_SHA256,
  },
  {
    path: `${SRC}/threeui.css`,
    bytes: THREEUI_CSS_BYTES,
    sha256: THREEUI_CSS_SHA256,
  },
  {
    path: 'public/effects/tactile-button.html',
    bytes: PUBLIC_TACTILE_HTML_BYTES,
    sha256: PUBLIC_TACTILE_HTML_SHA256,
  },
];

export const PREVIEW_STILL = '/images/Assets%20Tactile/Tactile.png';
export const PREVIEW_STILL_DISK = 'public/images/Assets Tactile/Tactile.png';
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
