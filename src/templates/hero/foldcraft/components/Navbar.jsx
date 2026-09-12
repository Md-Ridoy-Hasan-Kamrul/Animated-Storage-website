import React, { memo } from 'react';
import { BRAND_NAME, NAV_LINKS, TALK_LABEL } from '../constants';
import MenuToggle from './MenuToggle';

const Navbar = memo(({ isOpen, onToggle, onNavigate, onTalk }) => (
  <header className="relative z-30 flex items-center justify-between px-4 py-4 min-[375px]:px-6 min-[375px]:py-5 md:px-12 lg:px-16">
    <div className="flex min-w-0 items-center gap-4 md:gap-8">
      <a
        href="#home"
        onClick={(event) => {
          event.preventDefault();
          onNavigate('#home');
        }}
        className="text-lg font-semibold tracking-tight text-white sm:text-xl"
      >
        {BRAND_NAME}
      </a>
      <nav className="hidden items-center gap-6 md:flex" aria-label="Primary">
        {NAV_LINKS.map((link) => (
          <a
            key={link.id}
            href={link.href}
            onClick={(event) => {
              event.preventDefault();
              onNavigate(link.href);
            }}
            className="text-sm text-white/80 transition-colors hover:text-white"
          >
            {link.label}
          </a>
        ))}
      </nav>
    </div>

    <button
      type="button"
      onClick={onTalk}
      className="hidden rounded-lg bg-white px-5 py-2 text-sm font-medium text-black transition-transform hover:scale-105 md:inline-flex"
    >
      {TALK_LABEL}
    </button>

    <MenuToggle isOpen={isOpen} onToggle={onToggle} />
  </header>
));

Navbar.displayName = 'Navbar';

export default Navbar;
