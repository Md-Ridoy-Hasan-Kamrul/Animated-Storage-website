import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import {
  FRAME_TITLE,
  SOURCE_URL,
  THREE_D_PAPER_DEFAULT_PROPS,
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
import { ThreeDPaper } from '../ThreeDPaper';

describe('ThreeDPaper Japanese host', () => {
  it('loads the Japanese document URL', () => {
    render(<ThreeDPaper {...THREE_D_PAPER_DEFAULT_PROPS} />);
    const frame = screen.getByTitle(FRAME_TITLE);
    expect(frame).toHaveAttribute('src', SOURCE_URL);
    expect(frame.tagName).toBe('IFRAME');
  });

  it('exposes japanese variant on the host', () => {
    const { container } = render(<ThreeDPaper {...THREE_D_PAPER_DEFAULT_PROPS} />);
    const host = container.querySelector('.three-d-paper');
    expect(host).toHaveAttribute('data-variant', 'japanese');
  });

  it('falls back invalid variants to japanese', () => {
    const { container } = render(<ThreeDPaper variant="not-a-variant" />);
    expect(container.querySelector('.three-d-paper')).toHaveAttribute(
      'data-variant',
      'japanese',
    );
  });
});

describe('Japanese 3D Paper LivePage', () => {
  it('mounts the shader frame host without a back control in embed chrome', () => {
    const { container } = render(
      <MemoryRouter>
        <LivePage />
      </MemoryRouter>,
    );
    expect(container.querySelector('.shader-frame')).toBeTruthy();
    expect(container.querySelector('.japanese-3d-paper-page')).toBeTruthy();
    expect(screen.queryByLabelText('Go back')).toBeNull();
  });
});
