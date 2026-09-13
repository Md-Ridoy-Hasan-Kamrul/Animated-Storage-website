import React, { memo } from 'react';
import { CTA_HREF, CTA_LABEL } from '../constants';
import BrandMark from './BrandMark';
import HamburgerButton from './HamburgerButton';
import NavLinks from './NavLinks';

const DESKTOP_LINK =
  'text-white transition-opacity hover:opacity-60 focus-visible:outline-none focus-visible:opacity-60';

const Navbar = memo(({ isOpen, onToggle, onNavigate }) => (
  <header className="fixed inset-x-0 top-0 z-10 flex items-center justify-between px-5 py-4 sm:px-8 sm:py-5">
    <BrandMark />
    <nav className="hidden text-[23px] text-white md:flex" aria-label="Primary">
      <NavLinks
        onNavigate={onNavigate}
        showSeparators
        itemClassName={DESKTOP_LINK}
      />
    </nav>
    <div className="flex items-center">
      <a
        href={CTA_HREF}
        onClick={onNavigate}
        className={`hidden text-[23px] underline underline-offset-2 md:inline ${DESKTOP_LINK}`}
      >
        {CTA_LABEL}
      </a>
      <HamburgerButton isOpen={isOpen} onToggle={onToggle} />
    </div>
  </header>
));

Navbar.displayName = 'Navbar';

export default Navbar;
