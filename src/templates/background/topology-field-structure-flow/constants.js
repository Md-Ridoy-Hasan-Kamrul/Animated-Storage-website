export const CARD_ID = 'topology-field-structure-flow';
export const CARD_TITLE = 'Topology Field Structure Flow';
export const DETAIL_FALLBACK = '/templates/topology-field-structure-flow';
export const PAGE_TITLE = 'Topology Field — Structure Flow';
export const PAGE_BG = '#070707';
export const PAGE_INK = '#f3f4f6';
export const PAGE_HTML_CLASS = 'topology-field-structure-flow-html';
export const FRAMED_HTML_CLASS = 'topology-field-structure-flow-framed';
export const PAGE_CLASS = 'topology-field-structure-flow-page';
export const SHADER_FRAME_CLASS = 'shader-frame';
export const HISTORY_CAN_GO_BACK_MIN = 0;
export const BACK_ICON_SIZE = 16;
export const BACK_ICON_STROKE = 2;
export const BACK_LABEL = 'Back';
export const BACK_BUTTON_CLASS =
  'topology-field-structure-flow-back fixed left-4 top-4 z-[70] inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/45 px-3.5 py-2 text-sm font-medium text-gray-100 backdrop-blur-md transition-colors hover:border-white/30 hover:bg-black/65 md:left-6 md:top-6';

/** Focused Topology Field document (CSP-safe URL; srcDoc inline scripts are blocked). */
export const FRAME_SANDBOX =
  'allow-downloads allow-forms allow-modals allow-popups allow-same-origin allow-scripts';
export const SOURCE_URL = '/effects/topology-field-structure-flow.html';
export const SOURCE_REVISION = '40eb5bac81e3';
export const COMPONENT_SHA256 =
  'fe9856234253bc3c1a13b3afb84f3d84644dfa6d578e7203bb3e1dd5eced1b75';
export const NEXUS_TOPOLOGY_HTML_SHA256 =
  '2cf632d75ed5a88b32df82839cf9608d8542f7e08b5a0e3072fce94825d1c98d';
export const THREEUI_CSS_SHA256 =
  'efe4447139f1358dd8e9be68edf6fa46cbefbd1de423a4d6c439ca61d2c8eccf';
export const FOCUSED_DOCUMENT_SHA256 =
  '0cb7ffda0d98fd782c3fe8e5daac82170fd44d3ada1576d2a6fb1466242868e8';
export const FOCUSED_DOCUMENT_BYTES = 25110;
export const NEXUS_TOPOLOGY_BYTES = 20023;
export const THREEUI_CSS_BYTES = 40715;
export const FRAME_TITLE = 'Nexus topology field';
export const STRUCTURE_FLOW_VARIANT = 'topology-field';
export const VARIANT_BACKGROUND = '#070707';
export const HUE_MIN = -180;
export const HUE_MAX = 180;
export const SATURATION_MIN = 0;
export const SATURATION_MAX = 2;
export const BRIGHTNESS_MIN = 0.35;
export const BRIGHTNESS_MAX = 1.65;
export const DETAIL_CARD_IMAGE_COUNT = 8;
export const PREVIEW_STILL =
  '/images/Assets%20Topology%20Field%20Structure%20Flow/TopologyFieldStructureFlow.svg';

export const STRUCTURE_FLOW_VARIANTS = ['topology-field'];

export const STRUCTURE_FLOW_DEFAULT_PROPS = {
  variant: 'topology-field',
  hue: 0,
  saturation: 1,
  brightness: 1,
};

export const ASSET_MANIFEST = [
  {
    path: 'src/templates/background/topology-field-structure-flow/sources/nexus-topology.html',
    bytes: NEXUS_TOPOLOGY_BYTES,
    sha256: NEXUS_TOPOLOGY_HTML_SHA256,
  },
  {
    path: 'src/templates/background/topology-field-structure-flow/sources/threeui.css',
    bytes: THREEUI_CSS_BYTES,
    sha256: THREEUI_CSS_SHA256,
  },
  {
    path: 'public/effects/topology-field-structure-flow.html',
    bytes: FOCUSED_DOCUMENT_BYTES,
    sha256: FOCUSED_DOCUMENT_SHA256,
  },
];
