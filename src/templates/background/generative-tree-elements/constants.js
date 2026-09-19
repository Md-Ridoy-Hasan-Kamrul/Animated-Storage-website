/** Generative Tree Elements — host + provenance constants. */

export const CARD_ID = 'generative-tree-elements';
export const CARD_TITLE = 'Generative Tree Elements';
export const PAGE_TITLE = 'Generative Tree Elements — Kmotion';
export const DETAIL_FALLBACK = '/templates/generative-tree-elements';

export const PAGE_CLASS = 'generative-tree-elements-page';
export const PAGE_HTML_CLASS = 'generative-tree-elements-html';
export const FRAMED_HTML_CLASS = 'generative-tree-elements-framed';
export const SHADER_FRAME_CLASS = 'shader-frame';
export const HOST_CLASS = 'threeui-background generative-tree';

export const PAGE_BG = '#0a0a0a';
export const PAGE_INK = '#c8956c';

export const SOURCE_REVISION = '7a6871fe99fa';
export const VARIANT_ID = 'generative-tree';
export const SOURCE_URL = '/effects/generative-tree.html';

export const GENERATIVE_TREE_COMPONENT_SHA256 =
  'bb6bf95154f38e7a9772eef6fe2aa89ff72284a13345d56e66fba234894c2127';
export const GENERATIVE_TREE_HTML_SHA256 =
  '8ea51733bddf5cc44df338ef9af3a21633d62daa92c17fde5faa2fcab90fa0ef';
export const THREEUI_CSS_SHA256 =
  'efe4447139f1358dd8e9be68edf6fa46cbefbd1de423a4d6c439ca61d2c8eccf';
export const PUBLIC_GENERATIVE_TREE_HTML_SHA256 =
  '019a1b234a3308da2128e19b23f542f78399692ef2a99f52acd04f64ea973617';

export const GENERATIVE_TREE_COMPONENT_BYTES = 6354;
export const GENERATIVE_TREE_HTML_BYTES = 20247;
export const THREEUI_CSS_BYTES = 40715;
export const PUBLIC_GENERATIVE_TREE_HTML_BYTES = 29344;

export const GENERATIVE_TREE_DEFAULT_PROPS = {
  variant: 'generative-tree',
  speed: 1,
  size: 1,
  particleAmount: 1,
  hue: 0,
  saturation: 1,
  brightness: 1,
  opacity: 1,
};

const SRC = 'src/templates/background/generative-tree-elements/sources';

export const ASSET_MANIFEST = [
  {
    path: `${SRC}/GenerativeTree.tsx.txt`,
    bytes: GENERATIVE_TREE_COMPONENT_BYTES,
    sha256: GENERATIVE_TREE_COMPONENT_SHA256,
  },
  {
    path: `${SRC}/generative-tree.html`,
    bytes: GENERATIVE_TREE_HTML_BYTES,
    sha256: GENERATIVE_TREE_HTML_SHA256,
  },
  {
    path: `${SRC}/threeui.css`,
    bytes: THREEUI_CSS_BYTES,
    sha256: THREEUI_CSS_SHA256,
  },
  {
    path: 'public/effects/generative-tree.html',
    bytes: PUBLIC_GENERATIVE_TREE_HTML_BYTES,
    sha256: PUBLIC_GENERATIVE_TREE_HTML_SHA256,
  },
];

export const PREVIEW_STILL = '/images/Assets%20Generative%20Tree%20Elements/GenerativeTreeElements.png';
export const PREVIEW_STILL_DISK = 'public/images/Assets Generative Tree Elements/GenerativeTreeElements.png';
export const MIN_PREVIEW_BYTES = 10_000;

export const BACK_BUTTON_CLASS =
  'absolute top-4 left-4 z-50 flex items-center gap-2 rounded-full bg-white/10 px-3 py-2 text-sm text-white backdrop-blur-md transition hover:bg-white/20';
export const BACK_ICON_SIZE = 16;
export const BACK_ICON_STROKE = 2;
export const BACK_LABEL = 'Back';
export const HISTORY_CAN_GO_BACK_MIN = 0;
