/** Ashen Press (Book shelf) — host + provenance constants. */

export const CARD_ID = 'ashen-press';
export const CARD_TITLE = 'Book shelf';
export const PAGE_TITLE = 'Book shelf — Kmotion';
export const DETAIL_FALLBACK = '/templates/ashen-press';

export const PAGE_CLASS = 'ashen-press-page';
export const PAGE_HTML_CLASS = 'ashen-press-html';
export const FRAMED_HTML_CLASS = 'ashen-press-framed';
export const SHADER_FRAME_CLASS = 'shader-frame';
export const HOST_CLASS = 'threeui-background ashen-press';
export const FRAME_CLASS = 'ashen-press__frame';

export const PAGE_BG = '#c6ae8e';
export const PAGE_INK = '#241a12';
export const HOST_BACKGROUND = '#c6ae8e';

export const FRAME_SANDBOX = 'allow-scripts';
export const FRAME_TITLE = 'Ashen Press — The Art Book Shelf';
export const HOST_ARIA_LABEL = 'Interactive Ashen Press art book shelf';
export const HOST_ROLE = 'group';

export const SOURCE_URL = '/effects/ashen-press.html';
export const SOURCE_REVISION = '5fe2554e578a';

export const ASHEN_PRESS_HTML_SHA256 =
  '5fe2554e578acac5d55cb466a9564440e7767e38797981f8e829dfd2de0bc90f';
export const THREEUI_CSS_SHA256 =
  'efe4447139f1358dd8e9be68edf6fa46cbefbd1de423a4d6c439ca61d2c8eccf';
export const ASHEN_PRESS_TSX_SHA256 =
  '36b365f7a69223f1c3347bfcb3f2d1aa1ab20d30f2c31e5efb248e62ab4ddc90';

export const FOCUSED_DOCUMENT_SHA256 = ASHEN_PRESS_HTML_SHA256;

export const INTERSECTION_ROOT_MARGIN = '80px';

export const ASSET_MANIFEST = [
  {
    path: 'public/effects/ashen-press.html',
    bytes: 1156000,
    sha256: ASHEN_PRESS_HTML_SHA256,
  },
  {
    path: 'src/templates/hero/ashen-press/sources/threeui.css',
    bytes: 40715,
    sha256: THREEUI_CSS_SHA256,
  },
  {
    path: 'src/templates/hero/ashen-press/sources/AshenPress.tsx.txt',
    bytes: 2405,
    sha256: ASHEN_PRESS_TSX_SHA256,
  },
];

export const PREVIEW_STILL = '/images/Asstes Book shelf/Bookshelf.png';
export const DETAIL_CARD_IMAGE_COUNT = 4;

export const BACK_BUTTON_CLASS =
  'absolute top-4 left-4 z-50 flex items-center gap-2 rounded-full bg-black/20 px-3 py-2 text-sm text-[#241a12] backdrop-blur-md transition hover:bg-black/30';
export const BACK_ICON_SIZE = 16;
export const BACK_ICON_STROKE = 2;
export const BACK_LABEL = 'Back';
export const HISTORY_CAN_GO_BACK_MIN = 0;
