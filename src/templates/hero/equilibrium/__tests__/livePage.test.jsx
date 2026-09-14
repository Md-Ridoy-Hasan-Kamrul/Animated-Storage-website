import React from 'react';
import { render, screen } from '@testing-library/react';
import LivePage from '../LivePage';
import { BRAND_NAME, HEADLINE, PAGE_CLASS, SUBTITLE } from '../constants';
import { HERO_VIDEO, HERO_VIDEO_LOCAL } from '../content';

jest.mock('react-router-dom', () => ({
  useNavigate: () => jest.fn(),
}));

jest.mock('../hooks/usePageChrome', () => ({
  usePageChrome: () => {},
}));

jest.mock('../hooks/useGeistFont', () => ({
  useGeistFont: () => {},
}));

jest.mock('../hooks/useEmbedMode', () => ({
  useEmbedMode: () => ({ isEmbed: false, isStandalone: false }),
}));

describe('Equilibrium page shell', () => {
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

  it('uses the full-viewport Equilibrium hero without a dark film overlay', () => {
    const { container } = render(<LivePage />);
    expect(container.querySelector('.equilibrium')).toBeInTheDocument();
    expect(container.firstChild).toHaveClass(...PAGE_CLASS.split(' ').filter(Boolean));
    expect(container.querySelector('.eq-video')).toBeInTheDocument();
    expect(screen.getByText(BRAND_NAME)).toBeInTheDocument();
    expect(screen.getByText(HEADLINE)).toBeInTheDocument();
    expect(screen.getByText(SUBTITLE)).toBeInTheDocument();
    const sources = Array.from(container.querySelectorAll('source')).map((node) => node.getAttribute('src'));
    expect(sources).toContain(HERO_VIDEO);
    expect(sources).toContain(HERO_VIDEO_LOCAL);
    expect(container.querySelector('[class*="bg-black/50"]')).not.toBeInTheDocument();
    expect(container.querySelector('[class*="bg-black/60"]')).not.toBeInTheDocument();
  });
});
