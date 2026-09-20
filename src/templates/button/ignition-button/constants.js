/** Ignition — host + provenance constants. */

export const CARD_ID = 'ignition-button';
export const CARD_TITLE = 'Ignition';
export const PAGE_TITLE = 'Ignition — Kmotion';
export const DETAIL_FALLBACK = '/templates/ignition-button';

export const PAGE_CLASS = 'ignition-button-page';
export const PAGE_HTML_CLASS = 'ignition-button-html';
export const FRAMED_HTML_CLASS = 'ignition-button-framed';
export const SHADER_FRAME_CLASS = 'shader-frame';
export const HOST_CLASS = 'threeui-background shader-buttons';

/** Matches ThreeUI ignition darkBackground. */
export const PAGE_BG = '#121316';
export const PAGE_INK = 'rgba(255, 255, 255, 0.7)';

export const SOURCE_REVISION = '6f56c4f91814';
export const VARIANT_ID = 'ignition-button';
export const DEFAULT_MODE = 'dark';
export const SOURCE_URL = '/effects/ignition-button.html';
export const FRAME_TITLE = 'Ignition Button shader button';
export const FRAME_SANDBOX = 'allow-scripts';

export const NEUFORM_ISOLATED_EFFECTS_SHA256 =
  'fe9856234253bc3c1a13b3afb84f3d84644dfa6d578e7203bb3e1dd5eced1b75';
export const IGNITION_TERMINAL_HTML_SHA256 =
  '05313d191cc11ca0c7600452e72ad14b4fc6581627689c209a5f22a1bfa6a8ea';
export const THREEUI_CSS_SHA256 =
  'efe4447139f1358dd8e9be68edf6fa46cbefbd1de423a4d6c439ca61d2c8eccf';
export const PUBLIC_IGNITION_HTML_SHA256 =
  'e3d1abeb9bba6a3e7a527e8500574014f1a6599839a994b8c025f0f782acbf06';

export const NEUFORM_ISOLATED_EFFECTS_BYTES = 93888;
export const IGNITION_TERMINAL_HTML_BYTES = 12813;
export const THREEUI_CSS_BYTES = 40715;
export const PUBLIC_IGNITION_HTML_BYTES = 19441;

export const IGNITION_DEFAULT_PROPS = {
  variant: 'ignition-button',
  mode: 'dark',
  hue: 0,
  saturation: 1,
  brightness: 1,
};

const SRC = 'src/templates/button/ignition-button/sources';

export const ASSET_MANIFEST = [
  {
    path: `${SRC}/NeuformIsolatedEffects.tsx.txt`,
    bytes: NEUFORM_ISOLATED_EFFECTS_BYTES,
    sha256: NEUFORM_ISOLATED_EFFECTS_SHA256,
  },
  {
    path: `${SRC}/ignition-terminal.html`,
    bytes: IGNITION_TERMINAL_HTML_BYTES,
    sha256: IGNITION_TERMINAL_HTML_SHA256,
  },
  {
    path: `${SRC}/threeui.css`,
    bytes: THREEUI_CSS_BYTES,
    sha256: THREEUI_CSS_SHA256,
  },
  {
    path: 'public/effects/ignition-button.html',
    bytes: PUBLIC_IGNITION_HTML_BYTES,
    sha256: PUBLIC_IGNITION_HTML_SHA256,
  },
];

export const PREVIEW_STILL = '/images/Assets%20Ignition/Ignition.png';
export const PREVIEW_STILL_DISK = 'public/images/Assets Ignition/Ignition.png';
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
