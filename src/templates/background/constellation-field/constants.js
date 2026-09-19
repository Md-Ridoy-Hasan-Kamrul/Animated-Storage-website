/** Constellation Field — host + provenance constants. */

export const CARD_ID = 'constellation-field';
export const CARD_TITLE = 'Constellation Field Default Variant';
export const PAGE_TITLE = 'Constellation Field Default Variant — Kmotion';
export const DETAIL_FALLBACK = '/templates/constellation-field';

export const PAGE_CLASS = 'constellation-field-page';
export const PAGE_HTML_CLASS = 'constellation-field-html';
export const FRAMED_HTML_CLASS = 'constellation-field-framed';
export const SHADER_FRAME_CLASS = 'shader-frame';
export const HOST_CLASS = 'threeui-background constellation-field';

export const PAGE_BG = '#070914';
export const PAGE_INK = '#F2F4FB';

export const SOURCE_REVISION = '1920ad4fe34f';
export const VARIANT_ID = 'constellation-field';
export const SOURCE_URL = '/effects/constellation-field.html';

export const CONSTELLATION_FIELD_COMPONENT_SHA256 =
  '5bbf6f84fc8cb343ba01eb418ca8d969284c8f7b6abfd8a27bad42a626de487d';
export const NEUFORM_BATCH_COMPONENT_SHA256 =
  'dc68c51bea26b922965de44b4fb8d6c432607508fb2b61e16ed60d245da1a69f';
export const CONSTELLATION_FIELD_HTML_SHA256 =
  '1920ad4fe34f2ed2348e3a52110c37b4969bc45d71ff29f2738cb4542ad9f610';
export const THREEUI_CSS_SHA256 =
  'efe4447139f1358dd8e9be68edf6fa46cbefbd1de423a4d6c439ca61d2c8eccf';
export const PUBLIC_CONSTELLATION_FIELD_HTML_SHA256 =
  '52c7b64eb3b9df0f7a3605292b0e07e2a425b93414a95580bcd875ebb62829f9';

export const CONSTELLATION_FIELD_COMPONENT_BYTES = 1229;
export const NEUFORM_BATCH_COMPONENT_BYTES = 41426;
export const CONSTELLATION_FIELD_HTML_BYTES = 17100;
export const THREEUI_CSS_BYTES = 40715;
export const PUBLIC_CONSTELLATION_FIELD_HTML_BYTES = 21623;

export const CONSTELLATION_FIELD_DEFAULT_PROPS = {
  mode: 'dark',
  speed: 1,
  size: 1,
  strokeWidth: 1,
  length: 1,
  density: 1,
  opacity: 1,
  hue: 0,
  saturation: 1,
  brightness: 1,
};

const SRC = 'src/templates/background/constellation-field/sources';

export const ASSET_MANIFEST = [
  {
    path: `${SRC}/ConstellationField.tsx.txt`,
    bytes: CONSTELLATION_FIELD_COMPONENT_BYTES,
    sha256: CONSTELLATION_FIELD_COMPONENT_SHA256,
  },
  {
    path: `${SRC}/NeuformBatchEffects.tsx.txt`,
    bytes: NEUFORM_BATCH_COMPONENT_BYTES,
    sha256: NEUFORM_BATCH_COMPONENT_SHA256,
  },
  {
    path: `${SRC}/constellation-field.html`,
    bytes: CONSTELLATION_FIELD_HTML_BYTES,
    sha256: CONSTELLATION_FIELD_HTML_SHA256,
  },
  {
    path: `${SRC}/particle-drift.html`,
    bytes: 14811,
    sha256: '7fad6cc8c54c0385c472c2879762b3fd2bfb061820bf925034d7a58a0048eb27',
  },
  {
    path: `${SRC}/particle-network.html`,
    bytes: 13776,
    sha256: 'bc7bffdc48a9019cbba937dab9d335b85f20ac8a472f10dfa3d553da439cfdb7',
  },
  {
    path: `${SRC}/gateway-flow.html`,
    bytes: 17251,
    sha256: 'c5a1de43138ffba96b9f0ecdcf3c054ae251ec94344e88c6ad502bae362b17d0',
  },
  {
    path: `${SRC}/connectivity-graph.html`,
    bytes: 13241,
    sha256: '98592824dd1109702cd72e9deca1cae7239169396c8245e8bbd786997d9bdf13',
  },
  {
    path: `${SRC}/interface-lines.html`,
    bytes: 18496,
    sha256: '608cbc6976996b8a5b6c4aaba4bee4d6f2dd44579b819df45914f35bc310d2cc',
  },
  {
    path: `${SRC}/defense-lines.html`,
    bytes: 14543,
    sha256: '1cd230f6a060023f99cbbe9ebc63e37409bf7ed70507e1ef44edc2342a0b9f91',
  },
  {
    path: `${SRC}/topo-field.html`,
    bytes: 20227,
    sha256: '70dbdaaec6398be9fcf05843f6c5af65e761d29187e60064673bbeb55888379f',
  },
  {
    path: `${SRC}/threeui.css`,
    bytes: THREEUI_CSS_BYTES,
    sha256: THREEUI_CSS_SHA256,
  },
  {
    path: 'public/effects/constellation-field.html',
    bytes: PUBLIC_CONSTELLATION_FIELD_HTML_BYTES,
    sha256: PUBLIC_CONSTELLATION_FIELD_HTML_SHA256,
  },
];

export const PREVIEW_STILL =
  '/images/Assets%20Constellation%20Field%20Default%20Variant/ConstellationFieldDefaultVariant.png';
export const PREVIEW_STILL_DISK =
  'public/images/Assets Constellation Field Default Variant/ConstellationFieldDefaultVariant.png';
export const MIN_PREVIEW_BYTES = 10_000;

export const BACK_BUTTON_CLASS =
  'absolute top-4 left-4 z-50 flex items-center gap-2 rounded-full bg-white/10 px-3 py-2 text-sm text-white backdrop-blur-md transition hover:bg-white/20';
export const BACK_ICON_SIZE = 16;
export const BACK_ICON_STROKE = 2;
export const BACK_LABEL = 'Back';
export const HISTORY_CAN_GO_BACK_MIN = 0;
