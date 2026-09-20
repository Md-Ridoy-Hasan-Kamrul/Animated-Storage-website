import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import {
  FRAME_SANDBOX,
  FRAME_TITLE,
  GLITCH_FALL_DEFAULT_PROPS,
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
import { GalleryHeading } from '../GalleryHeading';

describe('GalleryHeading Glitch Fall host', () => {
  it('mounts the falling-diagonal iframe with the CSP-safe public scene URL', () => {
    const { container } = render(
      <GalleryHeading {...GLITCH_FALL_DEFAULT_PROPS} documentSrc={SOURCE_URL} />,
    );
    const host = container.querySelector('.gallery-heading-frame');
    const frame = container.querySelector('iframe');

    expect(host).toBeTruthy();
    expect(host.getAttribute('data-variant')).toBe(VARIANT_ID);
    expect(host.getAttribute('data-mode')).toBe('dark');
    expect(frame).toBeTruthy();
    expect(frame.getAttribute('title')).toBe(FRAME_TITLE);
    expect(frame.getAttribute('src')).toBe(SOURCE_URL);
    expect(frame.getAttribute('sandbox')).toBe(FRAME_SANDBOX);
    expect(VARIANT_ID).toBe('falling-diagonal');
  });
});

describe('Glitch Fall LivePage', () => {
  it('mounts the shader frame host without a back control in embed chrome', () => {
    const { container } = render(
      <MemoryRouter>
        <LivePage />
      </MemoryRouter>,
    );
    expect(container.querySelector('.shader-frame')).toBeTruthy();
    expect(container.querySelector('.glitch-fall-page')).toBeTruthy();
    expect(container.querySelector('.gallery-heading-frame')).toBeTruthy();
    expect(screen.queryByLabelText('Go back')).toBeNull();
  });
});
