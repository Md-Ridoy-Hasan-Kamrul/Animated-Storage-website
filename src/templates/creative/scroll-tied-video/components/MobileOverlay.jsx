import React, { memo } from 'react';
import { X } from 'lucide-react';
import {
  CIRCLE_MD,
  CONTACT_LABEL,
  DARK,
  ICON_CLOSE,
  MENU_ITEM_STAGGER_MS,
  NAV_LINKS,
  NEWS_LABEL,
} from '../constants';
import { menuItemDelayMs } from '../utils/navEntrance';

const MobileOverlay = memo(({ isOpen, onClose }) => (
  <div
    role="dialog"
    aria-label="Menu"
    aria-modal="true"
    className={`vectrus-overlay pointer-events-auto fixed inset-0 z-[100] ${
      isOpen ? 'visible opacity-100' : 'invisible opacity-0'
    }`}
    style={{ backgroundColor: DARK }}
  >
    <div
      className={`vectrus-overlay-panel flex h-full flex-col ${
        isOpen ? 'translate-y-0' : '-translate-y-8'
      }`}
    >
      <div className="flex justify-end px-6 pt-8 sm:px-8 sm:pt-12">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close menu"
          className="inline-flex items-center justify-center rounded-full border border-white/30 hover:border-white"
          style={{ width: CIRCLE_MD, height: CIRCLE_MD }}
        >
          <X size={ICON_CLOSE} color="#ffffff" />
        </button>
      </div>

      <nav className="flex flex-1 flex-col justify-center px-8 sm:px-12" aria-label="Mobile">
        {NAV_LINKS.map((link, index) => (
          <a
            key={link.href}
            href={link.href}
            onClick={onClose}
            className={`vectrus-stagger py-3 text-2xl font-light uppercase tracking-wide sm:text-3xl ${
              isOpen ? 'is-in' : ''
            } ${link.active ? 'text-white' : 'text-white/60 hover:text-white'}`}
            style={{ '--stagger-delay': `${menuItemDelayMs(index, MENU_ITEM_STAGGER_MS)}ms` }}
          >
            {link.label}
          </a>
        ))}
      </nav>

      <div className="flex gap-8 px-8 pb-10 text-xs font-medium uppercase tracking-[0.2em] text-white/60 sm:px-12">
        <span>{NEWS_LABEL}</span>
        <span>{CONTACT_LABEL}</span>
      </div>
    </div>
  </div>
));

MobileOverlay.displayName = 'MobileOverlay';

export default MobileOverlay;
