export const CARD_ID = 'china-japanese-tower-landscape';
export const CARD_TITLE = 'Chinese Tower Landscape';
export const DETAIL_FALLBACK = '/templates/china-japanese-tower-landscape';
export const PAGE_TITLE = 'China — Japanese Tower Landscape';
export const PAGE_BG = '#ecdcbc';
export const PAGE_INK = '#2e2515';
export const PAGE_HTML_CLASS = 'china-japanese-tower-landscape-html';
export const FRAMED_HTML_CLASS = 'china-japanese-tower-landscape-framed';
export const PAGE_CLASS = 'china-japanese-tower-landscape-page';
export const SHADER_FRAME_CLASS = 'shader-frame';
export const HISTORY_CAN_GO_BACK_MIN = 0;
export const BACK_ICON_SIZE = 16;
export const BACK_ICON_STROKE = 2;
export const BACK_LABEL = 'Back';
export const BACK_BUTTON_CLASS =
  'china-japanese-tower-landscape-back fixed left-4 top-4 z-[70] inline-flex items-center gap-2 rounded-full border border-[#2e2515]/20 bg-[#ecdcbc]/80 px-3.5 py-2 text-sm font-medium text-[#2e2515] backdrop-blur-md transition-colors hover:border-[#2e2515]/40 hover:bg-[#f7e5c6]/90 md:left-6 md:top-6';

/** Authored document (CSP-safe URL; srcDoc inline scripts are blocked). */
export const FRAME_SANDBOX =
  'allow-downloads allow-forms allow-modals allow-popups allow-same-origin allow-scripts';
/** Shared focused Towers document (country selected via ?country=). */
export const SOURCE_URL = '/effects/japanese-tower-landscape.html';
export const SOURCE_REVISION = '7810e7163c02';
export const COMPONENT_SHA256 =
  '3ad3de77dabdcf9f2e0d3e7bb1347089249eef68e2b8db9ce98c3acc0920e411';
export const TOWERS_HTML_SHA256 =
  '7810e7163c027f654235032fb1eed48846b68bf80f5b1c1c4292e01694b71f3d';
export const THREEUI_CSS_SHA256 =
  'efe4447139f1358dd8e9be68edf6fa46cbefbd1de423a4d6c439ca61d2c8eccf';
export const FOCUSED_DOCUMENT_SHA256 =
  'e1bff45ed76f2a98f766e39cc04f5ba6b48d20827c22f41e9acf7becef22be83';
export const FOCUSED_DOCUMENT_BYTES = 2427050;
export const TOWERS_BYTES = 2426306;
export const THREEUI_CSS_BYTES = 40715;
export const FRAME_TITLE = 'Chinese pagoda in a procedural landscape';
export const TOWER_COUNTRY = 'china';
export const VARIANT_BACKGROUND = '#ecdcbc';

export const DETAIL_CARD_IMAGE_COUNT = 8;
export const PREVIEW_STILL =
  '/images/Assets%20Japanese%20Tower%20Landscape/JapaneseTowerLandscape.svg';

export const TOWER_COUNTRIES = [
  'japan',
  'china',
  'vietnam',
  'thailand',
  'cambodia',
  'turkey',
];

export const COUNTRY_LABELS = {
  japan: 'Japanese tenshu',
  china: 'Chinese pagoda',
  vietnam: 'Vietnamese tháp',
  thailand: 'Thai prang',
  cambodia: 'Khmer prasat',
  turkey: 'Ottoman mosque',
};

export const CHINESE_TOWER_DEFAULT_PROPS = {
  country: 'china',
};

/** Provenance assets live with the Japan card extraction (same registered SHA bundle). */
export const ASSET_MANIFEST = [
  {
    path: 'src/templates/background/japanese-tower-landscape/sources/Towers.html',
    bytes: TOWERS_BYTES,
    sha256: TOWERS_HTML_SHA256,
  },
  {
    path: 'src/templates/background/japanese-tower-landscape/sources/threeui.css',
    bytes: THREEUI_CSS_BYTES,
    sha256: THREEUI_CSS_SHA256,
  },
  {
    path: 'public/effects/japanese-tower-landscape.html',
    bytes: FOCUSED_DOCUMENT_BYTES,
    sha256: FOCUSED_DOCUMENT_SHA256,
  },
];
