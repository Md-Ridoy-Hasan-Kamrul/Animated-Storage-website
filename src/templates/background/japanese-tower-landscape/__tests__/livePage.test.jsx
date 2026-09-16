import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import {
  FRAME_TITLE,
  JAPANESE_TOWER_DEFAULT_PROPS,
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
import { JapanJapaneseTowerLandscape } from '../JapanJapaneseTowerLandscape';

describe('JapaneseTowerLandscape host', () => {
  it('loads the Japan Towers document URL with country query', () => {
    render(<JapaneseTowerLandscape {...JAPANESE_TOWER_DEFAULT_PROPS} />);
    const frame = screen.getByTitle(FRAME_TITLE);
    expect(frame).toHaveAttribute('src', `${SOURCE_URL}?country=japan`);
    expect(frame.tagName).toBe('IFRAME');
  });

  it('exposes japan country on the host', () => {
    const { container } = render(
      <JapaneseTowerLandscape {...JAPANESE_TOWER_DEFAULT_PROPS} />,
    );
    const host = container.querySelector('.japanese-tower-landscape');
    expect(host).toHaveAttribute('data-country', 'japan');
  });

  it('falls back invalid countries to japan', () => {
    const { container } = render(<JapaneseTowerLandscape country="not-a-country" />);
    expect(container.querySelector('.japanese-tower-landscape')).toHaveAttribute(
      'data-country',
      'japan',
    );
  });
});

describe('JapanJapaneseTowerLandscape wrapper', () => {
  it('mounts JapaneseTowerLandscape with default Japan props', () => {
    render(<JapanJapaneseTowerLandscape />);
    expect(screen.getByTitle(FRAME_TITLE)).toHaveAttribute(
      'src',
      `${SOURCE_URL}?country=japan`,
    );
  });
});

describe('Japanese Tower Landscape LivePage', () => {
  it('mounts the shader frame host without a back control in embed chrome', () => {
    const { container } = render(
      <MemoryRouter>
        <LivePage />
      </MemoryRouter>,
    );
    expect(container.querySelector('.shader-frame')).toBeTruthy();
    expect(container.querySelector('.japanese-tower-landscape-page')).toBeTruthy();
    expect(screen.queryByLabelText('Go back')).toBeNull();
  });
});
