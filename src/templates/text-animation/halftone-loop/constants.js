/** Halftone Loop — host + provenance constants. */

export const CARD_ID = 'halftone-loop';
export const CARD_TITLE = 'Halftone Loop';
export const PAGE_TITLE = 'Halftone Loop — Kmotion';
export const DETAIL_FALLBACK = '/templates/halftone-loop';

export const PAGE_CLASS = 'halftone-loop-page';
export const PAGE_HTML_CLASS = 'halftone-loop-html';
export const FRAMED_HTML_CLASS = 'halftone-loop-framed';
export const SHADER_FRAME_CLASS = 'shader-frame';
export const HOST_CLASS = 'gallery-heading-frame';

/** Matches ThreeUI gallery-heading darkBackground. */
export const PAGE_BG = '#000000';
export const PAGE_INK = 'rgba(242, 239, 232, 0.7)';

export const SOURCE_REVISION = '8e42d2d5b497';
export const VARIANT_ID = 'vertical-loop';
export const DEFAULT_MODE = 'dark';
export const SOURCE_URL = '/effects/halftone-loop.html';
export const FRAME_TITLE = 'One Wall, Twelve Plates canvas animation';
export const FRAME_SANDBOX = 'allow-scripts';

export const NEUFORM_ISOLATED_EFFECTS_SHA256 =
  'fe9856234253bc3c1a13b3afb84f3d84644dfa6d578e7203bb3e1dd5eced1b75';
export const GALLERY_HEADING_HTML_SHA256 =
  '8e42d2d5b4971bfc4d3c485112c3c51909e20a61b8842bc0dcd8db3ffe2d253a';
export const THREEUI_CSS_SHA256 =
  'efe4447139f1358dd8e9be68edf6fa46cbefbd1de423a4d6c439ca61d2c8eccf';
export const PUBLIC_HALFTONE_LOOP_HTML_SHA256 =
  'e3f59861d37225e3ebff5f7e6f35ed8c2d5e9050da5c25b63ff59ab89680b891';
export const PUBLIC_HALFTONE_LOOP_JS_SHA256 =
  '854828ec0d999a5b61a4c3d81060f46eb0d01aa17210b69b625b9724e83f9049';

export const NEUFORM_ISOLATED_EFFECTS_BYTES = 93888;
export const GALLERY_HEADING_HTML_BYTES = 19335;
export const THREEUI_CSS_BYTES = 40715;
export const PUBLIC_HALFTONE_LOOP_HTML_BYTES = 1959;
export const PUBLIC_HALFTONE_LOOP_JS_BYTES = 19949;

export const HALFTONE_LOOP_DEFAULT_PROPS = {
  variant: 'vertical-loop',
  mode: 'dark',
  font: 'didone',
  weight: '400',
  headlineSize: 1.25,
  hue: 0,
  saturation: 1,
  brightness: 1,
};

const SRC = 'src/templates/text-animation/halftone-loop/sources';

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
    path: 'public/effects/halftone-loop.html',
    bytes: PUBLIC_HALFTONE_LOOP_HTML_BYTES,
    sha256: PUBLIC_HALFTONE_LOOP_HTML_SHA256,
  },
  {
    path: 'public/effects/halftone-loop.js',
    bytes: PUBLIC_HALFTONE_LOOP_JS_BYTES,
    sha256: PUBLIC_HALFTONE_LOOP_JS_SHA256,
  },
];

export const PREVIEW_STILL = '/images/Assets%20Halftone%20Loop/HalftoneLoop.png';
export const PREVIEW_STILL_DISK = 'public/images/Assets Halftone Loop/HalftoneLoop.png';
export const MIN_PREVIEW_BYTES = 10_000;

export const HUE_MIN = -180;
export const HUE_MAX = 180;
export const SATURATION_MIN = 0;
export const SATURATION_MAX = 2;
export const BRIGHTNESS_MIN = 0.35;
export const BRIGHTNESS_MAX = 1.65;
export const HEADLINE_SIZE_MIN = 0.6;
export const HEADLINE_SIZE_MAX = 1.8;

export const LIGHT_MODE_BG = '#f4f7fb';

export const BACK_BUTTON_CLASS =
  'absolute top-4 left-4 z-50 flex items-center gap-2 rounded-full bg-white/10 px-3 py-2 text-sm text-white backdrop-blur-md transition hover:bg-white/20';
export const BACK_ICON_SIZE = 16;
export const BACK_ICON_STROKE = 2;
export const BACK_LABEL = 'Back';
export const HISTORY_CAN_GO_BACK_MIN = 0;
