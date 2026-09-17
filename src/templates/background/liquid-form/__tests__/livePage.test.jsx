import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { LIQUID_FORM_DEFAULT_PROPS } from '../constants';

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

import LivePage from '../LivePage';
import { LiquidFormBackground } from '../LiquidFormBackground';

describe('LiquidFormBackground host', () => {
  it('mounts the liquid-form canvas host', () => {
    const { container } = render(<LiquidFormBackground {...LIQUID_FORM_DEFAULT_PROPS} />);
    expect(container.querySelector('.liquid-form')).toBeTruthy();
    expect(container.querySelector('canvas')).toBeTruthy();
  });

  it('omits tint filter when tintAmount is zero', () => {
    const { container } = render(
      <LiquidFormBackground {...LIQUID_FORM_DEFAULT_PROPS} tintAmount={0} />,
    );
    const canvas = container.querySelector('canvas');
    expect(canvas.style.filter).toBe('');
  });
});

describe('Liquid Form LivePage', () => {
  it('mounts the shader frame host without a back control in embed chrome', () => {
    const { container } = render(
      <MemoryRouter>
        <LivePage />
      </MemoryRouter>,
    );
    expect(container.querySelector('.shader-frame')).toBeTruthy();
    expect(container.querySelector('.liquid-form-page')).toBeTruthy();
    expect(screen.queryByLabelText('Go back')).toBeNull();
  });
});
