/** Interface Lines Constellation Field — host + provenance constants. */

export const CARD_ID = 'interface-lines-constellation-field';
export const CARD_TITLE = 'Interface Lines Constellation Field';
export const PAGE_TITLE = 'Interface Lines Constellation Field — Kmotion';
export const DETAIL_FALLBACK = '/templates/interface-lines-constellation-field';

export const PAGE_CLASS = 'interface-lines-constellation-field-page';
export const PAGE_HTML_CLASS = 'interface-lines-constellation-field-html';
export const FRAMED_HTML_CLASS = 'interface-lines-constellation-field-framed';
export const SHADER_FRAME_CLASS = 'shader-frame';
export const HOST_CLASS = 'threeui-background constellation-field';

export const PAGE_BG = '#050505';
export const PAGE_INK = '#a1a1aa';

export const SOURCE_REVISION = '1920ad4fe34f';
export const VARIANT_ID = 'interface-lines';
export const SOURCE_URL = '/effects/interface-lines.html';

export const NEUFORM_BATCH_COMPONENT_SHA256 =
  'dc68c51bea26b922965de44b4fb8d6c432607508fb2b61e16ed60d245da1a69f';
export const INTERFACE_LINES_HTML_SHA256 =
  '608cbc6976996b8a5b6c4aaba4bee4d6f2dd44579b819df45914f35bc310d2cc';
export const THREEUI_CSS_SHA256 =
  'efe4447139f1358dd8e9be68edf6fa46cbefbd1de423a4d6c439ca61d2c8eccf';

export const NEUFORM_BATCH_COMPONENT_BYTES = 41426;
export const INTERFACE_LINES_HTML_BYTES = 18496;
export const THREEUI_CSS_BYTES = 40715;
export const PUBLIC_INTERFACE_LINES_HTML_SHA256 =
  'b5ede7e08516b27c431843e00ee4ed159d652896439b7e6a58cf7b68ad484ebf';
export const PUBLIC_INTERFACE_LINES_HTML_BYTES = 23003;

export const INTERFACE_LINES_DEFAULT_PROPS = {
  variant: 'interface-lines',
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

const SRC = 'src/templates/background/interface-lines-constellation-field/sources';

export const ASSET_MANIFEST = [
  {
    path: `${SRC}/NeuformBatchEffects.tsx.txt`,
    bytes: NEUFORM_BATCH_COMPONENT_BYTES,
    sha256: NEUFORM_BATCH_COMPONENT_SHA256,
  },
  {
    path: `${SRC}/interface-lines.html`,
    bytes: INTERFACE_LINES_HTML_BYTES,
    sha256: INTERFACE_LINES_HTML_SHA256,
  },
  {
    path: `${SRC}/threeui.css`,
    bytes: THREEUI_CSS_BYTES,
    sha256: THREEUI_CSS_SHA256,
  },
  {
    path: 'public/effects/interface-lines.html',
    bytes: PUBLIC_INTERFACE_LINES_HTML_BYTES,
    sha256: PUBLIC_INTERFACE_LINES_HTML_SHA256,
  },
];

export const PREVIEW_STILL =
  '/images/Assets%20Interface%20Lines%20Constellation%20Field/InterfaceLinesConstellationField.png';
export const PREVIEW_STILL_DISK =
  'public/images/Assets Interface Lines Constellation Field/InterfaceLinesConstellationField.png';
export const MIN_PREVIEW_BYTES = 10_000;

export const BACK_BUTTON_CLASS =
  'absolute top-4 left-4 z-50 flex items-center gap-2 rounded-full bg-white/10 px-3 py-2 text-sm text-white backdrop-blur-md transition hover:bg-white/20';
export const BACK_ICON_SIZE = 16;
export const BACK_ICON_STROKE = 2;
export const BACK_LABEL = 'Back';
export const HISTORY_CAN_GO_BACK_MIN = 0;
