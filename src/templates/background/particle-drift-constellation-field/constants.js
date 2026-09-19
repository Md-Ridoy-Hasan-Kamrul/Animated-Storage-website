/** Particle Drift Constellation Field — host + provenance constants. */

export const CARD_ID = 'particle-drift-constellation-field';
export const CARD_TITLE = 'Particle Drift Constellation Field';
export const PAGE_TITLE = 'Particle Drift Constellation Field — Kmotion';
export const DETAIL_FALLBACK = '/templates/particle-drift-constellation-field';

export const PAGE_CLASS = 'particle-drift-constellation-field-page';
export const PAGE_HTML_CLASS = 'particle-drift-constellation-field-html';
export const FRAMED_HTML_CLASS = 'particle-drift-constellation-field-framed';
export const SHADER_FRAME_CLASS = 'shader-frame';
export const HOST_CLASS = 'threeui-background constellation-field';

export const PAGE_BG = '#030509';
export const PAGE_INK = '#FFFFFF';

export const SOURCE_REVISION = '1920ad4fe34f';
export const VARIANT_ID = 'particle-drift';
export const SOURCE_URL = '/effects/particle-drift.html';

export const NEUFORM_BATCH_COMPONENT_SHA256 =
  'dc68c51bea26b922965de44b4fb8d6c432607508fb2b61e16ed60d245da1a69f';
export const PARTICLE_DRIFT_HTML_SHA256 =
  '7fad6cc8c54c0385c472c2879762b3fd2bfb061820bf925034d7a58a0048eb27';
export const THREEUI_CSS_SHA256 =
  'efe4447139f1358dd8e9be68edf6fa46cbefbd1de423a4d6c439ca61d2c8eccf';

export const NEUFORM_BATCH_COMPONENT_BYTES = 41426;
export const PARTICLE_DRIFT_HTML_BYTES = 14811;
export const THREEUI_CSS_BYTES = 40715;
export const PUBLIC_PARTICLE_DRIFT_HTML_SHA256 =
  '13478e003220d9de831b69980d14160fa8bc9ad9eff5c149432dad6b71044de7';
export const PUBLIC_PARTICLE_DRIFT_HTML_BYTES = 19330;

export const PARTICLE_DRIFT_DEFAULT_PROPS = {
  variant: 'particle-drift',
  mode: 'dark',
  speed: 1,
  size: 1,
  length: 1,
  density: 1,
  opacity: 1,
  hue: 0,
  saturation: 1,
  brightness: 1,
};

const SRC = 'src/templates/background/particle-drift-constellation-field/sources';

export const ASSET_MANIFEST = [
  {
    path: `${SRC}/NeuformBatchEffects.tsx.txt`,
    bytes: NEUFORM_BATCH_COMPONENT_BYTES,
    sha256: NEUFORM_BATCH_COMPONENT_SHA256,
  },
  {
    path: `${SRC}/particle-drift.html`,
    bytes: PARTICLE_DRIFT_HTML_BYTES,
    sha256: PARTICLE_DRIFT_HTML_SHA256,
  },
  {
    path: `${SRC}/threeui.css`,
    bytes: THREEUI_CSS_BYTES,
    sha256: THREEUI_CSS_SHA256,
  },
  {
    path: 'public/effects/particle-drift.html',
    bytes: PUBLIC_PARTICLE_DRIFT_HTML_BYTES,
    sha256: PUBLIC_PARTICLE_DRIFT_HTML_SHA256,
  },
];

export const PREVIEW_STILL =
  '/images/Assets%20Particle%20Drift%20Constellation%20Field/ParticleDriftConstellationField.png';
export const PREVIEW_STILL_DISK =
  'public/images/Assets Particle Drift Constellation Field/ParticleDriftConstellationField.png';
export const MIN_PREVIEW_BYTES = 10_000;

export const BACK_BUTTON_CLASS =
  'absolute top-4 left-4 z-50 flex items-center gap-2 rounded-full bg-white/10 px-3 py-2 text-sm text-white backdrop-blur-md transition hover:bg-white/20';
export const BACK_ICON_SIZE = 16;
export const BACK_ICON_STROKE = 2;
export const BACK_LABEL = 'Back';
export const HISTORY_CAN_GO_BACK_MIN = 0;
