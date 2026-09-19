/** Gradient CTA Rectangle Buttons — host + provenance constants. */

export const CARD_ID = 'gradient-cta-rectangle-buttons';
export const CARD_TITLE = 'Gradient CTA Rectangle Buttons';
export const PAGE_TITLE = 'Gradient CTA Rectangle Buttons — Kmotion';
export const DETAIL_FALLBACK = '/templates/gradient-cta-rectangle-buttons';

export const PAGE_CLASS = 'gradient-cta-rectangle-buttons-page';
export const PAGE_HTML_CLASS = 'gradient-cta-rectangle-buttons-html';
export const FRAMED_HTML_CLASS = 'gradient-cta-rectangle-buttons-framed';
export const SHADER_FRAME_CLASS = 'shader-frame';
export const HOST_CLASS = 'threeui-background rectangle-buttons-collection';

export const PAGE_BG = '#111318';
export const PAGE_INK = 'rgba(255, 255, 255, 0.7)';

export const SOURCE_REVISION = 'ff30e28c2781';
export const VARIANT_ID = 'gradient-cta';
export const DEFAULT_MODE = 'dark';
export const SOURCE_URL = '/effects/gradient-cta.html';
export const FRAME_TITLE = 'Gradient CTA button';
export const FRAME_SANDBOX = 'allow-scripts';
export const BUTTON_LABEL = 'Start Free Pilot';

export const NEUFORM_ISOLATED_EFFECTS_SHA256 =
  'fe9856234253bc3c1a13b3afb84f3d84644dfa6d578e7203bb3e1dd5eced1b75';
export const GRADIENT_CTA_HTML_SHA256 =
  '05e611c9ec16848e00ce81e4c8e186167da592c49755408cbc563c2ea611458d';
export const THREEUI_CSS_SHA256 =
  'efe4447139f1358dd8e9be68edf6fa46cbefbd1de423a4d6c439ca61d2c8eccf';

export const NEUFORM_ISOLATED_EFFECTS_BYTES = 93888;
export const GRADIENT_CTA_HTML_BYTES = 5356;
export const THREEUI_CSS_BYTES = 40715;
export const PUBLIC_GRADIENT_CTA_HTML_SHA256 =
  'a60d8abefb89366ebae8eb01fec923f64234d82b5957c5329bf3e429bddb9018';
export const PUBLIC_GRADIENT_CTA_HTML_BYTES = 9121;

export const GRADIENT_CTA_DEFAULT_PROPS = {
  variant: 'gradient-cta',
  mode: 'dark',
  hue: 0,
  saturation: 1,
  brightness: 1,
};

const SRC = 'src/templates/button/gradient-cta-rectangle-buttons/sources';

export const ASSET_MANIFEST = [
  {
    path: `${SRC}/NeuformIsolatedEffects.tsx.txt`,
    bytes: NEUFORM_ISOLATED_EFFECTS_BYTES,
    sha256: NEUFORM_ISOLATED_EFFECTS_SHA256,
  },
  {
    path: `${SRC}/gradient-cta.html`,
    bytes: GRADIENT_CTA_HTML_BYTES,
    sha256: GRADIENT_CTA_HTML_SHA256,
  },
  {
    path: `${SRC}/threeui.css`,
    bytes: THREEUI_CSS_BYTES,
    sha256: THREEUI_CSS_SHA256,
  },
  {
    path: 'public/effects/gradient-cta.html',
    bytes: PUBLIC_GRADIENT_CTA_HTML_BYTES,
    sha256: PUBLIC_GRADIENT_CTA_HTML_SHA256,
  },
];

export const PREVIEW_STILL =
  '/images/Assets%20Gradient%20CTA%20Rectangle%20Buttons/GradientCTARectangleButtons.png';
export const PREVIEW_STILL_DISK =
  'public/images/Assets Gradient CTA Rectangle Buttons/GradientCTARectangleButtons.png';
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
