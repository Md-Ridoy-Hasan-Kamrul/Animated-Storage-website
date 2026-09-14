import React from 'react';
import { render, screen } from '@testing-library/react';
import LivePage from '../LivePage';
import { H1_COPY, PAGE_CLASS } from '../constants';

jest.mock('react-router-dom', () => ({
  useNavigate: () => jest.fn(),
}));

jest.mock('../hooks/usePageChrome', () => ({
  usePageChrome: () => {},
}));

jest.mock('../hooks/useSignalFonts', () => ({
  useSignalFonts: () => {},
}));

jest.mock('../hooks/useEmbedMode', () => ({
  useEmbedMode: () => ({ isEmbed: false, isFramed: false, isStandalone: false, isPreview: false }),
}));

describe('Real-Time Alerts page shell', () => {
  beforeAll(() => {
    window.matchMedia = window.matchMedia || ((query) => ({
      matches: false,
      media: query,
      addEventListener: () => {},
      removeEventListener: () => {},
      addListener: () => {},
      removeListener: () => {},
    }));
    Object.defineProperty(window.HTMLMediaElement.prototype, 'play', {
      configurable: true,
      writable: true,
      value: jest.fn().mockResolvedValue(undefined),
    });
  });

  it('wraps the Signal login without inventing extra marketing sections', () => {
    const { container } = render(<LivePage />);
    expect(container.querySelector(`.${PAGE_CLASS}`)).toBeInTheDocument();
    expect(container.querySelector('.stage')).toBeInTheDocument();
    expect(screen.getByText(H1_COPY)).toBeInTheDocument();
    expect(container.querySelectorAll('form')).toHaveLength(0);
  });
});
