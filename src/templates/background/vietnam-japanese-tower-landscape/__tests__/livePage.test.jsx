import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import {
  VIETNAMESE_TOWER_DEFAULT_PROPS,
  FRAME_TITLE,
  SOURCE_URL,
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
import { JapaneseTowerLandscape } from '../JapaneseTowerLandscape';
import { VietnamJapaneseTowerLandscape } from '../VietnamJapaneseTowerLandscape';

describe('JapaneseTowerLandscape host (Vietnam)', () => {
  it('loads the Towers document URL with vietnam country query', () => {
    render(<JapaneseTowerLandscape {...VIETNAMESE_TOWER_DEFAULT_PROPS} />);
    const frame = screen.getByTitle(FRAME_TITLE);
    expect(frame).toHaveAttribute('src', `${SOURCE_URL}?country=vietnam`);
    expect(frame.tagName).toBe('IFRAME');
  });

  it('exposes vietnam country on the host', () => {
    const { container } = render(
      <JapaneseTowerLandscape {...VIETNAMESE_TOWER_DEFAULT_PROPS} />,
    );
    const host = container.querySelector('.japanese-tower-landscape');
    expect(host).toHaveAttribute('data-country', 'vietnam');
  });

  it('falls back invalid countries to vietnam', () => {
    const { container } = render(<JapaneseTowerLandscape country="not-a-country" />);
    expect(container.querySelector('.japanese-tower-landscape')).toHaveAttribute(
      'data-country',
      'vietnam',
    );
  });
});

describe('VietnamJapaneseTowerLandscape wrapper', () => {
  it('mounts JapaneseTowerLandscape with default Vietnam props', () => {
    render(<VietnamJapaneseTowerLandscape />);
    expect(screen.getByTitle(FRAME_TITLE)).toHaveAttribute(
      'src',
      `${SOURCE_URL}?country=vietnam`,
    );
  });
});

describe('Vietnamese Tower Landscape LivePage', () => {
  it('mounts the shader frame host without a back control in embed chrome', () => {
    const { container } = render(
      <MemoryRouter>
        <LivePage />
      </MemoryRouter>,
    );
    expect(container.querySelector('.shader-frame')).toBeTruthy();
    expect(container.querySelector('.vietnam-japanese-tower-landscape-page')).toBeTruthy();
    expect(screen.queryByLabelText('Go back')).toBeNull();
  });
});
