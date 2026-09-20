import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import {
  FRAME_SANDBOX,
  FRAME_TITLE,
  SOURCE_URL,
  THINKING_DEFAULT_PROPS,
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
import { ShaderButtons } from '../ShaderButtons';

describe('ShaderButtons thinking host', () => {
  it('mounts the thinking-button iframe with the CSP-safe public scene URL', () => {
    const { container } = render(
      <ShaderButtons {...THINKING_DEFAULT_PROPS} sourceUrl={SOURCE_URL} />,
    );
    const host = container.querySelector('.shader-buttons');
    const frame = container.querySelector('iframe');

    expect(host).toBeTruthy();
    expect(host.getAttribute('data-variant')).toBe(VARIANT_ID);
    expect(host.getAttribute('data-mode')).toBe('dark');
    expect(frame).toBeTruthy();
    expect(frame.getAttribute('title')).toBe(FRAME_TITLE);
    expect(frame.getAttribute('src')).toBe(SOURCE_URL);
    expect(frame.getAttribute('sandbox')).toBe(FRAME_SANDBOX);
    expect(VARIANT_ID).toBe('thinking-button');
  });
});

describe('Thinking LivePage', () => {
  it('mounts the shader frame host without a back control in embed chrome', () => {
    const { container } = render(
      <MemoryRouter>
        <LivePage />
      </MemoryRouter>,
    );
    expect(container.querySelector('.shader-frame')).toBeTruthy();
    expect(container.querySelector('.thinking-button-page')).toBeTruthy();
    expect(container.querySelector('.shader-buttons')).toBeTruthy();
    expect(screen.queryByLabelText('Go back')).toBeNull();
  });
});
