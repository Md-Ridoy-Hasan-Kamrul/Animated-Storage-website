/** Terminal CRT — host + provenance constants. */

export const CARD_ID = 'terminal-crt';
export const CARD_TITLE = 'Terminal CRT';
export const PAGE_TITLE = 'Terminal CRT — Kmotion';
export const DETAIL_FALLBACK = '/templates/terminal-crt';

export const PAGE_CLASS = 'terminal-crt-page';
export const PAGE_HTML_CLASS = 'terminal-crt-html';
export const FRAMED_HTML_CLASS = 'terminal-crt-framed';
export const SHADER_FRAME_CLASS = 'shader-frame';
export const HOST_CLASS = 'threeui-background crt crt-terminal';

export const PAGE_BG = '#03100a';
export const PAGE_INK = '#8df0b4';

export const SOURCE_REVISION = '860a1eb1d4c9';
export const VARIANT_ID = 'terminal';

export const CRT_COMPONENT_SHA256 =
  '20932f2655319c5fc6c6b3c29c890149beec7e4850edc414f909ab24a0c95031';
export const CRT_RENDERER_SHA256 =
  'a3eb536e9c50eeb31832e7d6d25021c1535137e8ead5eb1b864e5a27c340af03';
export const CRT_SHADERS_SHA256 =
  'cf3a7c747d1cac495c705529954e2491ad885489ddd5110724f8f4b3553f1592';
export const CRT_SCREENS_SHA256 =
  'e545922e0d3afa19b9d01840d0ea684c56d0799714f9cf77a4712921bfec7adb';
export const THREEUI_CSS_SHA256 =
  'efe4447139f1358dd8e9be68edf6fa46cbefbd1de423a4d6c439ca61d2c8eccf';

export const CRT_COMPONENT_BYTES = 1947;
export const CRT_RENDERER_BYTES = 12561;
export const CRT_SHADERS_BYTES = 3800;
export const CRT_SCREENS_BYTES = 22165;
export const THREEUI_CSS_BYTES = 40715;

export const TERMINAL_CRT_DEFAULT_PROPS = {
  variant: 'terminal',
  speed: 1,
  typeSpeed: 1,
  motion: 1,
  hue: 0,
  saturation: 1,
  brightness: 1,
  opacity: 1,
};

const SRC = 'src/templates/background/terminal-crt/sources';

export const ASSET_MANIFEST = [
  {
    path: `${SRC}/CrtBackground.tsx.txt`,
    bytes: CRT_COMPONENT_BYTES,
    sha256: CRT_COMPONENT_SHA256,
  },
  {
    path: `${SRC}/crtRenderer.ts.txt`,
    bytes: CRT_RENDERER_BYTES,
    sha256: CRT_RENDERER_SHA256,
  },
  {
    path: `${SRC}/crtShaders.ts.txt`,
    bytes: CRT_SHADERS_BYTES,
    sha256: CRT_SHADERS_SHA256,
  },
  {
    path: `${SRC}/crtScreens.ts.txt`,
    bytes: CRT_SCREENS_BYTES,
    sha256: CRT_SCREENS_SHA256,
  },
  {
    path: `${SRC}/threeui.css`,
    bytes: THREEUI_CSS_BYTES,
    sha256: THREEUI_CSS_SHA256,
  },
];

export const PREVIEW_STILL = '/images/Assets%20Terminal%20CRT/TerminalCRT.png';

export const BACK_BUTTON_CLASS =
  'absolute top-4 left-4 z-50 flex items-center gap-2 rounded-full bg-black/40 px-3 py-2 text-sm text-[#8df0b4] backdrop-blur-md transition hover:bg-black/55';
export const BACK_ICON_SIZE = 16;
export const BACK_ICON_STROKE = 2;
export const BACK_LABEL = 'Back';
export const HISTORY_CAN_GO_BACK_MIN = 0;
