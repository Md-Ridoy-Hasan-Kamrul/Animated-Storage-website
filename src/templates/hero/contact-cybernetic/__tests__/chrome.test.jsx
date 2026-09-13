import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Headline from '../components/Headline';
import Navbar from '../components/Navbar';
import ServicePills from '../components/ServicePills';
import { usePageChrome } from '../hooks/usePageChrome';
import {
  BRAND_NAME,
  CTA_LABEL,
  DESCRIPTION_LEAD,
  EMPTY_BANNER,
  FRAMED_HTML_CLASS,
  NAV_LINKS,
  PAGE_HTML_CLASS,
  PAGE_TITLE,
  SERVICE_OPTIONS,
  SERVICE_TITLE,
} from '../constants';

const ChromeHost = () => {
  usePageChrome();
  return null;
};

describe('Contact Cybernetic chrome', () => {
  it('renders Mainframe brand, nav links, and get in touch', () => {
    render(<Navbar isMobileMenuOpen={false} onToggle={() => {}} />);
    expect(screen.getByText(BRAND_NAME)).toBeInTheDocument();
    NAV_LINKS.forEach((label) => {
      expect(screen.getAllByText(label).length).toBeGreaterThan(0);
    });
    expect(screen.getByText(CTA_LABEL)).toBeInTheDocument();
  });

  it('renders the service prompt and empty banner', () => {
    render(<ServicePills />);
    expect(screen.getByText(SERVICE_TITLE)).toBeInTheDocument();
    SERVICE_OPTIONS.forEach((option) => {
      expect(screen.getByRole('button', { name: option })).toBeInTheDocument();
    });
    expect(screen.getByText(EMPTY_BANNER)).toBeInTheDocument();
  });

  it('selects multiple services and shows the ready banner', async () => {
    const user = userEvent.setup();
    render(<ServicePills />);
    await user.click(screen.getByRole('button', { name: 'Brand' }));
    await user.click(screen.getByRole('button', { name: 'Digital' }));
    expect(await screen.findByText('Ready to inquire about: Brand, Digital')).toBeInTheDocument();
    expect(screen.getByText(/Let's Go/i)).toBeInTheDocument();
  });

  it('renders the contact description', () => {
    render(<Headline />);
    expect(screen.getByText(DESCRIPTION_LEAD, { exact: false })).toBeInTheDocument();
  });

  it('paints html chrome white and restores it on unmount', () => {
    document.title = 'Kmotion';
    const { unmount } = render(<ChromeHost />);
    expect(document.title).toBe(PAGE_TITLE);
    expect(document.documentElement.classList.contains(PAGE_HTML_CLASS)).toBe(true);
    expect(document.documentElement.classList.contains(FRAMED_HTML_CLASS)).toBe(false);
    unmount();
    expect(document.documentElement.classList.contains(PAGE_HTML_CLASS)).toBe(false);
    expect(document.title).toBe('Kmotion');
  });
});
