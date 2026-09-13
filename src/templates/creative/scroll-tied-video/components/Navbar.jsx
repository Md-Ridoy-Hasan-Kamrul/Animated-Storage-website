import React, { memo } from 'react';
import { Info } from 'lucide-react';
import {
  CIRCLE_INFO,
  DARK,
  ICON_INFO,
  LIGHT,
  MENU_LABEL,
  NAV_LINKS,
  NAV_RIGHT_DELAY_MS,
  NEWS_LABEL,
} from '../constants';
import { navLinkDelayMs } from '../utils/navEntrance';
import Enter from './Enter';
import HamburgerButton from './HamburgerButton';

const LINK_CLASS =
  'relative text-xs font-medium uppercase tracking-[0.15em] transition-opacity hover:opacity-70';

const Navbar = memo(({ isLight, entered, onOpen }) => {
  const color = isLight ? DARK : LIGHT;

  return (
    <header
      className="pointer-events-auto absolute inset-x-0 top-0 z-50 flex items-center justify-between px-6 pb-6 pt-8 transition-colors duration-500 sm:px-8 sm:pt-12 md:px-12"
      style={{ color }}
    >
      <div className="flex items-center">
        <HamburgerButton isLight={isLight} onOpen={onOpen} />
        <nav className="hidden items-center gap-8 lg:flex xl:gap-10" aria-label="Primary">
          {NAV_LINKS.map((link, index) => (
            <Enter key={link.href} show={entered} delayMs={navLinkDelayMs(index)}>
              <a href={link.href} className={`${LINK_CLASS} text-current`}>
                {link.label}
                {link.active ? (
                  <span
                    className="absolute -bottom-3 left-0 h-[2px] w-full"
                    style={{ backgroundColor: color }}
                  />
                ) : null}
              </a>
            </Enter>
          ))}
        </nav>
      </div>

      <div className="hidden items-center gap-8 text-current sm:flex">
        <Enter show={entered} delayMs={NAV_RIGHT_DELAY_MS}>
          <div className="flex items-center gap-3">
            <span className="text-xs font-medium uppercase tracking-[0.2em]">{NEWS_LABEL}</span>
            <span
              className="inline-flex items-center justify-center rounded-full"
              style={{
                width: CIRCLE_INFO,
                height: CIRCLE_INFO,
                backgroundColor: color,
              }}
            >
              <Info size={ICON_INFO} color={isLight ? LIGHT : DARK} />
            </span>
          </div>
        </Enter>
        <Enter show={entered} delayMs={NAV_RIGHT_DELAY_MS}>
          <span className="hidden text-xs font-medium uppercase tracking-[0.2em] lg:inline">
            {MENU_LABEL}
          </span>
          <button
            type="button"
            onClick={onOpen}
            className="text-xs font-medium uppercase tracking-[0.2em] lg:hidden"
          >
            {MENU_LABEL}
          </button>
        </Enter>
      </div>
    </header>
  );
});

Navbar.displayName = 'Navbar';

export default Navbar;
