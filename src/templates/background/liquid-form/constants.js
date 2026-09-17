/** Liquid Form — host + provenance constants. */

export const CARD_ID = 'liquid-form';
export const CARD_TITLE = 'Liquid Form';
export const PAGE_TITLE = 'Liquid Form — Kmotion';
export const DETAIL_FALLBACK = '/templates/liquid-form';

export const PAGE_CLASS = 'liquid-form-page';
export const PAGE_HTML_CLASS = 'liquid-form-html';
export const FRAMED_HTML_CLASS = 'liquid-form-framed';
export const SHADER_FRAME_CLASS = 'shader-frame';
export const HOST_CLASS = 'threeui-background liquid-form';

export const PAGE_BG = '#050505';
export const PAGE_INK = '#e8e8e8';

export const SOURCE_REVISION = 'acc0cbacb914';

export const LIQUID_FORM_COMPONENT_SHA256 =
  '95e43ab2c5312ff94e0aa4cd63902f2b994a7ed881661e279a04c30c1c36234a';
export const LIQUID_FORM_SHADERS_SHA256 =
  '5ec6722aa75a4b3e5815ae811105201668e8d88a060d4bab46b38e87f136c7ea';
export const THREEUI_CSS_SHA256 =
  'efe4447139f1358dd8e9be68edf6fa46cbefbd1de423a4d6c439ca61d2c8eccf';

export const LIQUID_FORM_COMPONENT_BYTES = 5476;
export const LIQUID_FORM_SHADERS_BYTES = 4552;
export const THREEUI_CSS_BYTES = 40715;

export const LIQUID_FORM_DEFAULT_PROPS = {
  speed: 1,
  morph: 1,
  noiseScale: 1,
  mouseAmount: 0.15,
  metal: 1,
  camera: 5.5,
  tintHue: 220,
  tintAmount: 0,
};

export const ASSET_MANIFEST = [
  {
    path: 'src/templates/background/liquid-form/sources/LiquidFormBackground.tsx.txt',
    bytes: LIQUID_FORM_COMPONENT_BYTES,
    sha256: LIQUID_FORM_COMPONENT_SHA256,
  },
  {
    path: 'src/templates/background/liquid-form/sources/liquidFormShaders.ts.txt',
    bytes: LIQUID_FORM_SHADERS_BYTES,
    sha256: LIQUID_FORM_SHADERS_SHA256,
  },
  {
    path: 'src/templates/background/liquid-form/sources/threeui.css',
    bytes: THREEUI_CSS_BYTES,
    sha256: THREEUI_CSS_SHA256,
  },
];

export const PREVIEW_STILL = '/images/Assets%20Liquid%20Form/LiquidForm.png';

export const BACK_BUTTON_CLASS =
  'absolute top-4 left-4 z-50 flex items-center gap-2 rounded-full bg-white/10 px-3 py-2 text-sm text-white backdrop-blur-md transition hover:bg-white/20';
export const BACK_ICON_SIZE = 16;
export const BACK_ICON_STROKE = 2;
export const BACK_LABEL = 'Back';
export const HISTORY_CAN_GO_BACK_MIN = 0;
