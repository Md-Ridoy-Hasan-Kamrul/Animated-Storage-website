import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { VANISHING_ARRAY_DEFAULT_PROPS, VARIANT_ID } from '../constants';

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

describe('LaserCollection vanishing-array host', () => {
  it('mounts the vanishing-array WebGL host canvas', async () => {
    const { container } = render(<LaserCollection {...VANISHING_ARRAY_DEFAULT_PROPS} />);
    await waitFor(() => {
      expect(
        container.querySelector(`.threeui-background.laser-variant[data-variant="${VARIANT_ID}"]`),
      ).toBeTruthy();
    });
    expect(container.querySelector('canvas')).toBeTruthy();
  });
});

describe('Vanishing Array Laser LivePage', () => {
  it('mounts the shader frame host without a back control in embed chrome', async () => {
    const { container } = render(
      <MemoryRouter>
        <LivePage />
      </MemoryRouter>,
    );
    expect(container.querySelector('.shader-frame')).toBeTruthy();
    expect(container.querySelector('.vanishing-array-laser-page')).toBeTruthy();
    await waitFor(() => {
      expect(
        container.querySelector(`.threeui-background.laser-variant[data-variant="${VARIANT_ID}"]`),
      ).toBeTruthy();
    });
    expect(screen.queryByLabelText('Go back')).toBeNull();
  });
});
