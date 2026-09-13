import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import IntroCopy from '../components/IntroCopy';
import SightsSlider from '../components/SightsSlider';
import SiteHeader from '../components/SiteHeader';
import { HERO_TAGS, LOGO_LABEL, NAV_LINKS } from '../constants';
import { SIGHTS } from '../content';
import { buildSightCopies } from '../utils/sightSlider';

describe('Mostar chrome', () => {
  it('renders the logo and primary nav labels', () => {
    render(<SiteHeader />);
    expect(screen.getByRole('link', { name: LOGO_LABEL })).toHaveAttribute('href', '#cinema');
    NAV_LINKS.forEach((link) => {
      expect(screen.getByRole('link', { name: link.label })).toHaveAttribute('href', link.href);
    });
    expect(screen.getByRole('button', { name: 'Change language' })).toBeInTheDocument();
  });

  it('renders the intro paragraph and three highlight pills', () => {
    render(<IntroCopy />);
    expect(screen.getByLabelText('Mostar overview')).toBeInTheDocument();
    HERO_TAGS.forEach((tag) => {
      expect(screen.getByText(tag)).toBeInTheDocument();
    });
  });

  it('exposes the five original sight labels and selects a card', () => {
    const onSelect = jest.fn();
    const copies = buildSightCopies(SIGHTS);
    render(
      <SightsSlider
        copies={copies}
        activeSight={5}
        jumping={false}
        trackRef={{ current: null }}
        onSelect={onSelect}
      />,
    );

    SIGHTS.forEach((sight) => {
      expect(screen.getAllByRole('button', { name: sight.ariaLabel }).length).toBe(3);
    });

    fireEvent.click(screen.getAllByRole('button', { name: 'Open Stari Most card' })[1]);
    expect(onSelect).toHaveBeenCalledWith(5);
  });
});
