/** Riso Sweep — host + provenance constants. */

export const CARD_ID = 'riso-sweep';
export const CARD_TITLE = 'Riso Sweep';
export const PAGE_TITLE = 'Riso Sweep — Kmotion';
export const DETAIL_FALLBACK = '/templates/riso-sweep';

export const PAGE_CLASS = 'riso-sweep-page';
export const PAGE_HTML_CLASS = 'riso-sweep-html';
export const FRAMED_HTML_CLASS = 'riso-sweep-framed';
export const SHADER_FRAME_CLASS = 'shader-frame';
export const HOST_CLASS = 'gallery-heading-frame';

/** Matches ThreeUI gallery-heading darkBackground. */
export const PAGE_BG = '#000000';
export const PAGE_INK = 'rgba(244, 233, 210, 0.7)';

export const SOURCE_REVISION = '8e42d2d5b497';
export const VARIANT_ID = 'horizontal-sweep';
export const DEFAULT_MODE = 'dark';
export const SOURCE_URL = '/effects/riso-sweep.html';
export const FRAME_TITLE = 'Prints from the Flat Files canvas animation';
export const FRAME_SANDBOX = 'allow-scripts';

export const NEUFORM_ISOLATED_EFFECTS_SHA256 =
  'fe9856234253bc3c1a13b3afb84f3d84644dfa6d578e7203bb3e1dd5eced1b75';
export const GALLERY_HEADING_HTML_SHA256 =
  '8e42d2d5b4971bfc4d3c485112c3c51909e20a61b8842bc0dcd8db3ffe2d253a';
export const THREEUI_CSS_SHA256 =
  'efe4447139f1358dd8e9be68edf6fa46cbefbd1de423a4d6c439ca61d2c8eccf';
export const PUBLIC_RISO_SWEEP_HTML_SHA256 =
  '5fb0b7b855c11d5f2fd327ab48f8965de738b146a9cfbb547839faed5ba93ba8';
export const PUBLIC_RISO_SWEEP_JS_SHA256 =
  '87e84aa056ecb65c2bb6ba288286249af8e4b7db8638ca070a404e7ece3f4862';

export const NEUFORM_ISOLATED_EFFECTS_BYTES = 93888;
export const GALLERY_HEADING_HTML_BYTES = 19335;
export const THREEUI_CSS_BYTES = 40715;
export const PUBLIC_RISO_SWEEP_HTML_BYTES = 1959;
export const PUBLIC_RISO_SWEEP_JS_BYTES = 19955;

export const RISO_SWEEP_DEFAULT_PROPS = {
  variant: 'horizontal-sweep',
  mode: 'dark',
  font: 'oldstyle',
  weight: '700',
  headlineSize: 1.2,
  hue: 0,
  saturation: 1,
  brightness: 1,
};

const SRC = 'src/templates/text-animation/riso-sweep/sources';

export const ASSET_MANIFEST = [
  {
    path: `${SRC}/NeuformIsolatedEffects.tsx.txt`,
    bytes: NEUFORM_ISOLATED_EFFECTS_BYTES,
    sha256: NEUFORM_ISOLATED_EFFECTS_SHA256,
  },
  {
    path: `${SRC}/gallery-heading.html`,
    bytes: GALLERY_HEADING_HTML_BYTES,
    sha256: GALLERY_HEADING_HTML_SHA256,
  },
  {
    path: `${SRC}/threeui.css`,
    bytes: THREEUI_CSS_BYTES,
    sha256: THREEUI_CSS_SHA256,
  },
  {
    path: 'public/effects/riso-sweep.html',
    bytes: PUBLIC_RISO_SWEEP_HTML_BYTES,
    sha256: PUBLIC_RISO_SWEEP_HTML_SHA256,
  },
  {
    path: 'public/effects/riso-sweep.js',
    bytes: PUBLIC_RISO_SWEEP_JS_BYTES,
    sha256: PUBLIC_RISO_SWEEP_JS_SHA256,
  },
];

export const PREVIEW_STILL = '/images/Assets%20Riso%20Sweep/RisoSweep.png';
export const PREVIEW_STILL_DISK = 'public/images/Assets Riso Sweep/RisoSweep.png';
export const MIN_PREVIEW_BYTES = 10_000;

export const HUE_MIN = -180;
export const HUE_MAX = 180;
export const SATURATION_MIN = 0;
export const SATURATION_MAX = 2;
export const BRIGHTNESS_MIN = 0.35;
export const BRIGHTNESS_MAX = 1.65;
export const HEADLINE_SIZE_MIN = 0.6;
export const HEADLINE_SIZE_MAX = 1.8;

export const BACK_BUTTON_CLASS =
  'absolute top-4 left-4 z-50 flex items-center gap-2 rounded-full bg-white/10 px-3 py-2 text-sm text-white backdrop-blur-md transition hover:bg-white/20';
export const BACK_ICON_SIZE = 16;
export const BACK_ICON_STROKE = 2;
export const BACK_LABEL = 'Back';
export const HISTORY_CAN_GO_BACK_MIN = 0;
