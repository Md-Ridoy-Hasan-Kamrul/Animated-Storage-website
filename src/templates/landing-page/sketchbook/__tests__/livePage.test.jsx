import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { SKETCHBOOK_DEFAULT_PROPS, SOURCE_URL } from '../constants';
import { splitTypographyProps } from '../pageTypography';

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
      data-testid="sketchbook-frame"
      data-title={title}
      data-source={sourceUrl}
      data-has-css={Boolean(customization?.css)}
    />
  ),
}));

import LivePage from '../LivePage';
import { MengToSketchbookLandingPage } from '../MengToSketchbookLandingPage';

describe('MengToSketchbookLandingPage host', () => {
  it('loads the byte-exact local document URL', () => {
    render(<MengToSketchbookLandingPage {...SKETCHBOOK_DEFAULT_PROPS} />);
    const frame = screen.getByTestId('sketchbook-frame');
    expect(frame).toHaveAttribute('data-source', SOURCE_URL);
    expect(frame).toHaveAttribute('data-title', 'Meng To — Singapore Sketchbook');
    expect(frame).toHaveAttribute('data-has-css', 'true');
  });

  it('peels typography props for the frame', () => {
    const [type, rest] = splitTypographyProps({
      ...SKETCHBOOK_DEFAULT_PROPS,
      className: 'extra',
    });
    expect(type.headingFont).toBe('instrument-serif');
    expect(type.primaryColor).toBe('#2b2721');
    expect(rest.className).toBe('extra');
    expect(rest.headingFont).toBeUndefined();
  });
});

describe('Sketchbook LivePage', () => {
  it('mounts the shader frame host without a back control in embed chrome', () => {
    const { container } = render(
      <MemoryRouter>
        <LivePage />
      </MemoryRouter>,
    );
    expect(container.querySelector('.shader-frame')).toBeTruthy();
    expect(container.querySelector('.sketchbook-page')).toBeTruthy();
    expect(screen.queryByLabelText('Go back')).toBeNull();
  });
});
