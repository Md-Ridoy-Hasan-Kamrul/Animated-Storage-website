import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { RAKING_DEFAULT_PROPS, VARIANT_ID } from '../constants';

beforeAll(() => {
  if (typeof global.ResizeObserver === 'undefined') {
    global.ResizeObserver = class {
      observe() {}
      unobserve() {}
      disconnect() {}
    };
  }
  if (typeof global.IntersectionObserver === 'undefined') {
    global.IntersectionObserver = class {
      observe() {}
      unobserve() {}
      disconnect() {}
    };
  }
  HTMLCanvasElement.prototype.getContext = jest.fn(() => null);
});

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
import { ShaderButtons } from '../ShaderButtons';

describe('ShaderButtons raking-light-pill host', () => {
  it('mounts the raking-light-pill React WebGL stage (no iframe)', async () => {
    const { container } = render(<ShaderButtons {...RAKING_DEFAULT_PROPS} />);
    const stage = await screen.findByRole('button', { name: /Field Notes 2026/i });
    const host = container.querySelector('.threeui-raking-light-pill-stage');

    expect(host).toBeTruthy();
    expect(host.getAttribute('data-variant')).toBe(VARIANT_ID);
    expect(host.getAttribute('data-mode')).toBe('dark');
    expect(stage).toBeTruthy();
    expect(container.querySelector('iframe')).toBeNull();
    expect(VARIANT_ID).toBe('raking-light-pill');
  });
});

describe('Raking Light Pill LivePage', () => {
  it('mounts the shader frame host without a back control in embed chrome', async () => {
    const { container } = render(
      <MemoryRouter>
        <LivePage />
      </MemoryRouter>,
    );
    expect(container.querySelector('.shader-frame')).toBeTruthy();
    expect(container.querySelector('.raking-light-pill-page')).toBeTruthy();
    await screen.findByRole('button', { name: /Field Notes 2026/i });
    expect(screen.queryByLabelText('Go back')).toBeNull();
  });
});
