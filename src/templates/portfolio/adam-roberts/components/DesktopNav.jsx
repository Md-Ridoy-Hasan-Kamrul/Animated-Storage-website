import React from 'react';
import { NAV_LINKS } from '../constants';

const DesktopNav = () => (
  <nav className="hidden items-center gap-8 text-sm tracking-wide md:flex" aria-label="Primary">
    {NAV_LINKS.map((link) => (
      <a
        key={link.label}
        href={link.href}
        className="transition-opacity hover:opacity-70"
      >
        {link.label}
      </a>
    ))}
  </nav>
);

export default DesktopNav;
