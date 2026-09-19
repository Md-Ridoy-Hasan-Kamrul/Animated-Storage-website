import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import {
  BUTTON_LABEL,
  HALVORSEN_ARROW_PILL_DEFAULT_PROPS,
  THEME_ID,
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

describe('RectangleButtons halvorsen-arrow-pill host', () => {
  it('mounts the Halvorsen bone-white arrow pill with See the work and disc arrow', () => {
    const { container } = render(
      <RectangleButtons {...HALVORSEN_ARROW_PILL_DEFAULT_PROPS} />,
    );
    const stage = container.querySelector(
      `.threeui-page-button-stage.threeui-page-button-stage--${THEME_ID}`,
    );
    const button = container.querySelector(
      '.threeui-page-button.threeui-page-button--arrow-pill.threeui-page-button--halvorsen',
    );
    const disc = container.querySelector('.threeui-page-button__disc');
    const arrow = disc?.querySelector('svg');
    expect(stage).toBeTruthy();
    expect(stage.getAttribute('data-variant')).toBe(VARIANT_ID);
    expect(stage.getAttribute('data-mode')).toBe('dark');
    expect(button).toBeTruthy();
    expect(button.textContent).toContain(BUTTON_LABEL);
    expect(disc).toBeTruthy();
    expect(arrow).toBeTruthy();
    expect(arrow.getAttribute('viewBox')).toBe('0 0 12 12');
    expect(VARIANT_ID).toBe('halvorsen-arrow-pill');
  });
});

describe('Halvorsen Arrow Pill Rectangle Buttons LivePage', () => {
  it('mounts the shader frame host without a back control in embed chrome', () => {
    const { container } = render(
      <MemoryRouter>
        <LivePage />
      </MemoryRouter>,
    );
    expect(container.querySelector('.shader-frame')).toBeTruthy();
    expect(container.querySelector('.halvorsen-arrow-pill-rectangle-buttons-page')).toBeTruthy();
    expect(container.querySelector('.threeui-page-button--halvorsen')).toBeTruthy();
    expect(screen.queryByLabelText('Go back')).toBeNull();
  });
});
