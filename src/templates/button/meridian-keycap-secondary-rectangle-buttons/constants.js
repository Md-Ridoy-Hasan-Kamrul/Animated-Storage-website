/** Meridian Keycap Secondary Rectangle Buttons — host + provenance constants. */

export const CARD_ID = 'meridian-keycap-secondary-rectangle-buttons';
export const CARD_TITLE = 'Meridian Keycap Secondary Rectangle Buttons';
export const PAGE_TITLE = 'Meridian Keycap Secondary Rectangle Buttons — Kmotion';
export const DETAIL_FALLBACK = '/templates/meridian-keycap-secondary-rectangle-buttons';

export const PAGE_CLASS = 'meridian-keycap-secondary-rectangle-buttons-page';
export const PAGE_HTML_CLASS = 'meridian-keycap-secondary-rectangle-buttons-html';
export const FRAMED_HTML_CLASS = 'meridian-keycap-secondary-rectangle-buttons-framed';
export const SHADER_FRAME_CLASS = 'shader-frame';
export const HOST_CLASS = 'threeui-background rectangle-buttons-collection';

/** Matches authored `.threeui-page-button-stage--meridian` dark ground. */
export const PAGE_BG = '#04070d';
export const PAGE_INK = '#ffffff';

export const SOURCE_REVISION = 'ff30e28c2781';
export const VARIANT_ID = 'meridian-keycap-secondary';
export const THEME_ID = 'meridian';
export const DEFAULT_MODE = 'dark';
export const BUTTON_LABEL = 'Book a walkthrough';

export const RECTANGLE_BUTTONS_SHA256 =
  'ff30e28c278193a90f63c93aba77bc6c5c6a8a8f01ec8882392957851146f083';
export const RECTANGLE_BUTTONS_BYTES = 39715;

export const MERIDIAN_KEYCAP_SECONDARY_DEFAULT_PROPS = {
  variant: 'meridian-keycap-secondary',
  mode: 'dark',
  hue: 0,
  saturation: 1,
  brightness: 1,
};

const SRC = 'src/templates/button/meridian-keycap-secondary-rectangle-buttons/sources';

export const ASSET_MANIFEST = [
  {
    path: `${SRC}/RectangleButtons.tsx.txt`,
    bytes: RECTANGLE_BUTTONS_BYTES,
    sha256: RECTANGLE_BUTTONS_SHA256,
  },
];

export const PREVIEW_STILL =
  '/images/Assets%20Meridian%20Keycap%20Secondary%20Rectangle%20Buttons/MeridianKeycapSecondaryRectangleButtons.png';
export const PREVIEW_STILL_DISK =
  'public/images/Assets Meridian Keycap Secondary Rectangle Buttons/MeridianKeycapSecondaryRectangleButtons.png';
export const MIN_PREVIEW_BYTES = 10_000;

export const BACK_BUTTON_CLASS =
  'absolute top-4 left-4 z-50 flex items-center gap-2 rounded-full bg-white/10 px-3 py-2 text-sm text-white backdrop-blur-md transition hover:bg-white/20';
export const BACK_ICON_SIZE = 16;
export const BACK_ICON_STROKE = 2;
export const BACK_LABEL = 'Back';
export const HISTORY_CAN_GO_BACK_MIN = 0;
