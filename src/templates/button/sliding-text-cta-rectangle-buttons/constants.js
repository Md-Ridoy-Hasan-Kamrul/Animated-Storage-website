/** Sliding Text CTA Rectangle Buttons — host + provenance constants. */

export const CARD_ID = 'sliding-text-cta-rectangle-buttons';
export const CARD_TITLE = 'Sliding Text CTA Rectangle Buttons';
export const PAGE_TITLE = 'Sliding Text CTA Rectangle Buttons — Kmotion';
export const DETAIL_FALLBACK = '/templates/sliding-text-cta-rectangle-buttons';

export const PAGE_CLASS = 'sliding-text-cta-rectangle-buttons-page';
export const PAGE_HTML_CLASS = 'sliding-text-cta-rectangle-buttons-html';
export const FRAMED_HTML_CLASS = 'sliding-text-cta-rectangle-buttons-framed';
export const SHADER_FRAME_CLASS = 'shader-frame';
export const HOST_CLASS = 'threeui-background rectangle-buttons-collection';

export const PAGE_BG = '#111318';
export const PAGE_INK = 'rgba(255, 255, 255, 0.7)';

export const SOURCE_REVISION = 'ff30e28c2781';
export const VARIANT_ID = 'sliding-text-cta';
export const DEFAULT_MODE = 'dark';
export const SOURCE_URL = '/effects/sliding-text-cta.html';
export const FRAME_TITLE = 'Sliding Text CTA button';
export const FRAME_SANDBOX = 'allow-scripts';
export const BUTTON_LABEL = 'Download Mac app';

export const NEUFORM_ISOLATED_EFFECTS_SHA256 =
  'fe9856234253bc3c1a13b3afb84f3d84644dfa6d578e7203bb3e1dd5eced1b75';
export const SLIDING_TEXT_CTA_HTML_SHA256 =
  'e24ce6a519cfbafe082deb6eedb801b97b36ba6b8ccea9a81166c9b6edb6e770';
export const THREEUI_CSS_SHA256 =
  'efe4447139f1358dd8e9be68edf6fa46cbefbd1de423a4d6c439ca61d2c8eccf';

export const NEUFORM_ISOLATED_EFFECTS_BYTES = 93888;
export const SLIDING_TEXT_CTA_HTML_BYTES = 5846;
export const THREEUI_CSS_BYTES = 40715;
export const PUBLIC_SLIDING_TEXT_CTA_HTML_SHA256 =
  '86f2084c65828ad58717bf9e4ca975b77de25ff7d9068e6f2625528775a21e3a';
export const PUBLIC_SLIDING_TEXT_CTA_HTML_BYTES = 9611;

export const SLIDING_TEXT_CTA_DEFAULT_PROPS = {
  variant: 'sliding-text-cta',
  mode: 'dark',
  hue: 0,
  saturation: 1,
  brightness: 1,
};

const SRC = 'src/templates/button/sliding-text-cta-rectangle-buttons/sources';

export const ASSET_MANIFEST = [
  {
    path: `${SRC}/NeuformIsolatedEffects.tsx.txt`,
    bytes: NEUFORM_ISOLATED_EFFECTS_BYTES,
    sha256: NEUFORM_ISOLATED_EFFECTS_SHA256,
  },
  {
    path: `${SRC}/sliding-text-cta.html`,
    bytes: SLIDING_TEXT_CTA_HTML_BYTES,
    sha256: SLIDING_TEXT_CTA_HTML_SHA256,
  },
  {
    path: `${SRC}/threeui.css`,
    bytes: THREEUI_CSS_BYTES,
    sha256: THREEUI_CSS_SHA256,
  },
  {
    path: 'public/effects/sliding-text-cta.html',
    bytes: PUBLIC_SLIDING_TEXT_CTA_HTML_BYTES,
    sha256: PUBLIC_SLIDING_TEXT_CTA_HTML_SHA256,
  },
];

export const PREVIEW_STILL =
  '/images/Assets%20Sliding%20Text%20CTA%20Rectangle%20Buttons/SlidingTextCTARectangleButtons.png';
export const PREVIEW_STILL_DISK =
  'public/images/Assets Sliding Text CTA Rectangle Buttons/SlidingTextCTARectangleButtons.png';
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
