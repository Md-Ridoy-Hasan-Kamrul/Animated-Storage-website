import React, { memo } from 'react';
import {
  BEGIN_CLASS,
  BEGIN_LABEL,
  CTA_ROW_CLASS,
  LOGIN_CLASS,
  LOGIN_LABEL,
  NAV_CLASS,
  NAV_LINKS,
  NAV_PILL_CLASS,
} from '../constants';
import Logo from './Logo';
import MenuToggle from './MenuToggle';
import NavItem from './NavItem';

const Navbar = memo(({ menuOpen, onToggle }) => (
  <nav className={NAV_CLASS}>
    <Logo />
    <div className={NAV_PILL_CLASS}>
      {NAV_LINKS.map((item) => (
        <NavItem key={item.label} item={item} />
      ))}
    </div>
    <div className={CTA_ROW_CLASS}>
      <button type="button" className={LOGIN_CLASS}>
        {LOGIN_LABEL}
      </button>
      <button type="button" className={BEGIN_CLASS}>
        {BEGIN_LABEL}
      </button>
    </div>
    <MenuToggle menuOpen={menuOpen} onToggle={onToggle} />
  </nav>
));

Navbar.displayName = 'Navbar';

export default Navbar;
