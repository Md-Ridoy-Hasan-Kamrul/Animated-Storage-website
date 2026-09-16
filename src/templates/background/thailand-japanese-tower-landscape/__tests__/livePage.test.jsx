import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import {
  THAI_TOWER_DEFAULT_PROPS,
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
import { ThailandJapaneseTowerLandscape } from '../ThailandJapaneseTowerLandscape';

describe('JapaneseTowerLandscape host (Thailand)', () => {
  it('loads the Towers document URL with thailand country query', () => {
    render(<JapaneseTowerLandscape {...THAI_TOWER_DEFAULT_PROPS} />);
    const frame = screen.getByTitle(FRAME_TITLE);
    expect(frame).toHaveAttribute('src', `${SOURCE_URL}?country=thailand`);
    expect(frame.tagName).toBe('IFRAME');
  });

  it('exposes thailand country on the host', () => {
    const { container } = render(
      <JapaneseTowerLandscape {...THAI_TOWER_DEFAULT_PROPS} />,
    );
    const host = container.querySelector('.japanese-tower-landscape');
    expect(host).toHaveAttribute('data-country', 'thailand');
  });

  it('falls back invalid countries to thailand', () => {
    const { container } = render(<JapaneseTowerLandscape country="not-a-country" />);
    expect(container.querySelector('.japanese-tower-landscape')).toHaveAttribute(
      'data-country',
      'thailand',
    );
  });
});

describe('ThailandJapaneseTowerLandscape wrapper', () => {
  it('mounts JapaneseTowerLandscape with default Thailand props', () => {
    render(<ThailandJapaneseTowerLandscape />);
    expect(screen.getByTitle(FRAME_TITLE)).toHaveAttribute(
      'src',
      `${SOURCE_URL}?country=thailand`,
    );
  });
});

describe('Thai Tower Landscape LivePage', () => {
  it('mounts the shader frame host without a back control in embed chrome', () => {
    const { container } = render(
      <MemoryRouter>
        <LivePage />
      </MemoryRouter>,
    );
    expect(container.querySelector('.shader-frame')).toBeTruthy();
    expect(container.querySelector('.thailand-japanese-tower-landscape-page')).toBeTruthy();
    expect(screen.queryByLabelText('Go back')).toBeNull();
  });
});
