import React from 'react';
import { Hexagon } from 'lucide-react';
import {
  BRAND_NAME,
  HEX_SIZE,
  HEX_STROKE,
  NAV_CTA_DELAY,
  NAV_CTA_LABEL,
  NAV_LINK_DELAY_START,
  NAV_LINK_DELAY_STEP,
  NAV_LINKS,
  NAV_LOGO_DELAY,
} from '../constants';
import { staggerDelay } from '../utils/delays';
import Reveal from './Reveal';

const Navbar = () => (
  <header
    className="fixed top-0 z-50 w-full border-b border-white/15"
    role="banner"
  >
    <div className="flex items-center justify-between px-5 py-3 sm:px-8 md:px-12">
      <Reveal delayMs={NAV_LOGO_DELAY}>
        <a href="#top" className="flex items-center gap-2 text-white">
          <Hexagon size={HEX_SIZE} strokeWidth={HEX_STROKE} aria-hidden="true" />
          <span className="text-lg font-medium tracking-tight sm:text-xl">{BRAND_NAME}</span>
        </a>
      </Reveal>

      <nav className="hidden items-center gap-8 md:flex lg:gap-10" aria-label="Primary">
        {NAV_LINKS.map((link, index) => (
          <Reveal
            key={link.id}
            delayMs={staggerDelay(NAV_LINK_DELAY_START, NAV_LINK_DELAY_STEP, index)}
          >
            <a
              href={link.href}
              className="text-sm text-white/85 transition-colors duration-300 hover:text-white"
            >
              {link.label}
              {link.badge ? (
                <sup className="font-mono text-[10px] text-white/60">{link.badge}</sup>
              ) : null}
            </a>
          </Reveal>
        ))}
      </nav>

      <Reveal delayMs={NAV_CTA_DELAY}>
        <a
          href="#contact"
          className="rounded-md border border-white/20 bg-white/15 px-4 py-2 text-xs backdrop-blur-md transition-colors duration-300 hover:bg-white/25 sm:px-5 sm:text-sm"
        >
          {NAV_CTA_LABEL}
        </a>
      </Reveal>
    </div>
  </header>
);

export default Navbar;
