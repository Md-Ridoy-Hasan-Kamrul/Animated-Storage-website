export const CARD_ID = 'mind-body-healing';
export const CARD_TITLE = 'Mind-Body Healing';
export const DETAIL_FALLBACK = '/templates/mind-body-healing';
export const PAGE_TITLE = 'Vibrant Wellness';
export const PAGE_BG = '#050505';
export const PAGE_INK = '#ffffff';
export const PAGE_CLASS = 'mind-body-healing relative h-screen w-full overflow-hidden';
export const PAGE_HTML_CLASS = 'mind-body-healing-page';

export const FONT_PRECONNECT_GAPI = 'https://fonts.googleapis.com';
export const FONT_PRECONNECT_GSTATIC = 'https://fonts.gstatic.com';
export const FONT_INTER_HREF =
  'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap';
export const FONT_INTER_ID = 'mind-body-healing-inter';
export const FONT_PRECONNECT_GAPI_ID = 'mind-body-healing-preconnect-gapi';
export const FONT_PRECONNECT_GSTATIC_ID = 'mind-body-healing-preconnect-gstatic';

export const BRAND_NAME = 'Vibrant Wellness';
export const HEADLINE_LINE_ONE = 'Heal Your Body';
export const HEADLINE_LINE_TWO = 'Naturally';
export const SUBTITLE = 'Holistic wellness. Transformative results.';
export const CTA_LABEL = 'Begin Your Journey';
export const BADGE_LABEL = 'our path to natural wellness';
export const ACCOUNT_LABEL = 'Account';
export const HOME_LABEL = 'Home';

export const NAV_LINKS = [
  { id: 'home', label: HOME_LABEL, href: '#home', tone: 'solid' },
  { id: 'approach', label: 'Our Approach', href: '#approach', tone: 'muted' },
  { id: 'methods', label: 'Healing Methods', href: '#methods', tone: 'muted' },
];

export const STATS = [
  { id: 'consult-hours', icon: 'triangle', value: '48 Hours', label: 'Initial Consultation' },
  {
    id: 'sessions',
    icon: 'checker',
    value: 'Initial Consultation',
    label: 'Healing Sessions',
  },
];

export const LOGO_PATH =
  'M 128 128 C 198.692 128 256 185.308 256 256 L 151.883 256 C 149.812 220.307 120.213 192 84 192 C 47.787 192 18.188 220.307 16.117 256 L 0 256 C 0 185.308 57.308 128 128 128 Z M 104.117 0 C 106.188 35.694 135.787 64 172 64 C 208.213 64 237.812 35.694 239.883 0 L 256 0 C 256 70.692 198.692 128 128 128 C 57.308 128 0 70.692 0 0 Z';
export const LOGO_VIEWBOX = '0 0 256 256';

export const MENU_ICON_SIZE = 20;
export const ACCOUNT_ICON_SIZE = 20;
export const ACCOUNT_ICON_STROKE = 1.5;
export const ACCOUNT_ICON_CLASS = 'h-5 w-5 text-white/80';
export const BACK_ICON_SIZE = 16;
export const BACK_ICON_STROKE = 2;
export const HISTORY_CAN_GO_BACK_MIN = 0;
export const DETAIL_CARD_IMAGE_COUNT = 8;
export const OPEN_MENU_LABEL = 'Open menu';
export const CLOSE_MENU_LABEL = 'Close menu';
export const BACK_LABEL = 'Back';

export const DOT_BOX_PX = 20;
export const DOT_SIZE_PX = 2.5;
export const DOT_COUNT = 9;
export const CHECKER_COLS = 3;
export const CHECKER_CELLS = 9;
export const CHECKER_FILLED_CLASS = 'bg-white/60';
export const CHECKER_EMPTY_CLASS = 'bg-white/0';

export const LIQUID_CLASS = 'liquid-glass';
export const NAV_CLASS =
  'relative z-20 flex items-center justify-between px-5 pt-6 sm:px-8 sm:pt-8 md:px-16 lg:px-20';
export const LOGO_CLASS = 'h-8 w-8 text-white md:h-9 md:w-9';
export const NAV_PILL_CLASS = 'liquid-glass hidden items-center gap-8 rounded-full px-8 py-3 md:flex';
export const NAV_LINK_SOLID_CLASS = 'text-sm font-medium text-white';
export const NAV_LINK_MUTED_CLASS = 'text-sm font-medium text-white/70 transition-opacity hover:opacity-100';
export const NAV_LINK_TONE = {
  solid: NAV_LINK_SOLID_CLASS,
  muted: NAV_LINK_MUTED_CLASS,
};
export const NAV_RIGHT_CLASS = 'flex items-center';
export const ACCOUNT_DESKTOP_CLASS =
  'liquid-glass hidden h-10 w-10 items-center justify-center rounded-full md:flex';
export const MENU_BUTTON_CLASS =
  'liquid-glass relative z-50 flex h-10 w-10 items-center justify-center rounded-full text-white md:hidden';
export const ICON_SWAP_BASE = 'absolute transition duration-300';
export const ICON_SWAP_ON = 'rotate-0 scale-100 opacity-100';
export const ICON_SWAP_OFF = 'rotate-90 scale-0 opacity-0';
export const OVERLAY_BASE_CLASS =
  'fixed inset-0 z-10 flex flex-col items-center justify-center gap-8 bg-black/80 backdrop-blur-xl md:hidden';
export const OVERLAY_OPEN_CLASS = 'pointer-events-auto opacity-100';
export const OVERLAY_CLOSED_CLASS = 'pointer-events-none opacity-0';
export const OVERLAY_TRANSITION_CLASS = 'transition-opacity duration-500 ease-out';
export const OVERLAY_PANEL_OPEN = 'translate-y-0';
export const OVERLAY_PANEL_CLOSED = '-translate-y-8';
export const OVERLAY_PANEL_BASE = 'flex flex-col items-center gap-8 transition-transform duration-500 ease-out';
export const MOBILE_LINK_CLASS = 'text-2xl font-medium text-white';
export const ACCOUNT_ROW_CLASS = 'flex items-center gap-3';
export const ACCOUNT_CIRCLE_CLASS =
  'liquid-glass flex h-10 w-10 items-center justify-center rounded-full text-white/80';
export const ACCOUNT_TEXT_CLASS = 'text-sm font-light text-white/60';
export const MAIN_CLASS =
  'relative z-10 flex h-[calc(100vh-5.5rem)] flex-col justify-between px-5 pb-8 sm:px-8 sm:pb-10 md:h-[calc(100vh-6.5rem)] md:px-16 lg:px-20';
export const MAIN_OPEN_CLASS = 'opacity-0 pointer-events-none md:opacity-100 md:pointer-events-auto';
export const MAIN_CLOSED_CLASS = 'opacity-100';
export const MAIN_FADE_CLASS = 'transition-opacity duration-500 ease-out';
export const COPY_WRAP_CLASS = 'mt-14 max-w-2xl sm:mt-20 md:mt-28';
export const BADGE_CLASS =
  'liquid-glass mb-5 inline-flex items-center gap-2.5 rounded-full px-3 py-1.5 sm:mb-6 sm:gap-3 sm:px-4 sm:py-2';
export const AVATAR_STACK_CLASS = 'flex -space-x-2';
export const AVATAR_CLASS =
  'h-5 w-5 rounded-full border-2 border-white/20 object-cover sm:h-6 sm:w-6';
export const BADGE_TEXT_CLASS = 'text-xs font-light text-white/80 sm:text-sm';
export const HEADLINE_CLASS =
  'text-4xl font-normal leading-[1.05] tracking-[-0.05em] text-white sm:text-5xl md:text-6xl lg:text-7xl';
export const SUBTITLE_CLASS = 'mt-4 text-sm font-light text-white/70 sm:mt-5 sm:text-base md:text-lg';
export const CTA_CLASS =
  'liquid-glass mt-6 rounded-full px-6 py-3 text-sm font-medium text-white transition duration-300 hover:bg-white/10 sm:mt-8 sm:px-7 sm:py-3.5';
export const STATS_WRAP_CLASS = 'flex items-end gap-6 sm:gap-10 md:gap-16';
export const STAT_COL_CLASS = 'flex flex-col gap-2';
export const STAT_VALUE_CLASS = 'text-xl font-normal text-white sm:text-2xl md:text-3xl';
export const STAT_LABEL_CLASS = 'text-xs font-light text-white/60 sm:text-sm';
export const DOT_BOX_CLASS = 'mbh-dots relative h-5 w-5';
export const TRIANGLE_DOT_CLASSES = [
  'mbh-dot absolute top-[0px] left-[8.75px] h-[2.5px] w-[2.5px] bg-white/60',
  'mbh-dot absolute top-[5.833px] left-[4.375px] h-[2.5px] w-[2.5px] bg-white/60',
  'mbh-dot absolute top-[5.833px] left-[13.125px] h-[2.5px] w-[2.5px] bg-white/60',
  'mbh-dot absolute top-[11.667px] left-[0px] h-[2.5px] w-[2.5px] bg-white/60',
  'mbh-dot absolute top-[11.667px] left-[8.75px] h-[2.5px] w-[2.5px] bg-white/60',
  'mbh-dot absolute top-[11.667px] left-[17.5px] h-[2.5px] w-[2.5px] bg-white/60',
  'mbh-dot absolute top-[17.5px] left-[0px] h-[2.5px] w-[2.5px] bg-white/60',
  'mbh-dot absolute top-[17.5px] left-[8.75px] h-[2.5px] w-[2.5px] bg-white/60',
  'mbh-dot absolute top-[17.5px] left-[17.5px] h-[2.5px] w-[2.5px] bg-white/60',
];
export const CHECKER_GRID_CLASS = 'grid grid-cols-3 gap-[2px]';
export const CHECKER_CELL_SIZE_CLASS = 'h-1 w-1 rounded-sm';
export const VIDEO_WRAP_CLASS = 'absolute inset-0 z-0';
export const VIDEO_CLASS = 'absolute inset-0 h-full w-full object-cover';
export const BACK_BUTTON_CLASS =
  'fixed bottom-4 left-3 z-[70] inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/40 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-md min-[375px]:left-4 min-[375px]:text-sm';

export const MOTION_EASE = [0.16, 1, 0.3, 1];
export const VIDEO_DURATION_S = 1.4;
export const VIDEO_FROM_SCALE = 1.04;
export const NAV_Y = -12;
export const NAV_DURATION_S = 0.7;
export const COPY_Y = 24;
export const COPY_DURATION_S = 0.85;
export const COPY_DELAY_S = 0.18;
export const STATS_DELAY_S = 0.32;
