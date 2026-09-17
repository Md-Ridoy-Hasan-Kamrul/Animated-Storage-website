/** Washi Noren Woven Cloth — companion host + provenance constants. */

export const CARD_ID = 'woven-cloth-washi';
export const CARD_TITLE = 'Washi Noren Woven Cloth';
export const PAGE_TITLE = 'Washi Noren Woven Cloth — Kmotion';
export const DETAIL_FALLBACK = '/templates/woven-cloth-washi';

export const PAGE_CLASS = 'woven-cloth-washi-page';
export const PAGE_HTML_CLASS = 'woven-cloth-washi-html';
export const FRAMED_HTML_CLASS = 'woven-cloth-washi-framed';
export const SHADER_FRAME_CLASS = 'shader-frame';
export const HOST_CLASS = 'threeui-background woven-cloth-washi';
export const FRAME_CLASS = 'woven-cloth-washi__frame';

export const PAGE_BG = '#0d0a07';
export const PAGE_INK = '#e8dcc4';
export const HOST_BACKGROUND = '#0d0a07';

export const FRAME_SANDBOX = 'allow-scripts';
export const FRAME_TITLE = 'Woven Cloth washi noren';
export const HOST_ARIA_LABEL = 'Interactive Washi Noren woven cloth';
export const HOST_ROLE = 'group';

export const SOURCE_URL = '/effects/woven-cloth-washi.html';
export const SOURCE_REVISION = '9bfd56ef7579';
export const VARIANT_ID = 'washi';

export const DEFAULT_HUE = 0;
export const DEFAULT_SATURATION = 1;
export const DEFAULT_BRIGHTNESS = 1;

export const HUE_MIN = -180;
export const HUE_MAX = 180;
export const SATURATION_MIN = 0;
export const SATURATION_MAX = 2;
export const BRIGHTNESS_MIN = 0.35;
export const BRIGHTNESS_MAX = 1.65;

export const LUMINA_WEAVERS_CLOTH_SHA256 =
  '9bfd56ef7579a92cb6385b3e93866bc3ff54fa4489a0febb9809b720e2946fb6';
export const WOVEN_CLOTH_TSX_SHA256 =
  '5a89ff035bdf33dbc642d2916b56dbe94e89cb0af184474c139ffbfe5a720550';
export const NEUFORM_CRAFT_EFFECTS_SHA256 =
  '0a1680c3c119dba8c61d946322afa0b64d36dfd80956fb5e7c3fd017d7bfa450';
export const WOVEN_CLOTH_IRIDESCENT_SHA256 =
  'e3b14adac39dfef04ed0bb0df99e86a1aa0aaf7cea4f8ecc4d5e0931b48bee7b';
export const WOVEN_CLOTH_ATELIER_SHA256 =
  'f9be15756ff385db9cd3b7082b139d10b84a4eba0b3c4f19749b305570a7191f';
export const WOVEN_CLOTH_WASHI_SHA256 =
  '00e5971f139e5427e56a062c12d7e8e3590938b9a400753693b360d1e4d1a5c1';
export const THREEUI_CSS_SHA256 =
  'efe4447139f1358dd8e9be68edf6fa46cbefbd1de423a4d6c439ca61d2c8eccf';

/** Companion document is served byte-exact (no focus adapter). */
export const FOCUSED_DOCUMENT_SHA256 = WOVEN_CLOTH_WASHI_SHA256;
export const FOCUSED_DOCUMENT_BYTES = 18332;

export const INTERSECTION_ROOT_MARGIN = '80px';

export const ASSET_MANIFEST = [
  {
    path: 'src/templates/3d-website/woven-cloth-washi/sources/lumina-weavers-cloth.html',
    bytes: 17470,
    sha256: LUMINA_WEAVERS_CLOTH_SHA256,
  },
  {
    path: 'src/templates/3d-website/woven-cloth-washi/sources/WovenCloth.tsx.txt',
    bytes: 2993,
    sha256: WOVEN_CLOTH_TSX_SHA256,
  },
  {
    path: 'src/templates/3d-website/woven-cloth-washi/sources/NeuformCraftEffects.tsx.txt',
    bytes: 10720,
    sha256: NEUFORM_CRAFT_EFFECTS_SHA256,
  },
  {
    path: 'src/templates/3d-website/woven-cloth-washi/sources/woven-cloth-iridescent.html',
    bytes: 21728,
    sha256: WOVEN_CLOTH_IRIDESCENT_SHA256,
  },
  {
    path: 'src/templates/3d-website/woven-cloth-washi/sources/woven-cloth-atelier.html',
    bytes: 18979,
    sha256: WOVEN_CLOTH_ATELIER_SHA256,
  },
  {
    path: 'src/templates/3d-website/woven-cloth-washi/sources/woven-cloth-washi.html',
    bytes: FOCUSED_DOCUMENT_BYTES,
    sha256: WOVEN_CLOTH_WASHI_SHA256,
  },
  {
    path: 'src/templates/3d-website/woven-cloth-washi/sources/threeui.css',
    bytes: 40715,
    sha256: THREEUI_CSS_SHA256,
  },
  {
    path: 'public/effects/woven-cloth-washi.html',
    bytes: FOCUSED_DOCUMENT_BYTES,
    sha256: FOCUSED_DOCUMENT_SHA256,
  },
];

export const PREVIEW_STILL =
  '/images/Assets%20Washi%20Noren%20Woven%20Cloth/WashiNorenWovenCloth.png';

export const BACK_BUTTON_CLASS =
  'absolute top-4 left-4 z-50 flex items-center gap-2 rounded-full bg-black/35 px-3 py-2 text-sm text-[#e8dcc4] backdrop-blur-md transition hover:bg-black/50';
export const BACK_ICON_SIZE = 16;
export const BACK_ICON_STROKE = 2;
export const BACK_LABEL = 'Back';
export const HISTORY_CAN_GO_BACK_MIN = 0;
