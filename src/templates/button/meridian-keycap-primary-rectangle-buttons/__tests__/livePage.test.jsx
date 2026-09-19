import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import {
  BUTTON_LABEL,
  MERIDIAN_KEYCAP_PRIMARY_DEFAULT_PROPS,
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

describe('RectangleButtons meridian-keycap-primary host', () => {
  it('mounts the Meridian primary keycap with LED and Start free label', () => {
    const { container } = render(
      <RectangleButtons {...MERIDIAN_KEYCAP_PRIMARY_DEFAULT_PROPS} />,
    );
    const stage = container.querySelector(
      `.threeui-page-button-stage.threeui-page-button-stage--${THEME_ID}`,
    );
    const button = container.querySelector(
      '.threeui-page-button.threeui-page-button--meridian.threeui-page-button--meridian-primary',
    );
    const led = container.querySelector('.threeui-page-button__led');
    expect(stage).toBeTruthy();
    expect(stage.getAttribute('data-variant')).toBe(VARIANT_ID);
    expect(stage.getAttribute('data-mode')).toBe('dark');
    expect(button).toBeTruthy();
    expect(button.textContent).toContain(BUTTON_LABEL);
    expect(led).toBeTruthy();
    expect(VARIANT_ID).toBe('meridian-keycap-primary');
  });
});

describe('Meridian Keycap Primary Rectangle Buttons LivePage', () => {
  it('mounts the shader frame host without a back control in embed chrome', () => {
    const { container } = render(
      <MemoryRouter>
        <LivePage />
      </MemoryRouter>,
    );
    expect(container.querySelector('.shader-frame')).toBeTruthy();
    expect(container.querySelector('.meridian-keycap-primary-rectangle-buttons-page')).toBeTruthy();
    expect(container.querySelector('.threeui-page-button--meridian-primary')).toBeTruthy();
    expect(screen.queryByLabelText('Go back')).toBeNull();
  });
});
