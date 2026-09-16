export const CARD_ID = 'living-green-sylva-living-world';
export const CARD_TITLE = 'Living Green Sylva Living World';
export const DETAIL_FALLBACK = '/templates/living-green-sylva-living-world';
export const PAGE_TITLE = 'Living Green — Sylva Living World';
export const PAGE_BG = '#4a4d44';
export const PAGE_INK = '#ffffff';
export const PAGE_HTML_CLASS = 'living-green-sylva-living-world-html';
export const FRAMED_HTML_CLASS = 'living-green-sylva-living-world-framed';
export const PAGE_CLASS = 'living-green-sylva-living-world-page';
export const SHADER_FRAME_CLASS = 'shader-frame';
export const HISTORY_CAN_GO_BACK_MIN = 0;
export const BACK_ICON_SIZE = 16;
export const BACK_ICON_STROKE = 2;
export const BACK_LABEL = 'Back';
export const BACK_BUTTON_CLASS =
  'living-green-sylva-living-world-back fixed left-4 top-4 z-[70] inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/45 px-3.5 py-2 text-sm font-medium text-white backdrop-blur-md transition-colors hover:border-white/30 hover:bg-black/65 md:left-6 md:top-6';

/** Scene-only host document (CSP-safe URL; scripts cannot run from srcDoc). */
export const FRAME_SANDBOX =
  'allow-downloads allow-forms allow-modals allow-popups allow-same-origin allow-scripts';

export const SOURCE_URL = '/effects/sylva-living-world-living-green.html';
export const SOURCE_REVISION = 'fd922291297d';
export const COMPONENT_SHA256 =
  'e29b92a16596bc9383e1dbd4630e83b70ec2a59dbae48de1d3b7ddc48c0b2082';
export const INNER_GREEN_HTML_SHA256 =
  '69c3694bd63f44ef9f007ebe4dac57a83e4402e0cdf6b54dd10b96dd4f05e197';
export const THREE_RUNTIME_SHA256 =
  '8a5f7249903b54d30f79f708699d2fed2d6a1d0741a4cd41377d1f01bb5a2271';
export const THREEUI_CSS_SHA256 =
  'efe4447139f1358dd8e9be68edf6fa46cbefbd1de423a4d6c439ca61d2c8eccf';
export const SCENE_DOCUMENT_SHA256 =
  '338df6dd8b2551f0064c2accf9357d50a98da6f1238f1b8937f9bf82b6b8aac3';
export const SCENE_DOCUMENT_BYTES = 190607;
export const FRAME_TITLE = 'Interactive procedural moss root world';
export const SYLVA_VARIANT = 'living-green';
export const VARIANT_BACKGROUND = '#4a4d44';
export const DETAIL_CARD_IMAGE_COUNT = 8;
export const PREVIEW_STILL =
  '/images/Assets%20Living%20Green%20Sylva/LivingGreenSylva.png';

export const SYLVA_LIVING_WORLD_DEFAULT_PROPS = {
  variant: 'living-green',
};

export const SYLVA_LIVING_WORLD_VARIANTS = [
  'living-green',
  'sakura-sunset',
  'maple-autumn',
  'sequoia-mist',
];

export const VARIANT_LABELS = {
  'living-green': 'Interactive procedural moss root world',
  'sakura-sunset': 'Interactive mossy Sakura boughs in blossom at dusk',
  'maple-autumn': 'Interactive mossy Maple boughs in autumn leaf at dusk',
  'sequoia-mist': 'Interactive mossy Sequoia boughs in foliage through grove fog',
};

export const VARIANT_BACKGROUNDS = {
  'living-green': '#4a4d44',
  'sakura-sunset': '#3c2c36',
  'maple-autumn': '#313a41',
  'sequoia-mist': '#5f6d63',
};

export const VARIANT_DOCUMENT_SRC = {
  'living-green': SOURCE_URL,
};

export const ASSET_MANIFEST = [
  {
    path: 'src/templates/background/living-green-sylva-living-world/sources/inner-green-3d.html',
    bytes: 197914,
    sha256: INNER_GREEN_HTML_SHA256,
  },
  {
    path: 'src/templates/background/living-green-sylva-living-world/sources/inner-green-assets/three.min.js',
    bytes: 608081,
    sha256: THREE_RUNTIME_SHA256,
  },
  {
    path: 'src/templates/background/living-green-sylva-living-world/sources/threeui.css',
    bytes: 40715,
    sha256: THREEUI_CSS_SHA256,
  },
  {
    path: 'public/effects/sylva-living-world-living-green.html',
    bytes: SCENE_DOCUMENT_BYTES,
    sha256: SCENE_DOCUMENT_SHA256,
  },
  {
    path: 'public/landing-pages/inner-green-assets/three.min.js',
    bytes: 608081,
    sha256: THREE_RUNTIME_SHA256,
  },
];
