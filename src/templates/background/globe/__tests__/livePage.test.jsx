import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { GLOBE_DEFAULT_PROPS } from '../constants';

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

  window.matchMedia = jest.fn().mockImplementation(() => ({
    matches: false,
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    addListener: jest.fn(),
    removeListener: jest.fn(),
  }));
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
import { GlobeCollection } from '../GlobeCollection';
import { EnergyOrb } from '../EnergyOrb';

describe('EnergyOrb host', () => {
  it('mounts the energy-orb dual-canvas host', () => {
    const { container } = render(<EnergyOrb {...GLOBE_DEFAULT_PROPS} />);
    expect(container.querySelector('.energy-orb')).toBeTruthy();
    expect(container.querySelector('.energy-orb__stars')).toBeTruthy();
    expect(container.querySelector('.energy-orb__shader')).toBeTruthy();
  });
});

describe('GlobeCollection energy-orb entry', () => {
  it('lazy-mounts the Energy Orb variant through GlobeCollection', async () => {
    const { container } = render(<GlobeCollection {...GLOBE_DEFAULT_PROPS} />);
    await waitFor(() => {
      expect(container.querySelector('.energy-orb__shader')).toBeTruthy();
    });
    expect(container.querySelector('.energy-orb')).toBeTruthy();
    expect(container.querySelector('.energy-orb__stars')).toBeTruthy();
  });
});

describe('Globe LivePage', () => {
  it('mounts the shader frame host without a back control in embed chrome', async () => {
    const { container } = render(
      <MemoryRouter>
        <LivePage />
      </MemoryRouter>,
    );
    expect(container.querySelector('.shader-frame')).toBeTruthy();
    expect(container.querySelector('.globe-page')).toBeTruthy();
    expect(screen.queryByLabelText('Go back')).toBeNull();
    await waitFor(() => {
      expect(container.querySelector('.energy-orb__shader')).toBeTruthy();
    });
  });
});
