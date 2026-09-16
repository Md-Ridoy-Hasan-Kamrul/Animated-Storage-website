export const CARD_ID = 'nebula-structure-flow';
export const CARD_TITLE = 'Nebula Structure Flow';
export const DETAIL_FALLBACK = '/templates/nebula-structure-flow';
export const PAGE_TITLE = 'Nebula — Structure Flow';
export const PAGE_BG = '#09090b';
export const PAGE_INK = '#f4f4f5';
export const PAGE_HTML_CLASS = 'nebula-structure-flow-html';
export const FRAMED_HTML_CLASS = 'nebula-structure-flow-framed';
export const PAGE_CLASS = 'nebula-structure-flow-page';
export const SHADER_FRAME_CLASS = 'shader-frame';
export const HISTORY_CAN_GO_BACK_MIN = 0;
export const BACK_ICON_SIZE = 16;
export const BACK_ICON_STROKE = 2;
export const BACK_LABEL = 'Back';
export const BACK_BUTTON_CLASS =
  'nebula-structure-flow-back fixed left-4 top-4 z-[70] inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/45 px-3.5 py-2 text-sm font-medium text-zinc-100 backdrop-blur-md transition-colors hover:border-white/30 hover:bg-black/65 md:left-6 md:top-6';

/** Focused Nebula document (CSP-safe URL; srcDoc inline scripts are blocked). */
export const FRAME_SANDBOX =
  'allow-downloads allow-forms allow-modals allow-popups allow-same-origin allow-scripts';
export const SOURCE_URL = '/effects/nebula-structure-flow.html';
export const SOURCE_REVISION = '40eb5bac81e3';
export const COMPONENT_SHA256 =
  '0a1680c3c119dba8c61d946322afa0b64d36dfd80956fb5e7c3fd017d7bfa450';
export const JULIAN_VANCE_NEBULA_HTML_SHA256 =
  'e4f3bda31a5c260356790add556a2ae59bb97ad6015a1f84cc6c9801b37e5a4d';
export const THREEUI_CSS_SHA256 =
  'efe4447139f1358dd8e9be68edf6fa46cbefbd1de423a4d6c439ca61d2c8eccf';
export const FOCUSED_DOCUMENT_SHA256 =
  '2dc36bd7c77020f05f3bb480ba37bae8a416f74548a1ebaad47fb377c453fa53';
export const FOCUSED_DOCUMENT_BYTES = 21176;
export const JULIAN_VANCE_NEBULA_BYTES = 18516;
export const THREEUI_CSS_BYTES = 40715;
export const FRAME_TITLE = 'Julian Vance nebula background';
export const STRUCTURE_FLOW_VARIANT = 'nebula';
export const VARIANT_BACKGROUND = '#09090b';
export const HUE_MIN = -180;
export const HUE_MAX = 180;
export const SATURATION_MIN = 0;
export const SATURATION_MAX = 2;
export const BRIGHTNESS_MIN = 0.35;
export const BRIGHTNESS_MAX = 1.65;
export const DETAIL_CARD_IMAGE_COUNT = 8;
export const PREVIEW_STILL =
  '/images/Assets%20Nebula%20Structure%20Flow/NebulaStructureFlow.svg';

export const STRUCTURE_FLOW_VARIANTS = ['nebula'];

export const STRUCTURE_FLOW_DEFAULT_PROPS = {
  variant: 'nebula',
  hue: 0,
  saturation: 1,
  brightness: 1,
};

export const ASSET_MANIFEST = [
  {
    path: 'src/templates/background/nebula-structure-flow/sources/julian-vance-nebula.html',
    bytes: JULIAN_VANCE_NEBULA_BYTES,
    sha256: JULIAN_VANCE_NEBULA_HTML_SHA256,
  },
  {
    path: 'src/templates/background/nebula-structure-flow/sources/threeui.css',
    bytes: THREEUI_CSS_BYTES,
    sha256: THREEUI_CSS_SHA256,
  },
  {
    path: 'public/effects/nebula-structure-flow.html',
    bytes: FOCUSED_DOCUMENT_BYTES,
    sha256: FOCUSED_DOCUMENT_SHA256,
  },
];
