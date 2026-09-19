/** Globe (Energy Orb) — host + provenance constants. */

export const CARD_ID = 'globe';
export const CARD_TITLE = 'Globe';
export const PAGE_TITLE = 'Globe — Kmotion';
export const DETAIL_FALLBACK = '/templates/globe';

export const PAGE_CLASS = 'globe-page';
export const PAGE_HTML_CLASS = 'globe-html';
export const FRAMED_HTML_CLASS = 'globe-framed';
export const SHADER_FRAME_CLASS = 'shader-frame';
export const HOST_CLASS = 'threeui-background energy-orb';

export const PAGE_BG = '#05030e';
export const PAGE_INK = '#c8b8ff';

export const SOURCE_REVISION = '03b1b8e2c440 / 3de7fdcb6239 / 7a88f26e4d8';
export const VARIANT_ID = 'energy-orb';

export const GLOBE_COLLECTION_SHA256 =
  'e8db691277c236d1fe2adb53ba3e4a5f51aa697aa625e1bdf9b09adbf03af3b9';
export const ENERGY_ORB_COMPONENT_SHA256 =
  'be9ca83c7d158dd1366bd942aa4cc4c084b901d59156d047a601ebd9cca4a903';
export const ENERGY_ORB_SHADERS_SHA256 =
  '03b1b8e2c44042ac1e880003e55016a641329028205c62dcd17e535b99496aec';
export const TANGLED_CONSTELLATIONS_SHA256 =
  '3de7fdcb62399863ca942c6a502edeeb68b80bcfb8b9f60cd580b56bba94d009';
export const NETWORK_GLOBE_SHA256 =
  '7a88f26e4d8dfdc66c75eedb61d8e7136b747b5145c07edf1db9633dcd096405';
export const THREEUI_CSS_SHA256 =
  'efe4447139f1358dd8e9be68edf6fa46cbefbd1de423a4d6c439ca61d2c8eccf';

export const GLOBE_COLLECTION_BYTES = 6900;
export const ENERGY_ORB_COMPONENT_BYTES = 9715;
export const ENERGY_ORB_SHADERS_BYTES = 4787;
export const TANGLED_CONSTELLATIONS_BYTES = 20606;
export const NETWORK_GLOBE_BYTES = 28518;
export const THREEUI_CSS_BYTES = 40715;

export const GLOBE_DEFAULT_PROPS = {
  variant: 'energy-orb',
  speed: 1,
  scale: 1,
  smokeScale: 1,
  smokeStrength: 1,
  smokeSpeed: 1,
  hue: 0,
  saturation: 1,
  glow: 1,
  starDensity: 1,
  starSpeed: 1,
  starSize: 1,
  brightness: 1,
  opacity: 1,
};

const SRC = 'src/templates/background/globe/sources';

export const ASSET_MANIFEST = [
  {
    path: `${SRC}/GlobeCollection.tsx.txt`,
    bytes: GLOBE_COLLECTION_BYTES,
    sha256: GLOBE_COLLECTION_SHA256,
  },
  {
    path: `${SRC}/EnergyOrb.tsx.txt`,
    bytes: ENERGY_ORB_COMPONENT_BYTES,
    sha256: ENERGY_ORB_COMPONENT_SHA256,
  },
  {
    path: `${SRC}/energyOrbShaders.ts.txt`,
    bytes: ENERGY_ORB_SHADERS_BYTES,
    sha256: ENERGY_ORB_SHADERS_SHA256,
  },
  {
    path: `${SRC}/tangled-constellations.html`,
    bytes: TANGLED_CONSTELLATIONS_BYTES,
    sha256: TANGLED_CONSTELLATIONS_SHA256,
  },
  {
    path: `${SRC}/network-globe.html`,
    bytes: NETWORK_GLOBE_BYTES,
    sha256: NETWORK_GLOBE_SHA256,
  },
  {
    path: `${SRC}/threeui.css`,
    bytes: THREEUI_CSS_BYTES,
    sha256: THREEUI_CSS_SHA256,
  },
];

export const PREVIEW_STILL = '/images/Assets%20Globe/Globe.png';

export const BACK_BUTTON_CLASS =
  'absolute top-4 left-4 z-50 flex items-center gap-2 rounded-full bg-black/40 px-3 py-2 text-sm text-[#c8b8ff] backdrop-blur-md transition hover:bg-black/55';
export const BACK_ICON_SIZE = 16;
export const BACK_ICON_STROKE = 2;
export const BACK_LABEL = 'Back';
export const HISTORY_CAN_GO_BACK_MIN = 0;
