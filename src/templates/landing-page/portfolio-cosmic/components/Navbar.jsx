import React, { useCallback, useEffect, useState } from 'react';
import { CONTACT_EMAIL, NAV_LINKS } from '../constants';
import { useNavScrollShadow } from '../hooks/useNavScrollShadow';
import { smoothScrollToId } from '../utils/smoothScrollTo';
import AccentButton from './AccentButton';

const Navbar = ({ activeId = 'home' }) => {
  const elevated = useNavScrollShadow();
  const [active, setActive] = useState(activeId);

  const scrollToSection = useCallback((event, link) => {
    event.preventDefault();
    setActive(link.id);
    smoothScrollToId(link.id);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const mid = window.scrollY + window.innerHeight * 0.28;
      let next = NAV_LINKS[0].id;
      NAV_LINKS.forEach((link) => {
        const el = document.getElementById(link.id);
        if (el && el.offsetTop <= mid) {
          next = link.id;
        }
      });
      setActive(next);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className="fixed left-0 right-0 top-0 z-50 flex justify-center px-4 pt-4 md:pt-6">
      <nav
        className={`pc-surface inline-flex items-center rounded-full border border-white/10 px-2 py-2 backdrop-blur-md ${
          elevated ? 'shadow-md shadow-black/10' : ''
        }`}
        aria-label="Primary"
      >
        <a
          href="#home"
          onClick={(event) => scrollToSection(event, NAV_LINKS[0])}
          className="group relative flex h-9 w-9 shrink-0 items-center justify-center transition-transform hover:scale-110"
          aria-label="Home"
        >
          <span className="pc-logo-ring absolute inset-0 rounded-full p-[1.5px]">
            <span className="pc-bg flex h-full w-full items-center justify-center rounded-full">
              <span className="pc-font-display pc-text text-[13px] italic">JA</span>
            </span>
          </span>
        </a>

        <span className="pc-stroke mx-1 hidden h-5 w-px sm:block" aria-hidden />

        <ul className="flex items-center">
          {NAV_LINKS.map((link) => {
            const isActive = active === link.id;
            return (
              <li key={link.id}>
                <a
                  href={link.href}
                  onClick={(event) => scrollToSection(event, link)}
                  className={`rounded-full px-3 py-1.5 text-xs transition-colors sm:px-4 sm:py-2 sm:text-sm ${
                    isActive
                      ? 'bg-[hsl(var(--stroke)/0.5)] text-[hsl(var(--text))]'
                      : 'pc-muted hover:bg-[hsl(var(--stroke)/0.5)] hover:text-[hsl(var(--text))]'
                  }`}
                >
                  {link.label}
                </a>
              </li>
            );
          })}
        </ul>

        <span className="pc-stroke mx-1 hidden h-5 w-px sm:block" aria-hidden />

        <AccentButton
          href={`mailto:${CONTACT_EMAIL}`}
          variant="ghost"
          className="text-xs sm:text-sm"
        >
          Say hi <span aria-hidden>↗</span>
        </AccentButton>
      </nav>
    </header>
  );
};

export default Navbar;
