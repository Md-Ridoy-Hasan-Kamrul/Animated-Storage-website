import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import {
  FRAME_TITLE,
  SOURCE_URL,
  STRUCTURE_FLOW_DEFAULT_PROPS,
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
import { StructureFlowCollection } from '../StructureFlowCollection';
import { FluxVortexStructureFlow } from '../FluxVortexStructureFlow';

describe('StructureFlowCollection host', () => {
  it('loads the focused Flux Vortex document URL', () => {
    render(<StructureFlowCollection {...STRUCTURE_FLOW_DEFAULT_PROPS} />);
    const frame = screen.getByTitle(FRAME_TITLE);
    expect(frame).toHaveAttribute('src', SOURCE_URL);
    expect(frame.tagName).toBe('IFRAME');
  });

  it('exposes flux-vortex variant on the host', () => {
    const { container } = render(
      <StructureFlowCollection {...STRUCTURE_FLOW_DEFAULT_PROPS} />,
    );
    const host = container.querySelector('.structure-flow-collection');
    expect(host).toHaveAttribute('data-variant', 'flux-vortex');
  });

  it('falls back invalid variants to flux-vortex', () => {
    const { container } = render(<StructureFlowCollection variant="not-a-variant" />);
    expect(container.querySelector('.structure-flow-collection')).toHaveAttribute(
      'data-variant',
      'flux-vortex',
    );
  });
});

describe('FluxVortexStructureFlow wrapper', () => {
  it('mounts StructureFlowCollection with default Flux Vortex props', () => {
    render(<FluxVortexStructureFlow />);
    expect(screen.getByTitle(FRAME_TITLE)).toHaveAttribute('src', SOURCE_URL);
  });
});

describe('Flux Vortex Structure Flow LivePage', () => {
  it('mounts the shader frame host without a back control in embed chrome', () => {
    const { container } = render(
      <MemoryRouter>
        <LivePage />
      </MemoryRouter>,
    );
    expect(container.querySelector('.shader-frame')).toBeTruthy();
    expect(container.querySelector('.flux-vortex-structure-flow-page')).toBeTruthy();
    expect(screen.queryByLabelText('Go back')).toBeNull();
  });
});
