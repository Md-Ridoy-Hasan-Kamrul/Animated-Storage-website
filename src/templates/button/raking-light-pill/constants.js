/** Raking Light Pill — host + provenance constants. */

export const CARD_ID = 'raking-light-pill';
export const CARD_TITLE = 'Raking Light Pill';
export const PAGE_TITLE = 'Raking Light Pill — Kmotion';
export const DETAIL_FALLBACK = '/templates/raking-light-pill';

export const PAGE_CLASS = 'raking-light-pill-page';
export const PAGE_HTML_CLASS = 'raking-light-pill-html';
export const FRAMED_HTML_CLASS = 'raking-light-pill-framed';
export const SHADER_FRAME_CLASS = 'shader-frame';
export const HOST_CLASS = 'threeui-background threeui-raking-light-pill-stage';

/** Matches authored raking-light-pill-stage dark background. */
export const PAGE_BG = '#160d0c';
export const PAGE_INK = 'rgba(255, 255, 255, 0.7)';

export const SOURCE_REVISION = '6f56c4f91814';
export const VARIANT_ID = 'raking-light-pill';
export const DEFAULT_MODE = 'dark';

export const SHADER_BUTTONS_TSX_SHA256 =
  '6f56c4f9181492f60d642edc5317a635f0b462e509b34713d532e32d660638b0';
export const RAKING_LIGHT_PILL_BUTTON_TSX_SHA256 =
  '1069b29edc532f9bffcdfce7ca072387096fae3b99368ccab04deb6190b1ad94';
export const NEUFORM_ISOLATED_EFFECTS_SHA256 =
  'fe9856234253bc3c1a13b3afb84f3d84644dfa6d578e7203bb3e1dd5eced1b75';
export const IMAGINIE_STARFIELD_HTML_SHA256 =
  '002199215e124a85177585fc5cb84333f471562176f94c8d8e4456c79d721295';
export const IGNITION_TERMINAL_HTML_SHA256 =
  '05313d191cc11ca0c7600452e72ad14b4fc6581627689c209a5f22a1bfa6a8ea';
export const VALENCE_CORE_HTML_SHA256 =
  '26b21d4972805733a2441355edb56576fa911f135ccf746ebcc927a0b1e3b975';
export const AETHERIS_LABS_HTML_SHA256 =
  'eea617fe0e37a79be7aee44f00a53ec3ae41e006e771a8aad53acce3648147e0';
export const NEXUS_TACTILE_HTML_SHA256 =
  '1811a6408fb09421665d772eca4106162e10bfc038ec948324d0250f5dec9cb4';
export const THINKING_BUTTON_HTML_SHA256 =
  '194da3529f2f80993db555de0387fc1e628bf8c216371803603750959a4fb11a';
export const THREEUI_CSS_SHA256 =
  'efe4447139f1358dd8e9be68edf6fa46cbefbd1de423a4d6c439ca61d2c8eccf';

export const SHADER_BUTTONS_TSX_BYTES = 2381;
export const RAKING_LIGHT_PILL_BUTTON_TSX_BYTES = 10022;
export const NEUFORM_ISOLATED_EFFECTS_BYTES = 93888;
export const IMAGINIE_STARFIELD_HTML_BYTES = 18018;
export const IGNITION_TERMINAL_HTML_BYTES = 12813;
export const VALENCE_CORE_HTML_BYTES = 19010;
export const AETHERIS_LABS_HTML_BYTES = 15926;
export const NEXUS_TACTILE_HTML_BYTES = 17473;
export const THINKING_BUTTON_HTML_BYTES = 11664;
export const THREEUI_CSS_BYTES = 40715;

export const RAKING_DEFAULT_PROPS = {
  variant: 'raking-light-pill',
  mode: 'dark',
  hue: 0,
  saturation: 1,
  brightness: 1,
};

const SRC = 'src/templates/button/raking-light-pill/sources';

export const ASSET_MANIFEST = [
  {
    path: `${SRC}/ShaderButtons.tsx.txt`,
    bytes: SHADER_BUTTONS_TSX_BYTES,
    sha256: SHADER_BUTTONS_TSX_SHA256,
  },
  {
    path: `${SRC}/RakingLightPillButton.tsx.txt`,
    bytes: RAKING_LIGHT_PILL_BUTTON_TSX_BYTES,
    sha256: RAKING_LIGHT_PILL_BUTTON_TSX_SHA256,
  },
  {
    path: `${SRC}/NeuformIsolatedEffects.tsx.txt`,
    bytes: NEUFORM_ISOLATED_EFFECTS_BYTES,
    sha256: NEUFORM_ISOLATED_EFFECTS_SHA256,
  },
  {
    path: `${SRC}/imaginie-starfield.html`,
    bytes: IMAGINIE_STARFIELD_HTML_BYTES,
    sha256: IMAGINIE_STARFIELD_HTML_SHA256,
  },
  {
    path: `${SRC}/neuform-sources/ignition-terminal.html`,
    bytes: IGNITION_TERMINAL_HTML_BYTES,
    sha256: IGNITION_TERMINAL_HTML_SHA256,
  },
  {
    path: `${SRC}/neuform-sources/valence-core.html`,
    bytes: VALENCE_CORE_HTML_BYTES,
    sha256: VALENCE_CORE_HTML_SHA256,
  },
  {
    path: `${SRC}/neuform-sources/aetheris-labs.html`,
    bytes: AETHERIS_LABS_HTML_BYTES,
    sha256: AETHERIS_LABS_HTML_SHA256,
  },
  {
    path: `${SRC}/neuform-sources/nexus-tactile.html`,
    bytes: NEXUS_TACTILE_HTML_BYTES,
    sha256: NEXUS_TACTILE_HTML_SHA256,
  },
  {
    path: `${SRC}/neuform-sources/thinking-button.html`,
    bytes: THINKING_BUTTON_HTML_BYTES,
    sha256: THINKING_BUTTON_HTML_SHA256,
  },
  {
    path: `${SRC}/threeui.css`,
    bytes: THREEUI_CSS_BYTES,
    sha256: THREEUI_CSS_SHA256,
  },
];

export const PREVIEW_STILL = '/images/Assets%20Raking%20Light%20Pill/RakingLightPill.png';
export const PREVIEW_STILL_DISK = 'public/images/Assets Raking Light Pill/RakingLightPill.png';
export const MIN_PREVIEW_BYTES = 10_000;

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
