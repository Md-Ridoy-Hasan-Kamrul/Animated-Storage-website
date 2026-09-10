/** Viewport breakpoints required for Kmotion shell responsiveness */
export const LAYOUT_BREAKPOINTS = Object.freeze({
  MOBILE_S: 320,
  MOBILE_M: 375,
  MOBILE_L: 425,
  TABLET: 768,
  LAPTOP: 1020,
});

/** Per-tier layout tokens — no magic numbers in components */
export const LAYOUT_METRICS = Object.freeze({
  mobileS: Object.freeze({
    logoHeight: 32,
    headerHeight: 56,
    contentPaddingX: 16,
    showDesktopNav: false,
    showCtaInHeader: false,
  }),
  mobileM: Object.freeze({
    logoHeight: 36,
    headerHeight: 60,
    contentPaddingX: 16,
    showDesktopNav: false,
    showCtaInHeader: false,
  }),
  mobileL: Object.freeze({
    logoHeight: 40,
    headerHeight: 64,
    contentPaddingX: 16,
    showDesktopNav: false,
    showCtaInHeader: false,
  }),
  tablet: Object.freeze({
    logoHeight: 48,
    headerHeight: 72,
    contentPaddingX: 24,
    showDesktopNav: false,
    showCtaInHeader: true,
  }),
  laptop: Object.freeze({
    logoHeight: 56,
    headerHeight: 80,
    contentPaddingX: 32,
    showDesktopNav: true,
    showCtaInHeader: true,
  }),
  desktop: Object.freeze({
    logoHeight: 64,
    headerHeight: 88,
    contentPaddingX: 32,
    showDesktopNav: true,
    showCtaInHeader: true,
  }),
});

export const resolveLayoutTier = (viewportWidth) => {
  if (viewportWidth <= LAYOUT_BREAKPOINTS.MOBILE_S) return 'mobileS';
  if (viewportWidth <= LAYOUT_BREAKPOINTS.MOBILE_M) return 'mobileM';
  if (viewportWidth <= LAYOUT_BREAKPOINTS.MOBILE_L) return 'mobileL';
  if (viewportWidth <= LAYOUT_BREAKPOINTS.TABLET) return 'tablet';
  if (viewportWidth <= LAYOUT_BREAKPOINTS.LAPTOP) return 'laptop';
  return 'desktop';
};
