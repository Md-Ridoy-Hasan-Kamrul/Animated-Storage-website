/** Plasma — host + provenance constants. */

export const CARD_ID = 'plasma-button';
export const CARD_TITLE = 'Plasma';
export const PAGE_TITLE = 'Plasma — Kmotion';
export const DETAIL_FALLBACK = '/templates/plasma-button';

export const PAGE_CLASS = 'plasma-button-page';
export const PAGE_HTML_CLASS = 'plasma-button-html';
export const FRAMED_HTML_CLASS = 'plasma-button-framed';
export const SHADER_FRAME_CLASS = 'shader-frame';
export const HOST_CLASS = 'threeui-background shader-buttons';

/** Matches ThreeUI plasma darkBackground. */
export const PAGE_BG = '#020614';
export const PAGE_INK = 'rgba(226, 241, 255, 0.7)';

export const SOURCE_REVISION = '6f56c4f91814';
export const VARIANT_ID = 'plasma-button';
export const DEFAULT_MODE = 'dark';
export const SOURCE_URL = '/effects/plasma-button.html';
export const FRAME_TITLE = 'Plasma Button luminous control';
export const FRAME_SANDBOX = 'allow-scripts';

export const NEUFORM_ISOLATED_EFFECTS_SHA256 =
  'fe9856234253bc3c1a13b3afb84f3d84644dfa6d578e7203bb3e1dd5eced1b75';
export const AETHERIS_LABS_HTML_SHA256 =
  'eea617fe0e37a79be7aee44f00a53ec3ae41e006e771a8aad53acce3648147e0';
export const THREEUI_CSS_SHA256 =
  'efe4447139f1358dd8e9be68edf6fa46cbefbd1de423a4d6c439ca61d2c8eccf';
export const PUBLIC_PLASMA_HTML_SHA256 =
  '6ce3415aa5dd93dde1bc7a41e71a5af7a80cc1abd58d3f4813f4d36275b0c265';

export const NEUFORM_ISOLATED_EFFECTS_BYTES = 93888;
export const AETHERIS_LABS_HTML_BYTES = 15926;
export const THREEUI_CSS_BYTES = 40715;
export const PUBLIC_PLASMA_HTML_BYTES = 22471;

export const PLASMA_DEFAULT_PROPS = {
  variant: 'plasma-button',
  mode: 'dark',
  hue: 0,
  saturation: 1,
  brightness: 1,
};

const SRC = 'src/templates/button/plasma-button/sources';

export const ASSET_MANIFEST = [
  {
    path: `${SRC}/NeuformIsolatedEffects.tsx.txt`,
    bytes: NEUFORM_ISOLATED_EFFECTS_BYTES,
    sha256: NEUFORM_ISOLATED_EFFECTS_SHA256,
  },
  {
    path: `${SRC}/aetheris-labs.html`,
    bytes: AETHERIS_LABS_HTML_BYTES,
    sha256: AETHERIS_LABS_HTML_SHA256,
  },
  {
    path: `${SRC}/threeui.css`,
    bytes: THREEUI_CSS_BYTES,
    sha256: THREEUI_CSS_SHA256,
  },
  {
    path: 'public/effects/plasma-button.html',
    bytes: PUBLIC_PLASMA_HTML_BYTES,
    sha256: PUBLIC_PLASMA_HTML_SHA256,
  },
];

export const PREVIEW_STILL = '/images/Assets%20Plasma/Plasma.png';
export const PREVIEW_STILL_DISK = 'public/images/Assets Plasma/Plasma.png';
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
