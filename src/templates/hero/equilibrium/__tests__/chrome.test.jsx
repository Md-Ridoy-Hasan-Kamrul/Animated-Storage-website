import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import HeroVideo from '../components/HeroVideo';
import MobileMenu from '../components/MobileMenu';
import Navbar from '../components/Navbar';
import { useMobileMenu } from '../hooks/useMobileMenu';
import { usePageChrome } from '../hooks/usePageChrome';
import {
  BEGIN_LABEL,
  BRAND_NAME,
  CLOSE_MENU_LABEL,
  DISCOVER_LABEL,
  HEADLINE,
  LOGIN_LABEL,
  NAV_LINKS,
  OPEN_MENU_LABEL,
  PAGE_HTML_CLASS,
  PAGE_TITLE,
  START_LABEL,
  SUBTITLE,
} from '../constants';
import { HERO_VIDEO, HERO_VIDEO_LOCAL } from '../content';

const ChromeHarness = () => {
  const { menuOpen, toggleMenu } = useMobileMenu();
  return (
    <>
      <Navbar menuOpen={menuOpen} onToggle={toggleMenu} />
      <MobileMenu menuOpen={menuOpen} />
    </>
  );
};

const ChromeHost = () => {
  usePageChrome();
  return null;
};

describe('Equilibrium chrome', () => {
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

  it('renders the brand, desktop CTAs, and hamburger', () => {
    render(<ChromeHarness />);
    expect(screen.getByText(BRAND_NAME)).toBeInTheDocument();
    expect(screen.getAllByText(LOGIN_LABEL).length).toBeGreaterThan(0);
    expect(screen.getAllByText(BEGIN_LABEL).length).toBeGreaterThan(0);
    expect(screen.getByRole('button', { name: OPEN_MENU_LABEL })).toBeInTheDocument();
  });

  it('opens Home, Wellness, Routine, Our Team, and mobile CTAs', () => {
    render(<ChromeHarness />);
    fireEvent.click(screen.getByRole('button', { name: OPEN_MENU_LABEL }));
    expect(screen.getByRole('button', { name: CLOSE_MENU_LABEL })).toBeInTheDocument();
    NAV_LINKS.forEach((item) => {
      expect(screen.getAllByText(item.label).length).toBeGreaterThan(0);
    });
    expect(screen.getAllByText(LOGIN_LABEL).length).toBeGreaterThan(1);
    expect(screen.getAllByText(BEGIN_LABEL).length).toBeGreaterThan(1);
  });

  it('keeps the CloudFront film looping with a local fallback', () => {
    const { container } = render(<HeroVideo />);
    const sources = Array.from(container.querySelectorAll('source')).map((node) => node.getAttribute('src'));
    expect(sources).toContain(HERO_VIDEO_LOCAL);
    expect(sources).toContain(HERO_VIDEO);
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

describe('Equilibrium copy tokens', () => {
  it('keeps the prompt headline, subtitle, and CTAs', () => {
    expect(HEADLINE).toBe('Live Better, Feel Whole Every Day');
    expect(SUBTITLE).toContain('companion built for your journey');
    expect(START_LABEL).toBe('Start Today');
    expect(DISCOVER_LABEL).toBe('Discover How');
  });
});
