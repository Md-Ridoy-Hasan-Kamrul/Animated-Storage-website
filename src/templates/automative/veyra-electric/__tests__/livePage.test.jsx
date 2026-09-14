import React from 'react';
import { render, screen } from '@testing-library/react';
import LivePage from '../LivePage';
import { HEADLINE, PAGE_CLASS, WORDMARK } from '../constants';

jest.mock('react-router-dom', () => ({
  useNavigate: () => jest.fn(),
}));

jest.mock('../hooks/usePageChrome', () => ({
  usePageChrome: () => {},
}));

jest.mock('../hooks/useSpaceGrotesk', () => ({
  useSpaceGrotesk: () => {},
}));

jest.mock('../hooks/useEmbedMode', () => ({
  useEmbedMode: () => ({ isEmbed: false, isFramed: false, isStandalone: false, isPreview: false }),
}));

describe('Veyra Electric page shell', () => {
  beforeAll(() => {
    class FakeImage {
      decode() {
        return Promise.resolve();
      }

      set src(_) {
        if (this.onload) this.onload();
      }
    }
    global.Image = FakeImage;
    global.ResizeObserver = class {
      observe() {}
      disconnect() {}
    };
    HTMLCanvasElement.prototype.getContext = () => ({ drawImage: () => {} });
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

  it('wraps the VEYRA scene without inventing a marketing landing page', () => {
    const { container } = render(<LivePage />);
    expect(container.querySelector(`.${PAGE_CLASS}`)).toBeInTheDocument();
    expect(container.querySelector('.experience')).toBeInTheDocument();
    expect(screen.getByText(WORDMARK)).toBeInTheDocument();
    expect(screen.getByText(HEADLINE)).toBeInTheDocument();
    expect(container.querySelector('.car-image')).toHaveAttribute('src', '/media/exterior-polished.png');
  });
});
