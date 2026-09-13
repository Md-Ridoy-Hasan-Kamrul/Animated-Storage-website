import React from 'react';
import { render, screen } from '@testing-library/react';
import LivePage from '../LivePage';
import { BRAND_NAME, HEADLINE_LINE_TWO, PAGE_CLASS } from '../constants';
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

describe('Tech-Forward page shell', () => {
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

  it('uses the white full-viewport hero with NeuralKinetics copy', () => {
    const { container } = render(<LivePage />);
    expect(container.querySelector(`.${PAGE_CLASS}`)).toBeInTheDocument();
    expect(container.querySelector('.tf-stage')).not.toBeInTheDocument();
    expect(screen.getByText(BRAND_NAME)).toBeInTheDocument();
    expect(screen.getByText(HEADLINE_LINE_TWO)).toBeInTheDocument();
    expect(container.querySelector('source')).toHaveAttribute('src', HERO_VIDEO);
  });
});
