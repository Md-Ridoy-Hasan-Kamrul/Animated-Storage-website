import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { FADE_DURATION_S, FADE_UP, ICON_ARROW, NAV_ITEMS } from '../constants';
import NhmLogo from './NhmLogo';

const fadeUpSlow = {
  ...FADE_UP,
  transition: { duration: FADE_DURATION_S, ease: 'easeOut' },
};

const HeroHeader = ({ isMenuOpen, onToggleMenu }) => (
  <motion.header
    className="relative z-20 px-6 pt-6 md:px-16"
    initial="initial"
    animate="animate"
    variants={{
      animate: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
    }}
  >
    <NhmLogo />

    <motion.div
      className="nm-mono mt-8 flex items-start justify-between text-[10px] uppercase tracking-[0.2em] md:text-[11px]"
      variants={fadeUpSlow}
    >
      <div className="w-[15%] text-gray-800">
        <p>Natura</p>
        <p>History</p>
        <p>Museum</p>
      </div>

      <div className="hidden w-[5%] justify-center pt-1 text-gray-400 md:flex">
        <ArrowRight size={ICON_ARROW} strokeWidth={1} />
      </div>

      <p className="flex-1 leading-relaxed text-gray-800 md:w-[30%] md:flex-none">
        <span className="md:hidden">
          Exploring the story of life
          <br />
          on earth through science,
          <br />
          discovery and
          <br />
          wonder.
        </span>
        <span className="hidden md:inline">
          Exploring the story of life on earth
          <br />
          through science, discovery
          <br />
          and wonder.
        </span>
      </p>

      <div className="hidden w-[5%] justify-center pt-1 text-gray-400 md:flex">
        <ArrowRight size={ICON_ARROW} strokeWidth={1} />
      </div>

      <ul className="hidden w-[15%] space-y-1 text-gray-800 md:block">
        {NAV_ITEMS.map((link) => (
          <li key={link.label}>
            <a href={link.href} className="hover:text-black hover:underline">
              {link.label}
            </a>
          </li>
        ))}
      </ul>

      <button
        type="button"
        className="group relative z-[60] ml-4 flex flex-col gap-[6px] md:ml-6"
        onClick={onToggleMenu}
        aria-expanded={isMenuOpen}
        aria-label="Toggle menu"
      >
        <span
          className={`h-[1.5px] bg-black transition-all duration-300 ${
            isMenuOpen ? 'w-8 translate-y-[3.75px] rotate-45' : 'w-8 group-hover:w-6'
          }`}
        />
        <span
          className={`h-[1.5px] bg-black transition-all duration-300 ${
            isMenuOpen ? 'w-8 -translate-y-[3.75px] -rotate-45' : 'w-8 group-hover:w-10'
          }`}
        />
      </button>
    </motion.div>

    <AnimatePresence>
      {isMenuOpen ? (
        <motion.nav
          className="absolute left-0 right-0 top-full z-50 border-b border-gray-200 bg-[#fcfcfc] px-6 py-8 shadow-xl md:hidden"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
        >
          <ul className="nm-mono space-y-6 text-sm uppercase tracking-[0.2em]">
            {NAV_ITEMS.map((link) => (
              <li key={link.label}>
                <a href={link.href} onClick={onToggleMenu}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </motion.nav>
      ) : null}
    </AnimatePresence>
  </motion.header>
);

export default HeroHeader;
