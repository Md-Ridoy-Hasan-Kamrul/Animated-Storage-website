/** Named tokens for Prompt archive landing (avoid magic numbers at call sites). */

export const BREAKPOINT_TABLET = 640;
export const BREAKPOINT_DESKTOP = 1024;

/** Caption / design: ±50px from center (half-width of the dead zone). */
export const DEAD_ZONE_HALF_PX = 50;
/** Fallback floor for very narrow viewports (SECTION 1G). */
export const DEAD_ZONE_MIN_PX = 30;
export const DEAD_ZONE_WIDTH_RATIO = 0.05;

export const CARD_ENTER_VIEWPORT_RATIO = 0.6;
export const CARD_EXIT_VIEWPORT_RATIO = 0.4;

export const SYMBOL_THROTTLE_MS = 80;

export const MOTION_EASE = [0.25, 0.1, 0.25, 1];

export const PAGE_BG_WHITE = '#ffffff';
export const PAGE_BG_BLACK = '#000000';

export const DETAIL_FALLBACK = '/templates/prompt';

export const OUTRO_OFFSET_DESKTOP = 166;
export const OUTRO_OFFSET_MOBILE = 132;

/** Hero video failsafe — show stage even if one stream is slow */
export const VIDEO_READY_FAILSAFE_MS = 2000;
