import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import {
  CHINESE_TOWER_DEFAULT_PROPS,
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
import { ChinaJapaneseTowerLandscape } from '../ChinaJapaneseTowerLandscape';

describe('JapaneseTowerLandscape host (China)', () => {
  it('loads the Towers document URL with china country query', () => {
    render(<JapaneseTowerLandscape {...CHINESE_TOWER_DEFAULT_PROPS} />);
    const frame = screen.getByTitle(FRAME_TITLE);
    expect(frame).toHaveAttribute('src', `${SOURCE_URL}?country=china`);
    expect(frame.tagName).toBe('IFRAME');
  });

  it('exposes china country on the host', () => {
    const { container } = render(
      <JapaneseTowerLandscape {...CHINESE_TOWER_DEFAULT_PROPS} />,
    );
    const host = container.querySelector('.japanese-tower-landscape');
    expect(host).toHaveAttribute('data-country', 'china');
  });

  it('falls back invalid countries to china', () => {
    const { container } = render(<JapaneseTowerLandscape country="not-a-country" />);
    expect(container.querySelector('.japanese-tower-landscape')).toHaveAttribute(
      'data-country',
      'china',
    );
  });
});

describe('ChinaJapaneseTowerLandscape wrapper', () => {
  it('mounts JapaneseTowerLandscape with default China props', () => {
    render(<ChinaJapaneseTowerLandscape />);
    expect(screen.getByTitle(FRAME_TITLE)).toHaveAttribute(
      'src',
      `${SOURCE_URL}?country=china`,
    );
  });
});

describe('Chinese Tower Landscape LivePage', () => {
  it('mounts the shader frame host without a back control in embed chrome', () => {
    const { container } = render(
      <MemoryRouter>
        <LivePage />
      </MemoryRouter>,
    );
    expect(container.querySelector('.shader-frame')).toBeTruthy();
    expect(container.querySelector('.china-japanese-tower-landscape-page')).toBeTruthy();
    expect(screen.queryByLabelText('Go back')).toBeNull();
  });
});
