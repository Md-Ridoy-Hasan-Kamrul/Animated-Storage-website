import React from 'react';
import { scrollToSection } from '../utils/scrollToSection';

export const ContactButton = ({ className = '', label = 'Contact Me', onClick }) => (
  <button
    type="button"
    onClick={onClick || (() => scrollToSection('contact'))}
    className={`rounded-full px-8 py-3 text-xs font-medium uppercase tracking-widest text-white outline outline-2 outline-white outline-offset-[-3px] transition-transform hover:scale-[1.02] sm:px-10 sm:py-3.5 sm:text-sm md:px-12 md:py-4 md:text-base ${className}`}
    style={{
      background: 'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
      boxShadow: '0px 4px 4px rgba(181, 1, 167, 0.25), 4px 4px 12px #7721B1 inset',
    }}
  >
    {label}
  </button>
);

export const LiveProjectButton = ({ className = '', label = 'Live Project' }) => (
  <button
    type="button"
    className={`rounded-full border-2 border-[#D7E2EA] px-8 py-3 text-sm font-medium uppercase tracking-widest text-[#D7E2EA] transition-colors hover:bg-[#D7E2EA]/10 sm:px-10 sm:py-3.5 sm:text-base ${className}`}
  >
    {label}
  </button>
);
