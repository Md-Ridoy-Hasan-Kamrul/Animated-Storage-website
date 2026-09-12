export const DETAIL_FALLBACK = '/templates/neo-museum';
export const PAGE_TITLE = 'NHM — Neo Museum';
export const PAGE_BG = '#fcfcfc';
export const PAGE_INK = '#111';
export const DARK_BG = '#0a0a0a';

export const VIDEO_REVEAL_MS = 2800;
export const CHAPTER_CYCLE_MS = 3500;
export const INITIAL_CHAPTER = 2;
export const CHAPTER_COUNT = 5;

export const FONT_HREF =
  'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap';
export const FONT_LINK_ID = 'neo-museum-fonts';

export const MOTION_EASE = [0.16, 1, 0.3, 1];

export const FADE_UP = Object.freeze({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
});

export const LETTER_BLOCK = Object.freeze({
  initial: { y: 120, opacity: 0 },
  animate: {
    y: 0,
    opacity: 1,
    transition: { duration: 1.2, ease: MOTION_EASE },
  },
});

export const NAV_ITEMS = Object.freeze([
  { label: 'Visit', href: '#visit' },
  { label: 'Exhibitions', href: '#collection' },
  { label: 'Discover', href: '#collection' },
  { label: 'Learn', href: '#explore' },
  { label: 'About', href: '#visit' },
]);

export const ACTION_PILLS = Object.freeze([
  { id: 'dinosaurs', label: 'Dinosaurs', icon: 'Bone' },
  { id: 'life', label: 'Ancient Life', icon: 'Dna' },
  { id: 'minerals', label: 'Minerals', icon: 'Gem' },
  { id: 'fossils', label: 'Fossils', icon: 'Leaf' },
  { id: 'learn', label: 'Learn More', icon: 'BookOpen' },
]);

export const VALUE_PILLS = Object.freeze(['Educational', 'Authentic', 'Inspiring']);

export const EMBED_SCROLL_DELAY_MS = 2200;
export const STANDALONE_SCROLL_DELAY_MS = 700;
export const BACK_ICON_SIZE = 16;
export const DETAIL_CARD_IMAGE_COUNT = 8;

export const ICON_PILL = 14;
export const ICON_CIRCLE = 22;
export const ICON_PLUS = 16;
export const ICON_ARROW = 14;
export const ICON_CHAPTER = 22;

export const VIEW_MARGIN_HEADING = '-100px';
export const VIEW_MARGIN_PTERO = '100px';
export const PTERO_ENTER_Y = '-65%';
export const PTERO_REST_Y = '-78%';
export const PTERO_DURATION_S = 1.4;

export const HEADING_REVEAL = Object.freeze({
  initial: { y: 40, opacity: 0 },
  visible: { y: 0, opacity: 1 },
});

export const PILL_STAGGER = Object.freeze({
  animate: { transition: { staggerChildren: 0.1, delayChildren: 0.3 } },
});

export const HERO_LEFT_STAGGER = Object.freeze({
  animate: { transition: { staggerChildren: 0.15, delayChildren: 0.6 } },
});

export const HERO_RIGHT_STAGGER = Object.freeze({
  animate: { transition: { staggerChildren: 0.15, delayChildren: 0.9 } },
});

export const SCROLL_CUE_DELAY_S = 1.2;
export const FADE_DURATION_S = 0.8;
export const COUNTER_SLIDE_PX = 14;
export const COUNTER_DURATION_S = 0.35;
