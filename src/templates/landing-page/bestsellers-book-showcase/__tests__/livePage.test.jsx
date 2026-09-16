import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import {
  BESTSELLERS_BOOK_SHOWCASE_DEFAULT_PROPS,
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
      data-testid="bestsellers-book-showcase-frame"
      data-title={title}
      data-source={sourceUrl}
      data-has-css={Boolean(customization?.css)}
    />
  ),
}));

import LivePage from '../LivePage';
import { BestsellersBookShowcase } from '../BestsellersBookShowcase';

describe('BestsellersBookShowcase host', () => {
  it('loads the byte-exact Field Manuals document URL', () => {
    render(<BestsellersBookShowcase {...BESTSELLERS_BOOK_SHOWCASE_DEFAULT_PROPS} />);
    const frame = screen.getByTestId('bestsellers-book-showcase-frame');
    expect(frame).toHaveAttribute('data-source', SOURCE_URL);
    expect(frame).toHaveAttribute('data-title', FRAME_TITLE);
    expect(frame).toHaveAttribute('data-has-css', 'true');
  });

  it('peels typography props for the frame', () => {
    const [type, rest] = splitTypographyProps({
      ...BESTSELLERS_BOOK_SHOWCASE_DEFAULT_PROPS,
      className: 'extra',
    });
    expect(type.headingFont).toBe('iowan-old-style');
    expect(type.primaryColor).toBe('#c3a47b');
    expect(rest.className).toBe('extra');
    expect(rest.headingFont).toBeUndefined();
  });
});

describe('Bestsellers Book Showcase LivePage', () => {
  it('mounts the shader frame host without a back control in embed chrome', () => {
    const { container } = render(
      <MemoryRouter>
        <LivePage />
      </MemoryRouter>,
    );
    expect(container.querySelector('.shader-frame')).toBeTruthy();
    expect(container.querySelector('.bestsellers-book-showcase-page')).toBeTruthy();
    expect(screen.queryByLabelText('Go back')).toBeNull();
  });
});
