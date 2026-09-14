import React, { memo } from 'react';
import NavLinks from './NavLinks';

const MobileMenu = memo(({ menuOpen, onNavigate }) => {
  if (!menuOpen) return null;
  return <NavLinks className="sp-mobile-menu" onNavigate={onNavigate} />;
});

MobileMenu.displayName = 'MobileMenu';

export default MobileMenu;
