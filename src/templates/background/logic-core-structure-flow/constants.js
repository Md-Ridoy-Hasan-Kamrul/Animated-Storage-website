export const CARD_ID = 'logic-core-structure-flow';
export const CARD_TITLE = 'Logic Core Structure Flow';
export const DETAIL_FALLBACK = '/templates/logic-core-structure-flow';
export const PAGE_TITLE = 'Logic Core — Structure Flow';
export const PAGE_BG = '#050505';
export const PAGE_INK = '#d4d4d8';
export const PAGE_HTML_CLASS = 'logic-core-structure-flow-html';
export const FRAMED_HTML_CLASS = 'logic-core-structure-flow-framed';
export const PAGE_CLASS = 'logic-core-structure-flow-page';
export const SHADER_FRAME_CLASS = 'shader-frame';
export const HISTORY_CAN_GO_BACK_MIN = 0;
export const BACK_ICON_SIZE = 16;
export const BACK_ICON_STROKE = 2;
export const BACK_LABEL = 'Back';
export const BACK_BUTTON_CLASS =
  'logic-core-structure-flow-back fixed left-4 top-4 z-[70] inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/45 px-3.5 py-2 text-sm font-medium text-zinc-200 backdrop-blur-md transition-colors hover:border-white/30 hover:bg-black/65 md:left-6 md:top-6';

/** Focused Logic Core document (CSP-safe URL; srcDoc inline scripts are blocked). */
export const FRAME_SANDBOX =
  'allow-downloads allow-forms allow-modals allow-popups allow-same-origin allow-scripts';
export const SOURCE_URL = '/effects/logic-core-structure-flow.html';
export const SOURCE_REVISION = '40eb5bac81e3';
export const COMPONENT_SHA256 =
  'fe9856234253bc3c1a13b3afb84f3d84644dfa6d578e7203bb3e1dd5eced1b75';
export const PLATFORM_CORE_HTML_SHA256 =
  '0f6889add89b389ba687fc6828c1f9415e5d8d54005492a91f3a79641ba42e31';
export const THREEUI_CSS_SHA256 =
  'efe4447139f1358dd8e9be68edf6fa46cbefbd1de423a4d6c439ca61d2c8eccf';
export const FOCUSED_DOCUMENT_SHA256 =
  '5447af3d242309ebb2ad842eea08aab340a784ac6f13a7342bbc26c7a86055a1';
export const FOCUSED_DOCUMENT_BYTES = 26920;
export const PLATFORM_CORE_BYTES = 20390;
export const THREEUI_CSS_BYTES = 40715;
export const FRAME_TITLE = 'Logic Core isometric field';
export const STRUCTURE_FLOW_VARIANT = 'logic-core';
export const VARIANT_BACKGROUND = '#050505';
export const HUE_MIN = -180;
export const HUE_MAX = 180;
export const SATURATION_MIN = 0;
export const SATURATION_MAX = 2;
export const BRIGHTNESS_MIN = 0.35;
export const BRIGHTNESS_MAX = 1.65;
export const DETAIL_CARD_IMAGE_COUNT = 8;
export const PREVIEW_STILL =
  '/images/Assets%20Logic%20Core%20Structure%20Flow/LogicCoreStructureFlow.svg';

export const STRUCTURE_FLOW_VARIANTS = ['logic-core'];

export const STRUCTURE_FLOW_DEFAULT_PROPS = {
  variant: 'logic-core',
  hue: 0,
  saturation: 1,
  brightness: 1,
};

export const ASSET_MANIFEST = [
  {
    path: 'src/templates/background/logic-core-structure-flow/sources/platform-core.html',
    bytes: PLATFORM_CORE_BYTES,
    sha256: PLATFORM_CORE_HTML_SHA256,
  },
  {
    path: 'src/templates/background/logic-core-structure-flow/sources/threeui.css',
    bytes: THREEUI_CSS_BYTES,
    sha256: THREEUI_CSS_SHA256,
  },
  {
    path: 'public/effects/logic-core-structure-flow.html',
    bytes: FOCUSED_DOCUMENT_BYTES,
    sha256: FOCUSED_DOCUMENT_SHA256,
  },
];
