/** Gateway Flow Constellation Field — host + provenance constants. */

export const CARD_ID = 'gateway-flow-constellation-field';
export const CARD_TITLE = 'Gateway Flow Constellation Field';
export const PAGE_TITLE = 'Gateway Flow Constellation Field — Kmotion';
export const DETAIL_FALLBACK = '/templates/gateway-flow-constellation-field';

export const PAGE_CLASS = 'gateway-flow-constellation-field-page';
export const PAGE_HTML_CLASS = 'gateway-flow-constellation-field-html';
export const FRAMED_HTML_CLASS = 'gateway-flow-constellation-field-framed';
export const SHADER_FRAME_CLASS = 'shader-frame';
export const HOST_CLASS = 'threeui-background constellation-field';

export const PAGE_BG = '#000000';
export const PAGE_INK = '#cbd5e1';

export const SOURCE_REVISION = '1920ad4fe34f';
export const VARIANT_ID = 'gateway-flow';
export const SOURCE_URL = '/effects/gateway-flow.html';

export const NEUFORM_BATCH_COMPONENT_SHA256 =
  'dc68c51bea26b922965de44b4fb8d6c432607508fb2b61e16ed60d245da1a69f';
export const GATEWAY_FLOW_HTML_SHA256 =
  'c5a1de43138ffba96b9f0ecdcf3c054ae251ec94344e88c6ad502bae362b17d0';
export const THREEUI_CSS_SHA256 =
  'efe4447139f1358dd8e9be68edf6fa46cbefbd1de423a4d6c439ca61d2c8eccf';

export const NEUFORM_BATCH_COMPONENT_BYTES = 41426;
export const GATEWAY_FLOW_HTML_BYTES = 17251;
export const THREEUI_CSS_BYTES = 40715;
export const PUBLIC_GATEWAY_FLOW_HTML_SHA256 =
  '550fb30d6110cfd700ad02670113c11de6072b56ff44aa33c329c6353aded6a0';
export const PUBLIC_GATEWAY_FLOW_HTML_BYTES = 21702;

export const GATEWAY_FLOW_DEFAULT_PROPS = {
  variant: 'gateway-flow',
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

const SRC = 'src/templates/background/gateway-flow-constellation-field/sources';

export const ASSET_MANIFEST = [
  {
    path: `${SRC}/NeuformBatchEffects.tsx.txt`,
    bytes: NEUFORM_BATCH_COMPONENT_BYTES,
    sha256: NEUFORM_BATCH_COMPONENT_SHA256,
  },
  {
    path: `${SRC}/gateway-flow.html`,
    bytes: GATEWAY_FLOW_HTML_BYTES,
    sha256: GATEWAY_FLOW_HTML_SHA256,
  },
  {
    path: `${SRC}/threeui.css`,
    bytes: THREEUI_CSS_BYTES,
    sha256: THREEUI_CSS_SHA256,
  },
  {
    path: 'public/effects/gateway-flow.html',
    bytes: PUBLIC_GATEWAY_FLOW_HTML_BYTES,
    sha256: PUBLIC_GATEWAY_FLOW_HTML_SHA256,
  },
];

export const PREVIEW_STILL =
  '/images/Assets%20Gateway%20Flow%20Constellation%20Field/GatewayFlowConstellationField.png';
export const PREVIEW_STILL_DISK =
  'public/images/Assets Gateway Flow Constellation Field/GatewayFlowConstellationField.png';
export const MIN_PREVIEW_BYTES = 10_000;

export const BACK_BUTTON_CLASS =
  'absolute top-4 left-4 z-50 flex items-center gap-2 rounded-full bg-white/10 px-3 py-2 text-sm text-white backdrop-blur-md transition hover:bg-white/20';
export const BACK_ICON_SIZE = 16;
export const BACK_ICON_STROKE = 2;
export const BACK_LABEL = 'Back';
export const HISTORY_CAN_GO_BACK_MIN = 0;
