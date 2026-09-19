/** Atmospheric Blade Laser — host + provenance constants. */

export const CARD_ID = 'atmospheric-blade-laser';
export const CARD_TITLE = 'Atmospheric Blade Laser';
export const PAGE_TITLE = 'Atmospheric Blade Laser — Kmotion';
export const DETAIL_FALLBACK = '/templates/atmospheric-blade-laser';

export const PAGE_CLASS = 'atmospheric-blade-laser-page';
export const PAGE_HTML_CLASS = 'atmospheric-blade-laser-html';
export const FRAMED_HTML_CLASS = 'atmospheric-blade-laser-framed';
export const SHADER_FRAME_CLASS = 'shader-frame';
export const HOST_CLASS = 'threeui-background laser-variant';

export const PAGE_BG = '#020305';
export const PAGE_INK = '#7dffc8';
export const LASER_VARIANT_BG = '#020305';

export const SOURCE_REVISION = '70cc015d5175';
export const VARIANT_ID = 'atmospheric-blade';
export const VARIANT_INDEX = 0;

export const LASER_COLLECTION_SHA256 =
  'e81830f73d86cbaa71e4f32568ec596c461500370ef971315b1dff682c9d1639';
export const LASER_VARIANTS_SHA256 =
  '4fdc907769b67369de011ee96594aed6dd0f54974c1db831ac9ac5c5f371ba4a';
export const LASER_SHADERS_SHA256 =
  '91248e937612f2d11b8dde4716d3546e47cd192ad36ebc76e1860f728285f967';
export const NEUFORM_BATCH_COMPONENT_SHA256 =
  'dc68c51bea26b922965de44b4fb8d6c432607508fb2b61e16ed60d245da1a69f';
export const MATRIX_FIELD_HTML_SHA256 =
  '7ee84b44ccad91f131563f34c633596a4c105512e8f0aa4303736f77681db835';
export const THREEUI_CSS_SHA256 =
  'efe4447139f1358dd8e9be68edf6fa46cbefbd1de423a4d6c439ca61d2c8eccf';

export const LASER_COLLECTION_BYTES = 1194;
export const LASER_VARIANTS_BYTES = 8797;
export const LASER_SHADERS_BYTES = 8654;
export const NEUFORM_BATCH_COMPONENT_BYTES = 41426;
export const MATRIX_FIELD_HTML_BYTES = 21070;
export const THREEUI_CSS_BYTES = 40715;

export const ATMOSPHERIC_BLADE_DEFAULT_PROPS = {
  variant: 'atmospheric-blade',
  speed: 1,
  size: 1,
  length: 1,
  density: 1,
  opacity: 1,
  hue: 0,
  saturation: 1,
  brightness: 1,
};

export const LASER_VARIANT_DEFAULTS = { ...ATMOSPHERIC_BLADE_DEFAULT_PROPS };

const SRC = 'src/templates/background/atmospheric-blade-laser/sources';

export const ASSET_MANIFEST = [
  {
    path: `${SRC}/LaserCollection.tsx.txt`,
    bytes: LASER_COLLECTION_BYTES,
    sha256: LASER_COLLECTION_SHA256,
  },
  {
    path: `${SRC}/LaserVariants.tsx.txt`,
    bytes: LASER_VARIANTS_BYTES,
    sha256: LASER_VARIANTS_SHA256,
  },
  {
    path: `${SRC}/laserShaders.ts.txt`,
    bytes: LASER_SHADERS_BYTES,
    sha256: LASER_SHADERS_SHA256,
  },
  {
    path: `${SRC}/NeuformBatchEffects.tsx.txt`,
    bytes: NEUFORM_BATCH_COMPONENT_BYTES,
    sha256: NEUFORM_BATCH_COMPONENT_SHA256,
  },
  {
    path: `${SRC}/matrix-field.html`,
    bytes: MATRIX_FIELD_HTML_BYTES,
    sha256: MATRIX_FIELD_HTML_SHA256,
  },
  {
    path: `${SRC}/threeui.css`,
    bytes: THREEUI_CSS_BYTES,
    sha256: THREEUI_CSS_SHA256,
  },
];

export const PREVIEW_STILL =
  '/images/Assets%20Atmospheric%20Blade%20Laser/AtmosphericBladeLaser.png';
export const PREVIEW_STILL_DISK =
  'public/images/Assets Atmospheric Blade Laser/AtmosphericBladeLaser.png';
export const MIN_PREVIEW_BYTES = 10_000;

export const PIXEL_RATIO_CAP = 1.5;
export const POINTER_LERP = 0.055;
export const REDUCED_MOTION_TIME = 2.75;
export const TIME_SCALE = 0.001;
export const MIN_BOUNDS_EDGE = 1;
export const MIN_CANVAS_DIM = 1;
export const DRAW_ARRAY_COUNT = 6;

export const SPEED_MIN = 0;
export const SPEED_MAX = 3;
export const SIZE_MIN = 0.35;
export const SIZE_MAX = 2.5;
export const LENGTH_MIN = 0.35;
export const LENGTH_MAX = 2.5;
export const DENSITY_MIN = 0.25;
export const DENSITY_MAX = 2.5;
export const OPACITY_MIN = 0.05;
export const OPACITY_MAX = 1;
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
