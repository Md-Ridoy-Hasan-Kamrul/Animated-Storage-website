import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import AboutMedia from '../components/AboutMedia';
import HeroVideo from '../components/HeroVideo';
import MobileMenu from '../components/MobileMenu';
import Navbar from '../components/Navbar';
import { useMobileMenu } from '../hooks/useMobileMenu';
import { usePageChrome } from '../hooks/usePageChrome';
import {
  ABOUT_BODY,
  ABOUT_TITLE,
  BRAND_NAME,
  CLOSE_MENU_LABEL,
  CONTACT_LABEL,
  LEARN_LABEL,
  NAV_LINKS,
  OPEN_MENU_LABEL,
  PAGE_HTML_CLASS,
  PAGE_TITLE,
  START_LABEL,
} from '../constants';
import { ABOUT_VIDEO, HERO_VIDEO, HERO_VIDEO_LOCAL } from '../content';

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

describe('Scaling Platform chrome', () => {
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

  it('renders targo, Contact us, and hamburger', () => {
    render(<ChromeHarness />);
    expect(screen.getByText(BRAND_NAME)).toBeInTheDocument();
    expect(screen.getByText(CONTACT_LABEL)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: OPEN_MENU_LABEL })).toBeInTheDocument();
  });

  it('opens HOME, ABOUT, and CONTACT US in the mobile stack', () => {
    render(<ChromeHarness />);
    fireEvent.click(screen.getByRole('button', { name: OPEN_MENU_LABEL }));
    expect(screen.getByRole('button', { name: CLOSE_MENU_LABEL })).toBeInTheDocument();
    NAV_LINKS.forEach((item) => {
      expect(screen.getAllByText(item.label).length).toBeGreaterThan(0);
    });
  });

  it('loops the hero film with a local fallback', () => {
    const { container } = render(<HeroVideo />);
    const sources = Array.from(container.querySelectorAll('source')).map((node) => node.getAttribute('src'));
    expect(sources).toContain(HERO_VIDEO_LOCAL);
    expect(sources).toContain(HERO_VIDEO);
    expect(container.querySelector('video')).toHaveAttribute('autoplay');
    expect(container.querySelector('video')).toHaveAttribute('loop');
  });

  it('loops the about film with a hue overlay', () => {
    const { container } = render(<AboutMedia />);
    const sources = Array.from(container.querySelectorAll('source')).map((node) => node.getAttribute('src'));
    expect(sources).toContain(ABOUT_VIDEO);
    expect(container.querySelector('.sp-about-tint')).toBeInTheDocument();
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

describe('Scaling Platform copy tokens', () => {
  it('keeps the prompt CTAs and about body', () => {
    expect(START_LABEL).toBe('GET STARTED');
    expect(LEARN_LABEL).toBe('LEARN MORE');
    expect(ABOUT_TITLE).toBe('ABOUT');
    expect(ABOUT_BODY).toContain('Hundreds of releases, zero surprises.');
  });
});
