/** Glassmorphism CTA Rectangle Buttons — host + provenance constants. */

export const CARD_ID = 'glassmorphism-cta-rectangle-buttons';
export const CARD_TITLE = 'Glassmorphism CTA Rectangle Buttons';
export const PAGE_TITLE = 'Glassmorphism CTA Rectangle Buttons — Kmotion';
export const DETAIL_FALLBACK = '/templates/glassmorphism-cta-rectangle-buttons';

export const PAGE_CLASS = 'glassmorphism-cta-rectangle-buttons-page';
export const PAGE_HTML_CLASS = 'glassmorphism-cta-rectangle-buttons-html';
export const FRAMED_HTML_CLASS = 'glassmorphism-cta-rectangle-buttons-framed';
export const SHADER_FRAME_CLASS = 'shader-frame';
export const HOST_CLASS = 'threeui-background rectangle-buttons-collection';

export const PAGE_BG = '#111318';
export const PAGE_INK = 'rgba(255, 255, 255, 0.7)';

export const SOURCE_REVISION = 'ff30e28c2781';
export const VARIANT_ID = 'glassmorphism-cta';
export const DEFAULT_MODE = 'dark';
export const SOURCE_URL = '/effects/glassmorphism-cta.html';
export const FRAME_TITLE = 'Glassmorphism CTA button';
export const FRAME_SANDBOX = 'allow-scripts';
export const BUTTON_LABEL = 'Generate My Site';

export const NEUFORM_ISOLATED_EFFECTS_SHA256 =
  'fe9856234253bc3c1a13b3afb84f3d84644dfa6d578e7203bb3e1dd5eced1b75';
export const GLASSMORPHISM_CTA_HTML_SHA256 =
  'b535a5f6e778924906fa1625cf610841b847d52c17487dad83215dd5921a3863';
export const THREEUI_CSS_SHA256 =
  'efe4447139f1358dd8e9be68edf6fa46cbefbd1de423a4d6c439ca61d2c8eccf';

export const NEUFORM_ISOLATED_EFFECTS_BYTES = 93888;
export const GLASSMORPHISM_CTA_HTML_BYTES = 8068;
export const THREEUI_CSS_BYTES = 40715;
export const PUBLIC_GLASSMORPHISM_CTA_HTML_SHA256 =
  'aa047def1dcfd8eaa22b7225a8c11706d49c1821700fd2287db5ea138a88f6a9';
export const PUBLIC_GLASSMORPHISM_CTA_HTML_BYTES = 11828;

export const GLASSMORPHISM_CTA_DEFAULT_PROPS = {
  variant: 'glassmorphism-cta',
  mode: 'dark',
  hue: 0,
  saturation: 1,
  brightness: 1,
};

const SRC = 'src/templates/button/glassmorphism-cta-rectangle-buttons/sources';

export const ASSET_MANIFEST = [
  {
    path: `${SRC}/NeuformIsolatedEffects.tsx.txt`,
    bytes: NEUFORM_ISOLATED_EFFECTS_BYTES,
    sha256: NEUFORM_ISOLATED_EFFECTS_SHA256,
  },
  {
    path: `${SRC}/glassmorphism-cta.html`,
    bytes: GLASSMORPHISM_CTA_HTML_BYTES,
    sha256: GLASSMORPHISM_CTA_HTML_SHA256,
  },
  {
    path: `${SRC}/threeui.css`,
    bytes: THREEUI_CSS_BYTES,
    sha256: THREEUI_CSS_SHA256,
  },
  {
    path: 'public/effects/glassmorphism-cta.html',
    bytes: PUBLIC_GLASSMORPHISM_CTA_HTML_BYTES,
    sha256: PUBLIC_GLASSMORPHISM_CTA_HTML_SHA256,
  },
];

export const PREVIEW_STILL =
  '/images/Assets%20Glassmorphism%20CTA%20Rectangle%20Buttons/GlassmorphismCTARectangleButtons.png';
export const PREVIEW_STILL_DISK =
  'public/images/Assets Glassmorphism CTA Rectangle Buttons/GlassmorphismCTARectangleButtons.png';
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
