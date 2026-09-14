export const CARD_ID = 'equilibrium';
export const CARD_TITLE = 'Equilibrium';
export const DETAIL_FALLBACK = '/templates/equilibrium';
export const PAGE_TITLE = 'Equilibrium';
export const PAGE_BG = '#050505';
export const PAGE_INK = '#ffffff';
export const PAGE_CLASS = 'equilibrium relative h-screen w-full overflow-hidden';
export const PAGE_HTML_CLASS = 'equilibrium-page';
export const FRAMED_HTML_CLASS = 'equilibrium-framed';
export const LIQUID_CLASS = 'liquid-glass';

export const FONT_PRECONNECT_GAPI = 'https://fonts.googleapis.com';
export const FONT_PRECONNECT_GSTATIC = 'https://fonts.gstatic.com';
export const FONT_HREF =
  'https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500;600;700&display=swap';
export const FONT_LINK_ID = 'equilibrium-geist';
export const FONT_PRECONNECT_GAPI_ID = 'equilibrium-preconnect-gapi';
export const FONT_PRECONNECT_GSTATIC_ID = 'equilibrium-preconnect-gstatic';

export const BRAND_NAME = 'Equilibrium';
export const HEADLINE = 'Live Better, Feel Whole Every Day';
export const SUBTITLE =
  'Take charge of how you feel with a companion built for your journey—build routines, follow your growth, and unlock tailored insights for a steadier, more vibrant life each day.';
export const LOGIN_LABEL = 'Log in';
export const BEGIN_LABEL = 'Begin Now';
export const START_LABEL = 'Start Today';
export const DISCOVER_LABEL = 'Discover How';
export const OPEN_MENU_LABEL = 'Open menu';
export const CLOSE_MENU_LABEL = 'Close menu';
export const BACK_LABEL = 'Back';

export const NAV_LINKS = [
  { label: 'Home', active: true },
  { label: 'Wellness', dropdown: true },
  { label: 'Routine' },
  { label: 'Our Team' },
];

export const LOGO_ICON_SIZE = 22;
export const LOGO_ICON_STROKE = 1.5;
export const CHEVRON_SIZE = 13;
export const MENU_ICON_SIZE = 18;
export const BACK_ICON_SIZE = 16;
export const BACK_ICON_STROKE = 2;
export const HISTORY_CAN_GO_BACK_MIN = 0;
export const DETAIL_CARD_IMAGE_COUNT = 8;

export const VIDEO_CLASS = 'eq-video absolute inset-0 h-full w-full object-cover';
export const NAV_CLASS =
  'absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-5 py-5 sm:px-8';
export const LOGO_CLASS = 'flex items-center gap-2 text-base font-medium text-white';
export const NAV_PILL_CLASS = `${LIQUID_CLASS} hidden items-center gap-1 rounded-xl px-2 py-2 md:flex`;
export const NAV_ITEM_BASE =
  'flex items-center gap-0.5 rounded-md px-3 py-1.5 text-sm transition-colors';
export const NAV_ITEM_ACTIVE = 'bg-white/15 text-white';
export const NAV_ITEM_IDLE = 'text-white/70 hover:text-white';
export const CTA_ROW_CLASS = 'hidden items-center gap-3 md:flex';
export const LOGIN_CLASS = `${LIQUID_CLASS} rounded-full px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-white/5`;
export const BEGIN_CLASS =
  'rounded-full bg-white px-4 py-2.5 text-sm font-medium text-black transition-colors hover:bg-white/90';
export const MENU_TOGGLE_CLASS = `${LIQUID_CLASS} rounded-lg p-2 text-white md:hidden`;
export const MOBILE_MENU_CLASS = `${LIQUID_CLASS} absolute top-[72px] left-4 right-4 z-30 flex flex-col gap-1 rounded-2xl p-4 md:hidden`;
export const MOBILE_NAV_ITEM_CLASS =
  'flex w-full items-center justify-between rounded-lg px-4 py-3 text-sm text-white/80 transition-colors hover:text-white';
export const MOBILE_CTA_ROW_CLASS = 'mt-2 flex gap-2 border-t border-white/10 pt-3';
export const MOBILE_LOGIN_CLASS = `${LOGIN_CLASS} flex-1`;
export const MOBILE_BEGIN_CLASS = `${BEGIN_CLASS} flex-1`;
export const HERO_CLASS =
  'absolute bottom-0 left-0 z-20 max-w-2xl px-6 pb-10 sm:px-12 sm:pb-16';
export const HEADLINE_CLASS =
  'mb-4 text-4xl font-medium leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl';
export const SUBTITLE_CLASS = 'mb-7 max-w-md text-sm leading-relaxed text-white/60';
export const HERO_CTA_ROW_CLASS = 'flex flex-wrap items-center gap-3';
export const START_CLASS =
  'rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition-colors hover:bg-white/90 sm:px-7 sm:text-base';
export const DISCOVER_CLASS = `${LIQUID_CLASS} rounded-full px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-white/5 sm:px-7 sm:text-base`;
export const BACK_BUTTON_CLASS =
  'fixed bottom-4 left-3 z-[70] inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/40 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-md min-[375px]:left-4 min-[375px]:text-sm';
export const CHEVRON_CLASS = 'mt-px';
