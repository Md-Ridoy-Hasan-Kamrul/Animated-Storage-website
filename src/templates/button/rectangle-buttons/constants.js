/** Rectangle Buttons (Dark Glass) — host + provenance constants. */

export const CARD_ID = 'rectangle-buttons';
export const CARD_TITLE = 'Rectangle Buttons';
export const PAGE_TITLE = 'Rectangle Buttons — Kmotion';
export const DETAIL_FALLBACK = '/templates/rectangle-buttons';

export const PAGE_CLASS = 'rectangle-buttons-page';
export const PAGE_HTML_CLASS = 'rectangle-buttons-html';
export const FRAMED_HTML_CLASS = 'rectangle-buttons-framed';
export const SHADER_FRAME_CLASS = 'shader-frame';
export const HOST_CLASS = 'section-element section-element--glass-button';

export const PAGE_BG = '#0a0a0a';
export const PAGE_INK = 'rgba(255, 255, 255, 0.7)';

export const SOURCE_REVISION = 'ff30e28c2781';
export const VARIANT_ID = 'dark-pill';
export const DEFAULT_MODE = 'dark';
export const BUTTON_LABEL = 'Sign up';

export const RECTANGLE_BUTTONS_SHA256 =
  'ff30e28c278193a90f63c93aba77bc6c5c6a8a8f01ec8882392957851146f083';
export const SECTION_ELEMENTS_SHA256 =
  'c3602974a5be61abdbb040e7416504e2682f42616d60b6a73437dc3b04637b78';
export const SECTION_ELEMENTS_CSS_SHA256 =
  '91abd6ed53f463673d0eb2c3c91040c3574287663ca1313e6d92b8448f0b6d11';
export const THREEUI_CSS_SHA256 =
  'efe4447139f1358dd8e9be68edf6fa46cbefbd1de423a4d6c439ca61d2c8eccf';

export const SF_LIGHT_SHA256 =
  '839aeb08fa40d65bb15375f966694ba84ea734a86307e6894005a85597e8ff98';
export const SF_REGULAR_SHA256 =
  '14a89688aab531bfbf3ace6d2e80f3bab95e9bbd8d6a96c6a5a8fcdcd3dba0f2';
export const SF_MEDIUM_SHA256 =
  'ef8ab5de42a601c6258d5a196ca95b41153c30050fc8dcae01ac2124d7883cf6';
export const SF_SEMIBOLD_SHA256 =
  '4a2bbcd0a3f5772503ad26bf9d3d1147c8a03841f8613a71005948a55058faa3';
export const SF_BOLD_SHA256 =
  'bf987268f3fe5aa2497ba50e446a24d27c2983ef14e708251b89b2bc695e52c9';

export const RECTANGLE_BUTTONS_BYTES = 39715;
export const SECTION_ELEMENTS_BYTES = 35598;
export const SECTION_ELEMENTS_CSS_BYTES = 56857;
export const THREEUI_CSS_BYTES = 40715;
export const SF_LIGHT_BYTES = 42420;
export const SF_REGULAR_BYTES = 36296;
export const SF_MEDIUM_BYTES = 41808;
export const SF_SEMIBOLD_BYTES = 42084;
export const SF_BOLD_BYTES = 40116;

export const RECTANGLE_BUTTONS_DEFAULT_PROPS = {
  variant: 'dark-pill',
  mode: 'dark',
  hue: 0,
  saturation: 1,
  brightness: 1,
};

const SRC = 'src/templates/button/rectangle-buttons/sources';

export const ASSET_MANIFEST = [
  {
    path: `${SRC}/RectangleButtons.tsx.txt`,
    bytes: RECTANGLE_BUTTONS_BYTES,
    sha256: RECTANGLE_BUTTONS_SHA256,
  },
  {
    path: `${SRC}/SectionElements.tsx.txt`,
    bytes: SECTION_ELEMENTS_BYTES,
    sha256: SECTION_ELEMENTS_SHA256,
  },
  {
    path: `${SRC}/section-elements.css`,
    bytes: SECTION_ELEMENTS_CSS_BYTES,
    sha256: SECTION_ELEMENTS_CSS_SHA256,
  },
  {
    path: `${SRC}/threeui.css`,
    bytes: THREEUI_CSS_BYTES,
    sha256: THREEUI_CSS_SHA256,
  },
  {
    path: `${SRC}/assets/sf-light.woff2`,
    bytes: SF_LIGHT_BYTES,
    sha256: SF_LIGHT_SHA256,
  },
  {
    path: `${SRC}/assets/sf-regular.woff2`,
    bytes: SF_REGULAR_BYTES,
    sha256: SF_REGULAR_SHA256,
  },
  {
    path: `${SRC}/assets/sf-medium.woff2`,
    bytes: SF_MEDIUM_BYTES,
    sha256: SF_MEDIUM_SHA256,
  },
  {
    path: `${SRC}/assets/sf-semibold.woff2`,
    bytes: SF_SEMIBOLD_BYTES,
    sha256: SF_SEMIBOLD_SHA256,
  },
  {
    path: `${SRC}/assets/sf-bold.woff2`,
    bytes: SF_BOLD_BYTES,
    sha256: SF_BOLD_SHA256,
  },
];

export const PREVIEW_STILL =
  '/images/Assets%20Rectangle%20Buttons/RectangleButtons.png';
export const PREVIEW_STILL_DISK =
  'public/images/Assets Rectangle Buttons/RectangleButtons.png';
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
