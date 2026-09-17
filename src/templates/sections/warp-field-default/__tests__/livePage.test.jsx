import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { WARP_FIELD_DEFAULT_PROPS } from '../constants';

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

jest.mock('../warpFieldRenderer', () => ({
  WARP_FIELD_DEFAULTS: {
    variant: 'streaks',
    speed: 15,
    streakOpacity: 0.6,
    tileOpacity: 0.9,
    fov: 75,
    brightness: 1,
    hue: 0,
    saturation: 1,
  },
  createWarpFieldRenderer: () => ({
    resize: jest.fn(),
    render: jest.fn(),
    dispose: jest.fn(),
  }),
}));

import LivePage from '../LivePage';
import { WarpFieldBackground } from '../WarpFieldBackground';

describe('WarpFieldBackground host', () => {
  it('mounts the warp-field canvas host', () => {
    const { container } = render(<WarpFieldBackground {...WARP_FIELD_DEFAULT_PROPS} />);
    expect(container.querySelector('.warp-field')).toBeTruthy();
    expect(container.querySelector('canvas')).toBeTruthy();
  });
});

describe('Warp Field Default Variant LivePage', () => {
  it('mounts the shader frame host without a back control in embed chrome', () => {
    const { container } = render(
      <MemoryRouter>
        <LivePage />
      </MemoryRouter>,
    );
    expect(container.querySelector('.shader-frame')).toBeTruthy();
    expect(container.querySelector('.warp-field-default-page')).toBeTruthy();
    expect(screen.queryByLabelText('Go back')).toBeNull();
  });
});
