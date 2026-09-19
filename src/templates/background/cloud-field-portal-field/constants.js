/** Cloud Field Portal Field — host + provenance constants. */

export const CARD_ID = 'cloud-field-portal-field';
export const CARD_TITLE = 'Cloud Field Portal Field';
export const PAGE_TITLE = 'Cloud Field Portal Field — Kmotion';
export const DETAIL_FALLBACK = '/templates/cloud-field-portal-field';

export const PAGE_CLASS = 'cloud-field-portal-field-page';
export const PAGE_HTML_CLASS = 'cloud-field-portal-field-html';
export const FRAMED_HTML_CLASS = 'cloud-field-portal-field-framed';
export const SHADER_FRAME_CLASS = 'shader-frame';
export const HOST_CLASS = 'threeui-background portal-field-collection';

export const PAGE_BG = '#071010';
export const PAGE_INK = '#e9e5ff';

export const SOURCE_REVISION = 'f90e34f83d51';
export const VARIANT_ID = 'cloud-field';
export const SOURCE_URL = '/effects/cloud-field.html';
export const FRAME_TITLE = 'Strata cloud migration field';
export const FRAME_SANDBOX = 'allow-scripts';

export const NEUFORM_ISOLATED_EFFECTS_SHA256 =
  'fe9856234253bc3c1a13b3afb84f3d84644dfa6d578e7203bb3e1dd5eced1b75';
export const STRATA_CLOUD_HTML_SHA256 =
  'c5a8085b413d310fe1c9a2deb39bcd5d8ecf0d545a4462f576a1c9b9c49f34fc';
export const THREEUI_CSS_SHA256 =
  'efe4447139f1358dd8e9be68edf6fa46cbefbd1de423a4d6c439ca61d2c8eccf';

export const NEUFORM_ISOLATED_EFFECTS_BYTES = 93888;
export const STRATA_CLOUD_HTML_BYTES = 23819;
export const THREEUI_CSS_BYTES = 40715;
export const PUBLIC_CLOUD_FIELD_HTML_SHA256 =
  'd6872f07b75288264c34f1ee9833906c869e3de0b2d4c24deea2418ee0805e4c';
export const PUBLIC_CLOUD_FIELD_HTML_BYTES = 26539;

export const CLOUD_FIELD_DEFAULT_PROPS = {
  variant: 'cloud-field',
  hue: 0,
  saturation: 1,
  brightness: 1,
};

const SRC = 'src/templates/background/cloud-field-portal-field/sources';

export const ASSET_MANIFEST = [
  {
    path: `${SRC}/NeuformIsolatedEffects.tsx.txt`,
    bytes: NEUFORM_ISOLATED_EFFECTS_BYTES,
    sha256: NEUFORM_ISOLATED_EFFECTS_SHA256,
  },
  {
    path: `${SRC}/strata-cloud.html`,
    bytes: STRATA_CLOUD_HTML_BYTES,
    sha256: STRATA_CLOUD_HTML_SHA256,
  },
  {
    path: `${SRC}/threeui.css`,
    bytes: THREEUI_CSS_BYTES,
    sha256: THREEUI_CSS_SHA256,
  },
  {
    path: 'public/effects/cloud-field.html',
    bytes: PUBLIC_CLOUD_FIELD_HTML_BYTES,
    sha256: PUBLIC_CLOUD_FIELD_HTML_SHA256,
  },
];

export const PREVIEW_STILL =
  '/images/Assets%20Cloud%20Field%20Portal%20Field/CloudFieldPortalField.png';
export const PREVIEW_STILL_DISK =
  'public/images/Assets Cloud Field Portal Field/CloudFieldPortalField.png';
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
