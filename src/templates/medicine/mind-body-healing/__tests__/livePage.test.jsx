import React from 'react';
import { render, screen } from '@testing-library/react';
import LivePage from '../LivePage';
import { CTA_LABEL, PAGE_CLASS, SUBTITLE } from '../constants';
import { HERO_VIDEO } from '../content';

jest.mock('react-router-dom', () => ({
  useNavigate: () => jest.fn(),
}));

jest.mock('../hooks/usePageChrome', () => ({
  usePageChrome: () => {},
}));

jest.mock('../hooks/useInterFonts', () => ({
  useInterFonts: () => {},
}));

jest.mock('../hooks/useEmbedMode', () => ({
  useEmbedMode: () => ({ isEmbed: false, isStandalone: false }),
}));

describe('Mind-Body Healing page shell', () => {
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

  it('uses the full-viewport Vibrant Wellness hero', () => {
    const { container } = render(<LivePage />);
    expect(container.querySelector('.mind-body-healing')).toBeInTheDocument();
    expect(container.firstChild).toHaveClass(...PAGE_CLASS.split(' ').filter(Boolean));
    expect(screen.getByRole('heading', { name: /Heal Your Body/ })).toBeInTheDocument();
    expect(screen.getByText(SUBTITLE)).toBeInTheDocument();
    expect(screen.getByText(CTA_LABEL)).toBeInTheDocument();
    expect(container.querySelector('source')).toHaveAttribute('src', HERO_VIDEO);
    expect(container.querySelector('.liquid-glass')).toBeInTheDocument();
  });
});
