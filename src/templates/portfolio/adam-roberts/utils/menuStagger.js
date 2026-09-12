export const MENU_STAGGER_BASE_MS = 100;
export const MENU_STAGGER_STEP_MS = 60;

/**
 * Mobile-nav stagger: 100, 160, 220, 280, 340, 400ms when open.
 * Closed state uses 0ms so items hide together.
 */
export function menuLinkDelayMs(index, isOpen) {
  if (!isOpen) return 0;
  return MENU_STAGGER_BASE_MS + index * MENU_STAGGER_STEP_MS;
}
