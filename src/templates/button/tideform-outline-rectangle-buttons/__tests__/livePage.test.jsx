import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import {
  BUTTON_LABEL,
  THEME_ID,
  TIDEFORM_OUTLINE_DEFAULT_PROPS,
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

describe('RectangleButtons tideform-outline host', () => {
  it('mounts the Tideform SelectedPageButton with See the work label and long arrow', () => {
    const { container } = render(<RectangleButtons {...TIDEFORM_OUTLINE_DEFAULT_PROPS} />);
    const stage = container.querySelector(
      `.threeui-page-button-stage.threeui-page-button-stage--${THEME_ID}`,
    );
    const button = container.querySelector('.threeui-page-button.threeui-page-button--tideform');
    const arrow = button?.querySelector('svg');
    expect(stage).toBeTruthy();
    expect(stage.getAttribute('data-variant')).toBe(VARIANT_ID);
    expect(stage.getAttribute('data-mode')).toBe('dark');
    expect(button).toBeTruthy();
    expect(button.textContent).toContain(BUTTON_LABEL);
    expect(arrow).toBeTruthy();
    expect(arrow.getAttribute('viewBox')).toBe('0 0 21 9');
    expect(VARIANT_ID).toBe('tideform-outline');
  });
});

describe('Tideform Outline Rectangle Buttons LivePage', () => {
  it('mounts the shader frame host without a back control in embed chrome', () => {
    const { container } = render(
      <MemoryRouter>
        <LivePage />
      </MemoryRouter>,
    );
    expect(container.querySelector('.shader-frame')).toBeTruthy();
    expect(container.querySelector('.tideform-outline-rectangle-buttons-page')).toBeTruthy();
    expect(container.querySelector('.threeui-page-button--tideform')).toBeTruthy();
    expect(screen.queryByLabelText('Go back')).toBeNull();
  });
});
