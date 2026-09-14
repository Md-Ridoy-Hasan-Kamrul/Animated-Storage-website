import React, { memo } from 'react';
import ContactButton from './ContactButton';
import Hamburger from './Hamburger';
import Logo from './Logo';
import NavLinks from './NavLinks';

const Navbar = memo(({ menuOpen, onToggle }) => (
  <nav className="sp-nav">
    <Logo />
    <NavLinks className="sp-nav-links" />
    <div className="sp-nav-end">
      <ContactButton />
      <Hamburger menuOpen={menuOpen} onToggle={onToggle} />
    </div>
  </nav>
));

Navbar.displayName = 'Navbar';

export default Navbar;
