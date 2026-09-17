import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import {
  TURKISH_TOWER_DEFAULT_PROPS,
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
import { TurkeyJapaneseTowerLandscape } from '../TurkeyJapaneseTowerLandscape';

describe('JapaneseTowerLandscape host (Turkey)', () => {
  it('loads the Towers document URL with turkey country query', () => {
    render(<JapaneseTowerLandscape {...TURKISH_TOWER_DEFAULT_PROPS} />);
    const frame = screen.getByTitle(FRAME_TITLE);
    expect(frame).toHaveAttribute('src', `${SOURCE_URL}?country=turkey`);
    expect(frame.tagName).toBe('IFRAME');
  });

  it('exposes turkey country on the host', () => {
    const { container } = render(
      <JapaneseTowerLandscape {...TURKISH_TOWER_DEFAULT_PROPS} />,
    );
    const host = container.querySelector('.japanese-tower-landscape');
    expect(host).toHaveAttribute('data-country', 'turkey');
  });

  it('falls back invalid countries to turkey', () => {
    const { container } = render(<JapaneseTowerLandscape country="not-a-country" />);
    expect(container.querySelector('.japanese-tower-landscape')).toHaveAttribute(
      'data-country',
      'turkey',
    );
  });
});

describe('TurkeyJapaneseTowerLandscape wrapper', () => {
  it('mounts JapaneseTowerLandscape with default Turkey props', () => {
    render(<TurkeyJapaneseTowerLandscape />);
    expect(screen.getByTitle(FRAME_TITLE)).toHaveAttribute(
      'src',
      `${SOURCE_URL}?country=turkey`,
    );
  });
});

describe('Turkish Tower Landscape LivePage', () => {
  it('mounts the shader frame host without a back control in embed chrome', () => {
    const { container } = render(
      <MemoryRouter>
        <LivePage />
      </MemoryRouter>,
    );
    expect(container.querySelector('.shader-frame')).toBeTruthy();
    expect(container.querySelector('.turkey-japanese-tower-landscape-page')).toBeTruthy();
    expect(screen.queryByLabelText('Go back')).toBeNull();
  });
});
