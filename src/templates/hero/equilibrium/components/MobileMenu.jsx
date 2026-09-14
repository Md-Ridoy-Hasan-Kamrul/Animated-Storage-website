import React, { memo } from 'react';
import {
  MOBILE_BEGIN_CLASS,
  BEGIN_LABEL,
  MOBILE_CTA_ROW_CLASS,
  MOBILE_LOGIN_CLASS,
  LOGIN_LABEL,
  MOBILE_MENU_CLASS,
  NAV_LINKS,
} from '../constants';
import NavItem from './NavItem';

const MobileMenu = memo(({ menuOpen }) => {
  if (!menuOpen) return null;

  return (
    <div className={MOBILE_MENU_CLASS}>
      {NAV_LINKS.map((item) => (
        <NavItem key={item.label} item={item} variant="mobile" />
      ))}
      <div className={MOBILE_CTA_ROW_CLASS}>
        <button type="button" className={MOBILE_LOGIN_CLASS}>
          {LOGIN_LABEL}
        </button>
        <button type="button" className={MOBILE_BEGIN_CLASS}>
          {BEGIN_LABEL}
        </button>
      </div>
    </div>
  );
});

MobileMenu.displayName = 'MobileMenu';

export default MobileMenu;
