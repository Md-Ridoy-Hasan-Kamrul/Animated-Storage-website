import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ATMOSPHERIC_BLADE_DEFAULT_PROPS, VARIANT_ID } from '../constants';

jest.mock('../hooks/useEmbedMode', () => ({
  useEmbedMode: () => ({ isEmbed: false, isStandalone: false }),
}));

jest.mock('../hooks/usePageChrome', () => ({
  usePageChrome: () => {},
}));

jest.mock('../hooks/useStandaloneBack', () => ({
  useStandaloneBack: () => jest.fn(),
}));

beforeAll(() => {
  HTMLCanvasElement.prototype.getContext = jest.fn(() => null);
});

import LivePage from '../LivePage';
import { LaserCollection } from '../LaserCollection';

describe('LaserCollection atmospheric-blade host', () => {
  it('mounts the atmospheric-blade WebGL host canvas', async () => {
    const { container } = render(<LaserCollection {...ATMOSPHERIC_BLADE_DEFAULT_PROPS} />);
    await waitFor(() => {
      expect(
        container.querySelector(`.threeui-background.laser-variant[data-variant="${VARIANT_ID}"]`),
      ).toBeTruthy();
    });
    expect(container.querySelector('canvas')).toBeTruthy();
  });
});

describe('Atmospheric Blade Laser LivePage', () => {
  it('mounts the shader frame host without a back control in embed chrome', async () => {
    const { container } = render(
      <MemoryRouter>
        <LivePage />
      </MemoryRouter>,
    );
    expect(container.querySelector('.shader-frame')).toBeTruthy();
    expect(container.querySelector('.atmospheric-blade-laser-page')).toBeTruthy();
    await waitFor(() => {
      expect(
        container.querySelector(`.threeui-background.laser-variant[data-variant="${VARIANT_ID}"]`),
      ).toBeTruthy();
    });
    expect(screen.queryByLabelText('Go back')).toBeNull();
  });
});
