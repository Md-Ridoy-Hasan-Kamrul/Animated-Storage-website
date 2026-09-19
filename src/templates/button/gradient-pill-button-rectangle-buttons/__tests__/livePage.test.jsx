import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import {
  FRAME_TITLE,
  GRADIENT_PILL_BUTTON_DEFAULT_PROPS,
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
import { RectangleButtons } from '../RectangleButtons';

describe('RectangleButtons gradient-pill-button host', () => {
  it('mounts the gradient-pill-button iframe with the CSP-safe public scene URL', () => {
    const { container } = render(
      <RectangleButtons {...GRADIENT_PILL_BUTTON_DEFAULT_PROPS} sourceUrl={SOURCE_URL} />,
    );
    const host = container.querySelector('.threeui-background.rectangle-buttons-collection');
    const frame = container.querySelector('iframe');
    expect(host).toBeTruthy();
    expect(host.getAttribute('data-variant')).toBe(VARIANT_ID);
    expect(host.getAttribute('data-mode')).toBe('dark');
    expect(frame).toBeTruthy();
    expect(frame.getAttribute('src')).toBe(SOURCE_URL);
    expect(frame.getAttribute('sandbox')).toBe('allow-scripts');
    expect(frame.getAttribute('title')).toBe(FRAME_TITLE);
  });
});

describe('Gradient Pill Button Rectangle Buttons LivePage', () => {
  it('mounts the shader frame host without a back control in embed chrome', () => {
    const { container } = render(
      <MemoryRouter>
        <LivePage />
      </MemoryRouter>,
    );
    expect(container.querySelector('.shader-frame')).toBeTruthy();
    expect(container.querySelector('.gradient-pill-button-rectangle-buttons-page')).toBeTruthy();
    expect(container.querySelector('iframe')).toBeTruthy();
    expect(screen.queryByLabelText('Go back')).toBeNull();
  });
});
