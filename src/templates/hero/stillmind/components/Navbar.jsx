import React, { memo } from 'react';
import { BRAND_NAME, CTA_LABEL, NAV_LINKS } from '../constants';
import MenuToggle from './MenuToggle';

const Navbar = memo(({ isOpen, onToggle, onNavigate, onCta }) => (
  <nav className="relative z-[2] flex items-center justify-between px-4 py-5 sm:px-6 sm:py-6 md:px-10">
    <a
      href="#hero"
      className="font-editorial text-xl italic text-white sm:text-2xl"
      onClick={(event) => {
        event.preventDefault();
        onNavigate('#hero');
      }}
    >
      {BRAND_NAME}
    </a>

    <div className="liquid-glass hidden items-center gap-1 rounded-full py-1.5 pl-5 pr-1.5 md:flex">
      {NAV_LINKS.map((link) => (
        <a
          key={link.id}
          href={link.href}
          onClick={(event) => {
            event.preventDefault();
            onNavigate(link.href);
          }}
          className="px-3 py-1.5 text-sm text-white/90 transition-colors hover:text-white"
          style={{ fontFamily: 'system-ui, sans-serif' }}
        >
          {link.label}
        </a>
      ))}
      <button
        type="button"
        onClick={onCta}
        className="rounded-full bg-white px-4 py-2 text-sm text-black transition-transform hover:scale-[1.03]"
        style={{ fontFamily: 'system-ui, sans-serif' }}
      >
        {CTA_LABEL}
      </button>
    </div>

    <MenuToggle isOpen={isOpen} onToggle={onToggle} />
  </nav>
));

Navbar.displayName = 'Navbar';

export default Navbar;
