import React from 'react';
import { render, screen } from '@testing-library/react';
import LivePage from '../LivePage';

jest.mock('react-router-dom', () => ({
  useNavigate: () => jest.fn(),
}));

jest.mock('../hooks/useScrollScrub', () => ({
  useScrollScrub: () => ({
    videoRef: { current: null },
    canvasRef: { current: null },
    hasVideoFrame: false,
    cacheReady: false,
  }),
}));

jest.mock('../hooks/usePageChrome', () => ({
  usePageChrome: () => {},
}));

jest.mock('../hooks/useNovaFonts', () => ({
  useNovaFonts: () => {},
}));

jest.mock('../hooks/useEmbedAutoplay', () => ({
  useEmbedAutoplay: () => {},
}));

jest.mock('../hooks/useEmbedMode', () => ({
  useEmbedMode: () => ({ isEmbed: false, isStandalone: false }),
}));

beforeAll(() => {
  class ImmediateObserver {
    constructor(callback) {
      this.callback = callback;
    }

    observe(target) {
      this.callback([{ isIntersecting: true, target }]);
    }

    unobserve() {}

    disconnect() {}
  }

  global.IntersectionObserver = ImmediateObserver;
});

describe('Intelligent Operations page shell', () => {
  it('keeps the 80vh spacer between the two full-viewport sections', () => {
    const { container } = render(<LivePage />);
    expect(container.querySelector('[data-nova-spacer]')).toHaveClass('h-[80vh]');
    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Clear. Precise.');
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Learn to see');
  });
});
