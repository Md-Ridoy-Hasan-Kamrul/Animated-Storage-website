import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { BUTTON_LABEL, LUMEN_CTA_DEFAULT_PROPS, VARIANT_ID } from '../constants';

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

describe('RectangleButtons lumen-cta host', () => {
  it('mounts the Lumen primary pill with ring for lumen-cta', () => {
    const { container } = render(<RectangleButtons {...LUMEN_CTA_DEFAULT_PROPS} />);
    const host = container.querySelector('.lumen-cta.lumen-cta--dark');
    const button = container.querySelector('.lumen-cta__button');
    const ring = container.querySelector('.lumen-cta__ring');
    expect(host).toBeTruthy();
    expect(host.getAttribute('data-variant')).toBe('primary');
    expect(button).toBeTruthy();
    expect(button.textContent).toContain(BUTTON_LABEL);
    expect(ring).toBeTruthy();
    expect(VARIANT_ID).toBe('lumen-cta');
  });
});

describe('Lumen CTA Rectangle Buttons LivePage', () => {
  it('mounts the shader frame host without a back control in embed chrome', () => {
    const { container } = render(
      <MemoryRouter>
        <LivePage />
      </MemoryRouter>,
    );
    expect(container.querySelector('.shader-frame')).toBeTruthy();
    expect(container.querySelector('.lumen-cta-rectangle-buttons-page')).toBeTruthy();
    expect(container.querySelector('.lumen-cta__button')).toBeTruthy();
    expect(screen.queryByLabelText('Go back')).toBeNull();
  });
});
