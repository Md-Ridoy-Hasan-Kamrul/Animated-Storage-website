/** Induction — host + provenance constants. */

export const CARD_ID = 'induction-button';
export const CARD_TITLE = 'Induction';
export const PAGE_TITLE = 'Induction — Kmotion';
export const DETAIL_FALLBACK = '/templates/induction-button';

export const PAGE_CLASS = 'induction-button-page';
export const PAGE_HTML_CLASS = 'induction-button-html';
export const FRAMED_HTML_CLASS = 'induction-button-framed';
export const SHADER_FRAME_CLASS = 'shader-frame';
export const HOST_CLASS = 'threeui-background shader-buttons';

/** Matches ThreeUI induction darkBackground. */
export const PAGE_BG = '#050505';
export const PAGE_INK = 'rgba(255, 255, 255, 0.7)';

export const SOURCE_REVISION = '6f56c4f91814';
export const VARIANT_ID = 'induction-button';
export const DEFAULT_MODE = 'dark';
export const SOURCE_URL = '/effects/induction-button.html';
export const FRAME_TITLE = 'Induction Button kinetic button';
export const FRAME_SANDBOX = 'allow-scripts';

export const NEUFORM_ISOLATED_EFFECTS_SHA256 =
  'fe9856234253bc3c1a13b3afb84f3d84644dfa6d578e7203bb3e1dd5eced1b75';
export const VALENCE_CORE_HTML_SHA256 =
  '26b21d4972805733a2441355edb56576fa911f135ccf746ebcc927a0b1e3b975';
export const THREEUI_CSS_SHA256 =
  'efe4447139f1358dd8e9be68edf6fa46cbefbd1de423a4d6c439ca61d2c8eccf';
export const PUBLIC_INDUCTION_HTML_SHA256 =
  '8bf9923abd635c9832eb1bfc754c3d28853ecd8fb966a131a667ef5f7eab881e';

export const NEUFORM_ISOLATED_EFFECTS_BYTES = 93888;
export const VALENCE_CORE_HTML_BYTES = 19010;
export const THREEUI_CSS_BYTES = 40715;
export const PUBLIC_INDUCTION_HTML_BYTES = 24127;

export const INDUCTION_DEFAULT_PROPS = {
  variant: 'induction-button',
  mode: 'dark',
  hue: 0,
  saturation: 1,
  brightness: 1,
};

const SRC = 'src/templates/button/induction-button/sources';

export const ASSET_MANIFEST = [
  {
    path: `${SRC}/NeuformIsolatedEffects.tsx.txt`,
    bytes: NEUFORM_ISOLATED_EFFECTS_BYTES,
    sha256: NEUFORM_ISOLATED_EFFECTS_SHA256,
  },
  {
    path: `${SRC}/valence-core.html`,
    bytes: VALENCE_CORE_HTML_BYTES,
    sha256: VALENCE_CORE_HTML_SHA256,
  },
  {
    path: `${SRC}/threeui.css`,
    bytes: THREEUI_CSS_BYTES,
    sha256: THREEUI_CSS_SHA256,
  },
  {
    path: 'public/effects/induction-button.html',
    bytes: PUBLIC_INDUCTION_HTML_BYTES,
    sha256: PUBLIC_INDUCTION_HTML_SHA256,
  },
];

export const PREVIEW_STILL = '/images/Assets%20Induction/Induction.png';
export const PREVIEW_STILL_DISK = 'public/images/Assets Induction/Induction.png';
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
