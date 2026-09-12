import React from 'react';
import { X } from 'lucide-react';
import { MENU_ICON_SIZE, NAV_LINKS } from '../constants';
import { menuLinkDelayMs } from '../utils/menuStagger';
import GpLogo from './GpLogo';

const MobileMenu = ({ isOpen, onClose }) => (
  <div
    className={`fixed inset-0 z-50 flex flex-col bg-black/95 backdrop-blur-md transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
      isOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
    }`}
    aria-hidden={!isOpen}
  >
    <div className="flex items-center justify-between px-6 py-6">
      <GpLogo />
      <button
        type="button"
        className="p-2 transition-opacity hover:opacity-70"
        onClick={onClose}
        aria-label="Close menu"
      >
        <X size={MENU_ICON_SIZE} />
      </button>
    </div>

    <nav className="flex flex-1 flex-col items-center justify-center gap-8" aria-label="Mobile">
      {NAV_LINKS.map((link, index) => (
        <a
          key={link.label}
          href={link.href}
          onClick={onClose}
          className={`ar-menu-link text-2xl tracking-widest ${
            isOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
          }`}
          style={{ '--ar-delay': `${menuLinkDelayMs(index, isOpen)}ms` }}
        >
          {link.label}
        </a>
      ))}
    </nav>
  </div>
);

export default MobileMenu;
