export const CARD_ID = 'real-time-alerts';
export const CARD_TITLE = 'Real Time Alerts';
export const DETAIL_FALLBACK = '/templates/real-time-alerts';
export const PAGE_TITLE = 'Signal — Log in';
export const PAGE_BG = '#fefefe';
export const PAGE_INK = '#000000';
export const PAGE_CLASS = 'real-time-alerts';
export const PAGE_HTML_CLASS = 'real-time-alerts-page';
export const FRAMED_HTML_CLASS = 'real-time-alerts-framed';
export const ENTRY_PENDING_CLASS = 'entry-pending';
export const MODE_TABPORT = 'tabport';
export const MODE_PHONE = 'phone';
export const MODE_LAND = 'land';
export const BODY_TABPORT = 'tabport';
export const BODY_STACKED = 'stacked';

export const FONT_PRECONNECT_GAPI = 'https://fonts.googleapis.com';
export const FONT_PRECONNECT_GSTATIC = 'https://fonts.gstatic.com';
export const FONT_HREF =
  'https://fonts.googleapis.com/css2?family=Outfit:wght@200..800&family=Source+Sans+3:wght@400;700&display=block';
export const FONT_LINK_ID = 'real-time-alerts-fonts';
export const FONT_PRECONNECT_GAPI_ID = 'real-time-alerts-preconnect-gapi';
export const FONT_PRECONNECT_GSTATIC_ID = 'real-time-alerts-preconnect-gstatic';

export const BADGE_COPY = 'Built for fast-moving teams';
export const HL1_COPY = 'Find Signal to Action';
export const HL2_COPY = 'Instantly';
export const HEADLINE_MEASURE_COPY = 'Find Signal to Action Instantly';
export const H1_COPY = 'Welcome Back!';
export const SUB_LEAD = 'Log in';
export const SUB_TAIL = ' to continue monitoring your signals.';
export const EMAIL_PLACEHOLDER = 'Eg. johndoe@gmail.com';
export const PASSWORD_PLACEHOLDER = 'Password';
export const LOGIN_LABEL = 'Login';
export const OR_LABEL = 'OR';
export const GOOGLE_LABEL = 'Sign in with Google';
export const FOOTER_LEAD = 'Don\u2019t have an account? ';
export const FOOTER_LINK = 'Start Free';
export const START_FREE_HREF = '#start-free';
export const EMAIL_ARIA = 'Email address';
export const PASSWORD_ARIA = 'Password';
export const TALL_VIDEO_ARIA = 'Peregrine falcon in a high-speed dive';

export const REF_W = 1464;
export const REF_H = 949;
export const PHOTO_W = 836;
export const PANE_W = 628;
export const CARD_W = 613;
export const CARD_H = 922;
export const CONTENT_H = 697;
export const IMG_W = 1177;
export const IMG_H = 1336;
export const IMG_REF_SCALE = PHOTO_W / IMG_W;
export const PANE_RATIO = PANE_W / REF_W;
export const HERO_W = 681;
export const HERO_H = 219;
export const REF_CARD_ASPECT = 692 / 855;
export const RAMP_HI = 1280;
export const RAMP_LO = 1000;
export const PHOTO_MIN = 0.42;
export const RAMP_LO2 = 820;
export const PHOTO_MIN2 = 0.36;
export const LAND_MIN_PX = 700;
export const PHONE_MAX_PX = 699;
export const ASPECT_LAND_W = 51;
export const ASPECT_LAND_H = 50;
export const PHOTO_COL_DESKTOP = PHOTO_W / REF_W;
export const CARD_GAP_L = 1;
export const CARD_MARGIN_TOP = 14;
export const CARD_MARGIN_BOTTOM = 13;
export const CARD_MARGIN_RIGHT = 14;
export const CARD_RADIUS = 26;
export const HERO_MAX_FRACTION = 0.92;
export const BAND_VH = 0.425;
export const SIDE_VW = 0.0525;
export const FOOTER_VH = 0.0297;
export const HEADLINE_WRAP_RATIO = 0.61;
export const BADGE_REF_H = 37;
export const BADGE_BAND_RATIO = 0.0742;
export const BT_FS = 0.02876;
export const HERO_FS = 0.1058;

export const TP = {
  pad: 0.1076,
  h1Top: 0.08656,
  h1Fs: 0.06839,
  subTop: 0.17368,
  subFs: 0.0309,
  emTop: 0.25435,
  emH: 0.10257,
  emR: 0.0202,
  ephFs: 0.02702,
  ephPad: 0.0332,
  pwTop: 0.36851,
  pwH: 0.10839,
  btnTop: 0.50435,
  btnH: 0.10981,
  btnFs: 0.0275,
  arrow: 0.026,
  btnGap: 0.02,
  divTop: 0.68222,
  orFs: 0.02245,
  orPad: 0.051,
  divH: 0.0026,
  gTop: 0.76445,
  gH: 0.09966,
  gIcon: 0.032,
  gtFs: 0.03205,
  gGap: 0.026,
  btTop: 0.89668,
  btFs: BT_FS,
  heroFs: HERO_FS,
  badgeH: BADGE_BAND_RATIO,
  heroLh: 1.1246,
  heroBot: 0.06493,
  heroGap: -0.30423,
  heroSide: 0.0525,
};

export const TP_WIDTH_KEYS = ['pad', 'orPad'];
export const TP_BAND_KEYS = ['badgeH', 'heroLh', 'heroBot', 'heroGap', 'heroSide', 'heroFs'];
export const TP_HEIGHT_KEYS = [
  'h1Top',
  'subTop',
  'emTop',
  'pwTop',
  'btnTop',
  'divTop',
  'gTop',
  'btTop',
  'emH',
  'pwH',
  'btnH',
  'gH',
  'divH',
];
export const TP_UNITLESS_KEYS = ['heroLh'];

export const ENTRANCE_EASE = 'cubic-bezier(.16,1,.3,1)';
export const ENTRANCE_SOFT_EASE = 'cubic-bezier(.22,1,.36,1)';
export const FONT_WAIT_MS = 650;
export const ENTRY_FALLBACK_MS = 3500;
export const COMPACT_MQ = '(max-width:699px)';
export const LAND_MQ = '(min-width:700px) and (min-aspect-ratio:51/50)';
export const PORT_MQ = '(min-width:700px) and (max-aspect-ratio:51/50)';
export const REDUCE_MQ = '(prefers-reduced-motion: reduce)';

export const ENTRANCE_STEPS = [
  { selector: '.card', delay: 40, duration: 820, easing: 'ease', kind: 'card' },
  { selector: '.badge', delay: 120, duration: 480, easing: 'soft', kind: 'y8' },
  { selector: '#hl1', delay: 240, duration: 760, easing: 'ease', kind: 'headline' },
  { selector: '#hl2', delay: 330, duration: 760, easing: 'ease', kind: 'headline' },
  { selector: '#h1', delay: 470, duration: 620, easing: 'ease', kind: 'y10' },
  { selector: '#sub', delay: 570, duration: 560, easing: 'ease', kind: 'y10' },
  { selector: '#email', delay: 720, duration: 520, easing: 'soft', kind: 'y8' },
  { selector: '#pw', delay: 790, duration: 520, easing: 'soft', kind: 'y8' },
  { selector: '#loginBtn', delay: 930, duration: 560, easing: 'ease', kind: 'y8' },
  { selector: '.divider', delay: 1060, duration: 440, easing: 'soft', kind: 'y6' },
  { selector: '#gBtn', delay: 1150, duration: 540, easing: 'ease', kind: 'y8' },
  { selector: '#bottom', delay: 1260, duration: 500, easing: 'soft', kind: 'y6' },
];

export const BADGE_PATH =
  'M449.0 0.0 435.0 0.0 415.0 10.0 200.0 249.0 187.0 276.0 189.0 299.0 212.0 326.0 232.0 332.0 289.0 334.0 289.0 516.0 301.0 543.0 324.0 556.0 346.0 556.0 374.0 536.0 573.0 311.0 582.0 288.0 579.0 264.0 559.0 240.0 539.0 233.0 478.0 230.0 478.0 32.0 470.0 13.0ZM442.0 38.0 446.0 250.0 466.0 267.0 540.0 270.0 547.0 285.0 341.0 520.0 332.0 522.0 324.0 514.0 321.0 314.0 307.0 300.0 295.0 297.0 233.0 297.0 224.0 291.0 221.0 282.0ZM1.0 67.0 4.0 81.0 17.0 90.0 216.0 90.0 223.0 87.0 232.0 74.0 228.0 57.0 215.0 49.0 18.0 49.0 5.0 57.0ZM0.0 285.0 4.0 300.0 17.0 308.0 105.0 308.0 118.0 299.0 121.0 291.0 119.0 278.0 111.0 270.0 103.0 267.0 17.0 267.0 4.0 275.0ZM1.0 495.0 4.0 511.0 10.0 517.0 23.0 520.0 179.0 520.0 191.0 516.0 200.0 500.0 196.0 488.0 182.0 479.0 18.0 479.0 9.0 483.0Z';
export const BADGE_VIEWBOX = '0 0 582 557';
export const LOGIN_ARROW_D = 'M3 11h15.4M11 3.3l7.7 7.7-7.7 7.7';
export const GOOGLE_RED = '#EA4335';
export const GOOGLE_BLUE = '#4285F4';
export const GOOGLE_YELLOW = '#FBBC05';
export const GOOGLE_GREEN = '#34A853';

export const HISTORY_CAN_GO_BACK_MIN = 0;
export const DETAIL_CARD_IMAGE_COUNT = 8;
export const BACK_ICON_SIZE = 16;
export const BACK_ICON_STROKE = 2;
export const BACK_LABEL = 'Back';
export const BACK_BUTTON_CLASS =
  'fixed bottom-4 left-3 z-[70] inline-flex items-center gap-2 rounded-full border border-black/15 bg-white/85 px-3 py-1.5 text-xs font-medium text-black backdrop-blur-md min-[375px]:left-4 min-[375px]:text-sm';
