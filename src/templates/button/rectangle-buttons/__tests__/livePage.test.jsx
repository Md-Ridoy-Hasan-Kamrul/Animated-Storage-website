import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { BUTTON_LABEL, RECTANGLE_BUTTONS_DEFAULT_PROPS, VARIANT_ID } from '../constants';

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

describe('RectangleButtons dark-pill host', () => {
  it('mounts the Dark Glass Sign up button', () => {
    const { container } = render(<RectangleButtons {...RECTANGLE_BUTTONS_DEFAULT_PROPS} />);
    const host = container.querySelector('.section-element.section-element--glass-button');
    const button = container.querySelector('button.section-button');
    expect(host).toBeTruthy();
    expect(host.getAttribute('data-mode')).toBe('dark');
    expect(container.querySelector(`[data-variant="${VARIANT_ID}"]`)).toBeTruthy();
    expect(button).toBeTruthy();
    expect(button.textContent).toContain(BUTTON_LABEL);
    expect(container.querySelector('.section-button__circle')).toBeTruthy();
  });
});

describe('Rectangle Buttons LivePage', () => {
  it('mounts the shader frame host without a back control in embed chrome', () => {
    const { container } = render(
      <MemoryRouter>
        <LivePage />
      </MemoryRouter>,
    );
    expect(container.querySelector('.shader-frame')).toBeTruthy();
    expect(container.querySelector('.rectangle-buttons-page')).toBeTruthy();
    expect(container.querySelector('button.section-button')).toBeTruthy();
    expect(screen.queryByLabelText('Go back')).toBeNull();
  });
});
