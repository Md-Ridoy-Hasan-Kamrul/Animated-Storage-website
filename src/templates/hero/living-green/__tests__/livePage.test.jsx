import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { FRAME_TITLE, SOURCE_URL, SYLVA_DEFAULT_PROPS } from '../constants';
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
      data-testid="living-green-frame"
      data-title={title}
      data-source={sourceUrl}
      data-has-css={Boolean(customization?.css)}
    />
  ),
}));

import LivePage from '../LivePage';
import { SylvaHero } from '../SylvaHero';

describe('SylvaHero host', () => {
  it('loads the byte-exact Living Green document URL', () => {
    render(<SylvaHero {...SYLVA_DEFAULT_PROPS} />);
    const frame = screen.getByTestId('living-green-frame');
    expect(frame).toHaveAttribute('data-source', SOURCE_URL);
    expect(frame).toHaveAttribute('data-title', FRAME_TITLE);
    expect(frame).toHaveAttribute('data-has-css', 'true');
  });

  it('peels typography props for the frame', () => {
    const [type, rest] = splitTypographyProps({
      ...SYLVA_DEFAULT_PROPS,
      className: 'extra',
    });
    expect(type.headingFont).toBe('lexend');
    expect(type.primaryColor).toBe('#ffffff');
    expect(rest.className).toBe('extra');
    expect(rest.headingFont).toBeUndefined();
  });
});

describe('Living Green LivePage', () => {
  it('mounts the shader frame host without a back control in embed chrome', () => {
    const { container } = render(
      <MemoryRouter>
        <LivePage />
      </MemoryRouter>,
    );
    expect(container.querySelector('.shader-frame')).toBeTruthy();
    expect(container.querySelector('.living-green-page')).toBeTruthy();
    expect(screen.queryByLabelText('Go back')).toBeNull();
  });
});
