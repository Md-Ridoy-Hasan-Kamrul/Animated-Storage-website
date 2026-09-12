export const DETAIL_FALLBACK = '/templates/adam-roberts';
export const PAGE_TITLE = 'Adam Roberts - Design & Engineering';
export const PAGE_BG = '#000000';
export const PAGE_INK = '#ffffff';
export const AWARD_CHIP_BG = '#0B0B0B';

export const FONT_INTER_HREF =
  'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap';
export const FONT_BASIS33_HREF =
  'https://db.onlinewebfonts.com/c/d08bafd725a4cfc309efb5a88e0b63a5?family=basis33';

export const FONT_LINKS = Object.freeze([
  {
    id: 'adam-roberts-preconnect-g',
    rel: 'preconnect',
    href: 'https://fonts.googleapis.com',
  },
  {
    id: 'adam-roberts-preconnect-gs',
    rel: 'preconnect',
    href: 'https://fonts.gstatic.com',
    crossOrigin: 'anonymous',
  },
  {
    id: 'adam-roberts-inter',
    rel: 'stylesheet',
    href: FONT_INTER_HREF,
  },
  {
    id: 'adam-roberts-basis33',
    rel: 'stylesheet',
    href: FONT_BASIS33_HREF,
  },
]);

export const LOGO_SIZE = 28;
export const MENU_ICON_SIZE = 24;
export const PLAY_ICON_SIZE = 14;
export const BACK_ICON_SIZE = 16;

export const MENU_EASE = 'cubic-bezier(0.16,1,0.3,1)';
export const MENU_DURATION_MS = 500;

export const DETAIL_CARD_IMAGE_COUNT = 8;

export const NAV_LINKS = Object.freeze([
  { label: 'ABOUT', href: '#' },
  { label: 'PROCESS', href: '#' },
  { label: 'PROJECTS', href: '#' },
  { label: 'CATALOG', href: '#' },
  { label: 'D.O.T', href: '#' },
  { label: 'TALK', href: '#' },
]);

export const SERVICES_LIST = Object.freeze([
  'Branding',
  'Creative Direction & Strategy',
  'UX/UI Design',
  'Web Development (React/Nextjs)',
  '3D, WebGL / Photography',
  'Video & Animation',
]);

export const AWARDS = Object.freeze([
  { id: 'fwa', name: 'FWA', nameClass: 'text-sm font-bold tracking-tight sm:text-base', count: 'x1' },
  { id: 'w', name: 'W.', nameClass: 'text-lg font-bold sm:text-xl', count: 'x7' },
  { id: 'cssda', name: 'CSSDesignAwards', nameClass: 'text-[10px] font-bold tracking-tight sm:text-xs', count: 'x22' },
]);
