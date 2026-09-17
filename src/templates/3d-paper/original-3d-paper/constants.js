export const CARD_ID = 'original-3d-paper';
export const CARD_TITLE = 'Original 3D Paper';
export const DETAIL_FALLBACK = '/templates/original-3d-paper';
export const PAGE_TITLE = 'Original 3D Paper';
export const PAGE_BG = '#08080a';
export const PAGE_INK = '#f2f2f0';
export const PAGE_HTML_CLASS = 'original-3d-paper-html';
export const FRAMED_HTML_CLASS = 'original-3d-paper-framed';
export const PAGE_CLASS = 'original-3d-paper-page';
export const SHADER_FRAME_CLASS = 'shader-frame';
export const HISTORY_CAN_GO_BACK_MIN = 0;
export const BACK_ICON_SIZE = 16;
export const BACK_ICON_STROKE = 2;
export const BACK_LABEL = 'Back';
export const BACK_BUTTON_CLASS =
  'original-3d-paper-back fixed left-4 top-4 z-[70] inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/45 px-3.5 py-2 text-sm font-medium text-neutral-100 backdrop-blur-md transition-colors hover:border-white/30 hover:bg-black/65 md:left-6 md:top-6';

/** Authored document (CSP-safe URL; srcDoc inline scripts are blocked). */
export const FRAME_SANDBOX =
  'allow-downloads allow-forms allow-modals allow-popups allow-same-origin allow-scripts';
export const SOURCE_URL = '/effects/original-3d-paper.html';
export const SOURCE_REVISION = '8ec1b71c0dbc';
export const COMPONENT_SHA256 =
  'c2c8d1e9a0baf69c9e477e270ccde0254d6270918c106b62dffb5c7931223b20';
export const PAPER_HTML_SHA256 =
  '8ec1b71c0dbcafbadf908100ae2a08045d0a1087c00a09d28245ef19366c7353';
export const THREEUI_CSS_SHA256 =
  'efe4447139f1358dd8e9be68edf6fa46cbefbd1de423a4d6c439ca61d2c8eccf';
export const FOCUSED_DOCUMENT_SHA256 = PAPER_HTML_SHA256;
export const FOCUSED_DOCUMENT_BYTES = 630847;
export const PAPER_HTML_BYTES = 630847;
export const THREEUI_CSS_BYTES = 40715;
export const FRAME_TITLE = '3D Paper';
export const PAPER_VARIANT = 'original';
export const VARIANT_BACKGROUND = '#08080a';
export const HOST_ARIA_LABEL = 'Interactive translucent 3D paper certificate';

export const DETAIL_CARD_IMAGE_COUNT = 8;
export const PREVIEW_STILL =
  '/images/Assets%20Original%203D%20Paper/Original3DPaper.png';

export const PAPER_VARIANTS = [
  'original',
  'site-of-the-year',
  'japanese',
  'certificate',
];

export const VARIANT_TITLES = {
  original: '3D Paper',
  'site-of-the-year': '3D Paper — Site of the Year',
  japanese: '3D Paper — 認定証',
  certificate: '3D Paper — Certificate',
};

export const THREE_D_PAPER_DEFAULT_PROPS = {
  variant: 'original',
};

export const ASSET_MANIFEST = [
  {
    path: 'src/templates/3d-paper/original-3d-paper/sources/3d-paper.html',
    bytes: PAPER_HTML_BYTES,
    sha256: PAPER_HTML_SHA256,
  },
  {
    path: 'src/templates/3d-paper/original-3d-paper/sources/threeui.css',
    bytes: THREEUI_CSS_BYTES,
    sha256: THREEUI_CSS_SHA256,
  },
  {
    path: 'public/effects/original-3d-paper.html',
    bytes: FOCUSED_DOCUMENT_BYTES,
    sha256: FOCUSED_DOCUMENT_SHA256,
  },
];
