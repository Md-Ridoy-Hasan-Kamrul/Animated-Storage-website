import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import HeroVideo from '../components/HeroVideo';
import MobileMenu from '../components/MobileMenu';
import Navbar from '../components/Navbar';
import { useMobileMenu } from '../hooks/useMobileMenu';
import { usePageChrome } from '../hooks/usePageChrome';
import {
  ACCOUNT_LABEL,
  BADGE_LABEL,
  CLOSE_MENU_LABEL,
  CTA_LABEL,
  HEADLINE_LINE_ONE,
  HEADLINE_LINE_TWO,
  NAV_LINKS,
  OPEN_MENU_LABEL,
  PAGE_HTML_CLASS,
  PAGE_TITLE,
  STATS,
  SUBTITLE,
} from '../constants';
import { HERO_VIDEO } from '../content';
import HeroCopy from '../components/HeroCopy';
import BottomStats from '../components/BottomStats';

const ChromeHarness = () => {
  const { menuOpen, toggleMenu, closeMenu } = useMobileMenu();
  return (
    <>
      <Navbar menuOpen={menuOpen} onToggle={toggleMenu} />
      <MobileMenu menuOpen={menuOpen} onNavigate={closeMenu} />
    </>
  );
};

const ChromeHost = () => {
  usePageChrome();
  return null;
};

describe('Mind-Body Healing chrome', () => {
  beforeAll(() => {
    Object.defineProperty(window.HTMLMediaElement.prototype, 'play', {
      configurable: true,
      writable: true,
      value: jest.fn().mockResolvedValue(undefined),
    });
    Object.defineProperty(window.HTMLMediaElement.prototype, 'pause', {
      configurable: true,
      writable: true,
      value: jest.fn(),
    });
  });

  it('renders nav links, account, and hamburger', () => {
    render(<ChromeHarness />);
    NAV_LINKS.forEach((link) => {
      expect(screen.getAllByText(link.label).length).toBeGreaterThan(0);
    });
    expect(screen.getAllByText(ACCOUNT_LABEL).length).toBeGreaterThan(0);
    expect(screen.getByRole('button', { name: OPEN_MENU_LABEL })).toBeInTheDocument();
  });

  it('swaps the menu icon when opened', () => {
    render(<ChromeHarness />);
    fireEvent.click(screen.getByRole('button', { name: OPEN_MENU_LABEL }));
    expect(screen.getByRole('button', { name: CLOSE_MENU_LABEL })).toBeInTheDocument();
  });

  it('renders the badge, headline, CTA, and stats', () => {
    render(
      <>
        <HeroCopy />
        <BottomStats />
      </>,
    );
    expect(screen.getByText(BADGE_LABEL)).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: `${HEADLINE_LINE_ONE} ${HEADLINE_LINE_TWO}` }),
    ).toBeInTheDocument();
    expect(screen.getByText(SUBTITLE)).toBeInTheDocument();
    expect(screen.getByText(CTA_LABEL)).toBeInTheDocument();
    expect(screen.getByText(STATS[0].value)).toBeInTheDocument();
    expect(screen.getByText(STATS[1].label)).toBeInTheDocument();
  });

  it('keeps the CloudFront film looping', () => {
    const { container } = render(<HeroVideo />);
    expect(container.querySelector('source')).toHaveAttribute('src', HERO_VIDEO);
    expect(container.querySelector('video')).toHaveAttribute('autoplay');
    expect(container.querySelector('video')).toHaveAttribute('loop');
  });

  it('paints page chrome and restores it on unmount', () => {
    document.title = 'Kmotion';
    const { unmount } = render(<ChromeHost />);
    expect(document.title).toBe(PAGE_TITLE);
    expect(document.documentElement.classList.contains(PAGE_HTML_CLASS)).toBe(true);
    unmount();
    expect(document.documentElement.classList.contains(PAGE_HTML_CLASS)).toBe(false);
    expect(document.title).toBe('Kmotion');
  });
});
