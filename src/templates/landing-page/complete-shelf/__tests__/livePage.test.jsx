import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import {
  COMPLETE_SHELF_DEFAULT_PROPS,
  FRAME_TITLE,
  SOURCE_URL,
} from '../constants';
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
      data-testid="complete-shelf-frame"
      data-title={title}
      data-source={sourceUrl}
      data-has-css={Boolean(customization?.css)}
    />
  ),
}));

import LivePage from '../LivePage';
import { CompleteShelfLandingPage } from '../CompleteShelfLandingPage';

describe('CompleteShelfLandingPage host', () => {
  it('loads the byte-exact Complete Shelf document URL', () => {
    render(<CompleteShelfLandingPage {...COMPLETE_SHELF_DEFAULT_PROPS} />);
    const frame = screen.getByTestId('complete-shelf-frame');
    expect(frame).toHaveAttribute('data-source', SOURCE_URL);
    expect(frame).toHaveAttribute('data-title', FRAME_TITLE);
    expect(frame).toHaveAttribute('data-has-css', 'true');
  });

  it('peels typography props for the frame', () => {
    const [type, rest] = splitTypographyProps({
      ...COMPLETE_SHELF_DEFAULT_PROPS,
      className: 'extra',
    });
    expect(type.headingFont).toBe('iowan-old-style');
    expect(type.primaryColor).toBe('#c87046');
    expect(rest.className).toBe('extra');
    expect(rest.headingFont).toBeUndefined();
  });
});

describe('Complete Shelf LivePage', () => {
  it('mounts the shader frame host without a back control in embed chrome', () => {
    const { container } = render(
      <MemoryRouter>
        <LivePage />
      </MemoryRouter>,
    );
    expect(container.querySelector('.shader-frame')).toBeTruthy();
    expect(container.querySelector('.complete-shelf-page')).toBeTruthy();
    expect(screen.queryByLabelText('Go back')).toBeNull();
  });
});
