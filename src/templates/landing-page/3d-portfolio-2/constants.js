/** Design tokens for 3D Portfolio 2.0 (from prompt — named, no magic at call sites). */

export const PAGE_BG = '#0C0C0C';
export const TEXT_MUTED = '#D7E2EA';
export const PAGE_TITLE = 'Kamrul -- 3D Creator';

export const PROJECT_IMAGE_HEIGHTS = {
  leftTop: 'clamp(130px, 16vw, 230px)',
  leftBottom: 'clamp(160px, 22vw, 340px)',
};

export const MARQUEE_TILE = {
  width: 420,
  height: 270,
};

export const MARQUEE_SCROLL_FACTOR = 0.3;
export const MARQUEE_BASE_OFFSET = 200;

export const MAGNET_DEFAULTS = {
  padding: 150,
  strength: 3,
  activeTransition: 'transform 0.3s ease-out',
  inactiveTransition: 'transform 0.6s ease-in-out',
};

export const DETAIL_FALLBACK = '/templates/3d-portfolio-2';
