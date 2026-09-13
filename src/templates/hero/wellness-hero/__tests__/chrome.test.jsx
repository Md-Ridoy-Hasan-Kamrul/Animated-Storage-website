import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import EmailForm from '../components/EmailForm';
import HeroVideo from '../components/HeroVideo';
import MobileMenu from '../components/MobileMenu';
import Navbar from '../components/Navbar';
import { useMobileMenu } from '../hooks/useMobileMenu';
import { usePageChrome } from '../hooks/usePageChrome';
import {
  BRAND_NAME,
  CLOSE_MENU_LABEL,
  EMAIL_EMPTY_MESSAGE,
  FEATURE_PILLS,
  HEADLINE,
  JOIN_LABEL,
  NAV_LINKS,
  OPEN_MENU_LABEL,
  PAGE_HTML_CLASS,
  PAGE_TITLE,
  SUBTITLE,
} from '../constants';
import { HERO_VIDEO } from '../content';

jest.mock('react-hot-toast', () => ({
  __esModule: true,
  default: { success: jest.fn(), error: jest.fn() },
}));

const ChromeHarness = () => {
  const { isOpen, toggleMenu, closeMenu } = useMobileMenu();
  return (
    <>
      <Navbar isOpen={isOpen} onToggle={toggleMenu} onJoin={closeMenu} />
      <MobileMenu isOpen={isOpen} onNavigate={closeMenu} onJoin={closeMenu} />
    </>
  );
};

const ChromeHost = () => {
  usePageChrome();
  return null;
};

describe('Wellness Hero chrome', () => {
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

  it('renders Aurai, join, and hamburger', () => {
    render(<ChromeHarness />);
    expect(screen.getByText(BRAND_NAME)).toBeInTheDocument();
    expect(screen.getAllByText(JOIN_LABEL).length).toBeGreaterThan(0);
    expect(screen.getByRole('button', { name: OPEN_MENU_LABEL })).toBeInTheDocument();
  });

  it('opens Story, Benefits, Connect, and the mobile join action', () => {
    render(<ChromeHarness />);
    fireEvent.click(screen.getByRole('button', { name: OPEN_MENU_LABEL }));
    expect(screen.getByRole('button', { name: CLOSE_MENU_LABEL })).toBeInTheDocument();
    NAV_LINKS.forEach((label) => {
      expect(screen.getByText(label)).toBeInTheDocument();
    });
    expect(screen.getAllByText(JOIN_LABEL).length).toBeGreaterThan(1);
  });

  it('keeps the CloudFront film looping', () => {
    const { container } = render(<HeroVideo />);
    expect(container.querySelector('source')).toHaveAttribute('src', HERO_VIDEO);
    expect(container.querySelector('video')).toHaveAttribute('autoplay');
    expect(container.querySelector('video')).toHaveAttribute('loop');
  });

  it('shows an inline error when the join form is empty', () => {
    render(<EmailForm />);
    fireEvent.submit(screen.getByRole('textbox').closest('form'));
    expect(screen.getByText(EMAIL_EMPTY_MESSAGE)).toBeInTheDocument();
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

describe('Wellness Hero copy tokens', () => {
  it('keeps the prompt headline, subtitle, and pills', () => {
    expect(HEADLINE).toBe('Your calm is always within.');
    expect(SUBTITLE).toContain('always-on wellness companion');
    expect(FEATURE_PILLS).toEqual([
      'Smart Therapy',
      'Real-time Healing',
      'Insights into outcomes',
    ]);
  });
});
