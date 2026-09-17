import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { FRAME_TITLE, SOURCE_URL } from '../constants';

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
import { PredictiveArcCanvas } from '../PredictiveArcCanvas';

describe('Override Grid PredictiveArcCanvas host', () => {
  it('loads the focused Override Grid document URL', () => {
    render(<PredictiveArcCanvas variant="override-grid" />);
    const frame = screen.getByTitle(FRAME_TITLE);
    expect(frame).toHaveAttribute('src', SOURCE_URL);
    expect(frame.tagName).toBe('IFRAME');
    expect(frame).toHaveAttribute('sandbox', 'allow-scripts');
  });

  it('exposes the override-grid-predictive-arc host class', () => {
    const { container } = render(<PredictiveArcCanvas />);
    expect(container.querySelector('.override-grid-predictive-arc')).toBeTruthy();
  });

  it('applies no filter at default hue/saturation/brightness', () => {
    render(<PredictiveArcCanvas hue={0} saturation={1} brightness={1} />);
    const frame = screen.getByTitle(FRAME_TITLE);
    expect(frame.style.filter).toBe('');
  });
});

describe('Override Grid Predictive Arc LivePage', () => {
  it('mounts the shader frame host without a back control in embed chrome', () => {
    const { container } = render(
      <MemoryRouter>
        <LivePage />
      </MemoryRouter>,
    );
    expect(container.querySelector('.shader-frame')).toBeTruthy();
    expect(container.querySelector('.override-grid-predictive-arc-page')).toBeTruthy();
    expect(screen.queryByLabelText('Go back')).toBeNull();
  });
});
