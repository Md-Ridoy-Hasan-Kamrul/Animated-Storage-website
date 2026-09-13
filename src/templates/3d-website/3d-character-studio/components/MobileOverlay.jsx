import React, { memo } from 'react';
import { CTA_HREF, CTA_LABEL } from '../constants';
import NavLinks from './NavLinks';

const MobileOverlay = memo(({ isOpen, onNavigate }) => (
  <nav
    aria-label="Mobile"
    className={`fixed inset-0 z-[9] flex flex-col justify-center gap-8 bg-black/90 px-8 backdrop-blur-md transition-opacity duration-300 md:hidden ${
      isOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
    }`}
  >
    <NavLinks
      onNavigate={onNavigate}
      itemClassName="text-[32px] font-medium text-white"
    />
    <a
      href={CTA_HREF}
      onClick={onNavigate}
      className="w-fit text-[32px] font-medium text-white underline underline-offset-2"
    >
      {CTA_LABEL}
    </a>
  </nav>
));

MobileOverlay.displayName = 'MobileOverlay';

export default MobileOverlay;
