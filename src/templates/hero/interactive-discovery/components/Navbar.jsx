import React from 'react';
import { Menu, X } from 'lucide-react';
import { MENU_ICON_SIZE, NAV_LINKS, SIGN_UP_LABEL } from '../constants';
import LithosMark from './LithosMark';

const linkClass = (active) =>
  active
    ? 'rounded-full px-4 py-1.5 text-sm font-medium text-white transition-colors'
    : 'rounded-full px-4 py-1.5 text-sm font-medium text-white/80 transition-colors hover:bg-white/20 hover:text-white';

const Navbar = ({ isOpen, onToggle, onNavigate }) => (
  <nav className="fixed left-0 right-0 top-0 z-[100] flex items-center justify-between p-4 sm:p-5">
    <LithosMark />

    <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 rounded-full border border-white/30 bg-white/20 px-2 py-2 backdrop-blur-md md:flex">
      {NAV_LINKS.map((link) => (
        <button
          key={link.id}
          type="button"
          onClick={() => onNavigate(link.href)}
          className={linkClass(link.active)}
        >
          {link.label}
        </button>
      ))}
    </div>

    <button
      type="button"
      className="hidden rounded-full bg-white px-6 py-2.5 text-sm font-semibold text-gray-900 hover:bg-gray-100 md:block"
    >
      {SIGN_UP_LABEL}
    </button>

    <button
      type="button"
      onClick={onToggle}
      className="inline-flex items-center justify-center text-white md:hidden"
      aria-label={isOpen ? 'Close menu' : 'Open menu'}
      aria-expanded={isOpen}
    >
      {isOpen ? <X size={MENU_ICON_SIZE} /> : <Menu size={MENU_ICON_SIZE} />}
    </button>

    {isOpen ? (
      <div className="absolute left-4 right-4 top-full mt-2 flex flex-col gap-1 rounded-2xl border border-white/20 bg-black/70 p-3 backdrop-blur-md md:hidden">
        {NAV_LINKS.map((link) => (
          <button
            key={`mobile-${link.id}`}
            type="button"
            onClick={() => onNavigate(link.href)}
            className={`${linkClass(link.active)} text-left`}
          >
            {link.label}
          </button>
        ))}
        <button
          type="button"
          className="mt-1 rounded-full bg-white px-6 py-2.5 text-sm font-semibold text-gray-900"
        >
          {SIGN_UP_LABEL}
        </button>
      </div>
    ) : null}
  </nav>
);

export default Navbar;
