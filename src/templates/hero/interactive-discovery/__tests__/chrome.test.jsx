import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import HeroCopy from '../components/HeroCopy';
import HeroHeading from '../components/HeroHeading';
import Navbar from '../components/Navbar';
import RevealLayer from '../components/RevealLayer';
import {
  BRAND_NAME,
  COPY_LEFT,
  COPY_RIGHT,
  CTA_LABEL,
  HEADING_LINE_ONE,
  HEADING_LINE_TWO,
  NAV_LINKS,
  SIGN_UP_LABEL,
} from '../constants';
import { BG_IMAGE_2 } from '../content';
import { useMobileMenu } from '../hooks/useMobileMenu';

const ChromeHarness = () => {
  const { isOpen, toggleMenu, closeMenu } = useMobileMenu();
  return <Navbar isOpen={isOpen} onToggle={toggleMenu} onNavigate={closeMenu} />;
};

beforeAll(() => {
  HTMLCanvasElement.prototype.getContext = jest.fn(() => ({
    canvas: { width: 100, height: 100, toDataURL: () => 'data:image/png;base64,mask' },
    clearRect: jest.fn(),
    createRadialGradient: jest.fn(() => ({ addColorStop: jest.fn() })),
    beginPath: jest.fn(),
    arc: jest.fn(),
    fill: jest.fn(),
  }));
  HTMLCanvasElement.prototype.toDataURL = jest.fn(() => 'data:image/png;base64,mask');
});

describe('Interactive Discovery chrome', () => {
  it('renders Lithos, center links, Sign Up, and a mobile hamburger', () => {
    render(<ChromeHarness />);
    expect(screen.getAllByText(BRAND_NAME).length).toBeGreaterThan(0);
    NAV_LINKS.forEach((link) => {
      expect(screen.getAllByText(link.label).length).toBeGreaterThan(0);
    });
    expect(screen.getAllByText(SIGN_UP_LABEL).length).toBeGreaterThan(0);
    expect(screen.getByRole('button', { name: 'Open menu' })).toBeInTheDocument();
  });

  it('opens and closes the mobile menu', () => {
    render(<ChromeHarness />);
    fireEvent.click(screen.getByRole('button', { name: 'Open menu' }));
    expect(screen.getByRole('button', { name: 'Close menu' })).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Close menu' }));
    expect(screen.getByRole('button', { name: 'Open menu' })).toBeInTheDocument();
  });

  it('renders both headline lines', () => {
    render(<HeroHeading />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(HEADING_LINE_ONE);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(HEADING_LINE_TWO);
  });

  it('renders both copy blocks and Start Digging', () => {
    render(<HeroCopy />);
    expect(screen.getByText(COPY_LEFT)).toBeInTheDocument();
    expect(screen.getByText(COPY_RIGHT)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: CTA_LABEL })).toBeInTheDocument();
  });

  it('applies the reveal image as a masked layer', () => {
    const { container } = render(<RevealLayer image={BG_IMAGE_2} cursorX={120} cursorY={80} />);
    const reveal = container.querySelector('[data-lithos-reveal]');
    expect(reveal).toBeTruthy();
    expect(reveal.style.backgroundImage).toContain(BG_IMAGE_2);
    expect(reveal.style.maskSize).toBe('100% 100%');
  });
});
