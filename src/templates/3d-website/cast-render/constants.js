export const DETAIL_FALLBACK = '/templates/cast-render';
export const PAGE_TITLE = 'Cast & Render — 3D Object Studio';
export const PAGE_BG = '#f2f0ec';
export const PAGE_INK = '#0d0c0b';

export const FONT_HREF =
  'https://fonts.googleapis.com/css2?family=Inter+Tight:wght@400;500&display=swap';
export const FONT_LINK_ID = 'cast-render-fonts';

export const BRAND_NAME = 'Cast & Render';
export const FOOTER_COPY = '112 Render Lane \u00a0\u00b7\u00a0 Tue–Sun, 9am till sold out';

export const VIDEO_URL =
  'https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/45567745-d826-44a2-a5ce-7ef670944e60.mp4';

export const DRIFT_PX = 22;
export const SEEK_EASE = 0.115;
export const SEEK_GAP_MIN = 0.0008;
export const PANEL_POINTER_OPACITY = 0.6;
export const READY_STATE_HAVE_CURRENT_DATA = 2;
export const BOOT_TIMEOUT_MS = 12000;
export const FETCH_BAIL_MS = 15000;
export const FETCH_SIZE_FALLBACK = 11000000;
export const FETCH_FALLBACK_CAP = 0.95;
export const DETAIL_CARD_IMAGE_COUNT = 8;
export const BACK_ICON_SIZE = 16;
export const EMBED_SCROLL_DELAY_MS = 900;
export const STANDALONE_SCROLL_DELAY_MS = 700;

export const CUES = Object.freeze([
  Object.freeze([0, 0, 0.15, 0.23]),
  Object.freeze([0.35, 0.43, 0.57, 0.65]),
  Object.freeze([0.77, 0.85, 1.1, 1.2]),
]);

export const HASH_PROGRESS = Object.freeze({
  board: 0,
  visit: 0.35,
  order: 0.77,
});

export const NAV_LINKS = Object.freeze([
  { href: '#board', label: 'Works', pill: false },
  { href: '#visit', label: 'About', pill: false },
  { href: '#order', label: 'Start a brief', pill: true },
]);

export const PANELS = Object.freeze([
  {
    id: 'board',
    eyebrow: ['Objects studio', 'No. 112 Render Lane'],
    titleLines: ['Built at four.', 'Out by seven.'],
    sub: 'Six kinds of mesh, one render farm, and a queue that starts before the sun does.',
    ctaHref: '#board',
    ctaLabel: 'View the reel',
  },
  {
    id: 'visit',
    eyebrow: ['Across the studio'],
    titleLines: ['Flat, never bent.'],
    sub: 'The mesh should still be clean when it reaches the viewport. We export to order, never before.',
    ctaHref: '#visit',
    ctaLabel: 'Tour our space',
  },
  {
    id: 'order',
    eyebrow: ['The surface'],
    titleLines: ['Smooth enough to', 'hold a light pass.'],
    sub: 'Custom surface shaders whipped every morning, spread to the edge and weighed by the quarter pound.',
    ctaHref: '#order',
    ctaLabel: 'Start a brief',
  },
]);
