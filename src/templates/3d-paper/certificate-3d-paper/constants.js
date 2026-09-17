/** Certificate 3D Paper — host + provenance constants. */

export const CARD_ID = 'certificate-3d-paper';
export const CARD_TITLE = 'Certificate 3D Paper';
export const PAGE_TITLE = 'Certificate 3D Paper — Kmotion';
export const DETAIL_FALLBACK = '/templates/certificate-3d-paper';

export const PAGE_CLASS = 'certificate-3d-paper-page';
export const PAGE_HTML_CLASS = 'certificate-3d-paper-html';
export const FRAMED_HTML_CLASS = 'certificate-3d-paper-framed';
export const SHADER_FRAME_CLASS = 'shader-frame';

export const PAGE_BG = '#08080a';
export const PAGE_INK = '#f2f2f0';
export const VARIANT_BACKGROUND = '#08080a';

export const FRAME_SANDBOX = 'allow-scripts';
export const FRAME_TITLE = 'Certificate 3D Paper';
export const HOST_ARIA_LABEL = '3D Paper formal typographic certificate';

export const SOURCE_URL = '/effects/certificate-3d-paper.html';
export const SOURCE_REVISION = '8ec1b71c0dbc';
export const PAPER_VARIANT = 'certificate';

export const PAPER_HTML_SHA256 =
  '0cb83da723e1a54f1a2e1124bc26a27d608afc3ba42ec0b116807e2e2ae5fb32';
export const THREEUI_CSS_SHA256 =
  'efe4447139f1358dd8e9be68edf6fa46cbefbd1de423a4d6c439ca61d2c8eccf';
export const THREE_D_PAPER_TSX_SHA256 =
  'c2c8d1e9a0baf69c9e477e270ccde0254d6270918c106b62dffb5c7931223b20';

export const FOCUSED_DOCUMENT_SHA256 = PAPER_HTML_SHA256;

export const PAPER_VARIANTS = [
  'original',
  'site-of-the-year',
  'japanese',
  'certificate',
];

export const VARIANT_TITLES = {
  original: 'Original 3D Paper',
  'site-of-the-year': 'Site of the Year 3D Paper',
  japanese: 'Japanese 3D Paper',
  certificate: 'Certificate 3D Paper',
};

export const THREE_D_PAPER_DEFAULT_PROPS = {
  variant: PAPER_VARIANT,
};

export const ASSET_MANIFEST = [
  {
    path: 'public/effects/certificate-3d-paper.html',
    bytes: 634005,
    sha256: PAPER_HTML_SHA256,
  },
  {
    path: 'src/templates/3d-paper/certificate-3d-paper/sources/threeui.css',
    bytes: 40715,
    sha256: THREEUI_CSS_SHA256,
  },
  {
    path: 'src/templates/3d-paper/certificate-3d-paper/sources/ThreeDPaper.tsx.txt',
    bytes: 3185,
    sha256: THREE_D_PAPER_TSX_SHA256,
  },
];

export const PREVIEW_STILL = '/images/Assets Certificate 3D Paper/Certificate3DPaper.svg';
export const DETAIL_CARD_IMAGE_COUNT = 4;

export const BACK_BUTTON_CLASS =
  'absolute top-4 left-4 z-50 flex items-center gap-2 rounded-full bg-white/10 px-3 py-2 text-sm text-white backdrop-blur-md transition hover:bg-white/20';
export const BACK_ICON_SIZE = 16;
export const BACK_ICON_STROKE = 2;
export const BACK_LABEL = 'Back';
export const HISTORY_CAN_GO_BACK_MIN = 0;
