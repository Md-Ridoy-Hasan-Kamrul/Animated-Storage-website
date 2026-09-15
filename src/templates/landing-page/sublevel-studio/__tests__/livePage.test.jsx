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

jest.mock('../LandingPageFrame', () => ({
  LandingPageFrame: ({ title, sourceUrl, customization }) => (
    <div
      data-testid="sublevel-studio-frame"
      data-title={title}
      data-source={sourceUrl}
      data-has-css={Boolean(customization?.css)}
    />
  ),
}));

import LivePage from '../LivePage';
import { SublevelStudioLandingPage } from '../SublevelStudioLandingPage';

describe('SublevelStudioLandingPage host', () => {
  it('loads the byte-exact local document URL without typography props', () => {
    render(<SublevelStudioLandingPage />);
    const frame = screen.getByTestId('sublevel-studio-frame');
    expect(frame).toHaveAttribute('data-source', SOURCE_URL);
    expect(frame).toHaveAttribute('data-title', FRAME_TITLE);
    expect(frame).toHaveAttribute('data-has-css', 'false');
  });

  it('forwards frame props to LandingPageFrame', () => {
    render(<SublevelStudioLandingPage className="extra" />);
    const frame = screen.getByTestId('sublevel-studio-frame');
    expect(frame).toHaveAttribute('data-source', SOURCE_URL);
  });
});

describe('Sublevel Studio LivePage', () => {
  it('mounts the shader frame host without a back control in embed chrome', () => {
    const { container } = render(
      <MemoryRouter>
        <LivePage />
      </MemoryRouter>,
    );
    expect(container.querySelector('.shader-frame')).toBeTruthy();
    expect(container.querySelector('.sublevel-studio-page')).toBeTruthy();
    expect(screen.queryByLabelText('Go back')).toBeNull();
  });
});
