import React from 'react';
import { CTA_LABEL, NAV_LINKS } from '../constants';

const MobileOverlay = ({ isMobileMenuOpen, onNavigate }) => (
  <div
    className={`md:hidden fixed inset-0 z-[9] bg-white/95 backdrop-blur-sm transition-opacity duration-300 ${
      isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
    }`}
  >
    <nav className="flex flex-col items-start gap-6 px-8 pt-28 text-[28px] text-black" aria-label="Mobile">
      {NAV_LINKS.map((label) => (
        <a key={label} href={`#${label.toLowerCase()}`} onClick={onNavigate}>
          {label}
        </a>
      ))}
      <a href="#contact" className="underline underline-offset-2" onClick={onNavigate}>
        {CTA_LABEL}
      </a>
    </nav>
  </div>
);

export default MobileOverlay;
