import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { BUTTON_LABEL, THEME_ID, TROCHIL_SIGNAL_DEFAULT_PROPS, VARIANT_ID } from '../constants';

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

describe('RectangleButtons trochil-signal host', () => {
  it('mounts the Trochil SelectedPageButton with Request access label', () => {
    const { container } = render(<RectangleButtons {...TROCHIL_SIGNAL_DEFAULT_PROPS} />);
    const stage = container.querySelector(
      `.threeui-page-button-stage.threeui-page-button-stage--${THEME_ID}`,
    );
    const button = container.querySelector('.threeui-page-button.threeui-page-button--trochil');
    expect(stage).toBeTruthy();
    expect(stage.getAttribute('data-variant')).toBe(VARIANT_ID);
    expect(stage.getAttribute('data-mode')).toBe('dark');
    expect(button).toBeTruthy();
    expect(button.textContent).toContain(BUTTON_LABEL);
    expect(VARIANT_ID).toBe('trochil-signal');
  });
});

describe('Trochil Signal Rectangle Buttons LivePage', () => {
  it('mounts the shader frame host without a back control in embed chrome', () => {
    const { container } = render(
      <MemoryRouter>
        <LivePage />
      </MemoryRouter>,
    );
    expect(container.querySelector('.shader-frame')).toBeTruthy();
    expect(container.querySelector('.trochil-signal-rectangle-buttons-page')).toBeTruthy();
    expect(container.querySelector('.threeui-page-button--trochil')).toBeTruthy();
    expect(screen.queryByLabelText('Go back')).toBeNull();
  });
});
