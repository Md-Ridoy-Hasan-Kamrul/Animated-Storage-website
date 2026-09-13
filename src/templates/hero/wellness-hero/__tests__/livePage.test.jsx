import React from 'react';
import { render, screen } from '@testing-library/react';
import LivePage from '../LivePage';
import { BRAND_NAME, HEADLINE, PAGE_CLASS, SUBTITLE } from '../constants';
import { HERO_VIDEO } from '../content';

jest.mock('react-router-dom', () => ({
  useNavigate: () => jest.fn(),
}));

jest.mock('../hooks/usePageChrome', () => ({
  usePageChrome: () => {},
}));

jest.mock('../hooks/useAuraiFonts', () => ({
  useAuraiFonts: () => {},
}));

jest.mock('../hooks/useEmbedMode', () => ({
  useEmbedMode: () => ({ isEmbed: false, isStandalone: false }),
}));

describe('Wellness Hero page shell', () => {
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

  it('uses the full-viewport Aurai hero without a dark film overlay', () => {
    const { container } = render(<LivePage />);
    expect(container.querySelector('.wellness-hero')).toBeInTheDocument();
    expect(container.firstChild).toHaveClass(...PAGE_CLASS.split(' ').filter(Boolean));
    expect(container.querySelector('.wh-video')).toBeInTheDocument();
    expect(screen.getByText(BRAND_NAME)).toBeInTheDocument();
    expect(screen.getByText(HEADLINE)).toBeInTheDocument();
    expect(screen.getByText(SUBTITLE)).toBeInTheDocument();
    expect(container.querySelector('source')).toHaveAttribute('src', HERO_VIDEO);
    expect(container.querySelector('[class*="bg-black/50"]')).not.toBeInTheDocument();
    expect(container.querySelector('[class*="bg-black/60"]')).not.toBeInTheDocument();
  });
});
