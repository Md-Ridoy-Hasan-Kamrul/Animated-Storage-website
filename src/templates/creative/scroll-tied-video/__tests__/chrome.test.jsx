import React, { useState } from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import Navbar from '../components/Navbar';
import MobileOverlay from '../components/MobileOverlay';
import { MENU_LABEL, NAV_LINKS, NEWS_LABEL } from '../constants';

const ChromeHarness = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Navbar
        isLight
        entered
        isOpen={isOpen}
        onOpen={() => setIsOpen(true)}
      />
      <MobileOverlay isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};

describe('Vectrus chrome', () => {
  it('renders the five nav labels and news cluster', () => {
    render(<ChromeHarness />);
    NAV_LINKS.forEach((link) => {
      expect(screen.getAllByText(link.label).length).toBeGreaterThan(0);
    });
    expect(screen.getAllByText(NEWS_LABEL).length).toBeGreaterThan(0);
    expect(screen.getAllByText(MENU_LABEL).length).toBeGreaterThan(0);
  });

  it('opens the dark overlay from the hamburger', () => {
    render(<ChromeHarness />);
    fireEvent.click(screen.getByRole('button', { name: 'Open menu' }));
    expect(screen.getByRole('dialog', { name: 'Menu' })).toHaveClass('opacity-100');
    fireEvent.click(screen.getByRole('button', { name: 'Close menu' }));
    expect(screen.getByRole('dialog', { name: 'Menu' })).toHaveClass('opacity-0');
  });
});
