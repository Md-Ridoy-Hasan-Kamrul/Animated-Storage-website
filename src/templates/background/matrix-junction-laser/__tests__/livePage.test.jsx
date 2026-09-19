import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import {
  FRAME_TITLE,
  MATRIX_FIELD_DEFAULT_PROPS,
  SOURCE_URL,
  VARIANT_ID,
} from '../constants';

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
import { LaserCollection } from '../LaserCollection';

describe('LaserCollection matrix-field host', () => {
  it('mounts the matrix-field iframe with the CSP-safe public scene URL', () => {
    const { container } = render(
      <LaserCollection {...MATRIX_FIELD_DEFAULT_PROPS} sourceUrl={SOURCE_URL} />,
    );
    const host = container.querySelector('.threeui-background.laser-collection');
    const frame = container.querySelector('iframe');
    expect(host).toBeTruthy();
    expect(host.getAttribute('data-variant')).toBe(VARIANT_ID);
    expect(frame).toBeTruthy();
    expect(frame.getAttribute('src')).toBe(SOURCE_URL);
    expect(frame.getAttribute('sandbox')).toBe('allow-scripts');
    expect(frame.getAttribute('title')).toBe(FRAME_TITLE);
  });

  it('posts threeui-controls on load', () => {
    const postMessage = jest.fn();
    const { container } = render(
      <LaserCollection {...MATRIX_FIELD_DEFAULT_PROPS} sourceUrl={SOURCE_URL} />,
    );
    const frame = container.querySelector('iframe');
    Object.defineProperty(frame, 'contentWindow', {
      value: { postMessage },
      configurable: true,
    });
    fireEvent.load(frame);
    expect(postMessage).toHaveBeenCalledWith(
      {
        type: 'threeui-controls',
        controls: {
          mode: 'dark',
          speed: 1,
          size: 1,
          length: 1,
          density: 1,
          opacity: 1,
        },
      },
      '*',
    );
  });
});

describe('Matrix Junction Laser LivePage', () => {
  it('mounts the shader frame host without a back control in embed chrome', () => {
    const { container } = render(
      <MemoryRouter>
        <LivePage />
      </MemoryRouter>,
    );
    expect(container.querySelector('.shader-frame')).toBeTruthy();
    expect(container.querySelector('.matrix-junction-laser-page')).toBeTruthy();
    expect(container.querySelector('iframe')).toBeTruthy();
    expect(screen.queryByLabelText('Go back')).toBeNull();
  });
});
