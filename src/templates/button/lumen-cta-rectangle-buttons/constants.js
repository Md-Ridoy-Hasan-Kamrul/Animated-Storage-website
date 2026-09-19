/** Lumen CTA Rectangle Buttons — host + provenance constants. */

export const CARD_ID = 'lumen-cta-rectangle-buttons';
export const CARD_TITLE = 'Lumen CTA Rectangle Buttons';
export const PAGE_TITLE = 'Lumen CTA Rectangle Buttons — Kmotion';
export const DETAIL_FALLBACK = '/templates/lumen-cta-rectangle-buttons';

export const PAGE_CLASS = 'lumen-cta-rectangle-buttons-page';
export const PAGE_HTML_CLASS = 'lumen-cta-rectangle-buttons-html';
export const FRAMED_HTML_CLASS = 'lumen-cta-rectangle-buttons-framed';
export const SHADER_FRAME_CLASS = 'shader-frame';
export const HOST_CLASS = 'threeui-background rectangle-buttons-collection';

/** Matches authored `.lumen-cta` dark ground. */
export const PAGE_BG = '#0b0821';
export const PAGE_INK = 'rgba(255, 255, 255, 0.7)';

export const SOURCE_REVISION = 'ff30e28c2781';
export const VARIANT_ID = 'lumen-cta';
export const DEFAULT_MODE = 'dark';
export const LUMEN_PRIMARY_VARIANT = 'primary';
export const BUTTON_LABEL = 'Get your card';

export const LUMEN_CTA_SHA256 =
  '437b62c7b9b3009f1fc80fc24e81f2014c1bab9567ba1afcff314b72c6b0b519';
export const LUMEN_CTA_CSS_SHA256 =
  'a19f7e01d0a0580afaedfaccd7a1acb1a74a004ded3e5269d59da986e085c151';
export const LUMEN_HTML_SHA256 =
  '8992e7c0ceb4c306502f5c296f1fd3e8c8602372d1a217fa1f3b5e49445ec28d';
export const THREEUI_CSS_SHA256 =
  'efe4447139f1358dd8e9be68edf6fa46cbefbd1de423a4d6c439ca61d2c8eccf';

export const LUMEN_CTA_BYTES = 2229;
export const LUMEN_CTA_CSS_BYTES = 2938;
export const LUMEN_HTML_BYTES = 33252;
export const THREEUI_CSS_BYTES = 40715;

export const LUMEN_CTA_DEFAULT_PROPS = {
  variant: 'lumen-cta',
  mode: 'dark',
  hue: 0,
  saturation: 1,
  brightness: 1,
};

const SRC = 'src/templates/button/lumen-cta-rectangle-buttons/sources';

export const ASSET_MANIFEST = [
  {
    path: `${SRC}/LumenCta.tsx.txt`,
    bytes: LUMEN_CTA_BYTES,
    sha256: LUMEN_CTA_SHA256,
  },
  {
    path: `${SRC}/lumen-cta.css`,
    bytes: LUMEN_CTA_CSS_BYTES,
    sha256: LUMEN_CTA_CSS_SHA256,
  },
  {
    path: `${SRC}/lumen.html`,
    bytes: LUMEN_HTML_BYTES,
    sha256: LUMEN_HTML_SHA256,
  },
  {
    path: `${SRC}/threeui.css`,
    bytes: THREEUI_CSS_BYTES,
    sha256: THREEUI_CSS_SHA256,
  },
];

export const PREVIEW_STILL =
  '/images/Assets%20Lumen%20CTA%20Rectangle%20Buttons/LumenCTARectangleButtons.png';
export const PREVIEW_STILL_DISK =
  'public/images/Assets Lumen CTA Rectangle Buttons/LumenCTARectangleButtons.png';
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
