import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import FeatureBlock from '../components/FeatureBlock';
import HeroCopy from '../components/HeroCopy';
import SiteHeader from '../components/SiteHeader';
import { usePageChrome } from '../hooks/usePageChrome';
import {
  BRAND,
  CTA_LABEL,
  FEATURE_LINE_ONE,
  FEATURE_LINE_TWO,
  GARMENTS,
  HEADLINE_LINES,
  NAV_COLLECTIONS,
  NAV_JOURNAL,
  NAV_SHOP,
  PAGE_HTML_CLASS,
  PAGE_TITLE,
} from '../constants';
import { BG_IMAGE_1, BG_IMAGE_2 } from '../content';
import ImageRevealBackground from '../components/ImageRevealBackground';

jest.mock('../hooks/useImageReveal', () => ({
  useImageReveal: () => {},
}));

jest.mock('../hooks/useEmbedReveal', () => ({
  useEmbedReveal: () => {},
}));

const ChromeHost = () => {
  usePageChrome();
  return null;
};

describe('Synth Mode chrome', () => {
  it('renders the LGPSM logo and nav actions', () => {
    const onOpen = jest.fn();
    render(<SiteHeader cartCount={2} onOpen={onOpen} onClose={() => {}} />);
    expect(screen.getByRole('button', { name: BRAND })).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: NAV_SHOP }));
    expect(onOpen).toHaveBeenCalledWith('shop');
    expect(screen.getByRole('button', { name: NAV_COLLECTIONS })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: NAV_JOURNAL })).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
  });

  it('renders the three-line headline, checker, CTA, and globe tagline', () => {
    render(
      <>
        <HeroCopy onShop={() => {}} />
        <FeatureBlock />
      </>,
    );
    HEADLINE_LINES.forEach((line) => {
      expect(screen.getByText(line)).toBeInTheDocument();
    });
    expect(screen.getByRole('button', { name: CTA_LABEL })).toBeInTheDocument();
    expect(screen.getByText(FEATURE_LINE_ONE)).toBeInTheDocument();
    expect(screen.getByText(FEATURE_LINE_TWO)).toBeInTheDocument();
    expect(screen.queryByText(GARMENTS[0].title)).not.toBeInTheDocument();
  });

  it('mounts both Higgs layers on the desktop reveal', () => {
    const { container } = render(<ImageRevealBackground />);
    const layers = container.querySelectorAll('[data-reveal-layer]');
    expect(layers[0]).toHaveStyle({ backgroundImage: `url(${BG_IMAGE_1})` });
    expect(layers[1]).toHaveStyle({ backgroundImage: `url(${BG_IMAGE_2})` });
  });

  it('paints html chrome white and restores it on unmount', () => {
    document.title = 'Kmotion';
    const { unmount } = render(<ChromeHost />);
    expect(document.title).toBe(PAGE_TITLE);
    expect(document.documentElement.classList.contains(PAGE_HTML_CLASS)).toBe(true);
    const painted = document.body.style.backgroundColor.toLowerCase().replace(/\s+/g, '');
    expect(['#ffffff', 'rgb(255,255,255)', 'white']).toContain(painted);
    unmount();
    expect(document.documentElement.classList.contains(PAGE_HTML_CLASS)).toBe(false);
    expect(document.title).toBe('Kmotion');
  });
});
