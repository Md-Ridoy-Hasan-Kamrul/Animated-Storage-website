import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import Navbar from '../components/Navbar';
import MobileOverlay from '../components/MobileOverlay';
import ActionPills from '../components/ActionPills';
import { CONTACT_EMAIL, CTA_LABEL, PILL_LABELS } from '../constants';
import { useMobileMenu } from '../hooks/useMobileMenu';

const ChromeHarness = () => {
  const { isOpen, toggleMenu, closeMenu } = useMobileMenu();
  return (
    <>
      <Navbar isOpen={isOpen} onToggle={toggleMenu} onNavigate={closeMenu} />
      <MobileOverlay isOpen={isOpen} onNavigate={closeMenu} />
    </>
  );
};

describe('Mainframe chrome', () => {
  it('renders brand, desktop links, and the contact CTA', () => {
    render(<ChromeHarness />);
    expect(screen.getAllByText('Mainframe®').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Labs').length).toBeGreaterThan(0);
    expect(screen.getAllByText(CTA_LABEL).length).toBeGreaterThan(0);
  });

  it('opens and closes the mobile overlay from the hamburger', () => {
    render(<ChromeHarness />);
    const toggle = screen.getByRole('button', { name: 'Open menu' });
    fireEvent.click(toggle);
    expect(screen.getByRole('navigation', { name: 'Mobile' })).toHaveClass('opacity-100');
    fireEvent.click(screen.getByRole('button', { name: 'Close menu' }));
    expect(screen.getByRole('navigation', { name: 'Mobile' })).toHaveClass('opacity-0');
  });
});

describe('Action pills', () => {
  it('copies the contact email when the outline pill is clicked', async () => {
    const writeText = jest.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: { writeText },
    });

    render(<ActionPills visible />);
    PILL_LABELS.forEach((label) => {
      expect(screen.getByRole('button', { name: label })).toBeInTheDocument();
    });

    fireEvent.click(screen.getByRole('button', { name: `Copy ${CONTACT_EMAIL}` }));
    expect(writeText).toHaveBeenCalledWith(CONTACT_EMAIL);
  });
});
