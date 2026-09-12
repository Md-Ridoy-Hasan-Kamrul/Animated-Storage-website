import React, { memo } from 'react';
import { BRAND_NAME, LOGO_MARK, NAV_LINKS } from '../constants';
import LiquidGlassButton from './LiquidGlassButton';

const NavBar = memo(({ isStandalone = false, onBeginJourney }) => (
  <header
    className={`relative z-10 mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-4 min-[375px]:px-6 min-[375px]:py-5 md:px-8 md:py-6 ${
      isStandalone ? 'pl-16 min-[375px]:pl-20 md:pl-24' : ''
    }`}
  >
    <a
      href="#home"
      className="velorah-display text-2xl tracking-tight text-foreground min-[375px]:text-[1.7rem] md:text-3xl"
    >
      {BRAND_NAME}
      <sup className="text-xs">{LOGO_MARK}</sup>
    </a>

    <nav className="hidden items-center gap-6 md:flex" aria-label="Primary">
      {NAV_LINKS.map((link) => (
        <a
          key={link.id}
          href={link.href}
          className={
            link.active
              ? 'text-sm text-foreground'
              : 'text-sm text-muted-foreground transition-colors hover:text-foreground'
          }
        >
          {link.label}
        </a>
      ))}
    </nav>

    <LiquidGlassButton variant="nav" onClick={onBeginJourney} />
  </header>
));

NavBar.displayName = 'NavBar';

export default NavBar;
