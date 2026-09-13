import React from 'react';
import { render, screen } from '@testing-library/react';
import HeroFooter from '../components/HeroFooter';
import HeroVideo from '../components/HeroVideo';
import Navbar from '../components/Navbar';
import { usePageChrome } from '../hooks/usePageChrome';
import {
  ADAPTIVE_LABEL,
  BRAND_NAME,
  CTA_FEATURES,
  CTA_HOW,
  FOOTER_TAGS,
  HEADLINE_LINE_ONE,
  HEADLINE_LINE_TWO,
  MENU_LABEL,
  PAGE_HTML_CLASS,
  PAGE_TITLE,
  SUBTITLE,
  TAG_ONE,
  TAG_TWO,
} from '../constants';
import { HERO_VIDEO } from '../content';

const ChromeHost = () => {
  usePageChrome();
  return null;
};

describe('Tech-Forward chrome', () => {
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

  it('renders brand, menu, tags, and adaptive pill', () => {
    render(<Navbar />);
    expect(screen.getByText(BRAND_NAME)).toBeInTheDocument();
    expect(screen.getByText(MENU_LABEL)).toBeInTheDocument();
    expect(screen.getByText(TAG_ONE)).toBeInTheDocument();
    expect(screen.getByText(TAG_TWO)).toBeInTheDocument();
    expect(screen.getByText(ADAPTIVE_LABEL)).toBeInTheDocument();
  });

  it('renders the banking headline, CTAs, and footer tags', () => {
    render(<HeroFooter />);
    expect(screen.getByText(SUBTITLE)).toBeInTheDocument();
    expect(screen.getByText(HEADLINE_LINE_ONE)).toBeInTheDocument();
    expect(screen.getByText(HEADLINE_LINE_TWO)).toBeInTheDocument();
    expect(screen.getByText(CTA_FEATURES)).toBeInTheDocument();
    expect(screen.getByText(CTA_HOW)).toBeInTheDocument();
    FOOTER_TAGS.forEach((tag) => {
      expect(screen.getByText(tag)).toBeInTheDocument();
    });
  });

  it('keeps the CloudFront video URL on the film', () => {
    const { container } = render(<HeroVideo />);
    expect(container.querySelector('source')).toHaveAttribute('src', HERO_VIDEO);
    expect(container.querySelector('video')).toHaveAttribute('autoplay');
  });

  it('paints html chrome white and restores it on unmount', () => {
    document.title = 'Kmotion';
    const { unmount } = render(<ChromeHost />);
    expect(document.title).toBe(PAGE_TITLE);
    expect(document.documentElement.classList.contains(PAGE_HTML_CLASS)).toBe(true);
    unmount();
    expect(document.documentElement.classList.contains(PAGE_HTML_CLASS)).toBe(false);
    expect(document.title).toBe('Kmotion');
  });
});
