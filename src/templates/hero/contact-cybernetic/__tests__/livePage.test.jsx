import React from 'react';
import { render, screen } from '@testing-library/react';
import LivePage from '../LivePage';
import { BRAND_NAME, PAGE_CLASS, SERVICE_TITLE } from '../constants';
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

describe('Contact Cybernetic page shell', () => {
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

  it('uses the white Mainframe contact hero', () => {
    const { container } = render(<LivePage />);
    expect(container.querySelector('.contact-cybernetic')).toBeInTheDocument();
    expect(container.firstChild).toHaveClass(...PAGE_CLASS.split(' ').filter(Boolean).slice(0, 3));
    expect(screen.getByText(BRAND_NAME)).toBeInTheDocument();
    expect(screen.getByText(SERVICE_TITLE)).toBeInTheDocument();
    expect(container.querySelector('#spade-hero')).toBeInTheDocument();
    expect(container.querySelector('.cc-film')).toBeInTheDocument();
    expect(container.querySelector('.cc-copy-col')).toBeInTheDocument();
    expect(container.querySelector('source')).toHaveAttribute('src', HERO_VIDEO);
  });
});
