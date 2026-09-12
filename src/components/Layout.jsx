import React, { memo, useState, useCallback, useEffect, useRef } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Search, Menu, X } from 'lucide-react';
import { ROUTES } from '../config';
import { KmotionLogoLink } from './KmotionLogo';
import { useResponsiveLayout } from '../hooks/useResponsiveLayout';

const NAV_LINKS = [
  { label: 'MCP', badge: 'NEW', href: '#' },
  { label: 'Lovable Templates', href: '#' },
  { label: 'Animated Backgrounds', href: '#' },
  { label: 'Academy', href: '#' },
  { label: 'Contact', href: ROUTES.CONTACT },
];

const Layout = memo(() => {
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef(null);
  const closeMenu = useCallback(() => setMenuOpen(false), []);
  const {
    logoHeight,
    headerHeight,
    contentPaddingX,
    showDesktopNav,
    showCtaInHeader,
  } = useResponsiveLayout();

  const [stickyHeaderPx, setStickyHeaderPx] = useState(headerHeight);

  useEffect(() => {
    setStickyHeaderPx(headerHeight);
  }, [headerHeight]);

  // Measure real sticky header (incl. open mobile menu) so FilterBar top offset stays correct
  useEffect(() => {
    const el = headerRef.current;
    if (!el || typeof ResizeObserver === 'undefined') return undefined;

    const apply = () => {
      const next = Math.ceil(el.getBoundingClientRect().height);
      if (next > 0) setStickyHeaderPx(next);
    };

    apply();
    const ro = new ResizeObserver(apply);
    ro.observe(el);
    return () => ro.disconnect();
  }, [menuOpen, showDesktopNav, headerHeight, logoHeight]);

  const toggleMenu = useCallback(() => setMenuOpen((v) => !v), []);

  return (
    <div
      data-layout-shell
      className="min-h-screen bg-black font-sans text-white antialiased"
      style={{
        '--kmotion-header-height': `${stickyHeaderPx}px`,
        '--kmotion-content-px': `${contentPaddingX}px`,
      }}
    >
      <header
        ref={headerRef}
        className="sticky top-0 z-50 border-b border-white/[0.06] bg-black/90 backdrop-blur-md"
      >
        <div
          className="mx-auto flex max-w-[1600px] items-center justify-between gap-2 sm:gap-4"
          style={{
            height: headerHeight,
            paddingLeft: contentPaddingX,
            paddingRight: contentPaddingX,
          }}
        >
          <div className="flex min-w-0 flex-1 items-center gap-4 lg:gap-8">
            <KmotionLogoLink onClick={closeMenu} height={logoHeight} />

            {showDesktopNav ? (
              <nav className="flex min-w-0 items-center gap-4 xl:gap-6" aria-label="Primary">
                {NAV_LINKS.map(({ label, badge, href }) => (
                  <Link
                    key={label}
                    to={href}
                    className="group inline-flex cursor-pointer items-center gap-1.5 whitespace-nowrap text-[12px] font-medium text-zinc-400 transition-all duration-200 hover:text-white hover:underline hover:underline-offset-4 xl:text-[13px]"
                  >
                    {label}
                    {badge ? (
                      <span className="rounded-[4px] bg-emerald-500/15 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-emerald-400">
                        {badge}
                      </span>
                    ) : null}
                  </Link>
                ))}
              </nav>
            ) : null}
          </div>

          <div className="flex shrink-0 items-center gap-1.5 sm:gap-3">
            <button
              type="button"
              aria-label="Search"
              className="cursor-pointer rounded-full p-2 text-zinc-400 transition-colors hover:bg-white/5 hover:text-white"
            >
              <Search size={18} strokeWidth={1.75} />
            </button>

            {showCtaInHeader ? (
              <button
                type="button"
                className="hidden cursor-pointer rounded-full bg-white px-3 py-1.5 text-[12px] font-semibold text-black transition-transform hover:scale-[1.02] active:scale-[0.98] sm:inline-flex md:px-4 md:text-[13px]"
              >
                Get for free
              </button>
            ) : null}

            <button
              type="button"
              aria-label="Account"
              className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-[#1e3a5f] text-[11px] font-semibold tracking-wide text-white"
            >
              MD
            </button>

            {!showDesktopNav ? (
              <button
                type="button"
                onClick={toggleMenu}
                aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={menuOpen}
                className="cursor-pointer rounded-full p-2 text-zinc-400 hover:bg-white/5 hover:text-white"
              >
                {menuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            ) : null}
          </div>
        </div>

        {menuOpen && !showDesktopNav ? (
          <div
            className="border-t border-white/[0.06] py-3"
            style={{ paddingLeft: contentPaddingX, paddingRight: contentPaddingX }}
          >
            <nav className="flex flex-col gap-1" aria-label="Mobile">
              {NAV_LINKS.map(({ label, badge, href }) => (
                <Link
                  key={label}
                  to={href}
                  onClick={closeMenu}
                  className="flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2.5 text-sm text-zinc-300 transition-colors duration-200 hover:bg-white/10 hover:text-white"
                >
                  {label}
                  {badge ? (
                    <span className="rounded bg-emerald-500/15 px-1.5 py-0.5 text-[10px] font-semibold text-emerald-400">
                      {badge}
                    </span>
                  ) : null}
                </Link>
              ))}
              <button
                type="button"
                className="mt-2 cursor-pointer rounded-full bg-white px-4 py-2.5 text-sm font-semibold text-black"
              >
                Get for free
              </button>
            </nav>
          </div>
        ) : null}
      </header>

      <main>
        <Outlet />
      </main>
    </div>
  );
});

Layout.displayName = 'Layout';

export default Layout;
