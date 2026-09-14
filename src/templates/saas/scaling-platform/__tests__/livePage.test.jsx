import React from 'react';
import { render, screen } from '@testing-library/react';
import LivePage from '../LivePage';
import { ABOUT_ACCENT, ABOUT_BODY, BRAND_NAME, PAGE_CLASS, START_LABEL } from '../constants';
import { ABOUT_VIDEO, HERO_VIDEO } from '../content';

jest.mock('react-router-dom', () => ({
  useNavigate: () => jest.fn(),
}));

jest.mock('../hooks/usePageChrome', () => ({
  usePageChrome: () => {},
}));

jest.mock('../hooks/useQuanticoFont', () => ({
  useQuanticoFont: () => {},
}));

jest.mock('../hooks/useEmbedMode', () => ({
  useEmbedMode: () => ({ isEmbed: false, isStandalone: false }),
}));

describe('Scaling Platform page shell', () => {
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

  it('renders exactly two sections with the Targo staircase and about copy', () => {
    const { container } = render(<LivePage />);
    expect(container.querySelector('.scaling-platform')).toBeInTheDocument();
    expect(container.firstChild).toHaveClass(PAGE_CLASS);
    expect(container.querySelectorAll('section')).toHaveLength(2);
    expect(screen.getByText(BRAND_NAME)).toBeInTheDocument();
    expect(screen.getByText('SCALING')).toBeInTheDocument();
    expect(screen.getByText('PLATFORM')).toBeInTheDocument();
    expect(screen.getAllByText(ABOUT_ACCENT).length).toBeGreaterThan(0);
    expect(screen.getByText(ABOUT_BODY)).toBeInTheDocument();
    expect(screen.getByText(START_LABEL)).toBeInTheDocument();
    const sources = Array.from(container.querySelectorAll('source')).map((node) => node.getAttribute('src'));
    expect(sources).toContain(HERO_VIDEO);
    expect(sources).toContain(ABOUT_VIDEO);
    expect(container.querySelector('footer')).not.toBeInTheDocument();
  });
});
