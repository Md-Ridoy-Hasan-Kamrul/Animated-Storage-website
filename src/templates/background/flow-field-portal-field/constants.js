/** Flow Field Portal Field — host + provenance constants. */

export const CARD_ID = 'flow-field-portal-field';
export const CARD_TITLE = 'Flow Field Portal Field';
export const PAGE_TITLE = 'Flow Field Portal Field — Kmotion';
export const DETAIL_FALLBACK = '/templates/flow-field-portal-field';

export const PAGE_CLASS = 'flow-field-portal-field-page';
export const PAGE_HTML_CLASS = 'flow-field-portal-field-html';
export const FRAMED_HTML_CLASS = 'flow-field-portal-field-framed';
export const SHADER_FRAME_CLASS = 'shader-frame';
export const HOST_CLASS = 'threeui-background portal-field-collection';

export const PAGE_BG = '#0a0a0a';
export const PAGE_INK = '#c8956c';

export const SOURCE_REVISION = 'f90e34f83d51';
export const VARIANT_ID = 'flow-field';
export const SOURCE_URL = '/effects/flow-field.html';
export const FRAME_TITLE = 'Flow Field';
export const FRAME_SANDBOX = 'allow-scripts';

export const NEUFORM_BATCH_COMPONENT_SHA256 =
  'dc68c51bea26b922965de44b4fb8d6c432607508fb2b61e16ed60d245da1a69f';
export const FLOW_FIELD_HTML_SHA256 =
  '78eaf8ce34317bb66c44b72069ff36c622987ef61d3e703e8ea5800e089eb0b2';
export const THREEUI_CSS_SHA256 =
  'efe4447139f1358dd8e9be68edf6fa46cbefbd1de423a4d6c439ca61d2c8eccf';

export const NEUFORM_BATCH_COMPONENT_BYTES = 41426;
export const FLOW_FIELD_HTML_BYTES = 10590;
export const THREEUI_CSS_BYTES = 40715;
export const PUBLIC_FLOW_FIELD_HTML_SHA256 =
  'b5a323142875ea66e0ab3efdc1630d789e24d72ece1b919f4d5047185d8693c3';
export const PUBLIC_FLOW_FIELD_HTML_BYTES = 13904;

export const FLOW_FIELD_DEFAULT_PROPS = {
  variant: 'flow-field',
  speed: 1,
  size: 1,
  length: 1,
  density: 1,
  opacity: 1,
  hue: 0,
  saturation: 1,
  brightness: 1,
};

const SRC = 'src/templates/background/flow-field-portal-field/sources';

export const ASSET_MANIFEST = [
  {
    path: `${SRC}/NeuformBatchEffects.tsx.txt`,
    bytes: NEUFORM_BATCH_COMPONENT_BYTES,
    sha256: NEUFORM_BATCH_COMPONENT_SHA256,
  },
  {
    path: `${SRC}/flow-field.html`,
    bytes: FLOW_FIELD_HTML_BYTES,
    sha256: FLOW_FIELD_HTML_SHA256,
  },
  {
    path: `${SRC}/threeui.css`,
    bytes: THREEUI_CSS_BYTES,
    sha256: THREEUI_CSS_SHA256,
  },
  {
    path: 'public/effects/flow-field.html',
    bytes: PUBLIC_FLOW_FIELD_HTML_BYTES,
    sha256: PUBLIC_FLOW_FIELD_HTML_SHA256,
  },
];

export const PREVIEW_STILL =
  '/images/Assets%20Flow%20Field%20Portal%20Field/FlowFieldPortalField.png';
export const PREVIEW_STILL_DISK =
  'public/images/Assets Flow Field Portal Field/FlowFieldPortalField.png';
export const MIN_PREVIEW_BYTES = 10_000;

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

export const BACK_BUTTON_CLASS =
  'absolute top-4 left-4 z-50 flex items-center gap-2 rounded-full bg-white/10 px-3 py-2 text-sm text-white backdrop-blur-md transition hover:bg-white/20';
export const BACK_ICON_SIZE = 16;
export const BACK_ICON_STROKE = 2;
export const BACK_LABEL = 'Back';
export const HISTORY_CAN_GO_BACK_MIN = 0;
