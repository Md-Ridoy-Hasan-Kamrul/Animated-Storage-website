import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import {
  FRAME_SANDBOX,
  FRAME_TITLE,
  PLAY_CIRCLE_DEFAULT_PROPS,
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
import { LiquidMetalButton } from '../LiquidMetalButton';

describe('LiquidMetalButton play host', () => {
  it('mounts the play-circle iframe sandbox with configured defaults', () => {
    const { container } = render(<LiquidMetalButton {...PLAY_CIRCLE_DEFAULT_PROPS} />);
    const host = container.querySelector('.liquid-metal-button');
    const frame = container.querySelector('iframe.liquid-metal-button__frame');

    expect(host).toBeTruthy();
    expect(host.getAttribute('data-variant')).toBe(VARIANT_ID);
    expect(frame).toBeTruthy();
    expect(frame.getAttribute('title')).toBe(FRAME_TITLE);
    expect(frame.getAttribute('src')).toBe(SOURCE_URL);
    expect(frame.getAttribute('sandbox')).toBe(FRAME_SANDBOX);
    expect(VARIANT_ID).toBe('play');
  });
});

describe('Play Circle Liquid Metal Button LivePage', () => {
  it('mounts the shader frame host without a back control in embed chrome', () => {
    const { container } = render(
      <MemoryRouter>
        <LivePage />
      </MemoryRouter>,
    );
    expect(container.querySelector('.shader-frame')).toBeTruthy();
    expect(container.querySelector('.play-circle-liquid-metal-button-page')).toBeTruthy();
    expect(container.querySelector('.liquid-metal-button')).toBeTruthy();
    expect(screen.queryByLabelText('Go back')).toBeNull();
  });
});
