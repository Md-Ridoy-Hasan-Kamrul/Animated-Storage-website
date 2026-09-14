import React, { memo } from 'react';
import { ChevronDown } from 'lucide-react';
import { CHEVRON_CLASS, CHEVRON_SIZE, MOBILE_NAV_ITEM_CLASS } from '../constants';
import { hasDropdown, navButtonClass } from '../utils/navItems';

const NavItem = memo(({ item, variant = 'desktop' }) => {
  const className = variant === 'mobile' ? MOBILE_NAV_ITEM_CLASS : navButtonClass(item);

  return (
    <button type="button" className={className}>
      <span>{item.label}</span>
      {hasDropdown(item) ? <ChevronDown size={CHEVRON_SIZE} className={CHEVRON_CLASS} /> : null}
    </button>
  );
});

NavItem.displayName = 'NavItem';

export default NavItem;
