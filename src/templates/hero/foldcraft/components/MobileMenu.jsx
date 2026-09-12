import React, { memo } from 'react';
import { NAV_LINKS, TALK_LABEL } from '../constants';

const MobileMenu = memo(({ isOpen, onNavigate, onTalk }) => (
  <div
    className={`absolute inset-x-0 top-0 z-20 overflow-hidden bg-black/98 backdrop-blur-xl duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
      isOpen ? 'h-screen opacity-100' : 'pointer-events-none h-0 opacity-0'
    }`}
  >
    <div
      className={`flex h-full flex-col justify-center px-8 transition duration-500 delay-100 ${
        isOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
      }`}
    >
      {NAV_LINKS.map((link) => (
        <a
          key={link.id}
          href={link.href}
          onClick={(event) => {
            event.preventDefault();
            onNavigate(link.href);
          }}
          className="py-1.5 text-3xl font-medium text-white/90 transition-colors hover:text-white"
        >
          {link.label}
        </a>
      ))}
      <button
        type="button"
        onClick={onTalk}
        className="mt-6 w-fit rounded-full bg-white px-8 py-3.5 text-base font-medium text-black transition-transform hover:scale-105"
      >
        {TALK_LABEL}
      </button>
    </div>
  </div>
));

MobileMenu.displayName = 'MobileMenu';

export default MobileMenu;
