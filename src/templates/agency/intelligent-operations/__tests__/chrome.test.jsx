import React from 'react';
import { render, screen } from '@testing-library/react';
import CapabilityPanel from '../components/CapabilityPanel';
import Navbar from '../components/Navbar';
import SectionOne from '../components/SectionOne';
import SectionTwo from '../components/SectionTwo';
import {
  BRAND_NAME,
  CAPABILITIES,
  H1_LINE_TWO,
  H2_LINE_TWO,
  HERO_BADGE,
  MITHA_ALT,
  MITHA_CTA,
  MITHA_TITLE,
  NAV_CTA_LABEL,
  NAV_LINKS,
  PRIMARY_CTA,
  S2_BADGE,
  SECONDARY_CTA,
  SERVICES,
} from '../constants';

beforeAll(() => {
  class ImmediateObserver {
    constructor(callback) {
      this.callback = callback;
    }

    observe(target) {
      this.callback([{ isIntersecting: true, target }]);
    }

    unobserve() {}

    disconnect() {}
  }

  global.IntersectionObserver = ImmediateObserver;
});

describe('Intelligent Operations chrome', () => {
  it('renders novaai, desktop links with Projects 6, and the glass CTA', () => {
    render(<Navbar />);
    expect(screen.getByText(BRAND_NAME)).toBeInTheDocument();
    NAV_LINKS.forEach((link) => {
      expect(screen.getByText(link.label)).toBeInTheDocument();
    });
    expect(screen.getByText('6')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: NAV_CTA_LABEL })).toBeInTheDocument();
  });

  it('renders hero services, headline, and the Mitha card', () => {
    render(<SectionOne />);
    SERVICES.forEach((label) => {
      expect(screen.getByText(label)).toBeInTheDocument();
    });
    expect(screen.getByText(HERO_BADGE)).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(H1_LINE_TWO);
    expect(screen.getByText(MITHA_TITLE)).toBeInTheDocument();
    expect(screen.getByRole('img', { name: MITHA_ALT })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: MITHA_CTA })).toBeInTheDocument();
  });

  it('renders capability copy, dual CTAs, and three frosted rows', () => {
    render(<SectionTwo />);
    expect(screen.getByText(S2_BADGE)).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(H2_LINE_TWO);
    expect(screen.getByRole('link', { name: PRIMARY_CTA })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: SECONDARY_CTA })).toBeInTheDocument();
    CAPABILITIES.forEach((item) => {
      expect(screen.getByText(item.title)).toBeInTheDocument();
      expect(screen.getByText(item.body)).toBeInTheDocument();
    });
  });

  it('keeps capability rows as a list, not icon cards', () => {
    render(<CapabilityPanel />);
    expect(screen.getByText('01')).toBeInTheDocument();
    expect(screen.getByText('02')).toBeInTheDocument();
    expect(screen.getByText('03')).toBeInTheDocument();
    expect(screen.queryByText(/icon/i)).not.toBeInTheDocument();
  });
});
