/** Halvorsen Arrow Pill Rectangle Buttons — host + provenance constants. */

export const CARD_ID = 'halvorsen-arrow-pill-rectangle-buttons';
export const CARD_TITLE = 'Halvorsen Arrow Pill Rectangle Buttons';
export const PAGE_TITLE = 'Halvorsen Arrow Pill Rectangle Buttons — Kmotion';
export const DETAIL_FALLBACK = '/templates/halvorsen-arrow-pill-rectangle-buttons';

export const PAGE_CLASS = 'halvorsen-arrow-pill-rectangle-buttons-page';
export const PAGE_HTML_CLASS = 'halvorsen-arrow-pill-rectangle-buttons-html';
export const FRAMED_HTML_CLASS = 'halvorsen-arrow-pill-rectangle-buttons-framed';
export const SHADER_FRAME_CLASS = 'shader-frame';
export const HOST_CLASS = 'threeui-background rectangle-buttons-collection';

/** Matches authored `.threeui-page-button-stage--halvorsen` dark ground. */
export const PAGE_BG = '#111113';
export const PAGE_INK = '#ffffff';

export const SOURCE_REVISION = 'ff30e28c2781';
export const VARIANT_ID = 'halvorsen-arrow-pill';
export const THEME_ID = 'halvorsen';
export const DEFAULT_MODE = 'dark';
export const BUTTON_LABEL = 'See the work';

export const RECTANGLE_BUTTONS_SHA256 =
  'ff30e28c278193a90f63c93aba77bc6c5c6a8a8f01ec8882392957851146f083';
export const RECTANGLE_BUTTONS_BYTES = 39715;

export const HALVORSEN_ARROW_PILL_DEFAULT_PROPS = {
  variant: 'halvorsen-arrow-pill',
  mode: 'dark',
  hue: 0,
  saturation: 1,
  brightness: 1,
};

const SRC = 'src/templates/button/halvorsen-arrow-pill-rectangle-buttons/sources';

export const ASSET_MANIFEST = [
  {
    path: `${SRC}/RectangleButtons.tsx.txt`,
    bytes: RECTANGLE_BUTTONS_BYTES,
    sha256: RECTANGLE_BUTTONS_SHA256,
  },
];

export const PREVIEW_STILL =
  '/images/Assets%20Halvorsen%20Arrow%20Pill%20Rectangle%20Buttons/HalvorsenArrowPillRectangleButtons.png';
export const PREVIEW_STILL_DISK =
  'public/images/Assets Halvorsen Arrow Pill Rectangle Buttons/HalvorsenArrowPillRectangleButtons.png';
export const MIN_PREVIEW_BYTES = 10_000;

export const BACK_BUTTON_CLASS =
  'absolute top-4 left-4 z-50 flex items-center gap-2 rounded-full bg-white/10 px-3 py-2 text-sm text-white backdrop-blur-md transition hover:bg-white/20';
export const BACK_ICON_SIZE = 16;
export const BACK_ICON_STROKE = 2;
export const BACK_LABEL = 'Back';
export const HISTORY_CAN_GO_BACK_MIN = 0;
