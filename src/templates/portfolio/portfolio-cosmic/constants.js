export const DETAIL_FALLBACK = '/templates/portfolio-cosmic';

export const PAGE_TITLE = 'Michael Smith — Portfolio';

export const HLS_STREAM_URL =
  'https://stream.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g.m3u8';

export const LOADING_DURATION_MS = 2700;
export const LOADING_COMPLETE_DELAY_MS = 400;
export const LOADING_WORDS = Object.freeze(['Design', 'Create', 'Inspire']);
export const LOADING_WORD_INTERVAL_MS = 900;

export const HERO_ROLES = Object.freeze(['Creative', 'Fullstack', 'Founder', 'Scholar']);
export const ROLE_CYCLE_MS = 2000;

export const NAV_SHADOW_SCROLL_Y = 100;

export const NAV_LINKS = Object.freeze([
  { id: 'home', label: 'Home', href: '#home' },
  { id: 'work', label: 'Work', href: '#work' },
  { id: 'resume', label: 'Resume', href: '#resume' },
]);

export const CONTACT_EMAIL = 'hello@michaelsmith.com';

export const SOCIAL_LINKS = Object.freeze([
  { label: 'Twitter', href: 'https://twitter.com' },
  { label: 'LinkedIn', href: 'https://linkedin.com' },
  { label: 'Dribbble', href: 'https://dribbble.com' },
  { label: 'GitHub', href: 'https://github.com' },
]);

export const MARQUEE_TEXT = 'BUILDING THE FUTURE • ';
export const MARQUEE_REPEAT = 10;
export const MARQUEE_DURATION_S = 40;

export const FONT_HREF =
  'https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@300;400;500;600;700&display=swap';

export const FONT_LINK_ID = 'portfolio-cosmic-fonts';

/** Explorations parallax travel distances (px) */
export const EXPLORATIONS_LEFT_Y = -280;
export const EXPLORATIONS_RIGHT_Y = 220;

export const SECTION_MOTION = Object.freeze({
  duration: 1,
  ease: [0.25, 0.1, 0.25, 1],
  viewportMargin: '-100px',
});

export const STATS_MOTION = Object.freeze({
  duration: 0.8,
  stagger: 0.1,
  viewportMargin: '-80px',
});

/** Navbar → section smooth scroll */
export const SMOOTH_SCROLL_DURATION_MS = 900;
export const NAV_SCROLL_OFFSET_PX = 0;
