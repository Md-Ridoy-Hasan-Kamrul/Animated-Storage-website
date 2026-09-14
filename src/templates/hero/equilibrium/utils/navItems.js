import { NAV_ITEM_ACTIVE, NAV_ITEM_BASE, NAV_ITEM_IDLE } from '../constants';

export function isActiveNav(item) {
  return Boolean(item?.active);
}

export function hasDropdown(item) {
  return Boolean(item?.dropdown);
}

export function navButtonClass(item) {
  return `${NAV_ITEM_BASE} ${isActiveNav(item) ? NAV_ITEM_ACTIVE : NAV_ITEM_IDLE}`;
}
