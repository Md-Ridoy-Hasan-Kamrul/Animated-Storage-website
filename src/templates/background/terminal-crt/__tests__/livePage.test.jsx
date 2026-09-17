import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { TERMINAL_CRT_DEFAULT_PROPS } from '../constants';

beforeAll(() => {
  class ResizeObserverStub {
    observe() {}

    unobserve() {}

    disconnect() {}
  }

  class IntersectionObserverStub {
    constructor(callback) {
      this.callback = callback;
    }

    observe() {
      this.callback([{ isIntersecting: true }]);
    }

    unobserve() {}

    disconnect() {}
  }

  global.ResizeObserver = ResizeObserverStub;
  global.IntersectionObserver = IntersectionObserverStub;

  HTMLCanvasElement.prototype.getContext = jest.fn(() => null);
});

jest.mock('../hooks/useEmbedMode', () => ({
  useEmbedMode: () => ({ isEmbed: false, isStandalone: false }),
}));

jest.mock('../hooks/usePageChrome', () => ({
  usePageChrome: () => {},
}));

jest.mock('../hooks/useStandaloneBack', () => ({
  useStandaloneBack: () => jest.fn(),
}));

jest.mock('../crtRenderer', () => ({
  CRT_DEFAULTS: {
    variant: 'terminal',
    speed: 1,
    typeSpeed: 1,
    motion: 1,
    brightness: 1,
    opacity: 1,
    hue: 0,
    saturation: 1,
  },
  CRT_VARIANTS: ['terminal', 'cinematic', 'blue-screen', 'nintendo'],
  crtStyle: () => ({ background: '#03100a' }),
  createCrtRenderer: () => ({
    resize: jest.fn(),
    render: jest.fn(),
    dispose: jest.fn(),
  }),
}));

import LivePage from '../LivePage';
import { CrtBackground } from '../CrtBackground';

describe('CrtBackground host', () => {
  it('mounts the terminal CRT canvas host', () => {
    const { container } = render(<CrtBackground {...TERMINAL_CRT_DEFAULT_PROPS} />);
    expect(container.querySelector('.crt')).toBeTruthy();
    expect(container.querySelector('.crt-terminal')).toBeTruthy();
    expect(container.querySelector('canvas')).toBeTruthy();
  });

  it('applies the terminal room grade filter on the host', () => {
    const { container } = render(<CrtBackground {...TERMINAL_CRT_DEFAULT_PROPS} />);
    const host = container.querySelector('.crt-terminal');
    expect(host.style.filter).toContain('hue-rotate(0deg)');
    expect(host.style.filter).toContain('saturate(1)');
    expect(host.style.filter).toContain('brightness(1)');
    expect(host.style.opacity).toBe('1');
    expect(host.style.background).toBe('rgb(3, 16, 10)');
  });
});

describe('Terminal CRT LivePage', () => {
  it('mounts the shader frame host without a back control in embed chrome', () => {
    const { container } = render(
      <MemoryRouter>
        <LivePage />
      </MemoryRouter>,
    );
    expect(container.querySelector('.shader-frame')).toBeTruthy();
    expect(container.querySelector('.terminal-crt-page')).toBeTruthy();
    expect(screen.queryByLabelText('Go back')).toBeNull();
  });
});
