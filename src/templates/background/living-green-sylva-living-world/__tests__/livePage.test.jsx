import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import {
  FRAME_TITLE,
  SOURCE_URL,
  SYLVA_LIVING_WORLD_DEFAULT_PROPS,
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
import { SylvaLivingWorldScene } from '../SylvaLivingWorldScene';
import { LivingGreenSylvaLivingWorld } from '../LivingGreenSylvaLivingWorld';

describe('SylvaLivingWorldScene host', () => {
  it('loads the scene-only Living Green document URL', () => {
    render(<SylvaLivingWorldScene {...SYLVA_LIVING_WORLD_DEFAULT_PROPS} />);
    const frame = screen.getByTitle(FRAME_TITLE);
    expect(frame).toHaveAttribute('src', SOURCE_URL);
    expect(frame.tagName).toBe('IFRAME');
  });

  it('exposes living-green variant on the host', () => {
    const { container } = render(
      <SylvaLivingWorldScene {...SYLVA_LIVING_WORLD_DEFAULT_PROPS} />,
    );
    const host = container.querySelector('.sylva-living-world-scene');
    expect(host).toHaveAttribute('data-variant', 'living-green');
    expect(host).toHaveAttribute(
      'aria-label',
      'Interactive procedural moss root world with ferns, flowers, pollen, and a butterfly',
    );
  });

  it('falls back invalid variants to living-green', () => {
    const { container } = render(<SylvaLivingWorldScene variant="not-a-variant" />);
    expect(container.querySelector('.sylva-living-world-scene')).toHaveAttribute(
      'data-variant',
      'living-green',
    );
  });
});

describe('LivingGreenSylvaLivingWorld wrapper', () => {
  it('mounts the scene host with default living-green props', () => {
    render(<LivingGreenSylvaLivingWorld />);
    expect(screen.getByTitle(FRAME_TITLE)).toHaveAttribute('src', SOURCE_URL);
  });
});

describe('Living Green Sylva Living World LivePage', () => {
  it('mounts the shader frame host without a back control in embed chrome', () => {
    const { container } = render(
      <MemoryRouter>
        <LivePage />
      </MemoryRouter>,
    );
    expect(container.querySelector('.shader-frame')).toBeTruthy();
    expect(container.querySelector('.living-green-sylva-living-world-page')).toBeTruthy();
    expect(screen.queryByLabelText('Go back')).toBeNull();
  });
});
