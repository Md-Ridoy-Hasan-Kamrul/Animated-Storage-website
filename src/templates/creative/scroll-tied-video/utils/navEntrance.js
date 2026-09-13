import { NAV_LINK_BASE_DELAY_MS, NAV_LINK_STAGGER_MS } from '../constants';

export function navLinkDelayMs(index) {
  return index * NAV_LINK_STAGGER_MS + NAV_LINK_BASE_DELAY_MS;
}

export function menuItemDelayMs(index, stepMs) {
  return index * stepMs;
}
