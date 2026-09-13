import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import Navbar from '../components/Navbar';
import MobileOverlay from '../components/MobileOverlay';
import VideoSwitcher from '../components/VideoSwitcher';
import { BRAND_NAME, CTA_LABEL, NAV_LINKS, VIDEO_LABELS } from '../constants';
import { useMobileMenu } from '../hooks/useMobileMenu';

const ChromeHarness = () => {
  const { isOpen, toggleMenu, closeMenu } = useMobileMenu();
  return (
    <>
      <Navbar isOpen={isOpen} onToggle={toggleMenu} onNavigate={closeMenu} onCta={closeMenu} />
      <MobileOverlay isOpen={isOpen} onNavigate={closeMenu} onCta={closeMenu} />
    </>
  );
};

describe('Stillmind chrome', () => {
  it('renders Lumora, desktop nav, and Get Started', () => {
    render(<ChromeHarness />);
    expect(screen.getAllByText(BRAND_NAME).length).toBeGreaterThan(0);
    NAV_LINKS.forEach((link) => {
      expect(screen.getAllByText(link.label).length).toBeGreaterThan(0);
    });
    expect(screen.getAllByText(CTA_LABEL).length).toBeGreaterThan(0);
  });

  it('opens and closes the mobile overlay from the hamburger', () => {
    render(<ChromeHarness />);
    fireEvent.click(screen.getByRole('button', { name: 'Open menu' }));
    expect(screen.getByRole('button', { name: 'Close menu' })).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Close menu' }));
    expect(screen.getByRole('button', { name: 'Open menu' })).toBeInTheDocument();
  });
});

describe('Stillmind video switcher', () => {
  it('labels all four films and reports the clicked index', () => {
    const onSelect = jest.fn();
    render(
      <VideoSwitcher
        activeVideo={0}
        onSelect={onSelect}
        inkClass="text-white"
        durationClass=""
      />,
    );
    VIDEO_LABELS.forEach((label) => {
      expect(screen.getByRole('button', { name: label })).toBeInTheDocument();
    });
    fireEvent.click(screen.getByRole('button', { name: 'Deep Woods' }));
    expect(onSelect).toHaveBeenCalledWith(2);
  });
});
