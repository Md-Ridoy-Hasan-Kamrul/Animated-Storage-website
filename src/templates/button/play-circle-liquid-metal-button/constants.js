/** Play Circle Liquid Metal Button — host + provenance constants. */

export const CARD_ID = 'play-circle-liquid-metal-button';
export const CARD_TITLE = 'Play Circle Liquid Metal Button';
export const PAGE_TITLE = 'Play Circle Liquid Metal Button — Kmotion';
export const DETAIL_FALLBACK = '/templates/play-circle-liquid-metal-button';

export const PAGE_CLASS = 'play-circle-liquid-metal-button-page';
export const PAGE_HTML_CLASS = 'play-circle-liquid-metal-button-html';
export const FRAMED_HTML_CLASS = 'play-circle-liquid-metal-button-framed';
export const SHADER_FRAME_CLASS = 'shader-frame';

/** Matches authored liquid-metal-button host ground. */
export const PAGE_BG = '#070708';
export const PAGE_INK = '#ffffff';

export const SOURCE_REVISION = '76624e881a3a';
export const VARIANT_ID = 'play';
export const FRAME_TITLE = 'Interactive liquid metal play button';
export const FRAME_SANDBOX = 'allow-scripts';
export const SOURCE_URL = '/effects/play-circle-liquid-metal-button.html';
export const INTERSECTION_ROOT_MARGIN = '80px';

export const DIAMETER_MIN = 72;
export const DIAMETER_MAX = 160;
export const DIAMETER_DEFAULT = 88;
export const STROKE_MIN = 1;
export const STROKE_MAX = 8;
export const STROKE_DEFAULT = 3;
export const TEXT_MAX_LEN = 24;
export const ACCESSIBLE_LABEL_DEFAULT = 'Play';

export const LIQUID_METAL_BUTTON_TSX_SHA256 =
  '89b940bab445f17fafb444a7833b3c785d24c86a28156d8ad231e18de9503e11';
export const LIQUID_METAL_BUTTON_HTML_SHA256 =
  '76624e881a3aecbd79b473d9c51f53c7157d47052abd0f9dc28fefd223b0a819';
export const THREEUI_CSS_SHA256 =
  'efe4447139f1358dd8e9be68edf6fa46cbefbd1de423a4d6c439ca61d2c8eccf';
export const PUBLIC_PLAY_HTML_SHA256 =
  'fc3201823b83962d346e239fed14b00626acb02aa9bf0bdaaca6df46ad6018ee';

export const LIQUID_METAL_BUTTON_TSX_BYTES = 8973;
export const LIQUID_METAL_BUTTON_HTML_BYTES = 38589;
export const THREEUI_CSS_BYTES = 40715;
export const PUBLIC_PLAY_HTML_BYTES = 40842;

export const PLAY_CIRCLE_DEFAULT_PROPS = {
  variant: 'play',
  rendering: 'colored',
  diameter: DIAMETER_DEFAULT,
  strokeWidth: STROKE_DEFAULT,
  text: ACCESSIBLE_LABEL_DEFAULT,
};

const SRC = 'src/templates/button/play-circle-liquid-metal-button/sources';

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
    path: 'public/effects/play-circle-liquid-metal-button.html',
    bytes: PUBLIC_PLAY_HTML_BYTES,
    sha256: PUBLIC_PLAY_HTML_SHA256,
  },
];

export const PREVIEW_STILL =
  '/images/Assets%20Play%20Circle%20Liquid%20Metal%20Button/PlayCircleLiquidMetalButton.png';
export const PREVIEW_STILL_DISK =
  'public/images/Assets Play Circle Liquid Metal Button/PlayCircleLiquidMetalButton.png';
export const MIN_PREVIEW_BYTES = 10_000;

export const BACK_BUTTON_CLASS =
  'absolute top-4 left-4 z-50 flex items-center gap-2 rounded-full bg-white/10 px-3 py-2 text-sm text-white backdrop-blur-md transition hover:bg-white/20';
export const BACK_ICON_SIZE = 16;
export const BACK_ICON_STROKE = 2;
export const BACK_LABEL = 'Back';
export const HISTORY_CAN_GO_BACK_MIN = 0;
