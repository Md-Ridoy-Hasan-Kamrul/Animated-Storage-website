export const CARD_ID = 'flux-vortex-structure-flow';
export const CARD_TITLE = 'Flux Vortex Structure Flow';
export const DETAIL_FALLBACK = '/templates/flux-vortex-structure-flow';
export const PAGE_TITLE = 'Flux Vortex — Structure Flow';
export const PAGE_BG = '#050505';
export const PAGE_INK = '#f5f5f5';
export const PAGE_HTML_CLASS = 'flux-vortex-structure-flow-html';
export const FRAMED_HTML_CLASS = 'flux-vortex-structure-flow-framed';
export const PAGE_CLASS = 'flux-vortex-structure-flow-page';
export const SHADER_FRAME_CLASS = 'shader-frame';
export const HISTORY_CAN_GO_BACK_MIN = 0;
export const BACK_ICON_SIZE = 16;
export const BACK_ICON_STROKE = 2;
export const BACK_LABEL = 'Back';
export const BACK_BUTTON_CLASS =
  'flux-vortex-structure-flow-back fixed left-4 top-4 z-[70] inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/45 px-3.5 py-2 text-sm font-medium text-neutral-100 backdrop-blur-md transition-colors hover:border-white/30 hover:bg-black/65 md:left-6 md:top-6';

/** Focused Flux Vortex document (CSP-safe URL; srcDoc inline scripts are blocked). */
export const FRAME_SANDBOX =
  'allow-downloads allow-forms allow-modals allow-popups allow-same-origin allow-scripts';
export const SOURCE_URL = '/effects/flux-vortex-structure-flow.html';
export const SOURCE_REVISION = '40eb5bac81e3';
export const COMPONENT_SHA256 =
  'dc68c51bea26b922965de44b4fb8d6c432607508fb2b61e16ed60d245da1a69f';
export const FLUX_VORTEX_HTML_SHA256 =
  'ec02a0cfd079c9345dc11549653b1a52feac11f98ae10051a786da65710b0f1c';
export const THREEUI_CSS_SHA256 =
  'efe4447139f1358dd8e9be68edf6fa46cbefbd1de423a4d6c439ca61d2c8eccf';
export const FOCUSED_DOCUMENT_SHA256 =
  '40457ec746e01ef03f8ff9cd96ce1c1d6729787112cc1513472eced8bdd4538d';
export const FOCUSED_DOCUMENT_BYTES = 25954;
export const FLUX_VORTEX_BYTES = 21560;
export const THREEUI_CSS_BYTES = 40715;
export const FRAME_TITLE = 'Flux Vortex';
export const STRUCTURE_FLOW_VARIANT = 'flux-vortex';
export const VARIANT_BACKGROUND = '#050505';
export const EFFECT_MODE = 'dark';

export const SPEED_MIN = 0;
export const SPEED_MAX = 3;
export const SIZE_MIN = 0.05;
export const SIZE_MAX = 200;
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

export const DETAIL_CARD_IMAGE_COUNT = 8;
export const PREVIEW_STILL =
  '/images/Assets%20Flux%20Vortex%20Structure%20Flow/FluxVortexStructureFlow.svg';

export const STRUCTURE_FLOW_VARIANTS = ['flux-vortex'];

export const STRUCTURE_FLOW_DEFAULT_PROPS = {
  variant: 'flux-vortex',
  speed: 1,
  size: 1,
  length: 1,
  density: 1,
  opacity: 1,
  hue: 0,
  saturation: 1,
  brightness: 1,
};

export const CONTROLS_MESSAGE_TYPE = 'threeui-controls';

export const ASSET_MANIFEST = [
  {
    path: 'src/templates/background/flux-vortex-structure-flow/sources/flux-vortex.html',
    bytes: FLUX_VORTEX_BYTES,
    sha256: FLUX_VORTEX_HTML_SHA256,
  },
  {
    path: 'src/templates/background/flux-vortex-structure-flow/sources/threeui.css',
    bytes: THREEUI_CSS_BYTES,
    sha256: THREEUI_CSS_SHA256,
  },
  {
    path: 'public/effects/flux-vortex-structure-flow.html',
    bytes: FOCUSED_DOCUMENT_BYTES,
    sha256: FOCUSED_DOCUMENT_SHA256,
  },
];
