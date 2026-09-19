/** Elements (Water) — host + provenance constants. */

export const CARD_ID = 'elements';
export const CARD_TITLE = 'Elements';
export const PAGE_TITLE = 'Elements — Kmotion';
export const DETAIL_FALLBACK = '/templates/elements';

export const PAGE_CLASS = 'elements-page';
export const PAGE_HTML_CLASS = 'elements-html';
export const FRAMED_HTML_CLASS = 'elements-framed';
export const SHADER_FRAME_CLASS = 'shader-frame';
export const HOST_CLASS = 'threeui-background elements';

export const PAGE_BG = '#060708';
export const PAGE_INK = '#e8e4dc';

export const SOURCE_REVISION = '7a6871fe99fa';
export const VARIANT_ID = 'water';
export const SOURCE_URL = '/effects/elemental-water.html';

export const ELEMENTS_COMPONENT_SHA256 =
  '04dfbb5d8e91e71772a34b4f963e2335458c4ffdace33071fa28b731a053ba95';
export const ELEMENTAL_MARKS_HTML_SHA256 =
  '7a6871fe99fa5e1551b27b2601f2a22dd23320ea2c90b5432c9c8e071f0b1d1d';
export const THREEUI_CSS_SHA256 =
  'efe4447139f1358dd8e9be68edf6fa46cbefbd1de423a4d6c439ca61d2c8eccf';
export const ELEMENTAL_WATER_HTML_SHA256 =
  '35ed16f8b804d8b10257e21f3826bb42254160534e64279e33c618b411fd8f93';

export const ELEMENTS_COMPONENT_BYTES = 13838;
export const ELEMENTAL_MARKS_HTML_BYTES = 34581;
export const THREEUI_CSS_BYTES = 40715;
export const ELEMENTAL_WATER_HTML_BYTES = 36759;

export const ELEMENTS_DEFAULT_PROPS = {
  variant: 'water',
  speed: 1,
  size: 1,
  particleAmount: 1,
  hue: 0,
  saturation: 1,
  brightness: 1,
  opacity: 1,
};

const SRC = 'src/templates/background/elements/sources';

export const ASSET_MANIFEST = [
  {
    path: `${SRC}/ElementsBackground.tsx.txt`,
    bytes: ELEMENTS_COMPONENT_BYTES,
    sha256: ELEMENTS_COMPONENT_SHA256,
  },
  {
    path: `${SRC}/elemental-marks.html`,
    bytes: ELEMENTAL_MARKS_HTML_BYTES,
    sha256: ELEMENTAL_MARKS_HTML_SHA256,
  },
  {
    path: `${SRC}/threeui.css`,
    bytes: THREEUI_CSS_BYTES,
    sha256: THREEUI_CSS_SHA256,
  },
  {
    path: 'public/effects/elemental-marks.html',
    bytes: ELEMENTAL_MARKS_HTML_BYTES,
    sha256: ELEMENTAL_MARKS_HTML_SHA256,
  },
  {
    path: 'public/effects/elemental-water.html',
    bytes: ELEMENTAL_WATER_HTML_BYTES,
    sha256: ELEMENTAL_WATER_HTML_SHA256,
  },
];

export const PREVIEW_STILL = '/images/Assets%20Elements/Elements.png';

export const BACK_BUTTON_CLASS =
  'absolute top-4 left-4 z-50 flex items-center gap-2 rounded-full bg-white/10 px-3 py-2 text-sm text-white backdrop-blur-md transition hover:bg-white/20';
export const BACK_ICON_SIZE = 16;
export const BACK_ICON_STROKE = 2;
export const BACK_LABEL = 'Back';
export const HISTORY_CAN_GO_BACK_MIN = 0;
