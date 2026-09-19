/** Sign up Pill Liquid Metal Button — host + provenance constants. */

export const CARD_ID = 'sign-up-pill-liquid-metal-button';
export const CARD_TITLE = 'Sign up Pill';
export const PAGE_TITLE = 'Sign up Pill — Kmotion';
export const DETAIL_FALLBACK = '/templates/sign-up-pill-liquid-metal-button';

export const PAGE_CLASS = 'sign-up-pill-liquid-metal-button-page';
export const PAGE_HTML_CLASS = 'sign-up-pill-liquid-metal-button-html';
export const FRAMED_HTML_CLASS = 'sign-up-pill-liquid-metal-button-framed';
export const SHADER_FRAME_CLASS = 'shader-frame';

/** Matches authored liquid-metal-button host ground. */
export const PAGE_BG = '#070708';
export const PAGE_INK = '#ffffff';

export const SOURCE_REVISION = '76624e881a3a';
export const VARIANT_ID = 'pill';
export const FRAME_TITLE = 'Interactive liquid metal sign up pill';
export const FRAME_SANDBOX = 'allow-scripts';
export const SOURCE_URL = '/effects/sign-up-pill-liquid-metal-button.html';
export const INTERSECTION_ROOT_MARGIN = '80px';

export const TEXT_MAX_LEN = 24;
export const TEXT_DEFAULT = 'Sign up';
export const PILL_WIDTH_BASE = 820;
export const PILL_WIDTH_PER_CHAR = 94;
export const PILL_WIDTH_MIN = 1407;
export const PILL_WIDTH_MAX = 3000;
export const EMBEDDED_DEFAULT = false;

export const LIQUID_METAL_BUTTON_TSX_SHA256 =
  '89b940bab445f17fafb444a7833b3c785d24c86a28156d8ad231e18de9503e11';
export const LIQUID_METAL_BUTTON_HTML_SHA256 =
  '76624e881a3aecbd79b473d9c51f53c7157d47052abd0f9dc28fefd223b0a819';
export const THREEUI_CSS_SHA256 =
  'efe4447139f1358dd8e9be68edf6fa46cbefbd1de423a4d6c439ca61d2c8eccf';
export const PUBLIC_PILL_HTML_SHA256 =
  'ab85cf3d5d848e2d7ca0860f43b723b3091a45677bad8c49d37f6060e0b30992';

export const LIQUID_METAL_BUTTON_TSX_BYTES = 8973;
export const LIQUID_METAL_BUTTON_HTML_BYTES = 38589;
export const THREEUI_CSS_BYTES = 40715;
export const PUBLIC_PILL_HTML_BYTES = 39622;

export const SIGN_UP_PILL_DEFAULT_PROPS = {
  variant: 'pill',
  text: TEXT_DEFAULT,
  embedded: EMBEDDED_DEFAULT,
};

const SRC = 'src/templates/button/sign-up-pill-liquid-metal-button/sources';

export const ASSET_MANIFEST = [
  {
    path: `${SRC}/LiquidMetalButton.tsx.txt`,
    bytes: LIQUID_METAL_BUTTON_TSX_BYTES,
    sha256: LIQUID_METAL_BUTTON_TSX_SHA256,
  },
  {
    path: `${SRC}/liquid-metal-button.html`,
    bytes: LIQUID_METAL_BUTTON_HTML_BYTES,
    sha256: LIQUID_METAL_BUTTON_HTML_SHA256,
  },
  {
    path: `${SRC}/threeui.css`,
    bytes: THREEUI_CSS_BYTES,
    sha256: THREEUI_CSS_SHA256,
  },
  {
    path: 'public/effects/sign-up-pill-liquid-metal-button.html',
    bytes: PUBLIC_PILL_HTML_BYTES,
    sha256: PUBLIC_PILL_HTML_SHA256,
  },
];

export const PREVIEW_STILL =
  '/images/Assets%20Sign%20up%20Pill/SignUpPill.png';
export const PREVIEW_STILL_DISK = 'public/images/Assets Sign up Pill/SignUpPill.png';
export const MIN_PREVIEW_BYTES = 10_000;

export const BACK_BUTTON_CLASS =
  'absolute top-4 left-4 z-50 flex items-center gap-2 rounded-full bg-white/10 px-3 py-2 text-sm text-white backdrop-blur-md transition hover:bg-white/20';
export const BACK_ICON_SIZE = 16;
export const BACK_ICON_STROKE = 2;
export const BACK_LABEL = 'Back';
export const HISTORY_CAN_GO_BACK_MIN = 0;
