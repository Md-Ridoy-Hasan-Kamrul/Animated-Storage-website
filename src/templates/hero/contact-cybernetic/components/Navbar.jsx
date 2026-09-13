import React from 'react';
import { BRAND_ASTERISK, BRAND_NAME, CTA_LABEL, NAV_LINKS } from '../constants';
import { hamburgerBarClass } from '../utils/hamburgerBars';

const Navbar = ({ isMobileMenuOpen, onToggle }) => (
  <header className="fixed top-0 inset-x-0 z-10 px-5 sm:px-8 py-4 sm:py-5 flex flex-row justify-between items-center bg-transparent">
    <div className="flex flex-row items-center gap-3">
      <span className="text-[21px] sm:text-[26px] tracking-tight text-black font-medium select-none">
        {BRAND_NAME}
      </span>
      <span className="text-[25px] sm:text-[30px] text-black select-none tracking-[-0.02em] font-medium leading-none mb-1">
        {BRAND_ASTERISK}
      </span>
    </div>

    <nav className="hidden md:flex flex-row text-[23px] text-black" aria-label="Primary">
      {NAV_LINKS.map((label, index) => (
        <span key={label} className="flex flex-row">
          {index > 0 ? <span className="opacity-40">,&nbsp;</span> : null}
          <a href={`#${label.toLowerCase()}`} className="hover:opacity-60 transition-opacity">
            {label}
          </a>
        </span>
      ))}
    </nav>

    <a
      href="#contact"
      className="hidden md:inline text-[23px] text-black underline underline-offset-2 hover:opacity-60 transition-opacity"
    >
      {CTA_LABEL}
    </a>

    <button
      type="button"
      className="md:hidden flex flex-col justify-center gap-[5px]"
      aria-label="Menu"
      aria-expanded={isMobileMenuOpen}
      onClick={onToggle}
    >
      <span className={hamburgerBarClass(isMobileMenuOpen, 'top')} />
      <span className={hamburgerBarClass(isMobileMenuOpen, 'mid')} />
      <span className={hamburgerBarClass(isMobileMenuOpen, 'bottom')} />
    </button>
  </header>
);

export default Navbar;
